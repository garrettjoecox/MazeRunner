
/* Main line constructor */
function Line(options){
    // Setting default values & transfering the options object
    this.options = options;
    this.currentX = window.innerWidth/2;
    this.currentY = window.innerHeight/2;
    this.storage = [];
    this.lineCount = 0;
    this.conflicts = 0;

    // Where populate pulls it's random directions from
    // [0] is change in X while [1] is change in Y
    // both are dynamic to the lineLength option
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

    // Putting a new SVG onto the page for the lines to be drawn on
    this.svg = d3.select('body').append('svg')
        .attr('height', window.innerHeight+'px')
        .attr('width', window.innerWidth+'px');

    // Setting the interval with the give speed that populates and draws
    var line = this;
    setInterval(function(){
        for (var i = 0; i < this.options.lpt; i++) {
            line.populate();
            line.draw();
        }
    },this.options.speed);
}

/* Populates the storage with line nodes */
Line.prototype.populate = function(){
    // Generating a random direction change in X and Y using the directions obj
    var rand = this.directions[Math.floor(Math.random()*4)];
    if (this.options.grid === 'both') rand = this.directions[Math.floor(Math.random()*8)];
    if (this.options.grid === 'diagonal') rand = this.directions[Math.floor(Math.random()*4)+4];

    // Calculating the new X and Y in relation to the current X and Y
    var newX = this.currentX + rand[0];
    var newY = this.currentY + rand[1];

    // Breaks out if the new X and Y are outside the boundaries of the view
    if (newX > window.innerWidth + this.options.lineLength || newY > window.innerHeight + this.options.lineLength || newX < 0 - this.options.lineLength || newY < 0 - this.options.lineLength) return;

    // Inefficent line detection stuff
    if (this.options.lineDetection){
        if (this.conflicts > 10){
            var newPos = this.storage[Math.floor(Math.random()*this.storage.length)];
            this.currentX = newPos.x1;
            this.currentY = newPos.y1;
            this.conflicts = 0;
            if (this.options.randomColor){
                r = this.options.randomBrightness + Math.floor(Math.random()*(256 - this.options.randomBrightness));
                g = this.options.randomBrightness + Math.floor(Math.random()*(256 - this.options.randomBrightness));
                b = this.options.randomBrightness + Math.floor(Math.random()*(256 - this.options.randomBrightness));
                this.options.lineColor = "rgb(" + r + "," + g + "," + b + ")";
            }
            return;
        } else {
            for (var i = 0; i < this.storage.length; i++) {
                if ((newX === this.storage[i].x1 && newY === this.storage[i].y1) || (newX === this.storage[i].x2 && newY === this.storage[i].y2)) {
                    this.conflicts++;
                    return;
                }
            }
        }
    }
    this.conflicts = 0;

    // Pushing the new node to the storage
    this.storage.push({
        id: this.lineCount,
        x1: this.currentX,
        y1: this.currentY,
        x2: newX,
        y2: newY
    });

    // Resetting the current X and Y, incrementing the linecount
    this.currentX = newX;
    this.currentY = newY;
    this.lineCount++;

    // If the current storage's length is greater than the desired length shift it
    if (this.storage.length > this.options.lineFadeDelay && this.options.lineFade){
        this.storage.shift();
    }
};

/* Draws the corrosponding lines onto the svg from storage */
Line.prototype.draw = function(){
    // Generates random color
    if (this.options.randomColor && !this.options.lineDetection){
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
