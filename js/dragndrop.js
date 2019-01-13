'use strict';

(function () {
  var activated = false;

  var calcStartCoords = function (evt) {
    return {
      x: evt.pageX + window.constants.PIN.width / 2,
      y: evt.pageY + window.constants.PIN.height / 2
    };
  };

  var calcShiftCoords = function (moveEvt, startCoords) {
    return {
      x: startCoords.x - moveEvt.pageX,
      y: startCoords.y - moveEvt.pageY
    };
  };

  var calcNewCoords = function (moveEvt, shift, block) {
    var limitX = window.main.getCoordsX(block);
    var limitY = window.constants.LIMIT_Y;
    var blockCoords = calcBlockCoords(block);
    var elementCoords = {
      x: moveEvt.pageX - shift.x - blockCoords.left,
      y: moveEvt.pageY - shift.y - blockCoords.top
    };
    var minX = limitX.min - blockCoords.left - window.constants.PIN.width / 2;
    var maxX = limitX.max - blockCoords.left - window.constants.PIN.width / 2;
    var minY = limitY.min - window.constants.PIN.height / 2;
    elementCoords.x = elementCoords.x < minX ? minX : elementCoords.x;
    elementCoords.x = elementCoords.x > maxX ? maxX : elementCoords.x;
    elementCoords.y = elementCoords.y < minY ? minY : elementCoords.y;
    elementCoords.y = elementCoords.y > limitY.max ? limitY.max : elementCoords.y;
    return elementCoords;
  };

  var calcBlockCoords = function (block) {
    var blockCoords = block.getBoundingClientRect();
    return {
      top: blockCoords.top + pageYOffset,
      left: blockCoords.left + pageXOffset
    };
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
      if (activated === false) {
        window.form.activateForm();
        activated = true;
      }
      window.form.changePinPosition();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
