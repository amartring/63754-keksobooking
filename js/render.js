'use strict';

(function () {
  var PRICE_UNIT = '₽/ночь';
  var Building = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };
  var Room = {
    min: {
      COUNT: 1,
      STRING: 'комната'
    },
    max: {
      COUNT: 5,
      STRING: 'комнат'
    },
    other: {
      STRING: 'комнаты'
    }
  };
  var Guest = {
    min: {
      COUNT: 1,
      STRING: 'гостя'
    },
    other: {
      STRING: 'гостей'
    }
  };
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
    teg: 'img',
    class: 'popup__photo',
    width: 45,
    height: 40,
    alt: 'Фотография жилья'
  };

  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var removeChildren = function (element) {
    while (element.lastChild) {
      element.removeChild(element.lastChild);
    }
  };

  var getRoomOffer = function (room) {
    var result;
    if (room === Room.min.COUNT) {
      result = Room.min.STRING;
    } else if (room === Room.max.COUNT) {
      result = Room.max.STRING;
    } else {
      result = Room.other.STRING;
    }
    return result;
  };

  var getGuestOffer = function (guests) {
    return guests === Guest.min.COUNT ? Guest.min.STRING : Guest.other.STRING;
  };

  var createPhotos = function (item) {
    var photo = window.util.makeElement(IMG.teg, IMG.class, IMG.alt);
    photo.src = item;
    photo.width = IMG.width;
    photo.height = IMG.height;
    return photo;
  };

  var adverts = window.main.getAdvertsArray();

  var createCard = function (advert) {
    var cardElement = cardTemplate.cloneNode(true);
    var roomString = getRoomOffer(advert.offer.rooms);
    var guestString = getGuestOffer(advert.offer.guests);
    cardElement.querySelector('.popup__avatar').src = advert.author.avatar;
    cardElement.querySelector('.popup__title').textContent = advert.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + PRICE_UNIT;
    cardElement.querySelector('.popup__type').textContent = Building[(advert.offer.type).toUpperCase()];
    cardElement.querySelector('.popup__text--capacity')
      .textContent = advert.offer.rooms + ' ' + roomString + LINK + advert.offer.guests + ' ' + guestString;
    cardElement.querySelector('.popup__text--time')
      .textContent = CHECK.in + advert.offer.checkin + CHECK.out + advert.offer.checkout;

    var featureList = cardElement.querySelector('.popup__features');
    removeChildren(cardElement.querySelector('.popup__features'));
    advert.offer.features.forEach(function (item) {
      featureList.appendChild(window.util.makeElement(FEATURE.teg, FEATURE.classFirst, '', FEATURE.classSecond + item));
    });

    cardElement.querySelector('.popup__description').textContent = advert.offer.description;
    removeChildren(cardElement.querySelector('.popup__photos'));
    advert.offer.photos.forEach(function (item) {
      cardElement.querySelector('.popup__photos').appendChild(createPhotos(item));
    });
    return cardElement;
  };

  var fragment = document.createDocumentFragment();
  fragment.appendChild(createCard(adverts[0]));
  map.insertBefore(fragment, mapFiltersContainer);
})();
