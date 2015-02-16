/* Variables */

var currentY = window.innerHeight/2;
var currentX = window.innerWidth/2;
var storage = [];
var options = {

    // Modify me to your liking!

    // Grid size
    grid: 20,
    // Canvas size
    height: window.innerHeight,
    width: window.innerWidth,
    // Speed of new lines
    speed: 1,
    // Boolean for random color generator
    randomColor: true,
    // Minimum brightness of random colors
    randomBrightness: 0,
    // Color of lines when random is disabled (RGB or Hex)
    lineColor: '#777',
    // Opacity of lines (0 to 1)
    lineOpacity: '0.5',
    // Background color
    bgColor: '#222'


};
var directions = {
    0: [0, options.grid],
    1: [options.grid, 0],
    2: [0, -options.grid],
    3: [-options.grid, 0]
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
        'x1': x1,
        'y1': y1,
        'x2': x2,
        'y2': y2
    });
}

// Makes a new stroke to add
function populate(){
    var ran = Math.floor(Math.random()*4);
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
        .data(data);
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