var options = {
    // 'square', 'diagonal', or 'both'
    grid: 'diagonal',
    // Speed of new lines
    speed: 1,
    // Number of lines drawn per tick
    lpt: 10,
    // Length of each line
    lineLength: 10,
    // Color of lines
    lineColor: 'white',
    // Opacity of lines (0 to 1)
    lineOpacity: 1,
    // Toggles line fading
    lineFade: false,
    // Amount of lines before fade
    lineFadeDelay: 100,
    // Toggles random line colors (overwrites color)
    randomColor: false,
    // Minimum brightness of random colors
    randomBrightness: 100,
    // Path detection
    lineDetection: true
};

new Line(options);
