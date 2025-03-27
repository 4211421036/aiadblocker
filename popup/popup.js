document.addEventListener('DOMContentLoaded', function () {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Get saved theme or default to light
    let currentTheme = localStorage.getItem('theme') || 'light';

    // Apply saved theme on load
    applyTheme(currentTheme);

    // Toggle theme on button click
    themeToggle.addEventListener('click', function () {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    });

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
    }

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.className = 'fas fa-moon';
            themeToggle.setAttribute('title', 'Switch to dark mode');
        } else {
            themeIcon.className = 'fas fa-sun';
            themeToggle.setAttribute('title', 'Switch to light mode');
        }
    }

    // Rest of your existing updateStats function...
    function updateStats() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs[0] && tabs[0].url) {
                try {
                    const url = new URL(tabs[0].url);

                    // Kirim pesan untuk mendapatkan statistik
                    chrome.runtime.sendMessage(
                        { type: 'getAdBlockStats' },
                        function (response) {
                            const statsContainer = document.getElementById('statsContainer');
                            const domainName = url.hostname.replace('www.', '');

                            // Pastikan response dan statistik domain tersedia
                            if (response && Object.keys(response).length > 0) {
                                const domainStats = response[url.hostname] || Object.values(response)[0];

                                if (domainStats) {
                                    const blockedAds = domainStats.blockedAds || 0;
                                    const potentialAds = domainStats.totalPotentialAds || 0;
                                    const accuracy = domainStats.blockAccuracy ? domainStats.blockAccuracy.toFixed(2) : 0;

                                    statsContainer.innerHTML = `
                                        <div class="stats-grid">
                                            <div class="stat-card">
                                                <div class="stat-label">Domain</div>
                                                <div class="stat-value">${domainName}</div>
                                            </div>
                                            <div class="stat-card">
                                                <div class="stat-label">Potential Ads</div>
                                                <div class="stat-value">${potentialAds}</div>
                                            </div>
                                            <div class="stat-card highlight">
                                                <div class="stat-label">Ads Blocked</div>
                                                <div class="stat-value">${blockedAds}</div>
                                            </div>
                                            <div class="stat-card">
                                                <div class="stat-label">Block Accuracy</div>
                                                <div class="stat-value">
                                                    <span class="accuracy">
                                                        ${accuracy}% 
                                                        ${accuracy > 90 ? '<i class="fas fa-check-circle"></i>' :
                                            accuracy > 70 ? '<i class="fas fa-exclamation-circle"></i>' :
                                                '<i class="fas fa-times-circle"></i>'}
                                                    </span>
                                                </div>
                                                <div class="progress-bar">
                                                    <div class="progress" style="width: ${accuracy}%"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="last-updated">
                                            Last analyzed: ${domainStats.lastAnalysisTime ?
                                            new Date(domainStats.lastAnalysisTime).toLocaleString() :
                                            'Not available'}
                                        </div>
                                    `;
                                    return;
                                }
                            }

                            // Jika tidak ada statistik
                            statsContainer.innerHTML = `
                                <div class="no-data">
                                    <i class="fas fa-chart-pie"></i>
                                    <p>No statistics available for this domain yet.</p>
                                    <p>Visit some websites to start collecting data.</p>
                                </div>
                            `;
                        }
                    );
                } catch (e) {
                    // Handle invalid URLs
                    statsContainer.innerHTML = `
                        <div class="no-data">
                            <i class="fas fa-exclamation-triangle"></i>
                            <p>Unable to analyze this page.</p>
                            <p>Try visiting a regular website.</p>
                        </div>
                    `;
                }
            } else {
                // No active tab with URL
                statsContainer.innerHTML = `
                    <div class="no-data">
                        <i class="fas fa-exclamation-circle"></i>
                        <p>No active webpage detected.</p>
                        <p>Open a website to see ad blocking statistics.</p>
                    </div>
                `;
            }
        });
    }

    updateStats();
});