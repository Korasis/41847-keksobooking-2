'use strict';

(function () {
  var PRICES = {
    min: 10000,
    max: 50000
  };

  var updatePins = function (bookingItems) {
    var filteresItems = bookingItems.slice();
    var selectorFilters = window.util.mapFiltersElement.querySelectorAll('select');
    var featureFilters = window.util.mapFiltersElement.querySelectorAll('input[type="checkbox"]:checked');

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
      return filteresItems.filter(function (itemData) {

        var priceFilterValues = {
          'middle': itemData.offer.price >= PRICES.min && itemData.offer.price < PRICES.max,
          'low': itemData.offer.price < PRICES.min,
          'high': itemData.offer.price >= PRICES.max
        };

        return priceFilterValues[priceFilter.value];
      });
    };

    var filterByFeatures = function (item) {
      return filteresItems.filter(function (itemData) {
        return itemData.offer.features.indexOf(item.value) >= 0;
      });
    };

    // пробегаем по всем
    if (selectorFilters.length !== null) {
      selectorFilters.forEach(function (item) {
        if (item.value !== 'any') {
          if (item.id !== 'housing-price') {
            filteresItems = filterByValue(item, filterRules[item.id]);
          } else {
            filteresItems = filterByPrice(item);
          }
        }
      });
    }

    if (featureFilters.length !== null) {
      featureFilters.forEach(function (item) {
        filteresItems = filterByFeatures(item);
      });
    }

    if (filteresItems.length) {
      window.renderPins(filteresItems);
    }
  };

  window.filters = {
    updatePins: function (bookingItems) {
      updatePins(bookingItems);
    }
  };
})();
