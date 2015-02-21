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
    lineFadeDelay: 100
};

// The commented out lines below is how to create more instances of lines
// You can even make seperate options objects and pass in different options for each line

// var options2 = Object.create(options);
// options2.diagonalLines = false;
// options2.randomColor = false;
// options2.lineColor = 'white';
// options2.lineOpacity = '0.5';

var line = new Line(options);
// var line2 = new Line(options2);

setInterval(function(){
    line.populate();
    line.draw();
    // line2.populate();
    // line2.draw();
    setTime();
}, options.speed);

function setTime(){
    var time = moment(Date.now()).format('h:mm');
    d3.select(".clock").text(time);
}