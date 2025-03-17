// Function to show status message
function showStatus(message, isError = false) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.style.display = 'block';
    status.className = 'status ' + (isError ? 'error' : 'success');

    setTimeout(() => {
        status.style.display = 'none';
        status.textContent = '';
    }, 2000);
}

// Function to validate URL
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Function to save settings
function saveSettings() {
    const redirectUrl = document.getElementById('redirectUrl').value.trim();

    if (!redirectUrl) {
        showStatus('Please enter a URL', true);
        return;
    }

    if (!isValidUrl(redirectUrl)) {
        showStatus('Please enter a valid URL', true);
        return;
    }

    chrome.storage.sync.set(
        { redirectUrl: redirectUrl },
        () => {
            if (chrome.runtime.lastError) {
                showStatus('Error saving settings: ' + chrome.runtime.lastError.message, true);
            } else {
                showStatus('Settings saved successfully');
            }
        }
    );
}

// Function to restore settings
function restoreSettings() {
    chrome.storage.sync.get(
        { redirectUrl: 'https://www.google.com' },
        (items) => {
            if (chrome.runtime.lastError) {
                showStatus('Error loading settings: ' + chrome.runtime.lastError.message, true);
            } else {
                document.getElementById('redirectUrl').value = items.redirectUrl;
            }
        }
    );
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    restoreSettings();
    document.querySelector('button').addEventListener('click', saveSettings);
});