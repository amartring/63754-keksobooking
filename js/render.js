'use strict';

(function () {
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
    var photo = window.util.makeElement(window.constants.IMG.teg, window.constants.IMG.class, window.constants.IMG.alt);
    photo.src = item;
    photo.width = window.constants.IMG.width;
    photo.height = window.constants.IMG.height;
    return photo;
  };

  var createPin = function (advert) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = (advert.location.x - window.constants.PIN.width / 2) + Unit.POSITION;
    pinElement.style.top = (advert.location.y - window.constants.PIN.height) + Unit.POSITION;
    pinElement.querySelector('img').src = advert.author.avatar;
    pinElement.querySelector('img').alt = advert.offer.title;
    return pinElement;
  };

  var createCard = function (advert) {
    var cardElement = window.main.map.querySelector('.popup');
    var roomString = getRoomOffer(advert.offer.rooms);
    var guestString = getGuestOffer(advert.offer.guests);
    cardElement.querySelector('.popup__avatar').src = advert.author.avatar;
    cardElement.querySelector('.popup__title').textContent = advert.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + Unit.PRICE;
    cardElement.querySelector('.popup__type').textContent = Building[(advert.offer.type).toUpperCase()];
    cardElement.querySelector('.popup__text--capacity')
      .textContent = advert.offer.rooms + ' ' + roomString + window.constants.LINK + advert.offer.guests + ' ' + guestString;
    if (advert.offer.rooms === 0 || advert.offer.guests === 0) {
      cardElement.querySelector('.popup__text--capacity').textContent = '';
    }
    cardElement.querySelector('.popup__text--time')
      .textContent = window.constants.CHECK.in + advert.offer.checkin + window.constants.CHECK.out + advert.offer.checkout;

    var featureList = cardElement.querySelector('.popup__features');
    removeChildren(cardElement.querySelector('.popup__features'));
    advert.offer.features.forEach(function (item) {
      featureList.appendChild(window.util.makeElement(window.constants.FEATURE.teg, window.constants.FEATURE.classFirst, '', window.constants.FEATURE.classSecond + item));
    });

    cardElement.querySelector('.popup__description').textContent = advert.offer.description;
    removeChildren(cardElement.querySelector('.popup__photos'));
    advert.offer.photos.forEach(function (item) {
      cardElement.querySelector('.popup__photos').appendChild(createPhotos(item));
    });
    return cardElement;
  };

  var closeAnyCard = function () {
    var card = window.main.map.querySelector('.map__card');
    var cardClose = card.querySelector('.popup__close');

    var closeCard = function () {
      window.main.map.querySelector('.popup').classList.add('hidden');
      document.removeEventListener('keydown', onCardEscPress);
    };

    var onCardCloseClick = function () {
      closeCard();
    };

    var onCardEscPress = function (evt) {
      if (evt.key === window.main.Key.ESC) {
        closeCard();
      }
    };

    document.addEventListener('keydown', onCardEscPress);
    cardClose.addEventListener('click', onCardCloseClick);
  };

  var showCard = function () {
    var cardElement = window.main.map.querySelector('.popup');
    cardElement.classList.remove('hidden');
  };

  var onPinClick = function (thumbnail, advert) {
    thumbnail.addEventListener('click', function () {
      createCard(advert);
      showCard();
      closeAnyCard();
    });
  };

  var renderPins = function (array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (item) {
      var currentPin = createPin(item);
      fragment.appendChild(currentPin);
      onPinClick(currentPin, item);
    });
    mapPin.appendChild(fragment);
  };

  var makeCardBlock = function () {
    var cardElement = cardTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(cardElement);
    cardElement.classList.add('hidden');
    window.main.map.insertBefore(fragment, mapFiltersContainer);
  };

  window.render = {
    Unit: Unit,
    makeCardBlock: makeCardBlock,
    renderPins: renderPins
  };
})();
