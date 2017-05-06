$(document).ready(function(){
  $('.engoification').click(function(){
    let mazeSize = Number($('.mazeInput').val());
    if (Number.isNaN(mazeSize) || mazeSize < 3 || mazeSize > 500){
      alert('that is not a valid number D:');
      $('.mazeInput').val('')
    } else {
      $('.maze').children('div').remove();
      build(mazeSize);
    }
  })
  const build = function(n) {
    console.log(n)
    let theMatrix = [];
    for (let i = 0; i < n; i++){
      theMatrix.push([]);
      for (let j = 0; j < n; j++) {
        theMatrix[i].push(0);
      }
    }
    theMatrix[0][0] = 1;
    let moves = {'high': [[0,1], [1,0]], 'medium': [], 'low': [], 'total': 2};
    pathFinder(theMatrix, moves, n);
    console.log(theMatrix, moves);
    fillEmptySpace(theMatrix, moves, n);
    console.log(theMatrix, moves);
    theMatrix = placeWalls(theMatrix, n);
    removeWalls(theMatrix);
    console.log(theMatrix);
    render(theMatrix);
    display(theMatrix);
  }
  const placeWalls = function(arr, n) {
    let result = [];
    let wall = ['X'];
    for (let i = 0; i < n; i++) {
      wall.push('══');
      wall.push('X');
    }
    result.push(wall.slice());
    for (let i = 0; i < n; i++) {
      result.push(['║'])
      for (let j = 0; j < n; j++) {
        result[result.length - 1].push(arr[i][j])
        result[result.length - 1].push(' ║');
      }
      result.push(wall.slice())
    }
    return result;
  }

  const removeWalls = function(arr) {
    for (let i = 1; i < arr.length; i += 2){
      for (let j = 1; j < arr[i].length; j += 2){
        console.log(arr[i][j])
        if (arr[i][j] === 1 || arr[i][j] === 5){
          arr[i - 1][j] = '  ';
        } else if (arr[i][j] === 2 || arr[i][j] === 6){
          arr[i][j + 1] = '  ';
        } else if (arr[i][j] === 3 || arr[i][j] === 7){
          arr[i + 1][j] = '  ';
        } else if (arr[i][j] === 4 || arr[i][j] === 8){
          arr[i][j - 1] = '  ';
        }
        arr[i][j] = ' ';
      }
    }
    arr[arr.length - 1][arr.length - 2] = '  ';
  }

  const render = function(arr){
    const key = {'1111': '╬', '1101': '╩', '1011': '╣', '0111': '╦', '1110': '╠', '0110': '╔', '0011': '╗', '1001': '╝', '1100': '╚', '1010': '║', '1000': '║', '0010': '║', '0101': '═', '0100': '═', '0001': '═' };
    let val = 0
    for (let i = 0; i < arr.length; i += 2){
      for (let j = 0; j < arr[i].length; j += 2) {
        if (i > 0 && arr[i - 1][j] !== '  '){
          val += 1000
        }
        if (i < arr.length - 1 && arr[i + 1][j] !== '  '){
          val += 10
        }
        if (j > 0 && arr[i][j - 1] !== '  ') {
          val += 1
        }
        if (j < arr[i].length - 1 && arr[i][j + 1] !== '  '){
          val += 100;
        }
        val = val.toString();
        while (val.length < 4) {
          val = '' + 0 + val;
        }
        arr[i][j] = key[val];
        val = 0;
      }
    }
  }

  const display = function(arr) {
    let $div;
    for (let i = 0; i < arr.length; i++) {
      $div = $('<div class="line"></div>');
      $div.text(arr[i].join(''))
      $div.appendTo($('.maze'))
    }
  }

  const fillEmptySpace = function(arr, moves, n) {
    let x, y, move, adjacent;
    while (moves['total'] > 0){
      move = findMove(moves);
      x = move[0];
      y = move[1];
      if (arr[x][y] === 0) {
        adjacent = findAdjacent(arr, [x, y], n, true);
        move = adjacent[Math.floor(Math.random() * adjacent.length)];
        arr[x][y] = move[3];
        adjacent = findAdjacent(arr, [x, y], n, false)
        for (let i = 0; i < adjacent.length; i++){
          placeMove(moves, [adjacent[i][0], adjacent[i][1]], n);
        }
      }
    }
  }

  const pathFinder = function(arr, moves, n) {
    let x = 0;
    let y = 0;
    let path = [];
    let move = [];
    let adjacent = [];

    while (x / (n - 1) < .75 || y / (n - 1) < .75) {
      adjacent = findAdjacent(arr, [x, y], n, false);
      if (adjacent.length === 0){
        if (path.length === 0) {
          return;
        }
        move = path.pop();
        x = move[0];
        y = move[1];
      } else {
        move = adjacent[Math.floor(Math.random() * adjacent.length)];
        path.push([x, y]);
        x = move[0];
        y = move[1];
        arr[x][y] = move[2];
        for (let i = 0; i < adjacent.length; i++){
          if (adjacent[i] !== move){
            placeMove(moves, [adjacent[i][0], adjacent[i][1]], n)
          }
        }
      }
    }
  }

  const placeMove = function(moves, move, n){
    if (move[0] / (n - 1) < .15 || move[1] / (n - 1) < .15 || move[0] / (n - 1) > .85 || move[1] / (n - 1) > .85 ) {
      moves['high'].push(move)
    } else if (move[0] / (n - 1) < .35 || move[1] / (n - 1) < .35 || move[0] / (n - 1) > .65 || move[1] / (n - 1) > .65 ) {
      moves['medium'].push(move);
    } else {
      moves['low'].push(move);
    }
    moves['total']++;
  }

  const findAdjacent = function(arr, loc, n, falsey){

    let result = [];
    let x = loc[0];
    let y = loc[1]

    if (x > 0 && !!(arr[x - 1][y]) === falsey){
      result.push([x - 1, y, 3, 5]);
    }
    if (x < n - 1 && !!(arr[x + 1][y]) === falsey){
      result.push([x + 1, y, 1, 7]);
    }
    if (y < n - 1 && !!(arr[x][y + 1]) === falsey){
      result.push([x, y + 1, 4, 6]);
    }
    if (y > 0 && !!(arr[x][y - 1]) === falsey){
      result.push([x, y - 1, 2, 8]);
    }
    return result;
  }

  const findMove = function(moves) {
    let priority = Math.floor(Math.random() * 100);
    moves['total']--;
    if (moves['low'].length === 0) {
      priority += 18;
    }
    if (moves['medium'].length === 0) {
      priority += 50;
    }
    if (priority >= 50 && moves['high'].length > 0) {
      return pickMove(moves['high']);
    }
    if (priority >= 18 && moves['medium'].length > 0) {
      return pickMove(moves['medium']);
    }
    return pickMove(moves['low']);
  }
  const pickMove = function(moves) {
    const moveIndex = Math.floor(Math.random() * moves.length);
    let move;
    if (moveIndex === moves.length - 1){
      return moves.pop();
    } else {
      move = moves[moveIndex];
      moves[moveIndex] = moves.pop();
      return move;
    }
  }
})