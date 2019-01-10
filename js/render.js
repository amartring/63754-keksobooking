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
    teg: 'img',
    class: 'popup__photo',
    width: 45,
    height: 40,
    alt: 'Фотография жилья'
  };
  var PIN = {
    width: 50,
    height: 70
  };

  var Unit = {
    PRICE: '₽/ночь',
    POSITION: 'px'
  };
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
      COUNT: 100,
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

  var mapPin = window.main.map.querySelector('.map__pins');
  var mapFiltersContainer = window.main.map.querySelector('.map__filters-container');

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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

  var createPin = function (advert) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = (advert.location.x - PIN.width / 2) + Unit.POSITION;
    pinElement.style.top = (advert.location.y - PIN.height) + Unit.POSITION;
    pinElement.querySelector('img').src = advert.author.avatar;
    pinElement.querySelector('img').alt = advert.offer.title;
    return pinElement;
  };

  var createCard = function (advert) {
    var cardElement = cardTemplate.cloneNode(true);
    var roomString = getRoomOffer(advert.offer.rooms);
    var guestString = getGuestOffer(advert.offer.guests);
    cardElement.querySelector('.popup__avatar').src = advert.author.avatar;
    cardElement.querySelector('.popup__title').textContent = advert.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + Unit.PRICE;
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

  var renderCard = function (advert) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createCard(advert));
    window.main.map.insertBefore(fragment, mapFiltersContainer);

    var card = window.main.map.querySelector('.map__card');
    var cardClose = card.querySelector('.popup__close');

    var closeCard = function () {
      window.main.map.removeChild(card);
      document.removeEventListener('keydown', onCardEscPress);
    };

    var onCardCloseClick = function () {
      closeCard();
    };

    var onCardEscPress = function (evt) {
      if (evt.keyCode === window.main.KeyCode.ESC) {
        closeCard();
      }
    };

    document.addEventListener('keydown', onCardEscPress);
    cardClose.addEventListener('click', onCardCloseClick);
  };

  var onPinClick = function (thumbnail, advert) {
    thumbnail.addEventListener('click', function () {
      renderCard(advert);
    });
  };

  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    adverts.forEach(function (item) {
      var currentPin = createPin(item);
      fragment.appendChild(currentPin);
      onPinClick(currentPin, item);
    });
    mapPin.appendChild(fragment);
  };

  window.render = {
    PIN: PIN,
    Unit: Unit,
    renderPins: renderPins
  };
})();
