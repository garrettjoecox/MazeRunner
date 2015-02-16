/* Variables */

var currentY = window.innerHeight/2;
var currentX = window.innerWidth/2;
var storage = [];
var options = {
    grid: 20,
    height: window.innerHeight,
    width: window.innerWidth,
    speed: 1,
    lineColor: '#FFF',
    bgColor: '#222'
}
var directions = {
    0: [0, options.grid],
    1: [options.grid, 0],
    2: [0, -options.grid],
    3: [-options.grid, 0]
}


/* Logic */

// Makes the canvas
var svg = d3.select("svg")
    .attr("height", options.height+"px")
    .attr("width", options.width+"px")
    .style("background", options.bgColor);

// Clock to run functions
setInterval(function(){
    populate();
    update(storage);
}, options.speed);


/* Functions */

// Adds a stroke to the storage
function add(x1, y1, x2, y2) {
    if (arguments.length < 4) return;
    storage.push({
        'x1': x1,
        'y1': y1,
        'x2': x2,
        'y2': y2
    });
};

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
};

// Adds any new strokes in storage to canvas
function update(data) {
    var line = svg.selectAll("line")
        .data(data);
    line.enter().append("line")
        .attr("x1", function(d){return d.x1})
        .attr("y1", function(d){return d.y1})
        .attr("x2", function(d){return d.x2})
        .attr("y2", function(d){return d.y2})
        .style("stroke",options.lineColor)
        .style("stroke-width", "1")
        .style("stroke-opacity", "0.05");
    line.exit().remove();
};