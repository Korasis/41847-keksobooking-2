'use strict';

(function () {
  // элементы для отрисовки
  var mapPinsListElement = window.util.mapPins.querySelector('.map__pins');

  // генериим метки и их события на карте
  var generatePins = function (bookingItem) {
    var mapPinTemplate = document.querySelector('template').content;
    var mapPinElement = mapPinTemplate.querySelector('.map__pin').cloneNode(true);

    mapPinElement.style.left = (bookingItem.location.x - Math.floor(window.util.PIN_SIZE.userPinWidth * 0.5)) + 'px';
    mapPinElement.style.top = (bookingItem.location.y - window.util.PIN_SIZE.userPinHeight) + 'px';

    mapPinElement.querySelector('img').src = bookingItem.author.avatar;
    mapPinElement.querySelector('img').alt = bookingItem.offer.title;

    mapPinElement.onclick = function () {
      if (window.util.mapPins.querySelector('.popup')) {
        window.closeBookingItem();
      }
      window.renderBookingItem(bookingItem);
      mapPinElement.classList.add('map__pin--active');

      if (document.querySelector('.popup__close')) {
        document.querySelector('.popup__close').addEventListener('click', window.closeBookingItem);
      }
    };

    return mapPinElement;
  };

  // рендерим метки на карте
  window.renderPins = function (bookingItems) {
    var fragment = document.createDocumentFragment();

    bookingItems.forEach(function (item) {
      fragment.appendChild(generatePins(item));
    });

    mapPinsListElement.appendChild(fragment);
  };

  // функция для активации формы
  window.pinButtonMouseupHandler = function () {
    window.enableFormElements();
    window.util.showMap();
    window.util.setAddress();
    window.backend.load(successHandler, errorHandler);
    window.util.pinButton.removeEventListener('mouseup', window.pinButtonMouseupHandler);
  };

  window.util.setAddress();

  if (window.util.mapPins.classList.contains('map--faded')) {
    window.util.pinButton.addEventListener('mouseup', window.pinButtonMouseupHandler);
  }

  var successHandler = function (bookingItems) {
    renderPins(bookingItems);
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

  window.util.mapFilters.addEventListener('change', function () {
    window.util.resetPins();
    // window.closeBookingItem();
    // window.util.debounce(
    window.filters.updatePins(window.bookingItemsData);
    // , 500);
  });
})();
