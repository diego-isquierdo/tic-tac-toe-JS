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
            } else {
                player2++;
            }

            let fieldGame = getFieldGame();
            let Winner = checkWinner(fieldGame);
            if (Winner != undefined) {
                console.log(Winner + " é campeão!");
            }
        }
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
                    return lineWin;
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
                    return crossWinRight;
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
                    return crossWinLeft;
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
                    return columnWin;
                }
            }
        }

    }
    if (noWinCount == 0) {
        console.log("Deu Velha!");
    }
}