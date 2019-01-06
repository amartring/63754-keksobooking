'use strict';

(function () {
  var calcStartCoords = function (evt) {
    return {
      x: evt.clientX + window.render.PIN.width / 2,
      y: evt.clientY + window.render.PIN.height / 2
    };
  };

  var calcShiftCoords = function (moveEvt, startCoords) {
    return {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
  };

  var calcNewCoords = function (moveEvt, shift, block) {
    var limitX = window.main.getCoordsX(block);
    var limitY = window.main.LIMIT_Y;
    var elementCoords = {
      x: moveEvt.clientX - shift.x,
      y: moveEvt.clientY - shift.y
    };
    elementCoords.x = elementCoords.x < limitX.min ? limitX.min : elementCoords.x;
    elementCoords.x = elementCoords.x > limitX.max - window.render.PIN.width ? limitX.max - window.render.PIN.width : elementCoords.x;
    elementCoords.y = elementCoords.y < limitY.min - window.render.PIN.height / 2 ? limitY.min - window.render.PIN.height / 2 : elementCoords.y;
    elementCoords.y = elementCoords.y > limitY.max ? limitY.max : elementCoords.y;
    return elementCoords;
  };

  window.main.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = calcStartCoords(evt);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = calcShiftCoords(moveEvt, startCoords);
      startCoords = calcStartCoords(moveEvt);
      var finalPinCoords = calcNewCoords(moveEvt, shift, window.main.map);

      window.main.mainPin.style.left = finalPinCoords.x + window.render.Unit.POSITION;
      window.main.mainPin.style.top = finalPinCoords.y + window.render.Unit.POSITION;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.main.map.classList.remove('map--faded');
      window.filters.activateForm();
      window.filters.changePinPosition();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
