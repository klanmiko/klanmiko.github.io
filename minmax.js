var globalBoardState = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
function boardHeuristic(player, board) {
    var sum = 0;
    for(var i = 0; i < 3; i++) {
        if(board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] != 0) {
            board[i][0] === 1 ? sum += 10000 : sum -= 10000;
        }
        else {
            if(board[i][0] === board[i][1] && board[i][0] != 0 && board[i][2] == 0) {
                board[i][0] === 1 ? sum += 100 : sum -= 100;
            }
            if(board[i][1] === board[i][2] && board[i][1] != 0 && board[i][0] == 0) {
                board[i][1] === 1 ? sum += 100 : sum -= 100;
            }
            if(board[i][0] === board[i][2] && board[i][0] != 0 && board[i][1] == 0) {
                board[i][0] === 1 ? sum += 100 : sum -= 100;
            }
        }
        if(board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] != 0) {
            board[0][i] === 1 ? sum += 10000 : sum -= 10000;
        }
        else {
            if(board[0][i] === board[1][i] && board[0][i] != 0 && board[2][i] == 0) {
                board[0][i] === 1 ? sum += 100 : sum -= 100;
            }
            if(board[1][i] === board[2][i] && board[1][i] != 0 && board[0][i] == 0) {
                board[1][i] === 1 ? sum += 100 : sum -= 100;
            }
            if(board[0][i] === board[2][i] && board[0][i] != 0 && board[1][i] == 0) {
                board[0][i] === 1 ? sum += 100 : sum -= 100;
            }
        }
    }
    if(board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[1][1] != 0) {
        board[0][0] === 1 ? sum += 10000 : sum -= 10000;
    }
    else {
        if(board[0][0] === board[1][1] && board[1][1] != 0 && board[2][2] == 0) {
            board[0][0] === 1 ? sum += 100 : sum -= 100;
        }
        if(board[1][1] === board[2][2] && board[1][1] != 0 && board[0][0] == 0) {
            board[1][1] === 1 ? sum += 100 : sum -= 100;
        }
        if(board[0][0] === board[2][2] && board[0][0] != 0 && board[1][1] == 0) {
            board[0][0] === 1 ? sum += 100 : sum -= 100;
        }
    }
    if(board[2][0] === board[1][1] && board[1][1]=== board[0][2] && board[2][0] != 0) {
        board[2][0] === 1 ? sum += 10000 : sum -= 10000;
    }
    else {
        if(board[2][0] === board[1][1] && board[1][1] != 0 && board[0][2] == 0) {
            board[2][0] === 1 ? sum += 100 : sum -= 100;
        }
        if(board[1][1] === board[0][2] && board[1][1] != 0 && board[2][0] == 0) {
            board[1][1] === 1 ? sum += 100 : sum -= 100;
        }
        if(board[2][0] === board[0][2] && board[0][2] != 0 && board[1][1] == 0) {
            board[2][0] === 1 ? sum += 100 : sum -= 100;
        }
    }
    return sum;
}
function isFull(boardState) {
    for(var i = 0; i < 3; i++) {
        for(var j = 0; j < 3; j++) {
            if(boardState[i][j] == 0)
                return false;
        }
    }
    return true;
}
function minimax(player, depth, boardState) {
    var value = boardHeuristic(player, boardState);
    if(depth == 0 || value >= 1000 || value <= -1000 || isFull(boardState))
        return {val: value, board: boardState};
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
                        bestVal = {val: val.val, x: j, y: i, board: val.board};
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
                        bestVal = {val: val.val, x: j, y: i, board: val.board};
                }
            }
        }
        return bestVal;
    }
}