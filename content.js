function extractPOWData() {
    const dataMapping = {
        "8d31d40": "ID",
        "b432603": "POW_Number",
        "49fae62": "Surname",
        "a889b14": "Name",
        "5a1e268": "Age",
        "101e9db": "Address",
        "86cd36a": "District",
        "e3c6f61": "Where_Captured",
        "08e5fa2": "When_Captured",
        "77c36a7": "Camp",
        "f9a0866": "Country",
        "93b4093": "Ship_to",
        "22908b3": "Ship_from"
    };

    const powData = {};

    Object.entries(dataMapping).forEach(([dataId, fieldName]) => {
        const section = document.querySelector(`[data-id="${dataId}"]`);
        if (section) {
            const value = section.querySelector('.jet-listing-dynamic-field__content')?.textContent.trim() || '';
            powData[fieldName] = value;
        }
    });

    return powData;
}

// Convert data to CSV format
function convertToCSV(data) {
    const headers = Object.keys(data).join(',');
    const values = Object.values(data).join(',');
    return `${headers}\n${values}`;
}

// Main execution
window.addEventListener('load', () => {
    const powData = extractPOWData();
    if (Object.keys(powData).length > 0) {
        chrome.storage.local.get(['powData', 'recordCount'], (result) => {
            const existingData = result.powData || [];
            const newData = [...existingData, powData];

            chrome.storage.local.set({
                powData: newData,
                recordCount: newData.length
            });
        });
    }
});