'use strict';

(function () {
  var LINK = ' для ';
  var FEATURE = {
    teg: 'li',
    classFirst: 'popup__feature',
    classSecond: 'popup__feature--'
  };
  var CHECK = {
    in: 'Заезд после ',
    out: ', выезд до '
  };
  var IMG = {
    tag: 'img',
    className: 'popup__photo',
    width: 45,
    height: 40,
    alt: 'Фотография жилья'
  };
  var PIN = {
    width: 50,
    height: 70
  };
  var LIMIT_Y = {
    min: 130,
    max: 630
  };
  var NEEDLE_HEIGHT = 22;
  var MAX_PRICE = 1000000;


  window.constants = {
    LINK: LINK,
    FEATURE: FEATURE,
    CHECK: CHECK,
    IMG: IMG,
    PIN: PIN,
    LIMIT_Y: LIMIT_Y,
    NEEDLE_HEIGHT: NEEDLE_HEIGHT,
    MAX_PRICE: MAX_PRICE
  };
})();
