import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
console.log(board.grid);

// Your code here
window.addEventListener("DOMContentLoaded", event => {
    let scoreBoard = document.getElementById("scores");

    const boardGrid = document.getElementById("board-grid");

    //creating the list items
    const createListItems = function () {
        for (let row = 0; row < board.numRows; row++) {
            for (let col = 0; col < board.numCols; col++) {
                const element = document.createElement("li");
                // if (board.grid[row][col]) {
                //     element.innerHTML = board.grid[row][col];
                // }
                
                element.setAttribute("data-row", row);
                element.setAttribute("data-col", col);
                //element.setAttribute("data-mark", "unmarked");
                boardGrid.append(element);
            }
        }
    }

    createListItems();
    

    let gridManipulator = function (event) {
        let row = event.target.dataset.row;
        let col = event.target.dataset.col;
        //let markStatus = event.target.dataset.mark;

        console.log(row, col);
        
        let gridValue = board.makeHit(row, col);

        if (gridValue) {
            event.target.style.backgroundColor = "green";
            event.target.innerHTML = gridValue;
            scoreBoard.innerHTML = `Lets kick the game rollong 👍: ${board.numRemaining}`;
        } else {
            event.target.style.backgroundColor = "red";
        }

        if (board.numRemaining === 0) {
            boardGrid.classList.add("disabled");
        }
    }

    boardGrid.addEventListener("click", gridManipulator);

    let reset = document.getElementById("reset-button");

    reset.addEventListener("click", (event) => {
        boardGrid.innerHTML = "";
        board.numRemaining = 17;
        createListItems();
        boardGrid.classList.remove("disabled");
    });
});