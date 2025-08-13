// Game state
let gameState = {
    currentCategory: null,
    words: [],
    currentWordIndex: 0,
    score: 0,
    timeLeft: 60,
    gameTimer: null,
    isPlaying: false,
    isPaused: false,
    correctWords: [],
    wordNumber: 1
};

// Word categories
const categories = {
    animals: [
        'Dog', 'Cat', 'Elephant', 'Lion', 'Tiger', 'Bear', 'Wolf', 'Fox', 'Rabbit', 'Deer',
        'Horse', 'Cow', 'Pig', 'Sheep', 'Goat', 'Duck', 'Chicken', 'Eagle', 'Owl', 'Penguin',
        'Dolphin', 'Whale', 'Shark', 'Octopus', 'Turtle', 'Frog', 'Snake', 'Lizard', 'Spider', 'Butterfly'
    ],
    movies: [
        'Titanic', 'Avatar', 'Frozen', 'Shrek', 'Jaws', 'Rocky', 'Aliens', 'Gladiator', 'Inception', 'Interstellar',
        'The Matrix', 'Star Wars', 'Harry Potter', 'Lord of the Rings', 'Jurassic Park', 'Indiana Jones', 'Back to the Future',
        'The Godfather', 'Casablanca', 'Forrest Gump', 'The Lion King', 'Finding Nemo', 'Toy Story', 'Pirates of the Caribbean',
        'Iron Man', 'Spider-Man', 'Batman', 'Superman', 'Wonder Woman', 'Black Panther'
    ],
    food: [
        'Pizza', 'Burger', 'Sushi', 'Pasta', 'Tacos', 'Ice Cream', 'Chocolate', 'Apple', 'Banana', 'Orange',
        'Sandwich', 'Salad', 'Soup', 'Steak', 'Chicken', 'Fish', 'Bread', 'Rice', 'Noodles', 'Cheese',
        'Pancakes', 'Waffles', 'Cookies', 'Cake', 'Pie', 'Donut', 'Coffee', 'Tea', 'Smoothie', 'Popcorn'
    ],
    countries: [
        'United States', 'Canada', 'Mexico', 'Brazil', 'Argentina', 'United Kingdom', 'France', 'Germany', 'Italy', 'Spain',
        'Russia', 'China', 'Japan', 'India', 'Australia', 'Egypt', 'South Africa', 'Nigeria', 'Kenya', 'Morocco',
        'Sweden', 'Norway', 'Denmark', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Poland', 'Greece', 'Turkey'
    ],
    celebrities: [
        'Leonardo DiCaprio', 'Will Smith', 'Tom Cruise', 'Brad Pitt', 'Johnny Depp', 'Robert Downey Jr', 'Chris Evans', 'Ryan Reynolds',
        'Jennifer Lawrence', 'Scarlett Johansson', 'Emma Stone', 'Anne Hathaway', 'Meryl Streep', 'Angelina Jolie', 'Sandra Bullock',
        'Dwayne Johnson', 'Kevin Hart', 'Jim Carrey', 'Adam Sandler', 'Ben Stiller', 'Steve Carell', 'Tina Fey', 'Amy Poehler',
        'Taylor Swift', 'Beyonce', 'Adele', 'Ed Sheeran', 'Justin Bieber', 'Ariana Grande'
    ]
};

// DOM elements
const screens = {
    start: document.getElementById('start-screen'),
    game: document.getElementById('game-screen'),
    pause: document.getElementById('pause-screen'),
    results: document.getElementById('results-screen')
};

const elements = {
    categoryBtns: document.querySelectorAll('.category-btn'),
    startBtn: document.getElementById('start-game'),
    currentWord: document.getElementById('current-word'),
    wordNumber: document.getElementById('word-number'),
    score: document.getElementById('score'),
    timer: document.getElementById('timer'),
    correctBtn: document.getElementById('correct-btn'),
    skipBtn: document.getElementById('skip-btn'),
    pauseBtn: document.getElementById('pause-btn'),
    resumeBtn: document.getElementById('resume-btn'),
    endGameBtn: document.getElementById('end-game-btn'),
    playAgainBtn: document.getElementById('play-again-btn'),
    shareBtn: document.getElementById('share-btn'),
    finalScore: document.getElementById('final-score'),
    correctWordsList: document.getElementById('correct-words'),
    installPrompt: document.getElementById('install-prompt'),
    installBtn: document.getElementById('install-btn'),
    dismissInstall: document.getElementById('dismiss-install')
};

// PWA install prompt
let deferredPrompt;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    registerServiceWorker();
    setupPWAInstall();
});

function initializeApp() {
    showScreen('start');
    updateDisplay();
}

function setupEventListeners() {
    // Category selection
    elements.categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => selectCategory(btn.dataset.category));
    });

    // Game controls
    elements.startBtn.addEventListener('click', startGame);
    elements.correctBtn.addEventListener('click', () => handleAnswer(true));
    elements.skipBtn.addEventListener('click', () => handleAnswer(false));
    elements.pauseBtn.addEventListener('click', pauseGame);
    elements.resumeBtn.addEventListener('click', resumeGame);
    elements.endGameBtn.addEventListener('click', endGame);
    elements.playAgainBtn.addEventListener('click', resetGame);
    elements.shareBtn.addEventListener('click', shareScore);

    // PWA install
    elements.installBtn.addEventListener('click', installPWA);
    elements.dismissInstall.addEventListener('click', dismissInstallPrompt);

    // Touch gestures for mobile
    setupTouchGestures();

    // Keyboard controls
    document.addEventListener('keydown', handleKeyPress);
}

