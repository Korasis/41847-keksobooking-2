'use strict';

(function(){
  // элементы для отрисовки
  var mapPinsListElement = window.util.mapPins.querySelector('.map__pins');
  var mapFiltersContainer = window.util.mapPins.querySelector('.map__filters-container');
  var offerTemplate = document.querySelector('template').content.querySelector('.popup');


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
      renderBookingItem(bookingItem);

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




  // сбрасываем метку
  function resetPins() {
    var pins = document.querySelectorAll('.map__pin');
    [].forEach.call(pins, function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.remove();
      }
    });
  }

  // прячем затемняшку
  function showMap() {
    window.util.mapPins.classList.remove('map--faded');
  }

  // показываем затемняшку
  function hideMap() {
    window.util.mapPins.classList.add('map--faded');
  }

  // получаем координаты метки

  // передаем координаты метки в поле Адрес
  function setAddress() {
    document.querySelector('#address').value = window.util.getAddress();
  }

  setAddress();

})()
