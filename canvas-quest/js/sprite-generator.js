// sprite-generator.js
function generateSprites() {
    const sprites = {};
    
    // Генерация игрока
    sprites.player = generatePlayerSprite();
    sprites.crystal = generateCrystalSprite();
    sprites.obstacle = generateObstacleSprite();
    sprites.finish = generateFinishSprite();
    
    return sprites;
}

function generatePlayerSprite() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    // Тело (синий робот)
    ctx.fillStyle = '#2196F3';
    ctx.fillRect(16, 8, 32, 40);
    
    // Голова
    ctx.fillStyle = '#1976D2';
    ctx.fillRect(20, 0, 24, 16);
    
    // Глаза
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(24, 4, 6, 6);
    ctx.fillRect(34, 4, 6, 6);
    
    // Рот
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(28, 12, 8, 2);
    
    // Руки
    ctx.fillStyle = '#2196F3';
    ctx.fillRect(8, 12, 8, 24);
    ctx.fillRect(48, 12, 8, 24);
    
    // Ноги
    ctx.fillStyle = '#1976D2';
    ctx.fillRect(20, 48, 8, 16);
    ctx.fillRect(36, 48, 8, 16);
    
    return canvas;
}

function generateCrystalSprite() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    // Градиент для кристалла
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 20);
    gradient.addColorStop(0, '#80D8FF');
    gradient.addColorStop(1, '#0277BD');
    
    ctx.fillStyle = gradient;
    
    // Кристалл (ромб)
    ctx.beginPath();
    ctx.moveTo(32, 12);
    ctx.lineTo(44, 32);
    ctx.lineTo(32, 52);
    ctx.lineTo(20, 32);
    ctx.closePath();
    ctx.fill();
    
    // Блики
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(26, 26, 5, 0, Math.PI * 2);
    ctx.fill();
    
    return canvas;
}

// Использовать в assets-loader.js:
// const generatedSprite = generatePlayerSprite();
// this.images['player'] = generatedSprite;