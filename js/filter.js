'use strict';

(function () {
  var filtersContainer = window.main.map.querySelector('.map__filters-container');
  var typeFilter = filtersContainer.querySelector('#housing-type');
  var priceFilter = filtersContainer.querySelector('#housing-price');
  var roomsFilter = filtersContainer.querySelector('#housing-rooms');
  var guestsFilter = filtersContainer.querySelector('#housing-guests');
  // var featuresFilter = filtersContainer.querySelector('#housing-features');

  var filterAdverts = function (advertsList) {
    if (typeFilter.value !== window.constants.NO_FILTER) {
      advertsList = advertsList.filter(function (advert) {
        return advert.offer.type === typeFilter.value;
      });
    }

    if (priceFilter.value !== window.constants.NO_FILTER) {
      if (priceFilter.value === window.constants.PRICE_FILTER.low) {
        advertsList = advertsList.filter(function (advert) {
          return advert.offer.price < window.constants.PRICE.min;
        });
      } else if (priceFilter.value === window.constants.PRICE_FILTER.high) {
        advertsList = advertsList.filter(function (advert) {
          return advert.offer.price > window.constants.PRICE.max;
        });
      } else {
        advertsList = advertsList.filter(function (advert) {
          return advert.offer.price > window.constants.PRICE.min && advert.offer.price < window.constants.PRICE.max;
        });
      }
    }

    if (roomsFilter.value !== window.constants.NO_FILTER) {
      advertsList = advertsList.filter(function (advert) {
        return advert.offer.rooms.toString() === roomsFilter.value;
      });
    }

    if (guestsFilter.value !== window.constants.NO_FILTER) {
      advertsList = advertsList.filter(function (advert) {
        return advert.offer.guests.toString() === guestsFilter.value;
      });
    }

    return advertsList;
  };

  window.filter = {
    filterAdverts: filterAdverts
  };
})();
