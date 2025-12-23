// game.js (обновленный)
import Player from './player.js';
import AssetsLoader from './assets-loader.js';

class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.assets = new AssetsLoader();
        this.player = null;
        this.level = null;
        this.gridSize = 50; // Увеличили для спрайтов
        this.steps = 0;
        this.score = 0;
        this.time = 0;
        this.isExecuting = false;
        this.commandQueue = [];
        this.currentCommandIndex = 0;
        this.animationTime = 0;
        
        // Элементы уровня
        this.grid = [];
        this.crystals = [];
        this.obstacles = [];
        this.water = [];
        this.finish = null;
        
        // Анимация
        this.animations = [];
        this.particles = [];
    }
    
    async loadLevel(levelData) {
        // Загружаем ресурсы, если еще не загружены
        if (!this.assets.loaded) {
            await this.assets.loadAll();
        }
        
        this.level = levelData;
        this.grid = levelData.grid;
        this.crystals = [...levelData.crystals];
        this.obstacles = [...(levelData.obstacles || [])];
        this.water = [...(levelData.water || [])];
        this.finish = levelData.finish;
        
        // Создание игрока
        this.player = new Player(
            levelData.playerStart.x,
            levelData.playerStart.y,
            levelData.playerStart.direction,
            this.assets
        );
        
        // Сброс статистики
        this.steps = 0;
        this.score = 0;
        this.time = 0;
        this.animations = [];
        this.particles = [];
        
        // Установка темы
        this.setTheme(levelData.theme);
    }
    
    setTheme(theme) {
        // Устанавливаем цветовую схему в зависимости от темы
        switch(theme) {
            case 'grass':
                this.backgroundColor = '#8BC34A';
                this.gridColor1 = '#7CB342';
                this.gridColor2 = '#689F38';
                break;
            case 'sand':
                this.backgroundColor = '#FFD54F';
                this.gridColor1 = '#FFCA28';
                this.gridColor2 = '#FFB300';
                break;
            case 'water':
                this.backgroundColor = '#4FC3F7';
                this.gridColor1 = '#29B6F6';
                this.gridColor2 = '#0288D1';
                break;
            case 'dungeon':
                this.backgroundColor = '#78909C';
                this.gridColor1 = '#607D8B';
                this.gridColor2 = '#455A64';
                break;
            case 'final':
                this.backgroundColor = '#9C27B0';
                this.gridColor1 = '#8E24AA';
                this.gridColor2 = '#6A1B9A';
                break;
            default:
                this.backgroundColor = '#8BC34A';
                this.gridColor1 = '#7CB342';
                this.gridColor2 = '#689F38';
        }
    }
    
    draw() {
        // Очистка холста
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Фон
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Отрисовка сетки с текстурой
        this.drawGrid();
        
        // Отрисовка воды
        this.water.forEach(waterCell => this.drawWater(waterCell));
        
        // Отрисовка препятствий
        this.obstacles.forEach(obs => this.drawObstacle(obs));
        
        // Отрисовка кристаллов
        this.crystals.forEach(crystal => this.drawCrystal(crystal));
        
        // Отрисовка финиша
        if (this.finish) {
            this.drawFinish(this.finish);
        }
        
        // Отрисовка частиц
        this.drawParticles();
        
        // Отрисовка анимаций
        this.drawAnimations();
        
        // Отрисовка игрока
        if (this.player) {
            this.player.draw(this.ctx, this.gridSize, this.animationTime);
        }
        
        // Обновление времени для анимаций
        this.animationTime += 0.1;
    }
    
    drawGrid() {
        const cols = this.grid[0].length;
        const rows = this.grid.length;
        
        // Текстура земли
        const tileImg = this.assets.getImage(`tile_${this.level.theme}`);
        
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cellX = x * this.gridSize;
                const cellY = y * this.gridSize;
                
                // Рисуем текстуру или цвет
                if (tileImg) {
                    this.ctx.drawImage(tileImg, cellX, cellY, this.gridSize, this.gridSize);
                } else {
                    this.ctx.fillStyle = (x + y) % 2 === 0 ? this.gridColor1 : this.gridColor2;
                    this.ctx.fillRect(cellX, cellY, this.gridSize, this.gridSize);
                }
                
                // Границы клеток
                this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(cellX, cellY, this.gridSize, this.gridSize);
            }
        }
    }
    
    drawWater(waterCell) {
        const x = waterCell.x * this.gridSize;
        const y = waterCell.y * this.gridSize;
        
        // Анимация воды
        const waveOffset = Math.sin(this.animationTime + waterCell.x + waterCell.y) * 2;
        
        this.ctx.fillStyle = 'rgba(33, 150, 243, 0.7)';
        this.ctx.fillRect(x, y + waveOffset, this.gridSize, this.gridSize - waveOffset);
        
        // Волны
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(
            x + this.gridSize/2, 
            y + this.gridSize/2 + waveOffset, 
            this.gridSize/3, 
            0, 
            Math.PI * 2
        );
        this.ctx.stroke();
    }
    
    drawObstacle(obstacle) {
        const x = obstacle.x * this.gridSize;
        const y = obstacle.y * this.gridSize;
        
        const obstacleImg = this.assets.getImage('obstacle');
        if (obstacleImg) {
            this.ctx.drawImage(obstacleImg, x, y, this.gridSize, this.gridSize);
        } else {
            // Запасной вариант
            this.ctx.fillStyle = '#5D4037';
            this.ctx.fillRect(x, y, this.gridSize, this.gridSize);
            
            // Текстура камня
            this.ctx.fillStyle = '#3E2723';
            for (let i = 0; i < 5; i++) {
                const stoneX = x + Math.random() * this.gridSize;
                const stoneY = y + Math.random() * this.gridSize;
                const stoneSize = Math.random() * 5 + 2;
                this.ctx.beginPath();
                this.ctx.arc(stoneX, stoneY, stoneSize, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
    }
    
    drawCrystal(crystal) {
        const x = crystal.x * this.gridSize + this.gridSize / 2;
        const y = crystal.y * this.gridSize + this.gridSize / 2;
        
        // Анимация парящего кристалла
        const floatOffset = Math.sin(this.animationTime * 2 + crystal.x + crystal.y) * 3;
        const rotation = this.animationTime;
        
        this.ctx.save();
        this.ctx.translate(x, y + floatOffset);
        this.ctx.rotate(rotation);
        
        // Выбор спрайта кристалла
        let crystalImg;
        switch(crystal.type) {
            case 'blue':
                crystalImg = this.assets.getImage('crystal_blue') || this.assets.getImage('crystal');
                break;
            case 'red':
                crystalImg = this.assets.getImage('crystal_red') || this.assets.getImage('crystal');
                break;
            case 'gold':
                // Специальный золотой кристалл
                this.ctx.fillStyle = '#FFD700';
                this.ctx.shadowColor = '#FFA000';
                this.ctx.shadowBlur = 15;
                break;
            default:
                crystalImg = this.assets.getImage('crystal');
        }
        
        if (crystalImg) {
            this.ctx.drawImage(
                crystalImg, 
                -this.gridSize/3, 
                -this.gridSize/3, 
                this.gridSize * 2/3, 
                this.gridSize * 2/3
            );
        } else {
            // Запасной вариант отрисовки
            const radius = this.gridSize / 3;
            const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
            
            if (crystal.type === 'gold') {
                gradient.addColorStop(0, '#FFF59D');
                gradient.addColorStop(1, '#FFB300');
            } else if (crystal.type === 'red') {
                gradient.addColorStop(0, '#FF8A80');
                gradient.addColorStop(1, '#D32F2F');
            } else {
                gradient.addColorStop(0, '#80D8FF');
                gradient.addColorStop(1, '#0277BD');
            }
            
            this.ctx.fillStyle = gradient;
            
            // Рисование кристалла (шестиугольник)
            this.ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (i * 2 * Math.PI) / 6;
                const px = radius * Math.cos(angle);
                const py = radius * Math.sin(angle);
                
                if (i === 0) {
                    this.ctx.moveTo(px, py);
                } else {
                    this.ctx.lineTo(px, py);
                }
            }
            this.ctx.closePath();
            this.ctx.fill();
            
            // Блики
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            this.ctx.beginPath();
            this.ctx.arc(-radius/3, -radius/3, radius/4, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        this.ctx.restore();
        this.ctx.shadowBlur = 0;
    }
    
    drawFinish(finish) {
        const x = finish.x * this.gridSize;
        const y = finish.y * this.gridSize;
        
        const finishImg = this.assets.getImage('finish');
        if (finishImg) {
            // Анимация мигания финиша
            const alpha = 0.7 + Math.sin(this.animationTime * 3) * 0.3;
            this.ctx.globalAlpha = alpha;
            this.ctx.drawImage(finishImg, x, y, this.gridSize, this.gridSize);
            this.ctx.globalAlpha = 1.0;
        } else {
            // Запасной вариант
            this.ctx.fillStyle = '#4CAF50';
            this.ctx.fillRect(x, y, this.gridSize, this.gridSize);
            
            // Буква F с анимацией
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 24px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText('F', x + this.gridSize/2, y + this.gridSize/2);
            
            // Свечение
            this.ctx.shadowColor = '#4CAF50';
            this.ctx.shadowBlur = 10;
            this.ctx.strokeStyle = 'white';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x + 2, y + 2, this.gridSize - 4, this.gridSize - 4);
            this.ctx.shadowBlur = 0;
        }
    }
    
    addParticles(x, y, color, count = 5) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 1.0,
                color: color,
                size: Math.random() * 3 + 2
            });
        }
    }
    
    drawParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;
            
            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }
            
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.globalAlpha = 1.0;
    }
    
    drawAnimations() {
        for (let i = this.animations.length - 1; i >= 0; i--) {
            const anim = this.animations[i];
            
            anim.progress += 0.05;
            if (anim.progress >= 1) {
                this.animations.splice(i, 1);
                continue;
            }
            
            switch(anim.type) {
                case 'move':
                    this.drawMoveAnimation(anim);
                    break;
                case 'collect':
                    this.drawCollectAnimation(anim);
                    break;
            }
        }
    }
    
    drawMoveAnimation(anim) {
        // Анимация перемещения
        const fromX = anim.from.x * this.gridSize + this.gridSize/2;
        const fromY = anim.from.y * this.gridSize + this.gridSize/2;
        const toX = anim.to.x * this.gridSize + this.gridSize/2;
        const toY = anim.to.y * this.gridSize + this.gridSize/2;
        
        const currentX = fromX + (toX - fromX) * anim.progress;
        const currentY = fromY + (toY - fromY) * anim.progress;
        
        // Временное отображение игрока в позиции анимации
        this.ctx.save();
        this.ctx.translate(currentX, currentY);
        this.ctx.rotate(this.player.direction * Math.PI / 180);
        
        const playerImg = this.assets.getImage('player');
        if (playerImg) {
            this.ctx.drawImage(
                playerImg,
                -this.gridSize/2,
                -this.gridSize/2,
                this.gridSize,
                this.gridSize
            );
        }
        
        this.ctx.restore();
    }
    
    drawCollectAnimation(anim) {
        // Анимация сбора кристалла
        const x = anim.x * this.gridSize + this.gridSize/2;
        const y = anim.y * this.gridSize + this.gridSize/2;
        const size = this.gridSize/3 * (1 - anim.progress);
        
        this.ctx.fillStyle = anim.color;
        this.ctx.globalAlpha = 1 - anim.progress;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.globalAlpha = 1.0;
    }
    
    // ... остальные методы остаются такими же, но с добавлением анимаций и звуков
    
    executeCommand(command, onComplete) {
        this.steps++;
        
        switch(command.type) {
            case 'moveForward':
                this.movePlayerForward(onComplete);
                break;
            case 'turnRight':
                this.player.turnRight();
                this.assets.getSound('turn').play();
                onComplete();
                break;
            case 'turnLeft':
                this.player.turnLeft();
                this.assets.getSound('turn').play();
                onComplete();
                break;
            case 'collect':
                this.collectCrystal(onComplete);
                break;
            case 'repeat':
                this.handleRepeat(command, onComplete);
                break;
            default:
                onComplete();
        }
    }
    
    movePlayerForward(onComplete) {
        const newX = this.player.x + Math.cos(this.player.direction * Math.PI / 180);
        const newY = this.player.y + Math.sin(this.player.direction * Math.PI / 180);
        
        // Проверка на выход за границы
        if (newX < 0 || newX >= this.grid[0].length || 
            newY < 0 || newY >= this.grid.length) {
            this.assets.getSound('error').play();
            onComplete();
            return;
        }
        
        // Проверка на препятствие
        const hasObstacle = this.obstacles.some(obs => 
            Math.round(obs.x) === Math.round(newX) && 
            Math.round(obs.y) === Math.round(newY)
        );
        
        if (hasObstacle) {
            this.assets.getSound('error').play();
            onComplete();
            return;
        }
        
        // Проверка на воду
        const hasWater = this.water.some(waterCell => 
            Math.round(waterCell.x) === Math.round(newX) && 
            Math.round(waterCell.y) === Math.round(newY)
        );
        
        if (hasWater) {
            this.assets.getSound('error').play();
            onComplete();
            return;
        }
        
        // Анимация движения
        this.animations.push({
            type: 'move',
            from: { x: this.player.x, y: this.player.y },
            to: { x: newX, y: newY },
            progress: 0
        });
        
        // Движение игрока
        this.player.x = newX;
        this.player.y = newY;
        
        this.assets.getSound('move').play();
        
        // Частицы при движении
        this.addParticles(
            newX * this.gridSize + this.gridSize/2,
            newY * this.gridSize + this.gridSize/2,
            '#4CAF50',
            3
        );
        
        onComplete();
    }
    
    collectCrystal(onComplete) {
        const playerGridX = Math.round(this.player.x);
        const playerGridY = Math.round(this.player.y);
        
        const crystalIndex = this.crystals.findIndex(crystal => 
            Math.round(crystal.x) === playerGridX && 
            Math.round(crystal.y) === playerGridY
        );
        
        if (crystalIndex !== -1) {
            const crystal = this.crystals[crystalIndex];
            
            // Анимация сбора
            let color;
            switch(crystal.type) {
                case 'blue': color = '#2196F3'; break;
                case 'red': color = '#F44336'; break;
                case 'gold': color = '#FFD700'; break;
                default: color = '#4CAF50';
            }
            
            this.animations.push({
                type: 'collect',
                x: crystal.x,
                y: crystal.y,
                color: color,
                progress: 0
            });
            
            // Частицы
            this.addParticles(
                crystal.x * this.gridSize + this.gridSize/2,
                crystal.y * this.gridSize + this.gridSize/2,
                color,
                10
            );
            
            // Сбор кристалла
            this.crystals.splice(crystalIndex, 1);
            this.score += crystal.type === 'gold' ? 50 : crystal.type === 'red' ? 20 : 10;
            
            this.assets.getSound('collect').play();
        } else {
            this.assets.getSound('error').play();
        }
        
        onComplete();
    }
    
   executeProgram(program, callback) {
    if (this.isExecuting) return;
    
    this.isExecuting = true;
    this.commandQueue = [...program];
    this.currentCommandIndex = 0;
    
    this.executeNextCommand(callback);
}

