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
    MIN_LOCATION_X: 0,
    MAX_LOCATION_X: 1150,
    MIN_LOCATION_Y: 130,
    MAX_LOCATION_Y: 630,

    PIN_SIZE: {
      draggableRoundPin: 65,
      draggableArrow: 16, // высота острого указателя (22пкс) за вычетом сдвига с стилях (6пкс)
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
    // коды кнопок
    ESC_KEYCODE: 27,

    mapPinsElement: document.querySelector('.map'),
    pinButton: document.querySelector('.map__pin--main'),
    formElement: document.querySelector('.ad-form'),
    fieldsetArray: document.querySelector('.ad-form').querySelectorAll('fieldset'),
    mapFiltersContainer: document.querySelector('.map__filters-container'),
    mapFiltersElement: document.querySelector('.map__filters'),

    // прячем затемняшку
    showMap: function () {
      window.util.mapPinsElement.classList.remove('map--faded');
    },

    // показываем затемняшку
    hideMap: function () {
      window.util.mapPinsElement.classList.add('map--faded');
    },

    // сбрасываем метки
    resetPins: function () {
      var pins = document.querySelectorAll('.map__pin');
      [].forEach.call(pins, function (item) {
        if (!item.classList.contains('map__pin--main')) {
          item.remove();
        }
      });
    },

    // получаем координаты метки
    getAddress: function () {
      var addressX = 0;
      var addressY = 0;

      if (window.util.mapPinsElement.classList.contains('map--faded')) {
        addressX = Math.floor(window.util.pinButton.offsetLeft + 0.5 * window.util.PIN_SIZE.draggableRoundPin);
        addressY = Math.floor(window.util.pinButton.offsetTop + 0.5 * window.util.PIN_SIZE.draggableRoundPin);
      } else {
        addressX = Math.floor(window.util.pinButton.offsetLeft + 0.5 * window.util.PIN_SIZE.draggableRoundPin);
        addressY = window.util.pinButton.offsetTop + window.util.PIN_SIZE.draggableArrow + window.util.PIN_SIZE.draggableRoundPin;
      }

      return addressX + ', ' + addressY;
    },

    // передаем координаты метки в поле Адрес
    setAddress: function () {
      document.querySelector('#address').value = window.util.getAddress();
    }
  };
})();
