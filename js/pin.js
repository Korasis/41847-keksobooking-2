'use strict';

(function () {

  // элементы для отрисовки
  var mapPinsListElement = window.util.mapPinsElement.querySelector('.map__pins');

  // генериим метки и их события на карте
  var generatePins = function (bookingItem) {
    var mapPinTemplate = document.querySelector('template').content;
    var mapPinElement = mapPinTemplate.querySelector('.map__pin').cloneNode(true);

    mapPinElement.style.left = (bookingItem.location.x - Math.floor(window.util.PIN_SIZE.userPinWidth * 0.5)) + 'px';
    mapPinElement.style.top = (bookingItem.location.y - window.util.PIN_SIZE.userPinHeight) + 'px';

    mapPinElement.querySelector('img').src = bookingItem.author.avatar;
    mapPinElement.querySelector('img').alt = bookingItem.offer.title;

    mapPinElement.onclick = function () {
      if (window.util.mapPinsElement.querySelector('.popup')) {
        window.card.closeBookingItemHandler();
      }
      window.card.renderBookingItem(bookingItem);
      mapPinElement.classList.add('map__pin--active');

      if (document.querySelector('.popup__close')) {
        document.querySelector('.popup__close').addEventListener('click', window.card.closeBookingItemHandler);
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

  // перемещение пина по карте
  window.util.pinButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      function move(e) {
        var newLocation = {
          x: window.util.MIN_LOCATION_X,
          y: window.util.MIN_LOCATION_Y
        };
        if (e.pageX > window.util.MAX_LOCATION_X) {
          newLocation.x = window.util.MAX_LOCATION_X;
        } else if (e.pageX > window.util.MIN_LOCATION_X) {
          newLocation.x = e.pageX;
        }
        if (e.pageY > window.util.MAX_LOCATION_Y) {
          newLocation.y = window.util.MAX_LOCATION_Y;
        } else if (e.pageY > window.util.MIN_LOCATION_Y) {
          newLocation.y = e.pageY;
        }
        relocate(newLocation);
      }

      function relocate(newLocation) {
        window.util.pinButton.style.left = newLocation.x + 'px';
        window.util.pinButton.style.top = newLocation.y + 'px';
        window.util.setAddress();
      }

      move(moveEvt);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
