document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get({
    fade: true,
    delay: 1000,
    lpt: 100,
    speed: 1,
    grid: 'diagonal',
    length: 20,
    color: '#FFFFFF',
    random: true,
    brightness: 100
  }, options => new Line(document.querySelector('#canvas'), options));

  document.querySelector('#button').addEventListener('click', () => chrome.runtime.openOptionsPage());
});

function Line(canvas, options) {
  var self = this;

  self.options = options;
  self.canvas = canvas;
  self.canvas.height = window.innerHeight;
  self.canvas.width = window.innerWidth;
  self.currentX = self.canvas.width / 2;
  self.currentY = self.canvas.height / 2;
  self.ctx = self.canvas.getContext('2d');
  self.nodes = [];
  self.id = 0;
  self.ctx.strokeStyle = '#FFFFFF';

  self.possibilities = {
    0: [0, self.options.length],
    1: [self.options.length, 0],
    2: [0, -self.options.length],
    3: [-self.options.length, 0],
    4: [self.options.length, self.options.length],
    5: [-self.options.length, -self.options.length],
    6: [self.options.length, -self.options.length],
    7: [-self.options.length, self.options.length]
  };

  self.render();
}

Line.prototype.step = function() {
  var self = this;

  var ran;
  if (self.options.grid === 'both') ran = Math.floor(Math.random()*8);
  else if (self.options.grid === 'diagonal') ran = Math.floor(Math.random()*4) + 4;
  else ran = Math.floor(Math.random()*4);
  var newX = self.currentX + self.possibilities[ran][0];
  var newY = self.currentY + self.possibilities[ran][1];
  var color;

  if (newX > self.canvas.width + self.options.length || newY > self.canvas.height + self.options.length || newX < 0 - self.options.length || newY < 0 - self.options.length) {
  } else {
    if (self.options.random) {
      var r = self.options.brightness + Math.floor(Math.random() * (256 - self.options.brightness));
      var g = self.options.brightness + Math.floor(Math.random() * (256 - self.options.brightness));
      var b = self.options.brightness + Math.floor(Math.random() * (256 - self.options.brightness));
      color = `rgb(${r},${g},${b})`;
    } else color = self.options.color;

    self.nodes.push({
      id: self.id++,
      x1: self.currentX,
      y1: self.currentY,
      x2: newX,
      y2: newY,
      color: color
    });

    if (self.options.fade && self.nodes.length > self.options.delay) self.nodes.shift();

    self.currentX = newX;
    self.currentY = newY;
  }
};

Line.prototype.render = function() {
  var self = this;
  self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
  self.nodes.forEach(node => {
    self.ctx.beginPath();
    self.ctx.strokeStyle = node.color;
    self.ctx.moveTo(node.x1, node.y1);
    self.ctx.lineTo(node.x2, node.y2);
    self.ctx.stroke();
  });
  requestAnimationFrame(() => {
    for (var i = 0; i < self.options.lpt; i++) {
      self.step();
    }
    self.render();
  });
}; 