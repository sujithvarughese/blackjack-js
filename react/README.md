
dev-notes:

1. Welcome screen --> user start game click --> table view (user menu)

2. User menu = (bankroll, numDecks) --> (betSize) --> deal cards

3. a. Deal to player and dealer, (2 up player, 1 up 1 down dealer)
        - pop cards from shoe and into player/dealer hand
        - calculate values
   b. Check player blackjack, check dealer blackjack
        - if player && dealer blackjack: end round (no bet exchanges)
        - if player blackjack: pay player 3:2, then end round
        - id dealer blackjack: player lose bet, end round
   c. Prompt user action
        - if blackjacks above: prompt to play again
        else:
   1. check for split and double
   2. 