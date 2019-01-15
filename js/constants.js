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
  var MAIN_PIN = {
    left: 570,
    top: 375
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
  var PRICE = {
    min: 10000,
    max: 50000
  };
  var PRICE_FILTER = {
    low: 'low',
    middle: 'middle',
    high: 'high'
  };
  var NO_FILTER = 'any';

  window.constants = {
    LINK: LINK,
    FEATURE: FEATURE,
    CHECK: CHECK,
    IMG: IMG,
    MAIN_PIN: MAIN_PIN,
    PIN: PIN,
    LIMIT_Y: LIMIT_Y,
    NEEDLE_HEIGHT: NEEDLE_HEIGHT,
    MAX_PRICE: MAX_PRICE,
    PRICE: PRICE,
    PRICE_FILTER: PRICE_FILTER,
    NO_FILTER: NO_FILTER
  };
})();
