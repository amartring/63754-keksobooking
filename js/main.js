'use strict';

(function () {
  var Key = {
    ESC: 'Escape'
  };

  var bids = [];

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  var getCoordsX = function (block) {
    var limitX = block.getBoundingClientRect();
    return {
      min: Math.round(limitX.left),
      max: Math.round(limitX.right),
    };
  };

  var getMainPinInfo = function () {
    var mainPinInfo = mainPin.getBoundingClientRect();
    return {
      width: mainPinInfo.width,
      height: mainPinInfo.height,
      x: parseInt(mainPin.style.left, 10),
      y: parseInt(mainPin.style.top, 10)
    };
  };

  var cleanMap = function () {
    var mapPins = window.main.map.querySelectorAll('.map__pin:not(.map__pin--main)');
    var mapCard = window.main.map.querySelector('.map__card');
    mapPins.forEach(function (item) {
      item.remove();
    });
    if (mapCard) {
      mapCard.classList.add('hidden');
    }
  };

  var onGetSuccess = function (data) {
    bids = data.slice();
    window.render.renderPins(bids);
    window.util.switchDisable(window.form.notiseFormFielsets, false);

    var checkFilters = function () {
      var filteredAdverts;
      filteredAdverts = window.filter.filterAdverts(bids);
      filteredAdverts = window.filter.checkFeatures(filteredAdverts);

      if (filteredAdverts) {
        cleanMap();
        window.render.renderPins(filteredAdverts);
      }
    };

    window.form.mapFilters.forEach(function (item) {
      item.addEventListener('change', checkFilters);
    });

    window.filter.featuresList.forEach(function (item) {
      item.addEventListener('click', checkFilters);
    });
  };

  window.main = {
    Key: Key,
    map: map,
    mainPin: mainPin,
    getCoordsX: getCoordsX,
    getMainPinInfo: getMainPinInfo,
    cleanMap: cleanMap,
    onGetSuccess: onGetSuccess
  };
})();
