class Activity {
  constructor() {} 
  
  d20Roll(min = 1, max = 20) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16)
  }
}

module.exports = Activity
