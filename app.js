// global informations
const options = ['rock', 'paper', 'scissors']
let count = 5;
let onGoingCheck = true; // In case a player cancels in the middle of the game
let wins = 0;
let draws = 0;
let loss = 0;

// functions
function game() {

    // Game logic
    let playerOpt = userInput();

    if (playerOpt === null)// Assure correct input
        return;

    while (!checkCorrectInput(playerOpt)) {
        playerOpt = userInput('ERR');

        if (playerOpt === null)// Assure correct input
            return;
    }

    let computerOpt = computerPlay();

    let result = playRound(playerOpt, computerOpt);
    let resultMsg = `${roundResultMessage(result)} \n\n The computer chose : ${computerOpt} - You chose : ${playerOpt}`;

    if (result == 1)
        wins++;
    else if (result == 0)
        draws++;
    else
        loss++;

    // Console output
    console.log(resultMsg);

    // Window output
    alert(resultMsg);

}

function finalResultMessage() {
    let state = '';

    if (wins > loss)
        state = "You won the game !";
    if (loss > wins)
        state = 'You lost the game...';

    state = "it's a draw for this game.";

    let finalResult = state + ` - Wins: ${wins} Loss: ${loss} Draws: ${draws}`;

    console.log(finalResult);
    alert(finalResult);
}

function playRound(playerSelection, computerSelection) {
    let player = playerSelection;
    let computer = computerSelection;
    count--;

    if (player == 'rock' && computer == 'rock' || player == 'paper' && computer == 'paper' || player == 'scissors' && computer == 'scissors') {
        return 0
    }

    if (player == 'rock' && computer == 'paper' || player == 'scissors' && computer == 'rock' || player == 'paper' && computer == 'scissors')
        return -1;

    if (computer == 'rock' && player == 'paper' || computer == 'scissors' && player == 'rock' || computer == 'paper' && player == 'scissors')
        return 1;

    return -2;
}


const computerPlay = () => options[Math.trunc(Math.random() * options.length)];

function roundResultMessage(result) {
    let PLAYERWON = 'Congrats You won!!';
    let COMPUTERWON = 'Hard luck maybe next time...';
    let DRAW = 'It\'s a draw.';

    switch (result) {
        case 1:
            return PLAYERWON;
        case 0:
            return DRAW;
        case -1:
            return COMPUTERWON;
        default:
            break;
    }
}

function userInput(string) {
    let promptStr = `Rounds left : ${count} - Please type in : [rock or paper or scissors]`;

    if (string === 'ERR')
        promptStr = `Wrong input - Only [rock - paper - scissors] \n\n Rounds left : ${count} - Please type in : [rock or paper or scissors]`;

    let promptVal = prompt(promptStr);

    if (promptVal === null) {
        onGoingCheck = false;
        return promptVal;
    }

    return promptVal.toLowerCase().trim();
}


function checkCorrectInput(userInput) {

    if (!options.includes(userInput))
        return false;

    return true;
}

//Main function
function main() {
    while (count > 0 && onGoingCheck)
        game();
    if (onGoingCheck)
        finalResultMessage();
}

//Call of the main function
if (confirm('Welcome this is Paper Rock Scissors Game - Please click OK'))
    main();
