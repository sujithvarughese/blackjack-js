let playerHand = document.getElementById('player-hand');
let playerScore = document.getElementById('player-score');
let dealerScore = document.getElementById('dealer-score');
let dealerHand = document.getElementById('dealer-hand');
let betAmount = document.getElementById('bet-amt');
let userNotify = document.getElementById('usr-notify');
let userNotify2 = document.getElementById('usr-notify2');
let playerRoll = document.getElementById('player-bankroll');
let dealerRoll = document.getElementById('dealer-bankroll');

let deck = [2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11];
let shoe = [];
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
    bust: false,
    canHit: false,
    hasAce: false
}
function reloadMoney(playerName, reloadAmount) {
    playerName.bankroll += reloadAmount
}

function checkBlackjack(){
    if (dealer.score === 21) {
        dealer.blackjack = true;
        dealerHand.textContent += dealerHand[1]
    }
    if (player.score === 21) {
        player.blackjack = true;
        dealerHand.textContent += dealerHand[1]
    }
    if (dealer.blackjack === true && player.blackjack === true) {
        console.log('Push')
        userNotify.textContent = 'Push!'
    } else if (dealer.blackjack === true) {
        console.log('Dealer blackjack')
        userNotify.textContent = 'Dealer Blackjack'
        player.bankroll -= player.bet;
        dealer.bankroll += player.bet;
    } else if (player.blackjack === true) {
        console.log('Player blackjack')
        userNotify.textContent = 'Player Blackjack! Congratulations!';
        player.bankroll += (player.bet * 1.5);
        dealer.bankroll -= (player.bet * 1.5);
    } else {
        console.log('Dealer score: ' + dealer.hand[0])
        userNotify.textContent = 'Your score is ' + player.score;
        userNotify2.textContent = 'Hit or stay?'
        player.canHit = true
    }
}
function dealHand() {
    dealer.hand = [];
    player.hand = [];
    dealer.score = 0;
    player.score = 0;
    dealer.bust = false;
    player.bust = false;
    dealer.blackjack = false;
    dealer.blackjack = false;
    player.canHit = false;

    player.hand.push(shoe.pop());
    playerHand.textContent = 'Player hand: ' + player.hand[0];

    dealer.hand.push(shoe.pop());
    dealerHand.textContent = 'Dealer hand: ' + dealer.hand[0];
    dealerScore.textContent = 'Dealer score: ' + dealer.hand[0]

    player.hand.push(shoe.pop());
    playerHand.textContent += " " + player.hand[1];

    dealer.hand.push(shoe.pop())
    dealer.score = dealer.hand[0] + dealer.hand[1];
    player.score = player.hand[0] + player.hand[1];

    playerScore.textContent = 'Player Score: ' + player.score

    console.log(player.hand)
    console.log(dealer.hand)

    checkBlackjack();
}

function shuffleUp(numDecks=1) {
    dealer.hand = [];
    player.hand = [];
    dealer.score = 0;
    player.score = 0;
    dealer.bust = false;
    player.bust = false;
    dealer.blackjack = false;
    dealer.blackjack = false;
    player.canHit = false;
    playerHand.textContent = ""
    dealerHand.textContent = ""
    createNewShoe(numDecks);
    shuffle();
    reloadMoney(dealer, 5000)
    reloadMoney(player, 1000)
    userNotify.textContent = 'Press Deal Cards when ready!'
    userNotify2.textContent = ''
    playerRoll.textContent = 'Player Bankroll: ' + player.bankroll
    dealerRoll.textContent = 'Dealer bankroll: ' + dealer.bankroll
    player.bet = 25
    betAmount.textContent = 'Player bet: ' + player.bet
}

function hitMe(){
    if (player.canHit === true && player.bust === false) {
        let nextCard = shoe.pop();
        player.hand.push(nextCard);
        player.score += nextCard
        for (let i = 0; i < player.hand.length; i++) {
            if (player.hand[i] === 11 && player.score > 21) {
                player.hand[i] = 1;
                player.score -= 10;
            }
        }
        playerHand.textContent += " " + nextCard
        playerScore.textContent = "Player Score: " + player.score
        console.log('Your score is ' + player.score)
        userNotify.textContent = 'Your score is ' + player.score
        if (player.score > 21){
            player.bust = true;
            player.canHit = false;
            userNotify2.textContent = 'Player Bust. Ouch!'
            console.log('Player Bust');
        }
        else {
            userNotify2.textContent = 'Hit again?'
        }
    }
}

function dealerMove(){
    if (player.canHit === true && player.bust === false) {
        player.canHit = false;
        let nextCard = 0
        while (dealer.score < 17) {
            nextCard = shoe.pop()
            dealer.hand.push(nextCard);
            dealer.score += nextCard
            for (let i = 0; i < dealer.hand.length; i++) {
                if (dealer.hand[i] === 11 && dealer.score > 21) {
                    dealer.score -= 10;
                }
            }
            dealerHand.textContent += " " + nextCard;
            dealerScore.textContent = "Dealer score: " + dealer.score
        }
        if (dealer.score > 21) {
            dealer.bust = true;
            console.log('Dealer Bust');
            userNotify.textContent = 'Dealer Bust!'
        }
        if (dealer.bust === false) {
            if (player.bust === true) {
                player.bankroll -= player.bet;
                dealer.bankroll += player.bet;
            } else if (player.score === dealer.score) {
                console.log('Push');
                userNotify.textContent = 'Push'
            } else if (player.score > dealer.score) {
                console.log('Player wins')
                player.bankroll += player.bet;
                dealer.bankroll -= player.bet;
                userNotify.textContent = 'Player Wins'
            } else if (player.score < dealer.score) {
                console.log('Dealer wins')
                player.bankroll -= player.bet;
                dealer.bankroll += player.bet;
                userNotify.textContent = 'Dealer Wins'
            }
        } else {
            if (player.bust === false) {
                player.bankroll += player.bet;
                dealer.bankroll -= player.bet;
                console.log('Player Wins!')
            } else {
                console.log('Push!')
                userNotify.textContent = 'Push'
            }
        }
    }
}








