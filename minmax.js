var globalBoardState = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
function minimax(player, depth, boardState) {
    function boardHeuristic(board) {
        var sum = 0;
        for(var i = 0; i < 3; i++) {
            if(board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] != 0) {
                board[i][0] === player ? sum += 10000 : sum -= 10000;
            }
            else {
                if(board[i][0] === board[i][1] && board[i][0] != 0 && board[i][2] == 0) {
                    board[i][0] === player ? sum += 100 : sum -= 100;
                }
                if(board[i][1] === board[i][2] && board[i][1] != 0 && board[i][0] == 0) {
                    board[i][1] === player ? sum += 100 : sum -= 100;
                }
                if(board[i][0] === board[i][2] && board[i][0] != 0 && board[i][1] == 0) {
                    board[i][0] === player ? sum += 100 : sum -= 100;
                }
            }
            if(board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] != 0) {
                board[0][i] === player ? sum += 10000 : sum -= 10000;
            }
            else {
                if(board[0][i] === board[1][i] && board[0][i] != 0 && board[2][i] == 0) {
                    board[0][i] === player ? sum += 100 : sum -= 100;
                }
                if(board[1][i] === board[2][i] && board[1][i] != 0 && board[0][i] == 0) {
                    board[1][i] === player ? sum += 100 : sum -= 100;
                }
                if(board[0][i] === board[2][i] && board[0][i] != 0 && board[1][i] == 0) {
                    board[0][i] === player ? sum += 100 : sum -= 100;
                }
            }
        }
        if(board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[1][1] != 0) {
            board[0][0] === player ? sum += 10000 : sum -= 10000;
        }
        else {
            if(board[0][0] === board[1][1] && board[1][1] != 0 && board[2][2] == 0) {
                board[0][0] === player ? sum += 100 : sum -= 100;
            }
            if(board[1][1] === board[2][2] && board[1][1] != 0 && board[0][0] == 0) {
                board[1][1] === player ? sum += 100 : sum -= 100;
            }
            if(board[0][0] === board[2][2] && board[0][0] != 0 && board[1][1] == 0) {
                board[0][0] === player ? sum += 100 : sum -= 100;
            }
        }
        if(board[2][0] === board[1][1] && board[1][1]=== board[0][2] && board[2][0] != 0) {
            board[2][0] === player ? sum += 10000 : sum -= 10000;
        }
        else {
            if(board[2][0] === board[1][1] && board[1][1] != 0 && board[0][2] == 0) {
                board[2][0] === player ? sum += 100 : sum -= 100;
            }
            if(board[1][1] === board[0][2] && board[1][1] != 0 && board[2][0] == 0) {
                board[1][1] === player ? sum += 100 : sum -= 100;
            }
            if(board[2][0] === board[0][2] && board[0][2] != 0 && board[1][1] == 0) {
                board[2][0] === player ? sum += 100 : sum -= 100;
            }
        }
        return sum;
    }
    var value = boardHeuristic(boardState);
    let gameEnd = true;
    for(var i = 0; i < 3; i++) {
        for(var j = 0; j < 3; j++) {
            if(boardState[i][j] == 0)
                gameEnd = false;
        }
    }
    if(depth == 0 || value >= 1000 || value <= -1000 || gameEnd)
        return {val: value};
    if(player == 1) {
        let bestVal = {val: -100000};
        for(var i = 0; i < 3; i++) {
            for(var j = 0; j < 3; j++) {
                if(boardState[i][j] === 0){
                    let b = [
                        [],
                        [],
                        []
                    ];
                    b[0] = boardState[0].slice();
                    b[1] = boardState[1].slice();
                    b[2] = boardState[2].slice();
                    b[i][j] = player;
                    let val = minimax(-1, depth - 1, b);
                    if(val.val > bestVal.val)
                        bestVal = {val: val.val, x: j, y: i};
                }
            }
        }
        return bestVal;
    }
    else if(player == -1) {
        let bestVal = {val: 1000000};
        for(var i = 0; i < 3; i++) {
            for(var j = 0; j < 3; j++) {
                if(boardState[i][j] === 0){
                    let b = [
                        [],
                        [],
                        []
                    ];
                    b[0] = boardState[0].slice();
                    b[1] = boardState[1].slice();
                    b[2] = boardState[2].slice();
                    b[i][j] = player;
                    let val = minimax(1, depth - 1, b);
                    if(val.val < bestVal.val)
                        bestVal = {val: val.val, x: j, y: i};
                }
            }
        }
        return bestVal;
    }
}