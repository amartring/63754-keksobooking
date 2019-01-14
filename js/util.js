'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var randomNumber = getRandomNumber(0, i);
      var temp = array[i];
      array[i] = array[randomNumber];
      array[randomNumber] = temp;
    }
    return array;
  };

  var makeElement = function (tegName, classNameFirst, text, classNameSecond) {
    var element = document.createElement(tegName);
    element.classList.add(classNameFirst);
    element.textContent = text || '';
    if (classNameSecond) {
      element.classList.add(classNameSecond);
    }
    return element;
  };

  var setPosition = function (element, left, top) {
    element.style.left = left + window.render.Unit.POSITION;
    element.style.top = top + window.render.Unit.POSITION;
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    shuffleArray: shuffleArray,
    makeElement: makeElement,
    setPosition: setPosition
  };
})();