function selectCategory(category) {
    gameState.currentCategory = category;
    
    // Update button states
    elements.categoryBtns.forEach(btn => {
        btn.classList.toggle('selected', btn.dataset.category === category);
    });
    
    // Enable start button
    elements.startBtn.disabled = false;
}

function startGame() {
    if (!gameState.currentCategory) return;
    
    // Reset game state
    gameState.words = shuffleArray([...categories[gameState.currentCategory]]);
    gameState.currentWordIndex = 0;
    gameState.score = 0;
    gameState.timeLeft = 60;
    gameState.isPlaying = true;
    gameState.isPaused = false;
    gameState.correctWords = [];
    gameState.wordNumber = 1;
    
    showScreen('game');
    updateDisplay();
    nextWord();
    startTimer();
}

function handleAnswer(isCorrect) {
    if (!gameState.isPlaying || gameState.isPaused) return;
    
    if (isCorrect) {
        gameState.score++;
        gameState.correctWords.push(gameState.words[gameState.currentWordIndex]);
        
        // Visual feedback
        elements.correctBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            elements.correctBtn.style.transform = '';
        }, 200);
    } else {
        // Visual feedback for skip
        elements.skipBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            elements.skipBtn.style.transform = '';
        }, 200);
    }
    
    gameState.currentWordIndex++;
    gameState.wordNumber++;
    updateDisplay();
    nextWord();
}

function nextWord() {
    if (gameState.currentWordIndex >= gameState.words.length) {
        // Shuffle and restart words if we run out
        gameState.words = shuffleArray([...categories[gameState.currentCategory]]);
        gameState.currentWordIndex = 0;
    }
    
    elements.currentWord.textContent = gameState.words[gameState.currentWordIndex];
    elements.wordNumber.textContent = gameState.wordNumber;
}

function pauseGame() {
    if (!gameState.isPlaying) return;
    
    gameState.isPaused = true;
    clearInterval(gameState.gameTimer);
    showScreen('pause');
}

function resumeGame() {
    gameState.isPaused = false;
    showScreen('game');
    startTimer();
}

function endGame() {
    gameState.isPlaying = false;
    clearInterval(gameState.gameTimer);
    showResults();
}

function startTimer() {
    gameState.gameTimer = setInterval(() => {
        gameState.timeLeft--;
        updateDisplay();
        
        if (gameState.timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function showResults() {
    elements.finalScore.textContent = gameState.score;
    
    // Clear and populate correct words list
    elements.correctWordsList.innerHTML = '';
    gameState.correctWords.forEach(word => {
        const li = document.createElement('li');
        li.textContent = word;
        elements.correctWordsList.appendChild(li);
    });
    
    showScreen('results');
}

function resetGame() {
    gameState.isPlaying = false;
    gameState.isPaused = false;
    clearInterval(gameState.gameTimer);
    showScreen('start');
}

function shareScore() {
    const shareText = `I scored ${gameState.score} points in Guess the Word: Heads Up! Can you beat my score?`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Guess the Word: Heads Up!',
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Score copied to clipboard!');
        });
    }
}

function updateDisplay() {
    elements.score.textContent = gameState.score;
    elements.timer.textContent = gameState.timeLeft;
}

function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    screens[screenName].classList.add('active');
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function setupTouchGestures() {
    let startY = 0;
    let startTime = 0;
    
    document.addEventListener('touchstart', (e) => {
        if (!gameState.isPlaying || gameState.isPaused) return;
        startY = e.touches[0].clientY;
        startTime = Date.now();
    });
    
    document.addEventListener('touchend', (e) => {
        if (!gameState.isPlaying || gameState.isPaused) return;
        
        const endY = e.changedTouches[0].clientY;
        const endTime = Date.now();
        const deltaY = startY - endY;
        const deltaTime = endTime - startTime;
        
        // Check for swipe gesture (minimum distance and speed)
        if (Math.abs(deltaY) > 50 && deltaTime < 300) {
            if (deltaY > 0) {
                // Swipe up - skip
                handleAnswer(false);
            } else {
                // Swipe down - correct
                handleAnswer(true);
            }
        }
    });
}

function handleKeyPress(e) {
    if (!gameState.isPlaying || gameState.isPaused) return;
    
    switch (e.key) {
        case 'ArrowUp':
            e.preventDefault();
            handleAnswer(false); // Skip
            break;
        case 'ArrowDown':
            e.preventDefault();
            handleAnswer(true); // Correct
            break;
        case ' ':
            e.preventDefault();
            pauseGame();
            break;
    }
}

// Service Worker Registration
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./service-worker.js')
                .then((registration) => {
                    console.log('SW registered: ', registration);
                })
                .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// PWA Install Setup
function setupPWAInstall() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallPrompt();
    });

    window.addEventListener('appinstalled', () => {
        console.log('PWA was installed');
        hideInstallPrompt();
    });
}

function showInstallPrompt() {
    elements.installPrompt.classList.remove('hidden');
}

function hideInstallPrompt() {
    elements.installPrompt.classList.add('hidden');
}

function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((result) => {
            if (result.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            deferredPrompt = null;
            hideInstallPrompt();
        });
    }
}

function dismissInstallPrompt() {
    hideInstallPrompt();
    // Remember user dismissed (could use localStorage)
    localStorage.setItem('installPromptDismissed', 'true');
}

// Check if install prompt was previously dismissed
if (localStorage.getItem('installPromptDismissed')) {
    hideInstallPrompt();
}