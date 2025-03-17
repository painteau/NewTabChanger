// Function to handle redirect
async function handleRedirect() {
    const defaultUrl = 'https://www.google.com/';
    try {
        // Check if Chrome API is available
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
            // Wrap chrome.storage.sync.get in a Promise
            const result = await new Promise((resolve, reject) => {
                chrome.storage.sync.get(['redirectUrl'], (items) => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                    } else {
                        resolve(items);
                    }
                });
            });
            
            if (result.redirectUrl) {
                try {
                    // Validate URL
                    const url = new URL(result.redirectUrl);
                    window.location.replace(result.redirectUrl);
                    return;
                } catch (urlError) {
                    console.error('Invalid URL:', urlError);
                }
            }
        }
    } catch (error) {
        console.error('Error during redirect:', error);
    }
    
    // Fallback to default URL
    window.location.replace(defaultUrl);
}

// Initialize redirect immediately
document.addEventListener('DOMContentLoaded', handleRedirect);
// Also try to redirect immediately in case DOMContentLoaded has already fired
handleRedirect();