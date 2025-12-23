// assets-loader.js
class AssetsLoader {
    constructor() {
        this.images = {};
        this.sounds = {};
        this.loaded = false;
        this.totalAssets = 0;
        this.loadedAssets = 0;
    }

    async loadAll() {
        const assets = {
            images: {
                player: 'assets/sprites/player.png',
                player_up: 'assets/sprites/player_up.png',
                player_right: 'assets/sprites/player_right.png',
                player_down: 'assets/sprites/player_down.png',
                player_left: 'assets/sprites/player_left.png',
                crystal: 'assets/sprites/crystal.png',
                crystal_blue: 'assets/sprites/crystal_blue.png',
                crystal_red: 'assets/sprites/crystal_red.png',
                obstacle: 'assets/sprites/obstacle.png',
                finish: 'assets/sprites/finish.png',
                tile_grass: 'assets/sprites/tile_grass.png',
                tile_sand: 'assets/sprites/tile_sand.png',
                tile_water: 'assets/sprites/tile_water.png',
                arrow_up: 'assets/icons/arrow_up.png',
                arrow_right: 'assets/icons/arrow_right.png',
                arrow_left: 'assets/icons/arrow_left.png',
                collect_icon: 'assets/icons/collect.png',
                repeat_icon: 'assets/icons/repeat.png'
            },
            sounds: {
                collect: 'assets/sounds/collect.mp3',
                move: 'assets/sounds/move.mp3',
                turn: 'assets/sounds/turn.mp3',
                win: 'assets/sounds/win.mp3',
                error: 'assets/sounds/error.mp3'
            }
        };

        this.totalAssets = Object.keys(assets.images).length + Object.keys(assets.sounds).length;

        // Загрузка изображений
        const imagePromises = Object.entries(assets.images).map(([name, url]) => 
            this.loadImage(name, url)
        );

        // Загрузка звуков
        const soundPromises = Object.entries(assets.sounds).map(([name, url]) => 
            this.loadSound(name, url)
        );

        await Promise.all([...imagePromises, ...soundPromises]);
        this.loaded = true;
    }

    loadImage(name, url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.images[name] = img;
                this.loadedAssets++;
                this.updateProgress();
                resolve();
            };
            img.onerror = reject;
            img.src = url;
        });
    }

    loadSound(name, url) {
        return new Promise((resolve) => {
            // В реальном проекте здесь была бы загрузка Audio
            // Для простоты создаем заглушки
            this.sounds[name] = {
                play: () => {
                    console.log(`Playing sound: ${name}`);
                    // Реализация воспроизведения звука
                    if (typeof Audio !== 'undefined') {
                        try {
                            const audio = new Audio(url);
                            audio.play().catch(e => console.log("Audio play failed:", e));
                        } catch (e) {
                            console.log("Audio not supported");
                        }
                    }
                }
            };
            this.loadedAssets++;
            this.updateProgress();
            resolve();
        });
    }

    updateProgress() {
        const progress = document.getElementById('loadingProgress');
        const percent = document.getElementById('loadingPercent');
        if (progress && percent) {
            const percentage = Math.round((this.loadedAssets / this.totalAssets) * 100);
            progress.value = percentage;
            percent.textContent = `${percentage}%`;
        }
    }

    getImage(name) {
        return this.images[name];
    }

    getSound(name) {
        return this.sounds[name];
    }
}

export default AssetsLoader;