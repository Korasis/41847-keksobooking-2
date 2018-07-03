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
        closeBookingItem();
      }
      window.renderBookingItem(bookingItem);

      if (document.querySelector('.popup__close')) {
        document.querySelector('.popup__close').addEventListener('click', closeBookingItem);
      }
    };

    return mapPinElement;
  };

  // рендерим метки на карте
  function renderPins() {
    var fragment = document.createDocumentFragment();

    window.util.bookingItems.forEach(function (item) {
      fragment.appendChild(generatePins(item));
    });

    mapPinsListElement.appendChild(fragment);
  }

  // функция для активации формы
  window.pinButtonMouseupHandler = function () {
    window.enableFormElements();
    window.util.showMap();
    window.util.setAddress();
    renderPins();
    window.util.pinButton.removeEventListener('mouseup', pinButtonMouseupHandler);
  };

  // сбрасываем метки
  window.resetPins = function() {
    var pins = document.querySelectorAll('.map__pin');
    [].forEach.call(pins, function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.remove();
      }
    });
  }

  window.util.setAddress();

  if (window.util.mapPins.classList.contains('map--faded')) {
    window.util.pinButton.addEventListener('mouseup', pinButtonMouseupHandler);
  }

})();
