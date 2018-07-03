'use strict';

(function  (){
  var apartmentTypeElement = document.querySelector('#type');
  var priceElement = document.querySelector('#price');
  var checkInElement = document.querySelector('#timein');
  var checkOutElement = document.querySelector('#timeout');
  var roomsElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');
  var descriptionElement = document.querySelector('#description');
  var reset = document.querySelector('.ad-form__reset');

  // отключаем элементы формы
  function disableFormElements() {
    window.util.formElement.classList.add('ad-form--disabled');
    window.util.fieldsetArray.forEach(function (fieldsetElement) {
      fieldsetElement.disabled = true;
    });
  }

  // включаем элементы формы
  window.enableFormElements = function () {
    window.util.formElement.classList.remove('ad-form--disabled');
    window.util.fieldsetArray.forEach(function (fieldsetElement) {
      fieldsetElement.disabled = false;
    });
  };

  // очистка формы
  function clearForm() {
    var inputs = window.util.formElement.querySelectorAll('input');
    [].forEach.call(inputs, function (item) {
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
  }

  var setMinPrice = function () {
    Object.keys(window.util.typeList).forEach(function (type) {
      if (apartmentTypeElement.value === type) {
        priceElement.setAttribute('min', window.util.typeList[type].minPrice);
        priceElement.setAttribute('placeholder', window.util.typeList[type].minPrice);
      }
    });
  };

  apartmentTypeElement.addEventListener('change', setMinPrice);

  function setTime(time1, time2) {
    time1.value = time2.value;
  }

  var setTimeOut = function () {
    setTime(checkOutElement, checkInElement);
  };

  var setTimeIn = function () {
    setTime(checkInElement, checkOutElement);
  };

  checkInElement.addEventListener('change', setTimeOut);
  checkOutElement.addEventListener('change', setTimeIn);

  function roomsChangeHandler() {
    if (capacityElement.options.length > 0) {
      [].forEach.call(capacityElement.options, function (item) {
        item.selected = (window.util.ROOMS_CAPACITY[roomsElement.value][0] === item.value);
        item.disabled = (window.util.ROOMS_CAPACITY[roomsElement.value].indexOf(item.value) < 0);
      });
    }
  }

  roomsChangeHandler();

  roomsElement.addEventListener('change', roomsChangeHandler);

  if (document.querySelector('.ad-form--disabled')) {
    disableFormElements();
  }

  function resetForm() {
    disableFormElements();
    window.util.hideMap();
    window.resetPins();
    clearForm();
    window.util.setAddress();
    window.util.pinButton.addEventListener('mouseup', window.pinButtonMouseupHandler);
  }

  reset.addEventListener('click', resetForm);

})();
