var ext = window.chrome || window.browser;

(function () {
  ext.storage.sync.get({
    backgroundColor: '#323234',
    randomOptions: false,
    fade: true,
    delay: 10000,
    lpt: 100,
    grid: 'square',
    length: 30,
    color: 'rgba(0,0,0,0.1)',
    random: false,
    brightness: 100,
    showOptionsButton: false
  }, function (options) {
    qs('#backgroundColor').value = options.backgroundColor;
    qs('#randomOptions').checked = options.randomOptions;
    qs('#fade').checked = options.fade;
    qs('#delay').value = options.delay;
    qs('#lpt').value = options.lpt;
    qs('#grid').value = options.grid;
    qs('#length').value = options.length;
    qs('#color').value = options.color;
    qs('#random').checked = options.random;
    qs('#brightness').value = options.brightness;
    qs('#showOptionsButton').checked = options.showOptionsButton;
  });
})();

qs('#form').addEventListener('input', function () {
  ext.storage.sync.set({
    backgroundColor: qs('#backgroundColor').value,
    randomOptions: qs('#randomOptions').checked,
    fade: qs('#fade').checked,
    delay: +qs('#delay').value,
    lpt: +qs('#lpt').value,
    grid: qs('#grid').value,
    length: +qs('#length').value,
    color: qs('#color').value,
    random: qs('#random').checked,
    brightness: +qs('#brightness').value,
    showOptionsButton: qs('#showOptionsButton').checked
  }, function () {});
});

function qs(query) {
  return document.querySelector(query);
}
