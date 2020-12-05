class Horse {
  constructor() {
    this.position = 0;
    this.horse_id = '';
    this.owner_id = '';
    this.color = '';
  }

  constructor(position, horse_id, color){
    this.position = position;
    this.horse_id = horse_id;
    this.color = color;
  }

  isMovable() {

  }

  setMove(step, isPositive) {
    if (isPositive) {
      this.position += step;
      if (this.position - 14*this.owner_id > 56) {
        return false;
      } 
      else {
        return true;
      }
    }
    else {
      this.position -= step;
      if (this.position - 14*this.owner_id <= 0) {
        return false;
      } 
      else {
        return true;
      }
    }
  }
}

module.exports.Horse = Horse;