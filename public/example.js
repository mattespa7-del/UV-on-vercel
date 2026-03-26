// DOM Elements
const landingPage = document.getElementById('landingPage');
const proxyView = document.getElementById('proxyView');
const urlInput = document.getElementById('urlInput');
const searchButton = document.getElementById('searchButton');
const iframeWindow = document.getElementById('iframeWindow');
const themeToggle = document.getElementById('themeToggle');
const settingsToggle = document.getElementById('settingsToggle');
const settingsPanel = document.getElementById('settingsPanel');
const closeSettings = document.getElementById('closeSettings');
const quickItems = document.querySelectorAll('.quick-item');
const regionItems = document.querySelectorAll('.region-item');

// Proxy toolbar elements
const backButton = document.getElementById('backButton');
const forwardButton = document.getElementById('forwardButton');
const refreshButton = document.getElementById('refreshButton');
const homeButton = document.getElementById('homeButton');
const toolbarUrlInput = document.getElementById('toolbarUrlInput');
const toolbarGoButton = document.getElementById('toolbarGoButton');

// State
let currentRegion = 'auto';

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        document.documentElement.className = savedTheme;
    } else if (prefersDark) {
        document.documentElement.className = 'dark';
    } else {
        document.documentElement.className = 'light';
    }
}

function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.className = newTheme;
    localStorage.setItem('theme', newTheme);
}

// URL Processing
function processUrl(input) {
    let url = input.trim();
    const searchUrl = 'https://www.google.com/search?q=';
    
    if (!url) return null;
    
    // Check if it's a search query (no periods or spaces with no protocol)
    if (!url.includes('.') || (url.includes(' ') && !url.startsWith('http'))) {
        return searchUrl + encodeURIComponent(url);
    }
    
    // Add https if no protocol specified
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    
    return url;
}

// Navigate to URL
function navigateToUrl(url) {
    const processedUrl = processUrl(url);
    
    if (!processedUrl) return;
    
    // Show proxy view
    landingPage.classList.add('hidden');
    proxyView.classList.remove('hidden');
    
    // Update toolbar URL
    toolbarUrlInput.value = url;
    
    // Navigate iframe using UV
    iframeWindow.src = __uv$config.prefix + __uv$config.encodeUrl(processedUrl);
}

// Return to landing page
function goHome() {
    proxyView.classList.add('hidden');
    landingPage.classList.remove('hidden');
    iframeWindow.src = '';
    urlInput.value = '';
    toolbarUrlInput.value = '';
    urlInput.focus();
}

// Settings Panel
function toggleSettings() {
    settingsPanel.classList.toggle('active');
}

function closeSettingsPanel() {
    settingsPanel.classList.remove('active');
}

function selectRegion(region) {
    currentRegion = region;
    regionItems.forEach(item => {
        item.classList.toggle('active', item.dataset.region === region);
    });
    closeSettingsPanel();
}

// Event Listeners

// Theme toggle
themeToggle.addEventListener('click', toggleTheme);

// Main search input
urlInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        navigateToUrl(this.value);
    }
});

searchButton.addEventListener('click', function(event) {
    event.preventDefault();
    navigateToUrl(urlInput.value);
});

// Toolbar URL input
toolbarUrlInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        navigateToUrl(this.value);
    }
});

toolbarGoButton.addEventListener('click', function(event) {
    event.preventDefault();
    navigateToUrl(toolbarUrlInput.value);
});

// Navigation buttons
backButton.addEventListener('click', function() {
    try {
        iframeWindow.contentWindow.history.back();
    } catch (e) {
        console.log('Cannot navigate back');
    }
});

forwardButton.addEventListener('click', function() {
    try {
        iframeWindow.contentWindow.history.forward();
    } catch (e) {
        console.log('Cannot navigate forward');
    }
});

refreshButton.addEventListener('click', function() {
    try {
        iframeWindow.contentWindow.location.reload();
    } catch (e) {
        // Fallback: reload the current src
        iframeWindow.src = iframeWindow.src;
    }
});

homeButton.addEventListener('click', goHome);

// Quick access items
quickItems.forEach(item => {
    item.addEventListener('click', function() {
        const url = this.dataset.url;
        if (url) {
            navigateToUrl(url);
        }
    });
});

// Settings
settingsToggle.addEventListener('click', toggleSettings);
closeSettings.addEventListener('click', closeSettingsPanel);

regionItems.forEach(item => {
    item.addEventListener('click', function() {
        selectRegion(this.dataset.region);
    });
});

// Close settings when clicking outside
document.addEventListener('click', function(event) {
    if (!settingsPanel.contains(event.target) && 
        !settingsToggle.contains(event.target) &&
        settingsPanel.classList.contains('active')) {
        closeSettingsPanel();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Escape to go home or close settings
    if (event.key === 'Escape') {
        if (settingsPanel.classList.contains('active')) {
            closeSettingsPanel();
        } else if (!proxyView.classList.contains('hidden')) {
            goHome();
        }
    }
    
    // Ctrl/Cmd + L to focus URL input
    if ((event.ctrlKey || event.metaKey) && event.key === 'l') {
        event.preventDefault();
        if (!proxyView.classList.contains('hidden')) {
            toolbarUrlInput.focus();
            toolbarUrlInput.select();
        } else {
            urlInput.focus();
            urlInput.select();
        }
    }
});

// Focus URL input on page load
window.addEventListener('load', function() {
    initTheme();
    urlInput.focus();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            event.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Add loading state to search button
searchButton.addEventListener('mousedown', function() {
    this.style.transform = 'scale(0.98)';
});

searchButton.addEventListener('mouseup', function() {
    this.style.transform = '';
});

// Input placeholder animation
let placeholders = [
    'Enter URL or search...',
    'Try google.com',
    'Search anything...',
    'Visit youtube.com'
];
let currentPlaceholder = 0;

function cyclePlaceholder() {
    if (document.activeElement !== urlInput && !urlInput.value) {
        currentPlaceholder = (currentPlaceholder + 1) % placeholders.length;
        urlInput.placeholder = placeholders[currentPlaceholder];
    }
}

setInterval(cyclePlaceholder, 3000);
