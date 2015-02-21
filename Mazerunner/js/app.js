var options = {
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
    lineFadeDelay: 50,
    // Background color
    bgColor: '#222'
};

var svg = d3.select('svg')
    .attr('height', options.height+'px')
    .attr('width', options.width+'px')
    .style('background', options.bgColor);

var line1 = new Line(options);

setInterval(function(){
    line1.populate();
    line1.draw(svg);
    setTime();
}, options.speed);

function setTime(){
    var time = moment(Date.now()).format('h:mm');
    d3.select(".clock").text(time);
}