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
    //
    // var startCoords = {
    //   x: evt.clientX,
    //   y: evt.clientY
    // };

    var shiftX = evt.clientX - window.util.pinButton.getBoundingClientRect().left;
    var shiftY = evt.clientY - window.util.pinButton.getBoundingClientRect().top;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      function move(e) {
        var newLocation = {
          x: window.util.MIN_LOCATION_X,
          y: window.util.MIN_LOCATION_Y
        };
        if (e.clientX > window.util.MAX_LOCATION_X + window.util.mapPinsElement.offsetLeft) {
          newLocation.x = window.util.MAX_LOCATION_X + window.util.mapPinsElement.offsetLeft;
        } else if (e.clientX > window.util.MIN_LOCATION_X + window.util.mapPinsElement.offsetLeft) {
          newLocation.x = e.clientX;
        } else if (e.clientX <= window.util.MIN_LOCATION_X + window.util.mapPinsElement.offsetLeft) {
          newLocation.x = window.util.MIN_LOCATION_X + window.util.mapPinsElement.offsetLeft;
        }
        if (e.clientY > window.util.MAX_LOCATION_Y + window.util.mapPinsElement.offsetTop) {
          newLocation.y = window.util.MAX_LOCATION_Y + window.util.mapPinsElement.offsetTop;
        } else if (e.clientY > window.util.MIN_LOCATION_Y + window.util.mapPinsElement.offsetTop) {
          newLocation.y = e.clientY;
        } else if (e.clientY <= window.util.MIN_LOCATION_Y + window.util.mapPinsElement.offsetTop) {
          newLocation.y = window.util.MIN_LOCATION_Y + window.util.mapPinsElement.offsetTop;
        }
        relocate(newLocation);
      }

      function relocate(newLocation) {
        window.util.pinButton.style.left = newLocation.x - shiftX - window.util.mapPinsElement.offsetLeft + 'px';
        window.util.pinButton.style.top = newLocation.y - shiftY - window.util.mapPinsElement.offsetTop + 'px';
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
