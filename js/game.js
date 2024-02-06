'use strict'

const WALL = '#'
const FOOD = '🍑'
const EMPTY = ' '
const SUPERFOOD = '⚡️'
const CHERRY = '🍒'

// Model
const gGame = {
    score: 0,
    isOn: false
}
var gBoard
var gCountFoodInBoard
var gIntervalSuperFood
var gIntervalCHERRY

function onInit() {
    //  modalMsg(false)
    gCountFoodInBoard = 0
    updateScore(0)
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true
    gPacman.isSuper =false
    if (gIntervalSuperFood) clearInterval(gIntervalSuperFood)
    gIntervalSuperFood = setInterval(addSuperFodd, 15000)
    if (gIntervalCHERRY) clearInterval(gIntervalCHERRY)
    gIntervalCHERRY = setInterval(addCherry, 15000)
    closeModal()
    moveGhosts()
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                continue
            }
            gCountFoodInBoard++
        }
    }
    gCountFoodInBoard--
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

function addSuperFodd() {
    var Locations = getEmptyPos(gBoard)
    if (!Locations) return
    if (gSetTimOutSuper) clearTimeout(gSetTimOutSuper)
    gBoard[Locations.i][Locations.j] = SUPERFOOD
    // DONE: update the DOM
    renderCell(Locations, SUPERFOOD)
}

function addCherry() {
    const emptyCell = getEmptyPos()
    if (!emptyCell) return
    gBoard[emptyCell.i][emptyCell.j] = CHERRY
    renderCell(emptyCell, CHERRY)
}

function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function updateScore(diff) {
    // DONE: update model and dom
    if (!diff) {
        gGame.score = 0
    } else {
        gGame.score += diff
    }
    document.querySelector('span.score').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, '🤮')
    gGame.isOn = false
    if (gIntervalSuperFood) clearInterval(gIntervalSuperFood)
    modalMsg(false)
    return
}

function heckVictor() {
    if (gCountFoodInBoard === 0) {
        console.log('Game Over')
        clearInterval(gIntervalGhosts)
        renderCell(gPacman.location, '🥰')
        gGame.isOn = false
        if (gIntervalSuperFood) clearInterval(gIntervalSuperFood)
        modalMsg(true)
        return true
    }
}

function modalMsg(valueModal) {
    var modal = document.querySelector('.modal-content')
    var victoriousModal = valueModal
    modal.innerText = victoriousModal ? 'Congratulations on your victory 🫡' : 'You lost the game try again 😰'
    modal.style.background = victoriousModal ? `rgb(5, 220, 127)` : `rgb(235, 9, 20)`
    openModal()
}

function openModal() {
    var modal = document.querySelector('.modal-content')
    modal.classList.remove('modal-popup')
}

function closeModal() {
    var modal = document.querySelector('.modal-content')
    modal.classList.add('modal-popup')
}

function playEatingSound() {
    const audio = new Audio('audio/crunchy-bite.mp3')
    audio.play()
}

function superPowerMode() {s
    gPacman.isSuper = true
    gRemovedGhosts = []
     setTimeout(() => {
        gGhosts = gGhosts.concat(gRemovedGhosts)
        gPacman.isSuper = false
    }, 5000)
}
