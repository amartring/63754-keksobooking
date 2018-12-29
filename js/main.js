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
  var TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var ROOM = {
    min: 1,
    max: 5
  };
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
  var LOCATION_Y = {
    min: 130,
    max: 630
  };

  var adverts = [];

  var getUrls = function (min, max, begin, end) {
    var newArray = [];
    for (var i = min; i <= max; i++) {
      newArray.push(begin + i + end);
    }
    return newArray;
  };

  var avatars = getUrls(AVATAR.minNumber, AVATAR.maxNumber, AVATAR.begin, AVATAR.end);

  var getFeatures = function () {
    var array = [];
    var featuresCount = window.util.getRandomNumber(1, FEATURES.length);
    window.util.shuffleArray(FEATURES);
    for (var i = 0; i < featuresCount; i++) {
      array.push(FEATURES[i]);
    }
    return array;
  };

  var getAuthors = function () {
    var authors = [];
    window.util.shuffleArray(avatars);
    for (var i = 0; i < OBJECTS_COUNT; i++) {
      authors.push({});
      authors[i].avatar = avatars[i];
    }
    return authors;
  };

  var getOffers = function () {
    var offers = [];
    window.util.shuffleArray(TITLES);
    for (var i = 0; i < OBJECTS_COUNT; i++) {
      offers.push({});
      offers[i].title = TITLES[i];
      offers[i].price = window.util.getRandomNumber(PRICE.min, PRICE.max);
      offers[i].type = TYPE[window.util.getRandomNumber(0, TYPE.length - 1)];
      offers[i].rooms = window.util.getRandomNumber(ROOM.min, ROOM.max);
      offers[i].guests = window.util.getRandomNumber(GUEST.min, GUEST.max);
      offers[i].checkin = CHECKIN[window.util.getRandomNumber(0, CHECKIN.length - 1)];
      offers[i].checkout = CHECKOUT[window.util.getRandomNumber(0, CHECKOUT.length - 1)];
      offers[i].features = getFeatures();
      offers[i].description = '';
      offers[i].photos = window.util.shuffleArray(PHOTOS);
    }
    return offers;
  };

  // var getLocation = function () {
  //   var location = [];
  //   for (var i = 0; i < OBJECTS_COUNT; i++) {
  //     offers.push({});
  //     location[i].title = TITLES[i];
  //     location[i].y = getRandomNumber(LOCATION_Y.min, LOCATION_Y.max);
  //   }
  //   return location;
  // };

  var getAdvertsArray = function () {
    var authors = getAuthors();
    var offers = getOffers();
    for (var i = 0; i < OBJECTS_COUNT; i++) {
      adverts.push({});
      adverts[i].author = authors[i];
      adverts[i].offer = offers[i];
    }
    return adverts;
  };

  window.main = {
    getAdvertsArray: getAdvertsArray
  };
})();
