'use strict';

(function () {
  var OBJECTS_COUNT = 8;
  var AVATAR = {
    begin: 'img/avatars/user0',
    end: '.png',
    minNumber: 1,
    maxNumber: 8
  };
  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var PRICE = {
    min: 1000,
    max: 1000000
  };
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS = [1, 2, 3, 100];
  var GUEST = {
    min: 1,
    max: 10
  };
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var LIMIT_Y = {
    min: 130,
    max: 630
  };
  var KeyCode = {
    ESC: 27
  };

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  var getUrls = function (min, max, begin, end) {
    var newArray = [];
    for (var i = min; i <= max; i++) {
      newArray.push(begin + i + end);
    }
    return newArray;
  };

  var getFeatures = function () {
    var array = [];
    var featuresCount = window.util.getRandomNumber(1, FEATURES.length);
    window.util.shuffleArray(FEATURES);
    for (var i = 0; i < featuresCount; i++) {
      array.push(FEATURES[i]);
    }
    return array;
  };

  var getCoordsX = function (block) {
    var limitX = block.getBoundingClientRect();
    return {
      min: Math.round(limitX.left),
      max: Math.round(limitX.right),
    };
  };

  var getLocation = function () {
    var location = [];
    var limitX = getCoordsX(map);
    for (var i = 0; i < OBJECTS_COUNT; i++) {
      location.push({});
      location[i].x = window.util.getRandomNumber(limitX.min, limitX.max);
      location[i].y = window.util.getRandomNumber(LIMIT_Y.min, LIMIT_Y.max);
    }
    return location;
  };

  var getAuthors = function () {
    var authors = [];
    var avatars = getUrls(AVATAR.minNumber, AVATAR.maxNumber, AVATAR.begin, AVATAR.end);
    window.util.shuffleArray(avatars);
    for (var i = 0; i < OBJECTS_COUNT; i++) {
      authors.push({});
      authors[i].avatar = avatars[i];
    }
    return authors;
  };

  var location = getLocation();

  var getOffers = function () {
    var offers = [];
    window.util.shuffleArray(TITLES);
    for (var i = 0; i < OBJECTS_COUNT; i++) {
      offers.push({});
      offers[i].title = TITLES[i];
      offers[i].address = location[i].x + ', ' + location[i].y;
      offers[i].price = window.util.getRandomNumber(PRICE.min, PRICE.max);
      offers[i].type = TYPES[window.util.getRandomNumber(0, TYPES.length - 1)];
      offers[i].rooms = ROOMS[window.util.getRandomNumber(0, ROOMS.length - 1)];
      offers[i].guests = window.util.getRandomNumber(GUEST.min, GUEST.max);
      offers[i].checkin = CHECKIN[window.util.getRandomNumber(0, CHECKIN.length - 1)];
      offers[i].checkout = CHECKOUT[window.util.getRandomNumber(0, CHECKOUT.length - 1)];
      offers[i].features = getFeatures();
      offers[i].description = '';
      offers[i].photos = window.util.shuffleArray(PHOTOS);
    }
    return offers;
  };

  var getAdvertsArray = function () {
    var adverts = [];
    var authors = getAuthors();
    var offers = getOffers();
    for (var i = 0; i < OBJECTS_COUNT; i++) {
      adverts.push({});
      adverts[i].author = authors[i];
      adverts[i].offer = offers[i];
      adverts[i].location = location[i];
    }
    return adverts;
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

  window.main = {
    KeyCode: KeyCode,
    LIMIT_Y: LIMIT_Y,
    map: map,
    mainPin: mainPin,
    getCoordsX: getCoordsX,
    getAdvertsArray: getAdvertsArray,
    getMainPinInfo: getMainPinInfo
  };
})();
