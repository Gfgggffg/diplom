// player.js (обновленный)
class Player {
    constructor(x, y, direction, assets) {
        this.x = x;
        this.y = y;
        this.direction = direction; // 0=вверх, 90=вправо, 180=вниз, 270=влево
        this.assets = assets;
        this.animationFrame = 0;
    }
    
    turnRight() {
        this.direction = (this.direction + 90) % 360;
    }
    
    turnLeft() {
        this.direction = (this.direction - 90 + 360) % 360;
    }
    
    draw(ctx, gridSize, time = 0) {
        const centerX = this.x * gridSize + gridSize / 2;
        const centerY = this.y * gridSize + gridSize / 2;
        
        // Анимация "дыхания" игрока
        const bounce = Math.sin(time) * 2;
        
        ctx.save();
        ctx.translate(centerX, centerY + bounce);
        ctx.rotate(this.direction * Math.PI / 180);
        
        // Выбор спрайта в зависимости от направления
        let spriteName = 'player';
        switch(this.direction) {
            case 0: spriteName = 'player_up'; break;
            case 90: spriteName = 'player_right'; break;
            case 180: spriteName = 'player_down'; break;
            case 270: spriteName = 'player_left'; break;
        }
        
        const playerImg = this.assets.getImage(spriteName) || this.assets.getImage('player');
        
        if (playerImg) {
            // Рисуем спрайт
            ctx.drawImage(
                playerImg,
                -gridSize/2,
                -gridSize/2,
                gridSize,
                gridSize
            );
        } else {
            // Запасной вариант: цветной треугольник
            ctx.fillStyle = '#2196F3';
            ctx.beginPath();
            ctx.moveTo(0, -gridSize/3);
            ctx.lineTo(-gridSize/4, gridSize/4);
            ctx.lineTo(gridSize/4, gridSize/4);
            ctx.closePath();
            ctx.fill();
            
            // Глаза
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(-gridSize/8, -gridSize/12, gridSize/12, 0, Math.PI * 2);
            ctx.arc(gridSize/8, -gridSize/12, gridSize/12, 0, Math.PI * 2);
            ctx.fill();
            
            // Зрачки
            ctx.fillStyle = '#1976D2';
            ctx.beginPath();
            ctx.arc(-gridSize/8, -gridSize/12, gridSize/20, 0, Math.PI * 2);
            ctx.arc(gridSize/8, -gridSize/12, gridSize/20, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Тень
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.ellipse(0, gridSize/3, gridSize/3, gridSize/6, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

export default Player;