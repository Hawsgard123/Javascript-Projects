let cards = []
let message = ""
let hasBlackJack = false
let isAlive = true
let sum = 0
let start = false
let player = {
  name: "Per",
  chips: 0,
}

let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let nameEl = document.getElementById("enter-name")
let chipEl = document.getElementById("enter-chip")

function submit() {
  player.name = nameEl.value
  player.chips = chipEl.value
  playerEl.textContent = player.name + ": $" + player.chips
}
function startGame() {
  if (player.chips == 0) {
    messageEl.textContent = "Add money 💵"
    startGame()
  }
  let firstCard = getRandomCard()
  let secondCard = getRandomCard()
  cards = [firstCard, secondCard]
  sum = cards[0] + cards[1]
  hasBlackJack = false
  isAlive = true
  start = true
  renderGame()
}

function getRandomCard() {
  let random = Math.floor(Math.random() * 13) + 1

  if (random === 1) return 11
  else if (random > 10) return 10
  else return random
}
function renderGame() {
  if (sum <= 20) {
    message = "Do you want to draw a new card? 🙂"
  } else if (sum === 21) {
    message = "Wohoo! You got Blackjack! 🥳"
    hasBlackJack = true
    player.chips = Number(player.chips) + 100
  } else {
    message = "You are out of the game! 😭"
    player.chips -= 50
    if (player.chips <= 0) player.chips = 0
    isAlive = false
  }
  playerEl.textContent = player.name + ": $" + player.chips
  if (player.chips <= 0) message = "Out of Chips 💸, Start the game again?"
  cardsEl.textContent = "Cards : "
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " "
  }
  messageEl.textContent = message
  sumEl.textContent = "Sum :" + " " + sum
}

function newCard() {
  if (start == true) {
    if (hasBlackJack == false && isAlive == true) {
      let card = getRandomCard()
      cards.push(card)
      sum += card
      renderGame()
    }
  }
}
