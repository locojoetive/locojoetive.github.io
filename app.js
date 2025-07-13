// Zeitgeist - Zeit-Schätzspiel
class ZeitgeistGame {
    constructor() {
        this.currentScreen = 'main-menu';
        this.gameState = {
            mode: null,
            players: 1,
            targetDuration: 10,
            playerStates: [],
            gameStarted: false,
            startTime: null
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.handleURLParameters();
        this.preventZoom();
    }
    
    setupEventListeners() {
        // Hauptmenü Buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                const players = parseInt(e.currentTarget.dataset.players);
                const duration = parseInt(e.currentTarget.dataset.duration);
                this.startGame(mode, players, duration);
            });
        });
        
        // Ergebnis-Buttons
        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.restartGame();
        });
        
        document.getElementById('menu-btn').addEventListener('click', () => {
            this.showMainMenu();
        });
        
        // Touch/Click Events für Spieler-Bereiche
        document.addEventListener('click', (e) => {
            if (e.target.closest('.player-area')) {
                this.handlePlayerAction(e.target.closest('.player-area'));
            }
        });
        
        // Touch Events für bessere Performance
        document.addEventListener('touchstart', (e) => {
            if (e.target.closest('.player-area')) {
                e.preventDefault();
                this.handlePlayerAction(e.target.closest('.player-area'));
            }
        }, { passive: false });
        
        // Keyboard Support für Barrierefreiheit
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.currentScreen === 'game-screen') {
                    this.showMainMenu();
                }
            }
        });
    }
    
    handleURLParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const players = urlParams.get('players');
        const duration = urlParams.get('duration');
        const mode = urlParams.get('mode');
        
        if (players && duration) {
            let gameMode = 'single';
            if (players === '2') gameMode = 'duel';
            else if (players === '3') gameMode = 'group';
            
            this.startGame(gameMode, parseInt(players), parseInt(duration));
        }
    }
    
    preventZoom() {
        // Verhindert Zoom bei Doppel-Tap auf mobile Geräten
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
    
    startGame(mode, players, duration) {
        this.gameState = {
            mode,
            players,
            targetDuration: duration,
            playerStates: [],
            gameStarted: false,
            startTime: null
        };
        
        // Spieler-States initialisieren
        for (let i = 0; i < players; i++) {
            this.gameState.playerStates.push({
                id: i,
                name: `Spieler ${i + 1}`,
                state: 'waiting',
                startTime: null,
                endTime: null,
                result: null
            });
        }
        
        this.setupGameLayout();
        this.showScreen('game-screen');
        this.updateGameInfo();
    }
    
    setupGameLayout() {
        const container = document.getElementById('game-container');
        container.innerHTML = '';
        
        const layoutClass = this.gameState.players === 1 ? 'single-player' : 
                           this.gameState.players === 2 ? 'duel-layout' : 'group-layout';
        
        container.className = layoutClass;
        
        // Spieler-Bereiche erstellen
        this.gameState.playerStates.forEach((player, index) => {
            const playerArea = document.createElement('div');
            playerArea.className = 'player-area waiting';
            playerArea.dataset.playerId = player.id;
            
            const label = document.createElement('div');
            label.className = 'player-label';
            label.textContent = player.name;
            
            const instruction = document.createElement('div');
            instruction.className = 'player-instruction';
            instruction.textContent = 'Tippe zum Starten';
            
            playerArea.appendChild(label);
            playerArea.appendChild(instruction);
            container.appendChild(playerArea);
        });
    }
    
    handlePlayerAction(playerArea) {
        const playerId = parseInt(playerArea.dataset.playerId);
        const player = this.gameState.playerStates[playerId];
        
        if (!this.gameState.gameStarted) {
            // Erster Spieler startet das Spiel für alle
            this.startGameTimer();
            player.state = 'ready';
            player.startTime = this.gameState.startTime;
            
            this.updatePlayerArea(playerArea, 'ready', 'Tippe zum Stoppen');
            this.addVisualFeedback(playerArea);
            
            // Alle anderen Spieler auf "bereit" setzen
            this.gameState.playerStates.forEach((otherPlayer, index) => {
                if (otherPlayer.id !== playerId) {
                    otherPlayer.state = 'ready';
                    otherPlayer.startTime = this.gameState.startTime;
                    const otherArea = document.querySelector(`[data-player-id="${otherPlayer.id}"]`);
                    if (otherArea) {
                        this.updatePlayerArea(otherArea, 'ready', 'Tippe zum Stoppen');
                    }
                }
            });
            
        } else if (player.state === 'ready') {
            // Spieler stoppt seine individuelle Zeit
            player.state = 'finished';
            player.endTime = performance.now();
            player.result = this.calculateResult(player);
            
            this.updatePlayerArea(playerArea, 'finished', `${player.result.difference.toFixed(2)}s`);
            this.addVisualFeedback(playerArea);
            
            // Prüfen ob alle Spieler fertig sind
            if (this.allPlayersFinished()) {
                this.showResults();
            }
        }
    }
    
    startGameTimer() {
        this.gameState.gameStarted = true;
        this.gameState.startTime = performance.now();
        this.updateGameInfo();
        
        // Verstecke Zeit-Anzeige nach kurzer Verzögerung
        setTimeout(() => {
            document.getElementById('game-status').textContent = 'Zeit versteckt - Schätze!';
        }, 1000);
    }
    
    calculateResult(player) {
        const actualTime = (player.endTime - player.startTime) / 1000;
        const difference = Math.abs(actualTime - this.gameState.targetDuration);
        
        let quality = 'poor';
        if (difference < 0.5) quality = 'perfect';
        else if (difference < 1.0) quality = 'good';
        else if (difference < 2.0) quality = 'okay';
        
        return {
            actualTime,
            difference,
            quality
        };
    }
    
    allPlayersFinished() {
        return this.gameState.playerStates.every(player => player.state === 'finished');
    }
    
    updatePlayerArea(playerArea, state, instruction) {
        playerArea.className = `player-area ${state}`;
        const instructionEl = playerArea.querySelector('.player-instruction');
        if (instructionEl) {
            instructionEl.textContent = instruction;
        }
    }
    
    addVisualFeedback(element) {
        element.classList.add('flash');
        setTimeout(() => {
            element.classList.remove('flash');
        }, 300);
    }
    
    updateGameInfo() {
        document.getElementById('target-display').textContent = this.gameState.targetDuration;
    }
    
    showResults() {
        const resultsContainer = document.getElementById('results-container');
        resultsContainer.innerHTML = '';
        
        // Spieler nach Ergebnis sortieren (beste zuerst)
        const sortedPlayers = [...this.gameState.playerStates].sort((a, b) => {
            return a.result.difference - b.result.difference;
        });
        
        sortedPlayers.forEach((player, index) => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            
            const playerName = document.createElement('div');
            playerName.className = 'result-player';
            playerName.textContent = `${index + 1}. ${player.name}`;
            
            const resultTime = document.createElement('div');
            resultTime.className = `result-time ${player.result.quality}`;
            resultTime.textContent = `${player.result.difference.toFixed(2)}s`;
            
            resultItem.appendChild(playerName);
            resultItem.appendChild(resultTime);
            resultsContainer.appendChild(resultItem);
        });
        
        this.showScreen('results-screen');
    }
    
    restartGame() {
        this.startGame(this.gameState.mode, this.gameState.players, this.gameState.targetDuration);
    }
    
    showMainMenu() {
        this.showScreen('main-menu');
        this.gameState = {
            mode: null,
            players: 1,
            targetDuration: 10,
            playerStates: [],
            gameStarted: false,
            startTime: null
        };
    }
    
    showScreen(screenName) {
        // Alle Screens ausblenden
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Gewünschten Screen anzeigen
        document.getElementById(screenName).classList.add('active');
        this.currentScreen = screenName;
        
        // URL aktualisieren (ohne Reload)
        if (screenName === 'main-menu') {
            window.history.pushState({}, '', window.location.pathname);
        } else if (screenName === 'game-screen') {
            const params = new URLSearchParams({
                mode: this.gameState.mode,
                players: this.gameState.players,
                duration: this.gameState.targetDuration
            });
            window.history.pushState({}, '', `?${params.toString()}`);
        }
    }
}

// App initialisieren wenn DOM geladen ist
document.addEventListener('DOMContentLoaded', () => {
    new ZeitgeistGame();
});

// Service Worker für PWA-Funktionalität
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
} 