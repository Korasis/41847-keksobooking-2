'use strict';

(function () {
  window.util = {
    // пустой массив для заполнения
    bookingItems: [],

    // вместимость комнат
    ROOMS_CAPACITY: {
      '1': ['1'],
      '2': ['1', '2'],
      '3': ['1', '2', '3'],
      '100': ['0']
    },

    // границы размерещения метки/адреса
    MIN_LOCATION_X: 300,
    MAX_LOCATION_X: 900,
    MIN_LOCATION_Y: 150,
    MAX_LOCATION_Y: 500,

    PIN_SIZE: {
      draggableRoundPin: 65,
      draggableArrow: 22,
      userPinWidth: 50,
      userPinHeight: 70
    },

    // типы недвижимости
    typeList: {
      flat: {
        ru: 'Квартира',
        minPrice: 1000
      },
      house: {
        ru: 'Дом',
        minPrice: 5000
      },
      bungalo: {
        ru: 'Лачуга',
        minPrice: 0
      },
      palace: {
        ru: 'Дворец',
        minPrice: 10000
      }
    },

    mapPins: document.querySelector('.map'),
    pinButton: document.querySelector('.map__pin--main'),
    formElement: document.querySelector('.ad-form'),
    fieldsetArray: document.querySelector('.ad-form').querySelectorAll('fieldset'),

    // прячем затемняшку
    showMap: function () {
      window.util.mapPins.classList.remove('map--faded');
    },

    // показываем затемняшку
    hideMap: function () {
      window.util.mapPins.classList.add('map--faded');
    },

    // получаем координаты метки
    getAddress: function () {
      var addressX = 0;
      var addressY = 0;

      if (window.util.mapPins.classList.contains('map--faded')) {
        addressX = Math.floor(window.util.pinButton.offsetLeft + 0.5 * window.util.PIN_SIZE.draggableRoundPin);
        addressY = Math.floor(window.util.pinButton.offsetTop + 0.5 * window.util.PIN_SIZE.draggableRoundPin);
      } else {
        addressX = Math.floor(window.util.pinButton.offsetLeft + 0.5 * window.util.PIN_SIZE.draggableRoundPin);
        addressY = window.util.pinButton.offsetTop + window.util.PIN_SIZE.draggableArrow;
      }

      return addressX + ', ' + addressY;
    },

    // передаем координаты метки в поле Адрес
    setAddress: function () {
      document.querySelector('#address').value = window.util.getAddress();
    }
  };

})();
