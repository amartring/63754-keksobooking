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

  // var Listener = {
  //   FIELDS: [typeField, priceField, timeInField, timeOutField, roomNumberField, capacityField],
  //   ACTIONS: [
  //     onTypeFieldChange,
  //     onPriceFieldChange,
  //     onTimeInFieldChange,
  //     onTimeOutFieldChange,
  //     onRoomNumberFieldChange,
  //     onCapacityFieldChange]
  // };

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
  // var notiseFormFielsets = notiseForm.querySelectorAll('fieldset');

  var deactivateForm = function () {
    notiseFormFielsets.forEach(function (item) {
      item.disabled = true;
    });
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].disabled = true;
    }

    typeField.removeEventListener('change', validityPrice);
    priceField.removeEventListener('change', validityPrice);
    timeInField.removeEventListener('change', validityTimeOut);
    timeOutField.removeEventListener('change', validityTimeIn);
    roomNumberField.removeEventListener('change', validityRoomsAndCapacity);
    capacityField.removeEventListener('change', validityRoomsAndCapacity);
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
    // window.render.renderPins();
    addressField.setAttribute('readonly', true);

    // var mapPins = document.querySelectorAll('.map__pin');

    // for (i = 0; i < Listener.FIELDS.length; i++) {
    //   addListener(Listener.FIELDS[i], Listener.ACTIONS[i]);
    // }

    // EventListener.FIELDS.forEach(function (item, index) {
    //   addListener(EventListener.FIELDS[index], EventListener.ACTIONS[index]);
    // });

    typeField.addEventListener('change', onTypeFieldChange);
    priceField.addEventListener('change', onPriceFieldChange);
    timeInField.addEventListener('change', onTimeInFieldChange);
    timeOutField.addEventListener('change', onTimeOutFieldChange);
    roomNumberField.addEventListener('change', onRoomNumberFieldChange);
    capacityField.addEventListener('change', onCapacityFieldChange);
  };

  // var addListener = function (element, action) {
  //   return element.addEventListener('change', action);
  // };

  var onTypeFieldChange = function () {
    validityPrice();
  };

  var onPriceFieldChange = function () {
    validityPrice();
  };

  var onTimeInFieldChange = function () {
    validityTimeOut();
  };

  var onTimeOutFieldChange = function () {
    validityTimeIn();
  };

  var onRoomNumberFieldChange = function () {
    validityRoomsAndCapacity();
  };

  var onCapacityFieldChange = function () {
    validityRoomsAndCapacity();
  };

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

  // roomNumberField.children[0].removeAttribute('selected');
  // capacityField.children[0].removeAttribute('selected');

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

  deactivateForm();
  getPinPosition();

  document.addEventListener('DOMContentLoaded', initForm.bind(null, titleField, priceField));

  var onPostSuccess = function () {
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
