AOS.init({
    duration: 1000,
    once: true
});

// Smooth scroll implementation
document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Player count updater
async function updatePlayerCount(serverAddress) {
    try {
        const response = await fetch(`https://mcapi.us/server/status?ip=${serverAddress}`);
        const data = await response.json();
        return data.online ? `Players: ${data.players.now}/100` : 'Server Offline';
    } catch (error) {
        console.error('Error fetching player count:', error);
        return 'Unable to fetch players';
    }
}

async function updateAllPlayerCounts() {
    const playerCountElements = document.querySelectorAll('.player-count');
    
    for (const element of playerCountElements) {
        const serverAddress = element.getAttribute('data-server');
        const count = await updatePlayerCount(serverAddress);
        element.textContent = count;
    }
}

setInterval(updateAllPlayerCounts, 3000);
updateAllPlayerCounts();
