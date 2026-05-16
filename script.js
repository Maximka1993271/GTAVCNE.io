document.addEventListener("DOMContentLoaded", function () {
    // ========== ЧАСЫ ==========
    function updateClock() {
        const now = new Date();
        let hours = now.getHours().toString().padStart(2, '0');
        let minutes = now.getMinutes().toString().padStart(2, '0');
        const clockElement = document.getElementById('clock');
        if (clockElement) {
            clockElement.textContent = `${hours}:${minutes}`;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();
    
    // ========== СТАТИСТИКА (ДЕНЬГИ, БРОНЯ, ЗДОРОВЬЕ) ==========
    let money = 999999999;
    let armor = 200;
    let health = 200;
    
    function updateStatsDisplay() {
        const moneyElement = document.getElementById('money');
        const armorElement = document.getElementById('armor');
        const healthElement = document.getElementById('health');
        
        if (moneyElement) moneyElement.textContent = `$${money.toLocaleString()}`;
        if (armorElement) armorElement.textContent = armor;
        if (healthElement) healthElement.textContent = health;
    }
    
    updateStatsDisplay();
    
    // ========== ЗВЁЗДЫ РОЗЫСКА ==========
    let wantedLevel = 0;
    let wantedInterval;
    
    function updateStars() {
        const starsContainer = document.getElementById('stars');
        if (!starsContainer) return;
        
        starsContainer.innerHTML = '';
        for (let i = 0; i < wantedLevel; i++) {
            const star = document.createElement('span');
            star.classList.add('star');
            star.textContent = '★';
            starsContainer.appendChild(star);
        }
    }
    
    function increaseWantedLevel() {
        if (wantedLevel < 6) {
            wantedLevel++;
            updateStars();
        } else {
            if (wantedInterval) {
                clearInterval(wantedInterval);
                wantedInterval = null;
            }
        }
    }
    
    function resetWantedLevel() {
        wantedLevel = 0;
        updateStars();
        if (wantedInterval) {
            clearInterval(wantedInterval);
            wantedInterval = null;
        }
        wantedInterval = setInterval(increaseWantedLevel, 3000);
    }
    
    // Запускаем увеличение звёзд
    wantedInterval = setInterval(increaseWantedLevel, 3000);
    
    // Клик на звёздах - сброс
    const starsElement = document.getElementById('stars');
    if (starsElement) {
        starsElement.addEventListener('click', resetWantedLevel);
    }
    
    console.log('%cGTA Vice City Nextgen Edition', 'color: #ec6fae; font-size: 16px; font-weight: bold;');
    console.log('%cСтраница полностью загружена!', 'color: #56b8f7; font-size: 12px;');
});