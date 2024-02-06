'use strict'

var  PACMAN = '<img src="img/pacman.png">'
const SUPERPOWER = '🫥'
var gPacman
var gSetTimOutSuper

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false

    }
    board[gPacman.location.i][gPacman.location.j] = `<span class="pacman">${PACMAN}</span>`
}

function onMovePacman(ev) {
    var power = (gPacman.isSuper) ? SUPERPOWER : PACMAN
    playEatingSound()
    if (!gGame.isOn) return
    if (heckVictor()) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)

    //displayMovePacman(ev)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) killGhost(nextLocation)
        else {
            gameOver()
            return
        }
    }



    if (nextCell === FOOD) {
        updateScore(1)
        gCountFoodInBoard--
        heckVictor()
    }
    if (nextCell === CHERRY) {
        updateScore(10)
        heckVictor()
        addCherry()
    }

    if (nextCell === SUPERFOOD ) {
        if ( gPacman.isSuper) return
        superPowerMode()

    }
    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gPacman.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = power
    // DONE: update the DOM
    renderCell(nextLocation, power)


}

function getNextLocation(eventKeyboard) {
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    var className = ''

    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            className = 'up'
            break
        case 'ArrowRight':
            nextLocation.j++
            break
        case 'ArrowDown':
            nextLocation.i++
            className = 'down'
            break
        case 'ArrowLeft':
            nextLocation.j--
            className = 'left'
            break
    }
    PACMAN = `<img class="${className}" src="img/pacman.png">`
    return nextLocation
} 