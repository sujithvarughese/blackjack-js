
let deck = [];
let shoe = [];


deck = [2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11]
function createNewShoe(numDecks=1) {
    for (let i = 0; i < numDecks; i++) {
        for (let j = 0; j < deck.length; j++) {
            shoe.push(deck[j]);
        }
        shoe.sort( ()=> Math.random()-0.5);
    }
    for (let i = 0; i < 10; i++) {
        shoe.sort(() => Math.random() - 0.5);
    }
}
function shuffle(numShuffles=10){
    for (let i = 0; i < numShuffles; i++) {
        shoe.sort(() => Math.random() - 0.5);
    }
}
let dealer = {
    name: 'Evil Dealer',
    bankroll: 0,
    score: 0,
    hand: [],
    blackjack: false,
    bust: false
}
let player = {
    name: 'Whale',
    bankroll: 0,
    score: 0,
    hand: [],
    blackjack: false,
    bust: false
}
let player1 = {
    bankroll: 0,
    score: 0,
    hand: [],
    blackjack: false,
    bust: false
}
let player2 = {
    bankroll: 0,
    score: 0,
    hand: [],
    blackjack: false,
    bust: false
}
let player3 = {
    bankroll: 0,
    score: 0,
    hand: [],
    blackjack: false,
    bust: false
}
let player4 = {
    bankroll: 0,
    score: 0,
    hand: [],
    blackjack: false,
    bust: false
}
let player5 = {
    bankroll: 0,
    score: 0,
    hand: [],
    blackjack: false,
    bust: false
}
let playersWatching = [player5, player4, player3, player2, player1]
let playersPlaying = [dealer, player]

function addPlayer(){
    playersPlaying.push(playersWatching.pop());
}
function removePlayer(){
    playersWatching.push(playersPlaying.pop())
}
function loadBankroll(playerName, reloadAmount) {
    playerName.bankroll += reloadAmount
}

function shuffleUp(numDecks=1) {
    createNewShoe(numDecks);
    shuffle();
    loadBankroll(dealer, 1000)
}
function checkBlackjack(playerID){
    if (playerID.score === 21){
        playerID.blackjack = true;
    }
}
function dealHand() {
    dealer.bust = false;
    player.bust = false;
    for (let i = 0; i < 2; i++) {
        for (let j = playersPlaying.length - 1; j >= 0; j--) {
            playersPlaying[j].hand.push(shoe.pop());
            playersPlaying[j].score += playersPlaying[j].hand[i];
        }
    }
    checkBlackjack(player)
    checkBlackjack(dealer)
    if (dealer.blackjack === true && player.blackjack === true) {
        console.log('Push')
    }
    else if (dealer.blackjack === true) {
        console.log('Dealer blackjack')
    }
    else if (player.blackjack === true) {
        console.log('Player blackjack')
    }
    else {
        console.log('Dealer score: ' + dealer.hand[0])
    }
}
function hitMe(playerID){
    let nextCard = shoe.pop
    playerID.hand.push(nextCard);
    playerID.score += nextCard;
    for (let i = 0; i < playerID.hand.length; i++) {
        if (playerID.hand[i] === 11 && playerID.score > 21){
            playerID.score -= 10;
        }
    }
}
function playerMove(playerID){
    console.log('Your score is ' + playerID.score)
    if (playerID.score > 21){
        playerID.bust = true
    }
    else {
        let answer = prompt('Hit again?(y/n)');
        if (answer.toLowerCase() === 'y') {
            hitMe(playerID)
            playerMove(playerID)
        }
    }
}
function dealerMove(){
    while (dealer.score < 17) {
        let nextCard = deck.pop();
        dealer.hand.push(nextCard);
        dealer.score += nextCard;
    }
    if (dealer.score > 21) {
        dealer.bust = true
    }
}
function squareUp(){

}




//console.log(JSON.stringify(obj))
shuffleUp()
console.log(playersPlaying)
loadBankroll(dealer, 1000)
loadBankroll(player, 500)
dealHand()
console.log(playersPlaying)




