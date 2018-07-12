'use strict';

(function () {
  var apartmentTypeElement = document.querySelector('#type');
  var priceElement = document.querySelector('#price');
  var checkInElement = document.querySelector('#timein');
  var checkOutElement = document.querySelector('#timeout');
  var roomsElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');
  var descriptionElement = document.querySelector('#description');
  var resetElement = document.querySelector('.ad-form__reset');
  var successElement = document.querySelector('.success');

  // отключаем элементы формы
  var disableFormElements = function () {
    window.util.formElement.classList.add('ad-form--disabled');
    window.util.fieldsetArray.forEach(function (fieldsetElement) {
      fieldsetElement.disabled = true;
    });
  };

  // включаем элементы формы
  window.enableFormElements = function () {
    window.util.formElement.classList.remove('ad-form--disabled');
    window.util.fieldsetArray.forEach(function (fieldsetElement) {
      fieldsetElement.disabled = false;
    });
  };

  // очистка формы
  var clearForm = function () {
    var inputElements = window.util.formElement.querySelectorAll('input');
    [].forEach.call(inputElements, function (item) {
      if (item.type === 'checkbox') {
        item.checked = false;
      } else {
        item.value = '';
      }
    });
    descriptionElement.value = '';
    apartmentTypeElement.value = 'flat';
    checkInElement.value = '12:00';
    checkOutElement.value = '12:00';
    roomsElement.value = '1';
    capacityElement.value = '1';
  };

  var MinPriceHandler = function () {
    Object.keys(window.util.typeList).forEach(function (type) {
      if (apartmentTypeElement.value === type) {
        priceElement.setAttribute('min', window.util.typeList[type].minPrice);
        priceElement.setAttribute('placeholder', window.util.typeList[type].minPrice);
      }
    });
  };

  apartmentTypeElement.addEventListener('change', MinPriceHandler);

  var setTime = function (time1, time2) {
    time1.value = time2.value;
  };

  var TimeOutHandler = function () {
    setTime(checkOutElement, checkInElement);
  };

  var TimeInHandler = function () {
    setTime(checkInElement, checkOutElement);
  };

  checkInElement.addEventListener('change', TimeOutHandler);
  checkOutElement.addEventListener('change', TimeInHandler);

  var roomsChangeHandler = function () {
    if (capacityElement.options.length > 0) {
      [].forEach.call(capacityElement.options, function (item) {
        item.selected = (window.util.ROOMS_CAPACITY[roomsElement.value][0] === item.value);
        item.disabled = (window.util.ROOMS_CAPACITY[roomsElement.value].indexOf(item.value) < 0);
      });
    }
  };

  roomsChangeHandler();

  roomsElement.addEventListener('change', roomsChangeHandler);

  if (document.querySelector('.ad-form--disabled')) {
    disableFormElements();
  }

  var resetFormHandler = function () {
    disableFormElements();
    window.util.hideMap();
    window.util.resetPins();
    clearForm();
    window.util.setAddress();
    window.util.pinButton.addEventListener('mouseup', window.pinButtonMouseupHandler);
  };

  resetElement.addEventListener('click', resetFormHandler);

  var showSuccessMessage = function () {
    successElement.classList.remove('hidden');
    document.addEventListener('keydown', SuccesEscPressHandler);
    successElement.addEventListener('click', closeSuccesMessageHandler);
  };

  // закрытие по esc
  var SuccesEscPressHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      successElement.classList.add('hidden');
    }
  };

  var closeSuccesMessageHandler = function () {
    document.removeEventListener('keydown', SuccesEscPressHandler);
    successElement.classList.add('hidden');
  };

  window.util.formElement.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(window.util.formElement), function () {
      resetFormHandler();
      showSuccessMessage();
    });
    evt.preventDefault();
  });
})();
