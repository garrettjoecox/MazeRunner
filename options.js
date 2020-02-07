var ext = window.chrome || window.browser;

(function () {
  ext.storage.sync.get({
    fade: true,
    delay: 1000,
    lpt: 100,
    grid: 'diagonal',
    length: 5,
    color: '#FFFFFF',
    random: true,
    brightness: 100
  }, function (options) {
    qs('#fade').checked = options.fade;
    qs('#delay').value = options.delay;
    qs('#lpt').value = options.lpt;
    qs('#grid').value = options.grid;
    qs('#length').value = options.length;
    qs('#color').value = options.color;
    qs('#random').checked = options.random;
    qs('#brightness').value = options.brightness;
  });
})();

qs('#save').addEventListener('click', function () {
  ext.storage.sync.set({
    fade: qs('#fade').checked,
    delay: +qs('#delay').value,
    lpt: +qs('#lpt').value,
    grid: qs('#grid').value,
    length: +qs('#length').value,
    color: qs('#color').value,
    random: qs('#random').checked,
    brightness: +qs('#brightness').value,
  }, function () {
    var s = qs('#save');
    s.innerHTML = 'Options Saved.';
    s.disabled = true;
    setTimeout(function () {
      s.innerHTML = 'Save';
      s.disabled = false;
    }, 1000);
  });
});

function qs(query) {
  return document.querySelector(query);
}