executeNextCommand(callback) {
    if (this.currentCommandIndex >= this.commandQueue.length) {
        this.isExecuting = false;
        this.checkLevelCompletion(callback);
        return;
    }
    
    const command = this.commandQueue[this.currentCommandIndex];
    this.executeCommand(command, () => {
        this.currentCommandIndex++;
        setTimeout(() => this.executeNextCommand(callback), 300);
    });
}

handleRepeat(command, onComplete) {
    const repeatCount = command.count || 2;
    const repeatedCommands = command.commands || [];
    
    let currentRepeat = 0;
    
    const executeRepeat = () => {
        if (currentRepeat >= repeatCount) {
            onComplete();
            return;
        }
        
        const commandsCopy = [...repeatedCommands];
        let commandIndex = 0;
        
        const executeNextInRepeat = () => {
            if (commandIndex >= commandsCopy.length) {
                currentRepeat++;
                setTimeout(executeRepeat, 100);
                return;
            }
            
            const cmd = commandsCopy[commandIndex];
            this.executeCommand(cmd, () => {
                commandIndex++;
                setTimeout(executeNextInRepeat, 300);
            });
        };
        
        executeNextInRepeat();
    };
    
    executeRepeat();
}

checkLevelCompletion(callback) {
    const playerGridX = Math.round(this.player.x);
    const playerGridY = Math.round(this.player.y);
    
    const reachedFinish = this.finish && 
        Math.round(this.finish.x) === playerGridX && 
        Math.round(this.finish.y) === playerGridY;
    
    const collectedAllCrystals = this.crystals.length === 0;
    
    const success = reachedFinish && collectedAllCrystals;
    
    if (success) {
        const maxSteps = this.level.maxSteps || 20;
        if (this.steps <= maxSteps) {
            this.score += 50;
        }
    }
    
    callback(success);
}

reset() {
    this.loadLevel(this.level);
}

getCurrentLevel() {
    return this.level;
}
}

export default Game;