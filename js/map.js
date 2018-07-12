'use strict';

(function () {
  var DEBOUNCE_TIMEOUT = 500;


  // функция для активации формы
  window.pinButtonMouseupHandler = function () {
    window.enableFormElements();
    window.util.showMap();
    window.util.setAddress();
    window.backend.load(successHandler, errorHandler);
    window.util.pinButton.removeEventListener('mouseup', window.pinButtonMouseupHandler);
  };

  window.util.setAddress();

  if (window.util.mapPinsElement.classList.contains('map--faded')) {
    window.util.pinButton.addEventListener('mouseup', window.pinButtonMouseupHandler);
  }

  var successHandler = function (bookingItems) {
    window.renderPins(bookingItems);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.util.mapFiltersElement.addEventListener('change', function () {
    window.util.resetPins();
    window.card.closeBookingItemHandler();
    window.debounce(window.filters.updatePins(window.bookingItemsData), DEBOUNCE_TIMEOUT);
  });
})();
