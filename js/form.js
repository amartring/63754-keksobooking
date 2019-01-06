'use strict';

(function () {
  var NEEDLE_HEIGHT = 22;
  var MAX_PRICE = 1000000;

  var TYPE = {
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

  var mapFilters = window.main.map.querySelectorAll('.map__filter');
  var notiseForm = document.querySelector('.ad-form');
  var notiseFormFielsets = notiseForm.querySelectorAll('fieldset');
  var addressField = notiseForm.querySelector('#address');
  var typeField = notiseForm.querySelector('#type');
  var priceField = notiseForm.querySelector('#price');
  var timeInField = notiseForm.querySelector('#timein');
  var timeOutField = notiseForm.querySelector('#timeout');
  var roomNumberField = notiseForm.querySelector('#room_number');
  var capacityField = notiseForm.querySelector('#capacity');

  var deactivateForm = function () {
    notiseFormFielsets.forEach(function (item) {
      item.disabled = true;
    });
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].disabled = true;
    }
  };

  var activateForm = function () {
    notiseForm.classList.remove('ad-form--disabled');
    notiseFormFielsets.forEach(function (item) {
      item.removeAttribute('disabled');
    });
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].removeAttribute('disabled');
    }
    window.render.renderPins();
    addressField.setAttribute('readonly', true);
  };

  var getPinPosition = function () {
    var mainPinInfo = window.main.getMainPinInfo();
    addressField.value = mainPinInfo.x + ', ' + mainPinInfo.y;
  };

  var changePinPosition = function () {
    var mainPinInfo = window.main.getMainPinInfo();
    var newX = Math.round(mainPinInfo.x + mainPinInfo.width / 2);
    var newY = Math.round(mainPinInfo.y - mainPinInfo.height - NEEDLE_HEIGHT);
    addressField.value = newX + ', ' + newY;
  };

  // roomNumberField.children[0].removeAttribute('selected');
  // capacityField.children[0].removeAttribute('selected');

  var validityPrice = function () {
    var minPrice = MinPrice.BUNGALO;
    if (typeField.value === TYPE.flat) {
      minPrice = MinPrice.FLAT;
    } else if (typeField.value === TYPE.house) {
      minPrice = MinPrice.HOUSE;
    } else {
      minPrice = MinPrice.PALACE;
    }
    if (priceField.value < minPrice) {
      priceField.setCustomValidity(ErrorMessages.price.MIN + minPrice);
    } else if (priceField.value > MAX_PRICE) {
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

  typeField.addEventListener('change', validityPrice);
  priceField.addEventListener('change', validityPrice);
  timeInField.addEventListener('change', validityTimeOut);
  timeOutField.addEventListener('change', validityTimeIn);
  roomNumberField.addEventListener('change', validityRoomsAndCapacity);
  capacityField.addEventListener('change', validityRoomsAndCapacity);

  deactivateForm();
  getPinPosition();

  window.filters = {
    activateForm: activateForm,
    getPinPosition: getPinPosition,
    changePinPosition: changePinPosition
  };
})();
