'use strict';

(function () {
  var PRICES = {
    min: 10000,
    max: 50000
  };

  var updatePins = function (bookingItems) {
    var filteresItems = bookingItems.slice();
    var selectorFilters = window.util.mapFilters.querySelectorAll('select');
    var featureFilters = window.util.mapFilters.querySelectorAll('intut[type="checkbox"]:checked');

    var filterRules = {
      'housing-type': 'type',
      'housing-rooms': 'rooms',
      'housing-guests': 'guests'
    };

    var filterByValue = function (element, property) {
      return filteresItems.filter(function (itemData) {
        return itemData.offer[property].toString() === element.value;
      });
    };

    var filterByPrice = function (priceFilter) {
      return filteredOffers.filter(function (itemData) {

        var priceFilterValues = {
          'middle': itemData.offer.price >= PRICES.min && itemData.offer.price < PRICES.max,
          'low': itemData.offer.price < PRICES.min,
          'high': itemData.offer.price >= PRICES.max
        };

        return priceFilterValues[priceFilter.value];
      });
    };

    var filterByFeatures = function (item) {
      return filteredOffers.filter(function (itemData) {
        return itemData.offer.features.indexOf(item.value) >= 0;
      });
    };

    // пробегаем по всем
    if (selectorFilters.length !== null) {
      selectorFilters.forEach(function (item) {
        if (item.value !== 'any') {
          if (item.id !== 'housing-price') {
            filteredOffers = filterByValue(item, FilterRules[item.id]);
          } else {
            filteredOffers = filterByPrice(item);
          }
        }
      });
    }

    if (featuresFilters !== null) {
      featuresFilters.forEach(function (item) {
        filteredOffers = filterByFeatures(item);
      });
    }

    if (filteredOffers.length) {
      window.pin.render(filteredOffers);
    }
  };

  window.filters = {
    updatePins: function (offers) {
      updatePins(offers);
    }
  };
  }
}();
