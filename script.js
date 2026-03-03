// This runs as soon as the page loads
window.onload = function() {
    showTab('home');
    fetchGames();
};

// Tab Switching Logic
function showTab(tabName) {
    const homeTab = document.getElementById('home');
    const gamesTab = document.getElementById('games');
    
    if (tabName === 'home') {
        homeTab.style.display = 'block';
        gamesTab.style.display = 'none';
    } else {
        homeTab.style.display = 'none';
        gamesTab.style.display = 'block';
    }
}

// Search Logic: Opens in a new tab to prevent "Blank Screen" errors
function runSearch() {
    const query = document.getElementById('userQuery').value;
    if (query) {
        window.open(`https://duckduckgo.com/?q=${encodeURIComponent(query)}`, '_blank');
    }
}

// Games Logic: Loads your JSON file
async function fetchGames() {
    const grid = document.getElementById('game-grid');
    try {
        const response = await fetch('./games.json');
        const games = await response.json();
        grid.innerHTML = ''; // Clears loading text

        games.forEach(game => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `
                <h3>${game.name}</h3>
                <div class="iframe-container">
                    <iframe src="${game.url}" scrolling="no" allowfullscreen></iframe>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (err) {
        grid.innerHTML = '<p>Error loading games. Make sure games.json is lowercase!</p>';
    }
}
// ... inside your fetchGames function ...
const card = document.createElement('div');
card.className = 'game-card';
card.innerHTML = `
    <h3>${game.name}</h3>
    <div class="iframe-container">
        <iframe 
            src="${game.url}" 
            scrolling="no" 
            allowfullscreen 
            sandbox="allow-scripts allow-same-origin allow-forms"
            loading="lazy">
        </iframe>
    </div>
`;
