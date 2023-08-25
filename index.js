const cells = document.querySelectorAll(".cell")
const statusText = document.querySelector("#statusText")
const restart = document.querySelector("#restart")
const winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let options = ["","","","","","","","",""]
let currentPlayer = "X"
let running = false
// running the code

initializeGame();

// functions to run game
function initializeGame(){
    cells.forEach(cell=>cell.addEventListener("click", cellClicked))
    restart.addEventListener("click", restartGame)
    statusText.textContent = currentPlayer + "'s turn"
    running = true
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex")

    if(options[cellIndex] != "" || !running){
        return
    }

    updateCell(this, cellIndex)
    changePlayer()
    checkWinner()
}
function updateCell(cell, index){
    options[index] = currentPlayer
    cell.textContent = currentPlayer
    
}
function changePlayer(){
    currentPlayer = currentPlayer === "X" ? "O" : "X"
    statusText.textContent = currentPlayer + "'s turn"
}
function checkWinner(){
    for(const condition of winCondition){
        const [a, b, c] = condition
        if(options[a] !== "" && options[a] === options[b] && options[a] === options[c]){
            running = false
            statusText.textContent = options[a] + " wins!"
            return
        }
    }
    
    if(!options.includes("")){
        running = false
        statusText.textContent = "It's a draw!"
    }
}
function restartGame(){
    options = ["", "", "", "", "", "", "", "", ""]
    currentPlayer = "X"
    running = true
    cells.forEach(cell => {
        cell.textContent = ""
    })
    statusText.textContent = currentPlayer + "'s turn"
}