'use strict';

(function () {
  var AppartmentType = {
    bungalo: 'bungalo',
    flat: 'flat',
    house: 'house',
    palace: 'palace'
  };

  var RoomAndCapacity = {
    ROOM: '100',
    CAPASITY: '0'
  };

  var MinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var ErrorMessages = {
    price: {
      MIN: 'Цена не должна быть меньше ',
      MAX: 'Цена не должна превышать 1 000 000'
    },
    ROOMS: [
      'Только для производственных целей',
      'Можно разместить только одного человека',
      'Можно разместить одного или двух гостей',
      'Можно разместить одного, двух или трех гостей'
    ]
  };

  var TitleRange = {
    MIN_LENGTH: 30,
    MAX_LENGTH: 100
  };

  var mapFilters = window.main.map.querySelectorAll('.map__filter');
  var notiseForm = document.querySelector('.ad-form');
  var notiseFormFielsets = notiseForm.querySelectorAll('fieldset');
  var titleField = notiseForm.querySelector('#title');
  var addressField = notiseForm.querySelector('#address');
  var typeField = notiseForm.querySelector('#type');
  var priceField = notiseForm.querySelector('#price');
  var timeInField = notiseForm.querySelector('#timein');
  var timeOutField = notiseForm.querySelector('#timeout');
  var roomNumberField = notiseForm.querySelector('#room_number');
  var capacityField = notiseForm.querySelector('#capacity');

  var initForm = function (title, price) {
    title.minLength = TitleRange.MIN_LENGTH;
    title.maxLength = TitleRange.MAX_LENGTH;
    price.required = true;
  };

  var getPinPosition = function () {
    var mainPinInfo = window.main.getMainPinInfo();
    addressField.value = mainPinInfo.x + ', ' + mainPinInfo.y;
  };

  var changePinPosition = function () {
    var mainPinInfo = window.main.getMainPinInfo();
    var newX = Math.round(mainPinInfo.x + mainPinInfo.width / 2);
    var newY = Math.round(mainPinInfo.y - mainPinInfo.height - window.constants.NEEDLE_HEIGHT);
    addressField.value = newX + ', ' + newY;
  };

  var validityPrice = function () {
    var minPrice = MinPrice.BUNGALO;
    if (typeField.value === AppartmentType.flat) {
      minPrice = MinPrice.FLAT;
    } else if (typeField.value === AppartmentType.house) {
      minPrice = MinPrice.HOUSE;
    } else {
      minPrice = MinPrice.PALACE;
    }
    if (priceField.value < minPrice) {
      priceField.setCustomValidity(ErrorMessages.price.MIN + minPrice);
    } else if (priceField.value > window.constants.MAX_PRICE) {
      priceField.setCustomValidity(ErrorMessages.price.MAX);
    } else {
      priceField.setCustomValidity('');
    }
  };

  var validityTimeIn = function () {
    timeInField.value = timeOutField.value;
  };

  var validityTimeOut = function () {
    timeOutField.value = timeInField.value;
  };

  var validityRoomsAndCapacity = function () {
    if (roomNumberField.value === RoomAndCapacity.ROOM && capacityField.value !== RoomAndCapacity.CAPASITY) {
      capacityField.setCustomValidity(ErrorMessages.ROOMS[RoomAndCapacity.CAPASITY]);
    } else if (roomNumberField.value < capacityField.value || capacityField.value === RoomAndCapacity.CAPASITY) {
      capacityField.setCustomValidity(ErrorMessages.ROOMS[roomNumberField.value]);
    } else {
      capacityField.setCustomValidity('');
    }
  };

  var Listener = {
    FIELDS: [typeField, priceField, timeInField, timeOutField, roomNumberField, capacityField],
    ACTIONS: [
      validityPrice,
      validityPrice,
      validityTimeOut,
      validityTimeIn,
      validityRoomsAndCapacity,
      validityRoomsAndCapacity
    ],
    EVENT: 'change'
  };

  var addListener = function (element, action) {
    return element.addEventListener(Listener.EVENT, action);
  };

  var removeListener = function (element, action) {
    return element.removeEventListener(Listener.EVENT, action);
  };

  var deactivateForm = function () {
    notiseFormFielsets.forEach(function (item) {
      item.disabled = true;
    });
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].disabled = true;
    }

    Listener.FIELDS.forEach(function (item, index) {
      removeListener(item, Listener.ACTIONS[index]);
    });
  };

  var activateForm = function () {
    notiseForm.classList.remove('ad-form--disabled');
    notiseFormFielsets.forEach(function (item) {
      item.removeAttribute('disabled');
    });
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].removeAttribute('disabled');
    }
    window.render.makeCardBlock();
    window.backend.load(window.main.onGetSuccess);
    addressField.setAttribute('readonly', true);

    Listener.FIELDS.forEach(function (item, index) {
      addListener(item, Listener.ACTIONS[index]);
    });
  };

  deactivateForm();
  getPinPosition();

  document.addEventListener('DOMContentLoaded', initForm.bind(null, titleField, priceField));

  var onPostSuccess = function () {
    titleField.textContent = '';
    window.backend.showSuccessMessage();
  };

  notiseForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(notiseForm), onPostSuccess);
  });

  window.form = {
    activateForm: activateForm,
    changePinPosition: changePinPosition
  };
})();
