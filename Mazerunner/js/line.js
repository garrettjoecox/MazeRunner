function Line(options){
    this.options = options;
    this.currentX = window.innerWidth/2;
    this.currentY = window.innerHeight/2;
    this.storage = [];
    this.lineCount = 0;
    this.directions = {
        0: [0, this.options.lineLength],
        1: [this.options.lineLength, 0],
        2: [0, -this.options.lineLength],
        3: [-this.options.lineLength, 0],
        4: [this.options.lineLength, this.options.lineLength],
        5: [-this.options.lineLength, -this.options.lineLength],
        6: [this.options.lineLength, -this.options.lineLength],
        7: [-this.options.lineLength, this.options.lineLength]
    };
    this.svg = d3.select('body').append('svg')
        .attr('height', window.innerHeight+'px')
        .attr('width', window.innerWidth+'px');

    var line = this;
    setInterval(function(){
        line.populate();
        line.draw();
    },this.options.speed);
}

Line.prototype.draw = function(svg){
    if (this.options.randomColor){
        r = this.options.randomBrightness + Math.floor(Math.random()*(256 - this.options.randomBrightness));
        g = this.options.randomBrightness + Math.floor(Math.random()*(256 - this.options.randomBrightness));
        b = this.options.randomBrightness + Math.floor(Math.random()*(256 - this.options.randomBrightness));
        this.options.lineColor = "rgb(" + r + "," + g + "," + b + ")";
    }
    var line = this.svg.selectAll('line')
        .data(this.storage, function(d){ return d.id; });
    line.enter().append('line')
        .attr('x1', function(d){ return d.x1; })
        .attr('y1', function(d){ return d.y1; })
        .attr('x2', function(d){ return d.x2; })
        .attr('y2', function(d){ return d.y2; })
        .style('stroke', this.options.lineColor)
        .style('stroke-width', '1')
        .style('stroke-opacity', this.options.lineOpacity);
    line.exit().remove();
};

Line.prototype.populate = function(){
    var rand = this.directions[Math.floor(Math.random()*4)];
    if (this.options.grid === 'both') rand = this.directions[Math.floor(Math.random()*8)];
    if (this.options.grid === 'diagonal') rand = this.directions[Math.floor(Math.random()*8)+4];
    var newX = this.currentX + rand[0];
    var newY = this.currentY + rand[1];
    if (newX > window.innerWidth + this.options.lineLength || newY > window.innerHeight + this.options.lineLength || newX < 0 - this.options.lineLength || newY < 0 - this.options.lineLength) return;
    this.storage.push({
        id: this.lineCount,
        x1: this.currentX,
        y1: this.currentY,
        x2: newX,
        y2: newY
    });
    this.currentX = newX;
    this.currentY = newY;
    this.lineCount++;
    if (this.storage.length > this.options.lineFadeDelay && this.options.lineFade){
        this.storage.shift();
    }
};