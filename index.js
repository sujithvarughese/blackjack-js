
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
    bet: 0,
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

//add functionality for multiple players
function addPlayer(){
    playersPlaying.push(playersWatching.pop());
}
function removePlayer(){
    playersWatching.push(playersPlaying.pop())
}
function loadBankroll(playerName, reloadAmount) {
    playerName.bankroll += reloadAmount
}

function shuffleUpAndDeal(numDecks=1) {
    createNewShoe(numDecks);
    shuffle();
    loadBankroll(dealer, 1000);
    dealer.bust = false;
    player.bust = false;
//    player.bet = prompt('Place your bets')
    player.bet = 25;
    for (let i = 0; i < 2; i++) {
        for (let j = playersPlaying.length - 1; j >= 0; j--) {
            playersPlaying[j].hand.push(shoe.pop());
            playersPlaying[j].score += playersPlaying[j].hand[i];
        }
    }
    checkBlackjack();
}

function checkBlackjack(){
    if (dealer.score === 21) {
        dealer.blackjack = true;
    }
    if (player.score === 21) {
        player.blackjack = true;
    }
    if (dealer.blackjack === true && player.blackjack === true) {
        console.log('Push')
    } else if (dealer.blackjack === true) {
        console.log('Dealer blackjack')
        player.bankroll -= player.bet;
        dealer.bankroll += player.bet;
    } else if (player.blackjack === true) {
        console.log('Player blackjack')
        player.bankroll += (player.bet * 1.5);
        dealer.bankroll -= (player.bet * 1.5);
    } else {
        console.log('Dealer score: ' + dealer.hand[0])
    }
    return dealer.blackjack === true || player.blackjack === true;
}
function hitMe(playerID){
    let nextCard = shoe.pop;
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
        playerID.bust = true;
        console.log('Player Bust');
    }
/*    else {
        let answer = prompt('Hit again?(y/n)');
        if (answer.toLowerCase() === 'y') {
            hitMe(playerID);
            playerMove(playerID);
        }
    }*/
}
function dealerMove(){
    while (dealer.score < 17) {
        let nextCard = deck.pop();
        console.log(nextCard)
        dealer.hand.push(nextCard);
        dealer.score += nextCard;
    }
    if (dealer.score > 21) {
        dealer.bust = true;
        console.log('Dealer Bust');
    }

    if (dealer.bust === false) {
        if (player.bust === true) {
            player.bankroll -= player.bet;
            dealer.bankroll += player.bet;
        }
        else if (player.score === dealer.score) {
            console.log('Push');
        }
        else if (player.score > dealer.score) {
            console.log('Player wins')
            player.bankroll += player.bet;
            dealer.bankroll -= player.bet;
        }
        else if (player.score < dealer.score) {
            console.log('Dealer wins')
            player.bankroll -= player.bet;
            dealer.bankroll += player.bet;
        }
    }
    else {
        if (player.bust === false) {
            player.bankroll += player.bet;
            dealer.bankroll -= player.bet;
        }
    }
}

loadBankroll(player, 1000);
shuffleUpAndDeal(6);
console.log(playersPlaying)
if (!checkBlackjack()) {
    playerMove(player);
    dealerMove();
}
console.log(checkBlackjack())
console.log(playersPlaying)





