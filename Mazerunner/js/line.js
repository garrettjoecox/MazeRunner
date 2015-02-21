function Line(options){
    this.options = options;
    this.currentX = options.height/2;
    this.currentY = options.width/2;
    this.storage = [];
    this.lineCount = 0;
    this.directions = {
        0: [0, options.grid],
        1: [options.grid, 0],
        2: [0, -options.grid],
        3: [-options.grid, 0],
        4: [options.grid, options.grid],
        5: [-options.grid, -options.grid],
        6: [options.grid, -options.grid],
        7: [-options.grid, options.grid]
    };
    this.svg = d3.select('body').append('svg')
        .attr('height', options.height+'px')
        .attr('width', options.width+'px');
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
    var type = this.options.diagonalLines ? 8 : 4;
    var rand = this.directions[Math.floor(Math.random()*type)];
    var newX = this.currentX + rand[0];
    var newY = this.currentY + rand[1];
    if (newX > this.options.width+this.options.grid || newY > this.options.height+this.options.grid || newX < 0-this.options.grid || newY < 0-this.options.grid) return;
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