let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let turnO = true; // Player O, Player X
let newGame = document.querySelector("#new");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let gameOver = false;

const win = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach(box =>{
    box.addEventListener("click", function(){
        if(gameOver) return;

        if(turnO){
            box.innerHTML = "O";
            turnO = false;
        } else {
            box.innerHTML = "X";
            turnO = true;
        }
        box.disabled = true;
        checkwinner();
    });
});

function resetGame(){
    turnO = true;
    gameOver = false;
    enable();
    msgcontainer.classList.add("hide");   
}

function enable(){
    for(let box of boxes){
        box.disabled = false;
        box.innerHTML = "";
    }
}

function disable(){
    for(let box of boxes){
        box.disabled = true;
    }
}

function showwinner(winner){
    msg.innerText = `Congratulations winner is ${winner} ❤️`;
    msgcontainer.classList.remove("hide");
    disable();
    gameOver = true;
}

const checkwinner = () =>{
    for(let i of win){
        let pos1val = boxes[i[0]].innerText;
        let pos2val = boxes[i[1]].innerText;
        let pos3val = boxes[i[2]].innerText;

        if(pos1val !== "" && pos2val !== "" && pos3val !== ""){
            if(pos1val === pos2val && pos2val === pos3val){
                showwinner(pos1val);
                return;
            }
        }
    }

    
    let filled = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            filled = false;
            break;
        }
    }

    if (filled) {
        msg.innerText = "Match Draw 🤝";
        msgcontainer.classList.remove("hide");
        disable();
        gameOver = true;
    }
}

newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);