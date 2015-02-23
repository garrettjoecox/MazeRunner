var options = {
    // 'square', 'diagonal', or 'both'
    grid: 'both',
    // Speed of new lines
    speed: 1,
    // Length of each line
    lineLength: 25,
    // Color of lines
    lineColor: 'red',
    // Opacity of lines (0 to 1)
    lineOpacity: 1,
    // Toggles line fading
    lineFade: true,
    // Amount of lines before fade
    lineFadeDelay: 50,
    // Toggles random line colors (overwrites color)
    randomColor: true,
    // Minimum brightness of random colors
    randomBrightness: 100
};

// Draws a new line with the options set above
new Line(options);

/// Duplicates the options object
// var options2 = Object.create(options);
// Changing properties on the new options object
// options2.lineColor = 'white';
// options2.randomColor = false;
// options2.lineOpacity = 0.25;
// options2.lineFadeDelay = 100;
// Draws a new line with the new options
// new Line(options2);

/* Clock Logic */
setTime();

setInterval(function(){
    setTime();
}, 60000);

function setTime(){
    var time = moment(Date.now()).format('h:mm');
    d3.select(".clock").text(time);
}