let x = document.querySelector(".x");
let o = document.querySelector(".o");
let boxes = document.querySelectorAll(".box");
let buttons = document.querySelectorAll("#buttons-container button");
let messageContainer = document.querySelector("#message");
let messageText = document.querySelector("#message p");
let secondPlayer;

//play counter
let player1 = 0;
let player2 = 0;

//click envet - boxes
boxes.forEach(box => {
    box.addEventListener("click", () => {

        let element = checkElment(player1, player2);

        if (box.childNodes.length == 0) {
            let cloneElement = element.cloneNode(true);

            box.appendChild(cloneElement);

            if (player1 == player2) {
                player1++;

                //AI Player
                if (secondPlayer == 'ai-player') {
                    computerPlay();
                    player2++;
                }

            } else {
                player2++;
            }

            let fieldGame = getFieldGame();
            let winner = checkWinner(fieldGame);

            if (winner != undefined) {
                declareWinner();
            }
        }
    })
});


//2 players or IA
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        secondPlayer = btn.getAttribute('id');
        console.log(secondPlayer);
        buttons.forEach(button => {
            button.style.display = 'none';
        });
        setTimeout(() => {
            let container = document.querySelector("#container");
            container.classList.remove("hide");
        }, 500);
    })
});


//load X ou O
function checkElment(player1, player2) {
    if (player1 == player2) {
        element = x;
    } else {
        element = o;
    }

    return element
}

function getFieldGame() {
    let fieldGame = [];
    countBox = 0;

    for (let i = 0; i < 3; i++) {
        let rowBoxes = [];
        for (let j = 0; j < 3; j++) {
            rowBoxes[j] = boxes[countBox].childNodes[0];
            countBox++;
        }
        fieldGame[i] = rowBoxes;
    }

    return fieldGame;
}

function checkWinner(fieldGame) {
    let crossWinRight;
    let noWinCount = 0;
    let crossCountRigth = 0;
    let crossWinLeft;
    let crossCountLeft = 0;

    for (let i = 0; i < 3; i++) {
        let lineCount = 0;
        let columnCount = 0;
        let lineWin;
        let columnWin;

        for (let l = 0; l < 3; l++) {
            if (fieldGame[i][l] != undefined) {
                if (lineWin != fieldGame[i][l].className) {
                    lineCount = 0;
                    lineWin = fieldGame[i][l].className;
                    lineCount++;
                } else {
                    lineCount++;
                }
                if (lineCount == 3) {
                    declareWinner(lineWin);
                }
                if (((i == 1) && l == 1) || ((i == 0 && l == 2) || (i == 2 && l == 0))) {
                    if (crossWinRight != fieldGame[i][l].className) {
                        crossCountRigth = 0;
                        crossWinRight = fieldGame[i][l].className;
                        crossCountRigth++;
                    } else {
                        crossCountRigth++;
                    }
                }
                if (crossCountRigth == 3) {
                    declareWinner(crossWinRight);
                }
                if ((i == l)) {
                    if (crossWinLeft != fieldGame[i][l].className) {
                        crossCountLeft = 0;
                        crossWinLeft = fieldGame[i][l].className;
                        crossCountLeft++;
                    } else {
                        crossCountLeft++;
                    }
                }
                if (crossCountLeft == 3) {
                    declareWinner(crossWinLeft);
                }
            } else {
                noWinCount++;
            }

            if (fieldGame[l][i] != undefined) {
                if (columnWin != fieldGame[l][i].className) {
                    columnCount = 0;
                    columnWin = fieldGame[l][i].className;
                    columnCount++;
                } else {
                    columnCount++;
                }
                if (columnCount == 3) {
                    declareWinner(columnWin);
                }
            }
        }

    }
    if (noWinCount == 0) {
        declareWinner("Deu Velha!");
    }
}

function declareWinner(winner) {
    let scoreboardX = document.querySelector("#scoreboard-1");
    let scoreboardY = document.querySelector("#scoreboard-2");
    let msg = '';

    if (winner == 'x') {
        scoreboardX.textContent = parseInt(scoreboardX.textContent) + 1;
        msg = "Jogador 1 Venceu";
    } else if (winner == 'o') {
        scoreboardY.textContent = parseInt(scoreboardY.textContent) + 1;
        msg = "Jogador 2 Venceu";
    } else {
        msg = "Deu velha!"
    }

    //show message
    messageText.innerHTML = msg;
    messageContainer.classList.remove("hide");

    //hide message
    setTimeout(() => {
        messageContainer.classList.add("hide");
    }, 2000);

    //reset game
    player1 = 0;
    player2 = 0;

    //clear field
    let boxesToRemove = document.querySelectorAll(".box div");

    boxesToRemove.forEach(box => {
        box.parentNode.removeChild(box);
    });
}

function computerPlay() {
    let clonePlayer2 = o.cloneNode(true);
    counter = 0;
    filled = 0;

    for (let i = 0; i < boxes.length; i++) {

        let randomNumber = Math.floor(Math.random() * 5);
        console.log(randomNumber)
        if (boxes[i].childNodes[0] == undefined) {
            if (randomNumber <= 1) {
                boxes[i].appendChild(clonePlayer2);
                counter++;
                break;
            } else {
                filled++;
            }
        }
    }

    if (counter == 0 && filled < 9) {
        computerPlay();
    }
}