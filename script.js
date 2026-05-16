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
    
    // Функция для анимации денег (увеличение или уменьшение)
    function animateMoney() {
        const moneyElement = document.getElementById('money');
        if (!moneyElement) return;
        
        // Сохраняем текущее значение
        let currentMoney = money;
        
        // Случайно выбираем: увеличить или уменьшить (50/50)
        const isIncreasing = Math.random() < 0.5;
        
        // Случайная сумма изменения (от 1000 до 5000000)
        const changeAmount = Math.floor(Math.random() * 5000000) + 1000;
        
        let newMoney;
        if (isIncreasing) {
            newMoney = money + changeAmount;
            // Ограничиваем максимум 999,999,999
            if (newMoney > 999999999) newMoney = 999999999;
        } else {
            newMoney = money - changeAmount;
            // Не даём уйти в минус
            if (newMoney < 0) newMoney = 0;
        }
        
        money = newMoney;
        
        // Добавляем CSS-класс для анимации
        moneyElement.classList.add('money-flash');
        
        // Убираем класс через 0.3 секунды
        setTimeout(() => {
            moneyElement.classList.remove('money-flash');
        }, 300);
        
        updateStatsDisplay();
        
        // Логируем изменение в консоль (для отладки)
        console.log(`${isIncreasing ? '➕ Получено' : '➖ Потрачено'}: $${changeAmount.toLocaleString()} | Баланс: $${money.toLocaleString()}`);
    }
    
    // Функция для анимации брони
    function animateArmor() {
        const armorElement = document.getElementById('armor');
        if (!armorElement) return;
        
        const isIncreasing = Math.random() < 0.5;
        const changeAmount = Math.floor(Math.random() * 50) + 5;
        
        let newArmor;
        if (isIncreasing) {
            newArmor = armor + changeAmount;
            if (newArmor > 200) newArmor = 200;
        } else {
            newArmor = armor - changeAmount;
            if (newArmor < 0) newArmor = 0;
        }
        
        armor = newArmor;
        armorElement.classList.add('stat-flash');
        
        setTimeout(() => {
            armorElement.classList.remove('stat-flash');
        }, 300);
        
        updateStatsDisplay();
    }
    
    // Функция для анимации здоровья
    function animateHealth() {
        const healthElement = document.getElementById('health');
        if (!healthElement) return;
        
        const isIncreasing = Math.random() < 0.5;
        const changeAmount = Math.floor(Math.random() * 30) + 5;
        
        let newHealth;
        if (isIncreasing) {
            newHealth = health + changeAmount;
            if (newHealth > 200) newHealth = 200;
        } else {
            newHealth = health - changeAmount;
            if (newHealth < 0) newHealth = 0;
        }
        
        health = newHealth;
        healthElement.classList.add('stat-flash');
        
        setTimeout(() => {
            healthElement.classList.remove('stat-flash');
        }, 300);
        
        updateStatsDisplay();
    }
    
    // Запускаем анимации с разными интервалами
    
    // ДЕНЬГИ: меняются каждые 2-5 секунд (случайно)
    function scheduleMoneyAnimation() {
        const delay = Math.random() * 3000 + 2000; // от 2 до 5 секунд
        setTimeout(() => {
            animateMoney();
            scheduleMoneyAnimation();
        }, delay);
    }
    scheduleMoneyAnimation();
    
    // БРОНЯ: меняется каждые 4-8 секунд
    function scheduleArmorAnimation() {
        const delay = Math.random() * 4000 + 4000;
        setTimeout(() => {
            animateArmor();
            scheduleArmorAnimation();
        }, delay);
    }
    scheduleArmorAnimation();
    
    // ЗДОРОВЬЕ: меняется каждые 3-7 секунд
    function scheduleHealthAnimation() {
        const delay = Math.random() * 4000 + 3000;
        setTimeout(() => {
            animateHealth();
            scheduleHealthAnimation();
        }, delay);
    }
    scheduleHealthAnimation();
    
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
    
    wantedInterval = setInterval(increaseWantedLevel, 3000);
    
    const starsElement = document.getElementById('stars');
    if (starsElement) {
        starsElement.addEventListener('click', resetWantedLevel);
    }
    
    console.log('%cGTA Vice City Nextgen Edition', 'color: #ec6fae; font-size: 16px; font-weight: bold;');
    console.log('%cДеньги, броня и здоровье теперь анимированы!', 'color: #56b8f7; font-size: 12px;');
    console.log('%cСовет: Нажмите на звёзды розыска, чтобы сбросить уровень', 'color: #01ce87; font-size: 12px;');
});