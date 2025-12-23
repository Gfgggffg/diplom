// code-editor.js - управление блоками кода и программой
class CodeEditor {
    constructor() {
        this.programArea = document.getElementById('programArea');
        this.jsCodeElement = document.getElementById('jsCode');
        this.program = [];
        
        this.initDragAndDrop();
    }
    
    initDragAndDrop() {
        const codeBlocks = document.querySelectorAll('.code-block');
        
        codeBlocks.forEach(block => {
            block.setAttribute('draggable', 'true');
            
            block.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', block.dataset.command);
                e.dataTransfer.effectAllowed = 'copy';
                block.classList.add('dragging');
            });
            
            block.addEventListener('dragend', () => {
                block.classList.remove('dragging');
            });
        });
        
        this.programArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            this.programArea.classList.add('drag-over');
        });
        
        this.programArea.addEventListener('dragleave', () => {
            this.programArea.classList.remove('drag-over');
        });
        
        this.programArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.programArea.classList.remove('drag-over');
            
            const commandType = e.dataTransfer.getData('text/plain');
            this.addCodeBlockToProgram(commandType);
        });
    }
    
    addCodeBlockToProgram(commandType) {
        const block = this.createProgramBlock(commandType);
        
        // Удаляем placeholder если он есть
        const placeholder = this.programArea.querySelector('.placeholder');
        if (placeholder) {
            placeholder.remove();
        }
        
        this.programArea.appendChild(block);
        
        // Обновляем программу и JS представление
        this.updateProgram();
    }
    
    createProgramBlock(commandType) {
        const block = document.createElement('div');
        block.className = 'program-block';
        block.dataset.command = commandType;
        
        switch(commandType) {
            case 'moveForward':
                block.innerHTML = '<i class="fas fa-arrow-up"></i> Вперед';
                break;
            case 'turnRight':
                block.innerHTML = '<i class="fas fa-redo"></i> Повернуть направо';
                break;
            case 'turnLeft':
                block.innerHTML = '<i class="fas fa-undo"></i> Повернуть налево';
                break;
            case 'collect':
                block.innerHTML = '<i class="fas fa-gem"></i> Собрать';
                break;
            case 'repeat':
                const loopCount = document.querySelector('.loop-count').value || 2;
                block.innerHTML = `
                    <i class="fas fa-redo-alt"></i> Повторить 
                    <input type="number" min="1" max="10" value="${loopCount}" class="loop-count-input">
                    раз
                    <div class="repeat-commands"></div>
                `;
                break;
        }
        
        // Добавляем кнопку удаления
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-block';
        deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
        deleteBtn.addEventListener('click', () => {
            block.remove();
            this.updateProgram();
            
            // Если программа пуста, показываем placeholder
            if (this.programArea.children.length === 0) {
                this.showPlaceholder();
            }
        });
        
        block.appendChild(deleteBtn);
        
        return block;
    }
    
    updateProgram() {
        // Собираем программу из блоков
        this.program = [];
        const programBlocks = this.programArea.querySelectorAll('.program-block');
        
        programBlocks.forEach(block => {
            const commandType = block.dataset.command;
            
            if (commandType === 'repeat') {
                const repeatCount = block.querySelector('.loop-count-input').value;
                const repeatCommands = [];
                
                // Собираем команды внутри цикла
                const repeatBlock = block.querySelector('.repeat-commands');
                const innerBlocks = repeatBlock.querySelectorAll('.program-block');
                
                innerBlocks.forEach(innerBlock => {
                    repeatCommands.push({ type: innerBlock.dataset.command });
                });
                
                this.program.push({
                    type: 'repeat',
                    count: parseInt(repeatCount),
                    commands: repeatCommands
                });
            } else {
                this.program.push({ type: commandType });
            }
        });
        
        // Обновляем JavaScript представление
        this.updateJavaScriptView();
    }
    
    updateJavaScriptView() {
        let jsCode = '';
        
        this.program.forEach(command => {
            switch(command.type) {
                case 'moveForward':
                    jsCode += 'moveForward();\n';
                    break;
                case 'turnRight':
                    jsCode += 'turnRight();\n';
                    break;
                case 'turnLeft':
                    jsCode += 'turnLeft();\n';
                    break;
                case 'collect':
                    jsCode += 'collect();\n';
                    break;
                case 'repeat':
                    jsCode += `for (let i = 0; i < ${command.count}; i++) {\n`;
                    command.commands.forEach(cmd => {
                        jsCode += `  ${cmd.type}();\n`;
                    });
                    jsCode += '}\n';
                    break;
            }
        });
        
        this.jsCodeElement.textContent = jsCode || '// Перетащите блоки кода сюда';
    }
    
    getProgram() {
        return this.program;
    }
    
    clearProgram() {
        this.programArea.innerHTML = '';
        this.showPlaceholder();
        this.program = [];
        this.updateJavaScriptView();
    }
    
    showPlaceholder() {
        const placeholder = document.createElement('div');
        placeholder.className = 'placeholder';
        placeholder.textContent = 'Перетащите блоки кода сюда';
        this.programArea.appendChild(placeholder);
    }
}

export default CodeEditor;