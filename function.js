function Ball(x, y, radius, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;

    this.draw = function() {
        this.ctx = myGameArea.context;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    };
    this.updatePos = function() {
        this.x += this.speedX;
        this.y += this.speedY;

        this.left = this.x - this.radius;
        this.right = this.x + this.radius;
        this.top = this.y - this.radius;
        this.bottom = this.y + this.radius;
    };
}

function Bar(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.isBegin = true;

    this.draw = function () {
        this.ctx = myGameArea.context;
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}
function Stone(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.notDestroy = true;

    this.draw = function () {
        this.ctx = myGameArea.context;
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    };
    this.delete = function () {
        this.ctx.clearRect(this.x, this.y, this.x + this.width, this.y + this.height);
    }
}
