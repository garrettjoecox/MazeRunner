/* Variables */
var options = {
    // Modify me to your liking!

    // Grid size
    grid: 25,
    // Toggles diagonal line drawing
    diagonalLines: true,
    // Canvas size
    height: window.innerHeight,
    width: window.innerWidth,
    // Speed of new lines
    speed: 1,
    // Toggles random line colors
    randomColor: true,
    // Minimum brightness of random colors
    randomBrightness: 100,
    // Color of lines when random is disabled (RGB or Hex)
    lineColor: 'white',
    // Opacity of lines (0 to 1)
    lineOpacity: '1',
    // Boolean for line fade
    lineFade: true,
    // Amount of lines before fade
    lineFadeDelay: 100,
    // Background color
    bgColor: '#222'
};

var currentY = options.height/2;
var currentX = options.width/2;
var storage = [];
var lineCount = 0;
var directions = {
    0: [0, options.grid],
    1: [options.grid, 0],
    2: [0, -options.grid],
    3: [-options.grid, 0],
    4: [options.grid, options.grid],
    5: [-options.grid, -options.grid],
    6: [options.grid, -options.grid],
    7: [-options.grid, options.grid]
};


/* Logic */

// Makes the canvas
var svg = d3.select("svg")
    .attr("height", options.height+"px")
    .attr("width", options.width+"px")
    .style("background", options.bgColor);

// Clock to run functions
setInterval(function(){
    if (options.randomColor) randomColor();
    populate();
    update(storage);
    setTime();
    if (storage.length > options.lineFadeDelay && options.lineFade){
        storage.shift();
    }
}, options.speed);


/* Functions */

function random(n){
    return Math.floor(Math.random()*n);
}

function randomColor(){
    var r = options.randomBrightness + random(256 - options.randomBrightness);
    var g = options.randomBrightness + random(256 - options.randomBrightness);
    var b = options.randomBrightness + random(256 - options.randomBrightness);
    var color = "rgb(" + r + "," + g + "," + b + ")";
    options.lineColor = color;
 }

// Adds a stroke to the storage
function add(x1, y1, x2, y2) {
    if (arguments.length < 4) return;
    storage.push({
        'count': lineCount,
        'x1': x1,
        'y1': y1,
        'x2': x2,
        'y2': y2
    });
    lineCount++;
}

// Makes a new stroke to add
function populate(){
    var thing = options.diagonalLines ? 8 : 4;
    var ran = Math.floor(Math.random()*thing);
    var dir = directions[ran];
    var newX = currentX + dir[0];
    var newY = currentY + dir[1];
    if (newX > options.width+options.grid || newY > options.height+options.grid || newX < 0-options.grid || newY < 0-options.grid) return;
    add(currentX, currentY, newX, newY);
    currentX = newX;
    currentY = newY;
}

// Adds any new strokes in storage to canvas
function update(data) {
    var line = svg.selectAll("line")
        .data(data, function(thing){return thing.count;});

    line.enter().append("line")
        .attr("x1", function(d){ return d.x1; })
        .attr("y1", function(d){ return d.y1; })
        .attr("x2", function(d){ return d.x2; })
        .attr("y2", function(d){ return d.y2; })
        .style("stroke", options.lineColor)
        .style("stroke-width", "1")
        .style("stroke-opacity", options.lineOpacity);

    line.exit().remove();
}

// Updates clock
function setTime(){
    var time = moment(Date.now()).format('h:mm');
    d3.select(".clock").text(time);
}