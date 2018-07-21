function Cell(i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;

    this.data = ' ';
}

Cell.prototype.show = function () {
    stroke(0);
    fill(200);
    rect(this.x, this.y, this.w, this.w);
    textAlign(CENTER);
    fill(0);
    text(this.data, this.x + this.w * 0.5, this.y + this.w - 6);

};  