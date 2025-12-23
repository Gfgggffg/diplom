// main.js - ОБНОВЛЕННЫЙ
import Game from './game.js';
import CodeEditor from './code-editor.js';
import { levels } from './levels.js'; // Импортируем levels вместо loadLevel

class CanvasQuest {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.game = new Game(this.canvas, this.ctx);
        this.codeEditor = new CodeEditor();
        this.currentLevel = 1;
        this.isRunning = false;
        
        this.init();
    }
    
    init() {
        // Загрузка первого уровня
        this.loadLevel(this.currentLevel);
        
        // Инициализация обработчиков событий
        this.initEventListeners();
        
        // Запуск игрового цикла
        this.gameLoop();
    }
    
    loadLevel(levelNumber) {
        // Используем локальную функцию для загрузки уровня
        const level = this.getLevel(levelNumber);
        if (level) {
            this.game.loadLevel(level);
            this.updateLevelInfo(level);
            this.codeEditor.clearProgram();
        }
    }
    
    // Локальная функция для получения уровня
    getLevel(levelNumber) {
        return levels.find(level => level.id === levelNumber) || levels[0];
    }
    
    updateLevelInfo(level) {
        document.getElementById('taskDescription').textContent = level.task;
        document.getElementById('level').textContent = level.id;
        document.getElementById('levelName').textContent = `Уровень ${level.id}: ${level.name}`;
        
        const conceptsList = document.querySelector('.concepts ul');
        conceptsList.innerHTML = '';
        level.concepts.forEach(concept => {
            const li = document.createElement('li');
            li.textContent = concept;
            conceptsList.appendChild(li);
        });
    }
    
    initEventListeners() {
        // Кнопка выполнения программы
        document.getElementById('run-btn').addEventListener('click', () => {
            if (this.isRunning) return;
            
            this.isRunning = true;
            const program = this.codeEditor.getProgram();
            this.game.executeProgram(program, (success) => {
                this.isRunning = false;
                if (success) {
                    this.showLevelComplete();
                }
            });
        });
        
        // Кнопка сброса
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.game.reset();
            this.codeEditor.clearProgram();
            this.isRunning = false;
        });
        
        // Кнопка подсказки
        document.getElementById('hint-btn').addEventListener('click', () => {
            this.showHint();
        });
        
        // Кнопка следующего уровня
        document.getElementById('nextLevelBtn').addEventListener('click', () => {
            this.currentLevel++;
            this.loadLevel(this.currentLevel);
            this.hideLevelComplete();
        });
        
        // Кнопка предыдущего уровня
        document.getElementById('prevLevelBtn').addEventListener('click', () => {
            if (this.currentLevel > 1) {
                this.currentLevel--;
                this.loadLevel(this.currentLevel);
            }
        });
    }
    
    showLevelComplete() {
        const modal = document.getElementById('levelCompleteModal');
        modal.style.display = 'flex';
        
        // Обновление статистики
        document.getElementById('finalSteps').textContent = this.game.steps;
        document.getElementById('finalScore').textContent = this.game.score;
        // document.getElementById('finalTime').textContent = this.game.time.toFixed(1);
    }
    
    hideLevelComplete() {
        const modal = document.getElementById('levelCompleteModal');
        modal.style.display = 'none';
    }
    
    showHint() {
        // Показ подсказки для текущего уровня
        const currentLevel = this.getLevel(this.currentLevel);
        if (currentLevel && currentLevel.hint) {
            alert(currentLevel.hint);
        }
    }
    
    gameLoop() {
        // Очистка холста
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Отрисовка игры
        this.game.draw();
        
        // Обновление статистики
        document.getElementById('steps').textContent = this.game.steps || 0;
        document.getElementById('score').textContent = this.game.score || 0;
        
        // Следующий кадр
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Запуск игры при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Сначала скрываем экран загрузки
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
    
    // Затем запускаем игру
    new CanvasQuest();
});