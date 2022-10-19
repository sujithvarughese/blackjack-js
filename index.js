let playerScore = document.getElementById('player-score');
let dealerScore = document.getElementById('dealer-score');
let playerHand = document.getElementById('player-blackjack-hand')
let dealerHand = document.getElementById('dealer-blackjack-hand');
let betAmount = document.getElementById('bet-amt');
let userNotify = document.getElementById('usr-notify');
let userNotify2 = document.getElementById('usr-notify2');
let playerRoll = document.getElementById('player-bankroll');
let dealerRoll = document.getElementById('dealer-bankroll');


let deck = [2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11];
let shoe = [];

// shuffles deck, adds into shoe, and loops for number of decks desired in shoe, then shuffles shoe 10 times
function createNewShoe(numDecks=1) {
    deck.sort( ()=> Math.random()-0.5);
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
// shuffle shoe user desired amount of times
function shuffle(numShuffles=10){
    for (let i = 0; i < numShuffles; i++) {
        shoe.sort(() => Math.random() - 0.5);
    }
}
function _shuffle(numShuffles) {
    let currentIndex = shoe.length;
    for (let i = 0; i < numShuffles; i++) {
        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * shoe.length);
            currentIndex -= 1;

            let temp = shoe[currentIndex];
            shoe[currentIndex] = shoe[randomIndex];
            shoe[randomIndex] = temp;
        }
    }
}
// dealer and player objects created
let dealer = {
    name: 'Evil Dealer',
    bankroll: 0,
    score: 0,
    hand: [],
    blackjack: false,
    bust: false,
    ready: false
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
function loadMoney(playerName, loadAmount) {
    playerName.bankroll = loadAmount;
}
function reloadMoney(playerName, reloadAmount) {
    playerName.bankroll += reloadAmount;
}
function raiseBet(player){
    player.bet +=25;
}
function lowerBet(player) {
    player.bet -=25;
}

// checks table for any blackjacks and updates bankrolls if found.
// if no blackjack found, allows user to choose an action for the player (hit or stay)
function checkBlackjack(){
    if (dealer.score === 21) {
        dealer.blackjack = true;
    }
    if (player.score === 21) {
        player.blackjack = true;
    }
    if (dealer.blackjack === true && player.blackjack === true) {
        console.log('Push')
        userNotify.textContent = 'Push!'
        dealerScore.textContent = 'Dealer Score: ' + dealer.score;
        dealerHand.textContent = 'Dealer Hand: ' + dealer.hand.toString()
        dealer.ready = true;
    } else if (dealer.blackjack === true) {
        console.log('Dealer blackjack')
        userNotify.textContent = 'Dealer Blackjack'
        dealerHand.textContent = 'Dealer Hand: ' + dealer.hand.toString()
        player.bankroll -= player.bet;
        dealer.bankroll += player.bet;
        dealer.ready = true;
    } else if (player.blackjack === true) {
        console.log('Player blackjack')
        userNotify.textContent = 'Player Blackjack! Congratulations!';
        dealerHand.textContent = 'Dealer Hand: ' + dealer.hand.toString()
        player.bankroll += (player.bet * 1.5);
        dealer.bankroll -= (player.bet * 1.5);
        dealer.ready = true;
    } else {
        userNotify.textContent = 'Your score is ' + player.score;
        userNotify2.textContent = 'Hit or stay?'
        player.canHit = true;
    }
}

// deal only permitted after new game is started or hand has completed
function dealHand() {
    if (dealer.ready) {
        dealer.ready = false;
        userNotify.textContent = 'Press Deal Cards when ready!'
        userNotify2.textContent = ''
        clearHands()

        // cards dealt one by one, beginning with player
        player.hand.push(shoe.pop());
        playerHand.textContent = 'Player hand: ' + player.hand.toString();

        dealer.hand.push(shoe.pop());
        dealerHand.textContent = 'Dealer hand: ' + dealer.hand.toString();
        dealerScore.textContent = 'Dealer score: ' + dealer.hand[0]

        player.hand.push(shoe.pop());
        playerHand.textContent = 'Player hand: ' + player.hand.toString();

        // dealer's first card and score only shown, while other card hidden until player actions have completed
        dealer.hand.push(shoe.pop())
        dealer.score = dealer.hand[0] + dealer.hand[1];
        player.score = player.hand[0] + player.hand[1];

        playerScore.textContent = 'Player Score: ' + player.score

        console.log(player.hand)
        console.log(dealer.hand)
        // first calls function to check for any blackjacks
        checkBlackjack();
    }
}

// clears all fields before deal
function clearHands() {
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
}

// creates shoe, shuffles, wagers placed
function shuffleUp(numDecks=1) {
    clearHands()
    createNewShoe(numDecks);
    shuffle();
    loadMoney(dealer, 5000)
    loadMoney(player, 1000)
    userNotify.textContent = 'Press Deal Cards when ready!'
    userNotify2.textContent = ''
    playerRoll.textContent = 'Player Bankroll: ' + player.bankroll
    dealerRoll.textContent = 'Dealer bankroll: ' + dealer.bankroll
    playerHand.textContent = 'Player Hand: ';
    playerScore.textContent = "Player Score: ";
    dealerHand.textContent = 'Dealer hand: ';
    dealerScore.textContent = 'Dealer score: ';
    player.bet = 25
    betAmount.textContent = 'Player bet: ' + player.bet
    dealer.ready = true;
}

// button only allowed when given permission
function hitMe(){
    if (player.canHit === true) {
        player.canHit = false;
        let nextCard = shoe.pop();
        player.hand.push(nextCard);
        player.score += nextCard
        while (player.score > 21 && player.hand.includes(11)) {     // if player's hand contains an Ace and score goes over 21,
            player.hand[player.hand.indexOf(11)] = 1;                       // the ace (11) must be changed to a 1
            player.score -= 10;
        }
        playerHand.textContent = 'Player Hand: ' + player.hand.toString()
        playerScore.textContent = "Player Score: " + player.score
        console.log('Your score is ' + player.score)
        userNotify.textContent = 'Your score is ' + player.score

        // if player makes 21 or busts, player is not allowed to make any further action until dealers hand is played
        if (player.score === 21) {
            userNotify2.textContent = 'Player has 21!'
            dealerMove();
        }
        else if (player.score > 21){
            player.bust = true;
            userNotify2.textContent = 'Player Bust. Ouch!'
            console.log('Player Bust');
            dealerMove()
        }
        else {
            userNotify2.textContent = 'Hit again?'
            player.canHit = true;
        }
    }
}

// only occurs after player moves have completed
function dealerMove(){
    if (player.canHit === true) {
        player.canHit = false;
        if (player.bust === false) {
            userNotify2.textContent = '';
        }
        // dealer must draw until minimum 17 score is reached
        while (dealer.score < 17) {
            let nextCard = shoe.pop()
            dealer.hand.push(nextCard);
            dealer.score += nextCard
            // dealer also changes 11 value of ace to 1, if score goes over 21
            while (dealer.score > 21 && dealer.hand.includes(11)) {
                dealer.hand[dealer.hand.indexOf(11)] = 1;
                dealer.score += 10;
            }
            dealerHand.textContent = 'Dealer Hand: ' + dealer.hand.toString();
            dealerScore.textContent = 'Dealer score: ' + dealer.score
        }
        // all possible game outcomes accounted for, and bankroll is properly adjusted
        if (dealer.score > 21) {
            dealer.bust = true;
            console.log('Dealer Bust');
            userNotify.textContent = 'Dealer Bust!'
        }
        dealerHand.textContent = 'Dealer hand: ' + dealer.hand.toString();
        dealerScore.textContent = 'Dealer Score: ' + dealer.score;
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
    playerRoll.textContent = 'Player bankroll: ' + player.bankroll;
    dealerRoll.textContent = 'Dealer bankroll: ' + dealer.bankroll;
    dealer.ready = true;
}








