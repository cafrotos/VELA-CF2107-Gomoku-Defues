const WIN = 4;
const NOT_BLOCKED = 0;
const BLOCKED_ONE_HEAD = 1;
const BLOCK_X = 'x';
const BLOCK_O = 'o';
const BLOCK_EMPTY = ' ';

let widthw = window.innerWidth;
let heightw = window.innerHeight;
let w = 20;
let grid;
let COLMAX = Math.floor(widthw / w) - 2;
let ROWMAX = Math.floor(heightw / w) - 2;
let tempClick = 0;
let isOver = true;

function make2DArray() {
	let arr = new Array(cols);
	for (let i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

function setup() {
	createCanvas(widthw, heightw);

	cols = Math.floor(widthw / w) - 2;
	rows = Math.floor(heightw / w) - 2;

	grid = make2DArray(cols, rows);

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j] = new Cell(i, j, w);
		}
	}
}

function mousePressed() {
	let y = Math.floor(mouseX / w);
	let x = Math.floor(mouseY / w);
	if (grid[y][x].data == BLOCK_EMPTY) {
		tempClick++;
		if (tempClick % 2 == 0) {
			grid[y][x].data = BLOCK_X;
		}
		else grid[y][x].data = BLOCK_O;
	}
	GameOver(x, y);
}


function GameOver(x, y) {
	let rowStatus = checkWinRow(x, y);
	let colStatus = checkWinCol(x, y);
	let crossoverLeftStatus = checkWinCrossoverLeft(x, y);
	let crossoverRightStatus = checkWinCrossoverRight(x, y);
	if (rowStatus || colStatus || crossoverLeftStatus || crossoverRightStatus) {
		alert(grid[y][x].data + ' is win');
	}
}


// Kiểm tra điều kiện thắng hàng ngang
function checkWinRow(x, y) {
	let blocked = NOT_BLOCKED;
	let count = 1;
	for (let i = x + 1; grid[y][i].data != BLOCK_EMPTY && i < ROWMAX; i++) {
		if (grid[y][i].data == grid[y][x].data) count++;
		else blocked++;
	}

	for (let i = x - 1; grid[y][i].data != BLOCK_EMPTY && i >= 0; i--) {
		if (grid[y][i].data == grid[y][x].data) count++;
		else blocked++;
	}

	if (count == WIN && blocked == 0) return true;
	else if(count > WIN && blocked == BLOCKED_ONE_HEAD) return true;
  else return false;
}

//Kiểm tra điều kiện thắng hàng dọc
function checkWinCol(x, y) {
	let blocked = NOT_BLOCKED;
	let count = 1;
	for (let i = y + 1; grid[i][x].data != BLOCK_EMPTY && i < COLMAX; i++) {
		if (grid[i][x].data == grid[y][x].data) count++;
		else blocked++;
	}

	for (let i = y - 1; grid[i][x].data != BLOCK_EMPTY && i >= 0; i--) {
		if (grid[i][x].data == grid[y][x].data) count++;
		else blocked++
	}

	if (count == WIN && blocked == NOT_BLOCKED) return true;
	else if(count > WIN && blocked == BLOCKED_ONE_HEAD) return true;
  else return false;
}
//Kiểm tra chéo phải
function checkWinCrossoverRight(x, y) {
	console.log(grid[y][x].data);
	let blocked = NOT_BLOCKED;
	let count = 1;
	let _x = x + 1;
	let _y = y + 1;
	while (_x < x + 6 && _y < y + 6 && grid[_y][_x].data != BLOCK_EMPTY && _x < ROWMAX && _y < COLMAX) {
		if (grid[_y][_x].data === grid[y][x].data) count++;
		else blocked++;
		_x++;
		_y++;
	}

	_x = x - 1;
	_y = y - 1;
	while (_x > x - 7 && _y > y - 7 && grid[_y][_x].data != BLOCK_EMPTY && _x >= 0 && _y >= 0) {
		if (grid[_y][_x].data === grid[y][x].data) count++;
		else blocked++;
		_x--;
		_y--;
	}

	if (count == WIN && blocked == NOT_BLOCKED) return true;
	else if(count > WIN && blocked == BLOCKED_ONE_HEAD) return true;
  else return false;
}

//Kiểm tra chéo trái
function checkWinCrossoverLeft(x, y) {
	let blocked = NOT_BLOCKED;
	let count = 1;
	let _x = x + 1;
	let _y = y - 1;
	while (_x < x + 6 && _y > y - 7 && grid[_y][_x].data != BLOCK_EMPTY && _x < ROWMAX && _y >= 0) {
		if (grid[_y][_x].data == grid[y][x].data) count++;
		else blocked++;
		_x++;
		_y--;
	}

	_x = x - 1;
	_y = y + 1;
	while (_x > x - 7 && _y < y + 6 && grid[_y][_x].data != BLOCK_EMPTY && _x >= 0 && _y < COLMAX) {
		if (grid[_y][_x].data == grid[y][x].data) count++;
		else blocked++;
		_x--;
		_y++
	}

	if (count == WIN && blocked == NOT_BLOCKED) return true;
	else if(count > WIN && blocked == BLOCKED_ONE_HEAD) return true;
  else return false;
}


function draw() {
	background(255);
	for (let i = 0; i < cols - 2; i++) {
		for (let j = 2; j < rows; j++) {
			grid[i][j].show();
		}
	}
}