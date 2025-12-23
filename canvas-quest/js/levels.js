// levels.js
const levels = [
    {
        id: 1,
        name: "Первые шаги",
        description: "Изучите основы программирования",
        task: "Соберите кристалл и достигните финиша.",
        concepts: ["Последовательность команд"],
        grid: [
            [1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 1, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1]
        ],
        playerStart: { x: 1, y: 1, direction: 0 },
        crystals: [{ x: 3, y: 1, type: 'blue' }],
        obstacles: [{ x: 2, y: 2 }],
        finish: { x: 3, y: 3 },
        maxSteps: 8,
        hint: "Используйте команды 'Вперед' и 'Повернуть направо'.",
        theme: 'grass',
        music: 'level1'
    },
    {
        id: 2,
        name: "Прямой путь",
        description: "Учимся двигаться по прямой",
        task: "Соберите все кристаллы по пути к финишу.",
        concepts: ["Последовательность команд", "Планирование пути"],
        grid: [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1]
        ],
        playerStart: { x: 1, y: 2, direction: 0 },
        crystals: [
            { x: 2, y: 2, type: 'blue' },
            { x: 3, y: 2, type: 'blue' },
            { x: 4, y: 2, type: 'blue' }
        ],
        obstacles: [],
        finish: { x: 4, y: 2 },
        maxSteps: 6,
        hint: "Просто двигайтесь вперед и собирайте кристаллы.",
        theme: 'grass',
        music: 'level2'
    },
    {
        id: 3,
        name: "Поворотный момент",
        description: "Учимся поворачивать",
        task: "Обойдите препятствие и соберите кристалл.",
        concepts: ["Повороты", "Обход препятствий"],
        grid: [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1]
        ],
        playerStart: { x: 1, y: 2, direction: 0 },
        crystals: [{ x: 4, y: 2, type: 'red' }],
        obstacles: [
            { x: 2, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 2 },
            { x: 3, y: 3 }
        ],
        finish: { x: 4, y: 2 },
        maxSteps: 10,
        hint: "Поверните, обойдите препятствие и вернитесь на путь.",
        theme: 'sand',
        music: 'level3'
    },
    {
        id: 4,
        name: "Зигзаг",
        description: "Комбинируем движения и повороты",
        task: "Соберите кристаллы зигзагом.",
        concepts: ["Комбинация команд", "Траектория движения"],
        grid: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],
        playerStart: { x: 1, y: 1, direction: 0 },
        crystals: [
            { x: 3, y: 1, type: 'blue' },
            { x: 3, y: 3, type: 'red' },
            { x: 5, y: 3, type: 'blue' }
        ],
        obstacles: [],
        finish: { x: 5, y: 4 },
        maxSteps: 15,
        hint: "Двигайтесь вперед, поворачивайте, снова вперед...",
        theme: 'sand',
        music: 'level4'
    },
    {
        id: 5,
        name: "Повтори меня",
        description: "Знакомство с циклами",
        task: "Соберите 4 кристалла в ряд.",
        concepts: ["Циклы", "Повторение действий"],
        grid: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],
        playerStart: { x: 1, y: 2, direction: 0 },
        crystals: [
            { x: 2, y: 2, type: 'blue' },
            { x: 3, y: 2, type: 'blue' },
            { x: 4, y: 2, type: 'blue' },
            { x: 5, y: 2, type: 'red' }
        ],
        obstacles: [],
        finish: { x: 5, y: 2 },
        maxSteps: 8,
        hint: "Используйте цикл 'Повторить 4 раза' с командой 'Вперед' и 'Собрать' внутри.",
        theme: 'grass',
        music: 'level5'
    },
    {
        id: 6,
        name: "Лабиринт",
        description: "Навигация в сложной среде",
        task: "Найдите путь через лабиринт.",
        concepts: ["Сложные последовательности", "Навигация"],
        grid: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 1, 0, 0, 1],
            [1, 1, 0, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],
        playerStart: { x: 1, y: 1, direction: 0 },
        crystals: [
            { x: 5, y: 1, type: 'red' },
            { x: 5, y: 5, type: 'blue' }
        ],
        obstacles: [
            { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 2, y: 4 },
            { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 1, y: 3 },
            { x: 5, y: 3 }
        ],
        finish: { x: 5, y: 5 },
        maxSteps: 25,
        hint: "Тщательно планируйте каждый шаг. Карту можно запомнить.",
        theme: 'dungeon',
        music: 'level6'
    },
    {
        id: 7,
        name: "Водный путь",
        description: "Особые типы клеток",
        task: "Избегайте воды, собирайте кристаллы.",
        concepts: ["Условия", "Особые клетки"],
        grid: [
            [2, 2, 2, 2, 2, 2, 2],
            [2, 0, 0, 2, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 2],
            [2, 2, 0, 0, 0, 2, 2],
            [2, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 2, 0, 0, 2],
            [2, 2, 2, 2, 2, 2, 2]
        ],
        playerStart: { x: 1, y: 1, direction: 0 },
        crystals: [
            { x: 5, y: 1, type: 'blue' },
            { x: 3, y: 3, type: 'red' },
            { x: 1, y: 5, type: 'blue' }
        ],
        obstacles: [],
        finish: { x: 5, y: 5 },
        water: [
            { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 },
            { x: 0, y: 1 }, { x: 6, y: 1 },
            { x: 0, y: 2 }, { x: 6, y: 2 },
            { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 },
            { x: 0, y: 4 }, { x: 6, y: 4 },
            { x: 0, y: 5 }, { x: 6, y: 5 },
            { x: 0, y: 6 }, { x: 1, y: 6 }, { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 }, { x: 5, y: 6 }, { x: 6, y: 6 }
        ],
        maxSteps: 30,
        hint: "Вода (синие клетки) непроходима. Ищите мосты (коричневые клетки).",
        theme: 'water',
        music: 'level7'
    },
    {
        id: 8,
        name: "Алгоритмическое мышление",
        description: "Создаем эффективные алгоритмы",
        task: "Соберите все кристаллы минимальным количеством команд.",
        concepts: ["Алгоритмы", "Оптимизация"],
        grid: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],
        playerStart: { x: 1, y: 1, direction: 0 },
        crystals: [
            { x: 1, y: 3, type: 'blue' },
            { x: 3, y: 1, type: 'red' },
            { x: 3, y: 3, type: 'blue' },
            { x: 3, y: 5, type: 'red' },
            { x: 5, y: 3, type: 'blue' }
        ],
        obstacles: [],
        finish: { x: 5, y: 5 },
        maxSteps: 20,
        hint: "Попробуйте собрать кристаллы по спирали или зигзагу.",
        theme: 'dungeon',
        music: 'level8'
    },
    {
        id: 9,
        name: "Сложный лабиринт",
        description: "Комбинируем все изученное",
        task: "Проложите путь через сложный лабиринт.",
        concepts: ["Планирование", "Комбинация техник"],
        grid: [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 0, 1],
            [1, 1, 1, 0, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 1, 0, 0, 0, 1],
            [1, 1, 0, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1]
        ],
        playerStart: { x: 1, y: 1, direction: 0 },
        crystals: [
            { x: 6, y: 1, type: 'red' },
            { x: 1, y: 4, type: 'blue' },
            { x: 6, y: 4, type: 'red' },
            { x: 3, y: 7, type: 'blue' }
        ],
        obstacles: [
            { x: 4, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
            { x: 6, y: 2 }, { x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 4 },
            { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 3, y: 5 }, { x: 1, y: 6 },
            { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 }, { x: 5, y: 6 },
            { x: 6, y: 6 }
        ],
        finish: { x: 6, y: 7 },
        maxSteps: 40,
        hint: "Разделите лабиринт на секции. Решайте каждую секцию отдельно.",
        theme: 'dungeon',
        music: 'level9'
    },
    {
        id: 10,
        name: "Финальное испытание",
        description: "Примените все знания",
        task: "Соберите все кристаллы и достигните финиша.",
        concepts: ["Все изученные концепции", "Финал"],
        grid: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        playerStart: { x: 1, y: 1, direction: 0 },
        crystals: [
            { x: 1, y: 4, type: 'red' },
            { x: 4, y: 1, type: 'blue' },
            { x: 4, y: 4, type: 'gold' },
            { x: 4, y: 7, type: 'blue' },
            { x: 7, y: 4, type: 'red' }
        ],
        obstacles: [
            { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 3 },
            { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 5, y: 3 }, { x: 6, y: 3 },
            { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 2, y: 6 }, { x: 3, y: 6 },
            { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 5, y: 6 }, { x: 6, y: 6 }
        ],
        finish: { x: 7, y: 7 },
        maxSteps: 35,
        hint: "Используйте симметрию уровня. Золотой кристалл в центре - ключевой.",
        theme: 'final',
        music: 'level10'
    }
];

// Сохранение прогресса
function saveProgress(levelId, score, steps) {
    const progress = {
        currentLevel: levelId,
        scores: JSON.parse(localStorage.getItem('canvasQuestScores') || '{}'),
        unlockedLevels: JSON.parse(localStorage.getItem('canvasQuestUnlocked') || '[1]')
    };
    
    progress.scores[levelId] = Math.max(progress.scores[levelId] || 0, score);
    
    if (levelId < levels.length && !progress.unlockedLevels.includes(levelId + 1)) {
        progress.unlockedLevels.push(levelId + 1);
    }
    
    localStorage.setItem('canvasQuestScores', JSON.stringify(progress.scores));
    localStorage.setItem('canvasQuestUnlocked', JSON.stringify(progress.unlockedLevels));
    localStorage.setItem('canvasQuestCurrentLevel', levelId.toString());
}

function getProgress() {
    return {
        currentLevel: parseInt(localStorage.getItem('canvasQuestCurrentLevel') || '1'),
        scores: JSON.parse(localStorage.getItem('canvasQuestScores') || '{}'),
        unlockedLevels: JSON.parse(localStorage.getItem('canvasQuestUnlocked') || '[1]')
    };
}

export { levels, saveProgress, getProgress };