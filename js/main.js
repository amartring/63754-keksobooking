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

  var onGetSuccess = function (data) {
    bids = data.slice();
    window.render.renderPins(bids);
  };

  window.main = {
    Key: Key,
    map: map,
    mainPin: mainPin,
    getCoordsX: getCoordsX,
    getMainPinInfo: getMainPinInfo,
    onGetSuccess: onGetSuccess
  };
})();
