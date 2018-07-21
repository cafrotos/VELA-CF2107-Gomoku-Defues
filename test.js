let expect = require('chai').expect;
let box = {
  status: ''
}

const ROWMAX = 30;
const COLMAX = 30;

let board = [];

for(let i = 0; i < ROWMAX; i++){
  board[i] = [];
  for(let j = 0; j < COLMAX; j++){
    board[i].push(box)
  }
}


describe("Test case:", () => {
  it("Win: 4 trắng:", () => {

    for(let i = 1; i < 4; i++){
      board[0][i].status = 'x';
    }



    expect().to.equal(true)
  })
}) 

//Check 4 trắng là thắng hàng ngang
checkWinRow = (board, x, y) => {
  let isBlocked = false;
  let temple = 0;
  for(let i = x; i < x + 5 && i < ROWMAX; i++){
    if(board[y][i].status == board[y][x].status) temple++;
    else isBlocked = true;
  }

  for(let i = x; i > x - 5 && i < ROWMAX; i--){
    if(board[y][i].status == board[y][x].status) temple++;
    else isBlocked = true;
  }

  if((temple == 4 && isBlocked == false) || temple == 5) return true;
  else return false;
}


//Kiểm tra thắng theo cột
checkWinCol = (board, x, y) => {
  let isBlocked = false;
  let temple = 0;
  for(let i = y; i < y + 5 && i < COLMAX; i++){
    if(board[i][x].status == board[i][x].status) temple++;
    else isBlocked = true;
  }

  for(let i = y; i > y - 5 && i < COLMAX; i--){
    if(board[i][x].status == board[i][x].status) temple++;
    else isBlocked = true;
  }

  if((temple == 4 && isBlocked == false) || temple == 5) return true;
  else return false;
}

//Kiểm tra chéo phải
checkWinCrossoverRight = (board, x, y) => {
  let isBlocked = false;
  let temple = 0;
  let _x = x;
  let _y = y;
  while(_x < x + 5  && _y < y + 5 && _x < ROWMAX && _y < COLMAX){
    if(board[_y][_x] == board[y][x]) temple++;
    else isBlocked = true;
  }

  let _x = x;
  let _y = y;
  while(_x > x - 5  && _y > y - 5 && _x >= 0 && _y >= 0){
    if(board[_y][_x] == board[y][x]) temple++;
    else isBlocked = true;
  }

  if((temple == 4 && isBlocked == false) || temple == 5) return true;
  else return false;
}

//Kiểm tra chéo trái
checkWinCrossoverLeft = (board, x, y) => {
  let isBlocked = false;
  let temple = 0;
  let _x = x;
  let _y = y;
  while(_x < x + 5  && _y > y - 5 && _x < ROWMAX && _y > 0){
    if(board[_y][_x] == board[y][x]) temple++;
    else isBlocked = true;
  }

  let _x = x;
  let _y = y;
  while(_x > x - 5  && _y < y + 5 && _x >= 0 && _y < COLMAX){
    if(board[_y][_x] == board[y][x]) temple++;
    else isBlocked = true;
  }

  if((temple == 4 && isBlocked == false) || temple == 5) return true;
  else return false;
}

