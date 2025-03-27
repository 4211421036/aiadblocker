// Blokir domain deteksi adblock
const ANTI_ADBLOCK_DOMAINS = [
    "adblock-detector.com",
    "adservice.google.com",
    "adblockanalytics.com"
];
// Simpan statistik ad blocking
let adBlockStats = {};

// Load statistik dari storage saat memulai
chrome.storage.local.get(['adBlockStats'], (result) => {
    if (result.adBlockStats) {
        adBlockStats = result.adBlockStats;
    }
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.updateDynamicRules({
        addRules: ANTI_ADBLOCK_DOMAINS.map((domain, index) => ({
            id: index + 1,
            priority: 1,
            action: { type: "block" },
            condition: {
                urlFilter: `||${domain}^`,
                resourceTypes: ["script", "xmlhttprequest"]
            }
        })),
        removeRuleIds: ANTI_ADBLOCK_DOMAINS.map((_, index) => index + 1)
    });
});

// Tangani pesan dari content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'adBlockStats') {
        const domain = sender.tab?.url ? new URL(sender.tab.url).hostname : 'unknown';

        adBlockStats[domain] = {
            ...request.stats,
            timestamp: Date.now()
        };

        chrome.storage.local.set({ adBlockStats });
    }

    if (request.type === 'getAdBlockStats') {
        sendResponse(adBlockStats);
    }
    if (request.type === "detectAntiAdblock") {
        chrome.declarativeNetRequest.updateDynamicRules({
            addRules: [{
                id: 9999,
                priority: 1,
                action: { type: "block" },
                condition: {
                    urlFilter: `||${request.domain}^`,
                    resourceTypes: ["script"]
                }
            }]
        });
    }
});

// Bersihkan statistik lama
setInterval(() => {
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    Object.keys(adBlockStats).forEach(domain => {
        if (adBlockStats[domain].timestamp < oneHourAgo) {
            delete adBlockStats[domain];
        }
    });
    chrome.storage.local.set({ adBlockStats });
}, 3600000);
