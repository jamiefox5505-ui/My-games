console.log("Script is running!");

// 1. Tab Switching
function showTab(tabName) {
    console.log("Switching to: " + tabName);
    const home = document.getElementById('home');
    const games = document.getElementById('games');
    
    if (tabName === 'home') {
        home.style.display = 'block';
        games.style.display = 'none';
    } else {
        home.style.display = 'none';
        games.style.display = 'block';
        fetchGames(); // Load games when clicking the tab
    }
}

// 2. Search Logic
function runSearch() {
    const query = document.getElementById('userQuery').value;
    const viewBox = document.getElementById('view-box');
    const url = "https://duckduckgo.com/lite/?q=" + encodeURIComponent(query);
    viewBox.innerHTML = '<iframe src="' + url + '" style="width:100%; height:600px; border:none; background:white;"></iframe>';
}

// 3. Simple Game Loader
async function fetchGames() {
    const grid = document.getElementById('game-grid');
    try {
        const res = await fetch('./games.json');
        const data = await res.json();
        grid.innerHTML = ''; 
        
        data.forEach(g => {
            const div = document.createElement('div');
            div.className = 'game-card';
            div.innerHTML = '<h3>' + g.name + '</h3><iframe src="' + g.url + '" style="width:100%; height:300px; border:none;"></iframe>';
            grid.appendChild(div);
        });
    } catch (e) {
        grid.innerHTML = '<p>Error loading games. Check games.json name!</p>';
    }
}

// Start on Home
showTab('home');
