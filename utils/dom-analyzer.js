class DOMAnalyzer {
    constructor() {
        this.adPatterns = {
            selectors: [
                'div[class*="ad"]',
                'div[id*="ad"]',
                'iframe[src*="ads"]',
                'div[data-ad-type]',
                'ins.adsbygoogle'
            ],
            attributes: [
                'data-ad-client',
                'data-ad-slot',
                'data-ad-targeting'
            ]
        };
    }

    findPotentialAds(root = document) {
        const ads = [];

        // Cari berdasarkan selector umum
        this.adPatterns.selectors.forEach(selector => {
            const elements = root.querySelectorAll(selector);
            elements.forEach(el => ads.push(el));
        });

        // Cari berdasarkan atribut
        this.adPatterns.attributes.forEach(attr => {
            const elements = root.querySelectorAll(`[${attr}]`);
            elements.forEach(el => ads.push(el));
        });

        // Deteksi elemen dengan rasio aspek iklan
        const allElements = root.querySelectorAll('div, section, aside, span');
        allElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.width > 300 && rect.height > 50 &&
                (rect.width / rect.height > 3 || rect.width / rect.height < 0.33)) {
                ads.push(el);
            }
        });

        return [...new Set(ads)]; // Hapus duplikat
    }

    isLikelyAdContainer(element) {
        // Deteksi berdasarkan jumlah elemen interaktif
        const interactiveElements = element.querySelectorAll('a, button, input');
        if (interactiveElements.length > 3) return true;

        // Deteksi berdasarkan kata kunci dalam teks
        const adKeywords = ['sponsored', 'advertisement', 'promoted'];
        const text = element.textContent.toLowerCase();
        return adKeywords.some(keyword => text.includes(keyword));
    }
}