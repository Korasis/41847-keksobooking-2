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

      if (document.querySelector('.popup__close')) {
        document.querySelector('.popup__close').addEventListener('click', window.closeBookingItem);
      }
    };

    return mapPinElement;
  };

  // рендерим метки на карте
  var renderPins = function () {
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
    // renderPins();
    window.load(successHandler, errorHandler);
    window.util.pinButton.removeEventListener('mouseup', window.pinButtonMouseupHandler);
  };

  // сбрасываем метки
  var resetPins = function () {
    var pins = document.querySelectorAll('.map__pin');
    [].forEach.call(pins, function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.remove();
      }
    });
  };

  window.util.setAddress();

  if (window.util.mapPins.classList.contains('map--faded')) {
    window.util.pinButton.addEventListener('mouseup', window.pinButtonMouseupHandler);
  }



  var URL_GET_DATA = 'https://js.dump.academy/keksobooking/data';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL_GET_DATA);

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.send();
  };




  var successHandler = function (bookingItems) {
    //renderPins();

    var fragment = document.createDocumentFragment();

    bookingItems.forEach(function (item) {
      fragment.appendChild(generatePins(item));
    });

    mapPinsListElement.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };



})();
