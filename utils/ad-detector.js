class AdDetector {
    constructor() {
        this.threshold = 0.85;
        this.keywords = [
            'ad', 'banner', 'promo', 'sponsor', 'popup',
            'commercial', 'advertisement', 'marketing'
        ];
    }

    // Deteksi berdasarkan fitur visual dan semantik
    isAdElement(element) {
        const features = this.extractFeatures(element);
        return this.calculateAdProbability(features) > this.threshold;
    }

    extractFeatures(element) {
        return {
            classList: element.className.toLowerCase(),
            id: element.id.toLowerCase(),
            tagName: element.tagName,
            width: element.offsetWidth,
            height: element.offsetHeight,
            position: window.getComputedStyle(element).position,
            containsIframe: element.querySelector('iframe') !== null,
            textContent: element.textContent.toLowerCase(),
            href: element.href ? element.href.toLowerCase() : ''
        };
    }

    calculateAdProbability(features) {
        let score = 0;

        // Rule-based scoring (bisa diganti model ML)
        this.keywords.forEach(keyword => {
            if (features.classList.includes(keyword)) score += 0.3;
            if (features.id.includes(keyword)) score += 0.4;
            if (features.textContent.includes(keyword)) score += 0.2;
        });

        // Karakteristik layout iklan
        if (features.containsIframe) score += 0.5;
        if (features.position === 'fixed') score += 0.3;
        if (features.width >= 300 && features.height >= 250) score += 0.4;

        return Math.min(1, score);
    }
}