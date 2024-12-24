document.addEventListener('DOMContentLoaded', () => {
    const countElement = document.getElementById('recordCount');
    const downloadBtn = document.getElementById('downloadBtn');

    // Get current count from storage
    chrome.storage.local.get(['powData', 'recordCount'], (result) => {
        const count = result.recordCount || 0;
        countElement.textContent = count;
        downloadBtn.disabled = count === 0;
    });

    downloadBtn.addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: 'downloadData' });
    });
});
