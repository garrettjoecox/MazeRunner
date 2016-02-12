(() => {
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
  }, options => {
    qs('#fade').checked = options.fade;
    qs('#delay').value = options.delay;
    qs('#lpt').value = options.lpt;
    qs('#speed').value = options.speed;
    qs('#grid').value = options.grid;
    qs('#length').value = options.length;
    qs('#color').value = options.color;
    qs('#random').checked = options.random;
    qs('#brightness').value = options.brightness;
  });
})();

qs('#save').addEventListener('click', () => {
  chrome.storage.sync.set({
    fade: qs('#fade').checked,
    delay: +qs('#delay').value,
    lpt: +qs('#lpt').value,
    speed: +qs('#speed').value,
    grid: qs('#grid').value,
    length: +qs('#length').value,
    color: qs('#color').value,
    random: qs('#random').checked,
    brightness: +qs('#brightness').value,
  }, () => {
    var s = qs('#save');
    s.innerHTML = 'Options Saved.';
    s.disabled = true;
    setTimeout(() => {
      s.innerHTML = 'Save';
      s.disabled = false;
    }, 1000);
  });
});

function qs(query) {
  return document.querySelector(query);
}