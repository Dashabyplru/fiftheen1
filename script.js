const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
        const tileSize = 100;
        const rows = 4;
        const cols = 4;
        let board = [];

        // Инициализация доски
        function initBoard() {
            board = Array.from({ length: rows }, (_, i) => 
                Array.from({ length: cols }, (_, j) => (i * cols + j + 1) % (rows * cols))
            );
            shuffleBoard();
            drawBoard();
        }

        // Перемешивание плиток
        function shuffleBoard() {
            for (let i = 0; i < 100; i++) {
                const direction = Math.floor(Math.random() * 4);
                moveTile(direction);
            }
        }

        // Отрисовка доски
        function drawBoard() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    const tileNumber = board[i][j];
                    if (tileNumber !== 0) { // Пустая плитка
                        ctx.fillStyle = isTileInCorrectPosition(i, j) ? 'green' : 'lightblue';
                        ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
                        ctx.strokeRect(j * tileSize, i * tileSize, tileSize, tileSize);
                        ctx.fillStyle = 'black';
                        ctx.font = '30px Arial';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(tileNumber, j * tileSize + tileSize / 2, i * tileSize + tileSize / 2);
                    }
                }
            }
        }

        // Проверка, находится ли плитка на своем месте
        function isTileInCorrectPosition(row, col) {
            return board[row][col] === (row * cols + col + 1);
        }

        // Перемещение плитки
        function moveTile(direction) {
            const emptyTilePos = findEmptyTile();
            const newRow = emptyTilePos.row + (direction === 0 ? -1 : direction === 1 ? 1 : 0);
            const newCol = emptyTilePos.col + (direction === 2 ? -1 : direction === 3 ? 1 : 0);

            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                board[emptyTilePos.row][emptyTilePos.col] = board[newRow][newCol];
                board[newRow][newCol] = 0; // Пустая плитка
                drawBoard();
            }
            if (checkWin()) {
                alert("Вы выиграли!");
                initBoard();
            }
        }

        // Поиск пустой плитки
        function findEmptyTile() {
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    if (board[i][j] === 0) {
                        return { row: i, col: j };
                    }
                }
            }
        }

        // Проверка на выигрыш
        function checkWin() {
            let isWin = true;
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    if (!isTileInCorrectPosition(i, j)) {
                        isWin = false;
                        break;
                    }
                }
            }
                    
        }

        


        // Обработка клика по плитке
        canvas.addEventListener('click', (event) => {
            //console.log(board);
            //console.log(checkMatrix());
            //console.log(findEmptyTile());
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const col = Math.floor(x / tileSize);
            const row = Math.floor(y / tileSize);
            //console.log(col);
            //console.log(row);
            if (board[row][col] !== 0) {
                console.log("board[row][col] !== 0");
                const emptyTilePos = findEmptyTile();
                /*if ((Math.abs(emptyTilePos.row - row) === 1 && emptyTilePos.col === col) ||
                    (Math.abs(emptyTilePos.col - col) === 1 && emptyTilePos.row === row)) {
                    moveTile(row > emptyTilePos.row ? 1 : row < emptyTilePos.row ? 0 : col > emptyTilePos.col ? 3 : 2);
                }*/
                if ((emptyTilePos.col === col) || (emptyTilePos.row === row)) {
                    console.log("(emptyTilePos.col === col) || (emptyTilePos.row === row)");
                    let zzz = row > emptyTilePos.row ? 1 : row < emptyTilePos.row ? 0 : col > emptyTilePos.col ? 3 : 2
                    if(emptyTilePos.col === col)
                    {
                        while(emptyTilePos.row != row){
                            moveTile(zzz);
                            emptyTilePos = findEmptyTile();
                        }
                    }
                    else
                    {
                        while(emptyTilePos.col != col){
                            moveTile(zzz);
                            emptyTilePos = findEmptyTile();
                        }
                    }
                }
            }
            
        });

        // Обработчик нажатия кнопки "Старт"
        document.getElementById('startButton').addEventListener('click', initBoard);