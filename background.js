function convertArrayToCSV(dataArray) {
    if (dataArray.length === 0) return '';

    const headers = Object.keys(dataArray[0]).join(',');
    const rows = dataArray.map(obj =>
        Object.values(obj)
            .map(value => `"${String(value).replace(/"/g, '""')}"`)
            .join(',')
    );

    return `${headers}\n${rows.join('\n')}`;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'downloadData') {
        chrome.storage.local.get(['powData'], (result) => {
            const csvContent = convertArrayToCSV(result.powData || []);
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

            chrome.downloads.download({
                url: url,
                filename: `pow_data_${timestamp}.csv`,
                saveAs: true
            });

            // Clear the stored data after download
            chrome.storage.local.set({
                powData: [],
                recordCount: 0
            });
        });
    }
});