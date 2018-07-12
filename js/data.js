'use strict';

(function () {
  // Модуль генерации данных

  // количество объявлений
  var ITEMS_COUNT = 8;

  // границы цен
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;

  // границы количества комнат
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;

  // границы количества гостей
  var MIN_GUESTS = 0;
  var MAX_GUESTS = 3;

  // массивы заданных значений
  // заголовки объявлений
  var titleList = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  // время въезда и выезда
  var checkTimeList = [
    '12:00',
    '13:00',
    '14:00'
  ];

  // удобства
  var featuresList = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  // фотографии объявления
  var photosList = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  // длины массивов
  var titlesCount = titleList.length;
  var typesCount = Object.keys(window.util.typeList).length;
  var ckeckTimesCount = checkTimeList.length;
  var featuresCount = featuresList.length;
  var photosCount = photosList.length;


  // рандомайзер в диапазоне
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // рандомайзер индексов массивов - для аватарки и заголовка
  var generateRandomIndex = function (count) {
    var j = 0;
    var tempArr = [];
    while (j < count) {
      var randomContentIndex = getRandomInt(1, count);
      if (tempArr.indexOf(randomContentIndex) < 0) {
        tempArr[j] = randomContentIndex;
        j++;
      }
    }
    return tempArr;
  }

  // рандомайзер массивов - для фич и фотографий
  var getRandomArray = function (array, n) {
    var j = 0;
    var randomArray = [];
    while (j < n) {
      var randomArrayIndex = getRandomInt(0, array.length - 1);
      if (randomArray.indexOf(array[randomArrayIndex]) < 0) {
        randomArray[j] = array[randomArrayIndex];
        j++;
      }
    }
    return randomArray;
  }

  // заполняем сгенерированными данными массив объявлений
  var generateBookingItems = function (count) {
    var randomAvatar = generateRandomIndex(count);
    var randomTitleIndex = generateRandomIndex(titlesCount);
    var randomTypes = Object.keys(window.util.typeList);
    var randomTitle = [];

    for (var i = 0; i < count; i++) {
      var j = randomTitleIndex[i];
      randomTitle[i] = titleList[j - 1];
      var randomFeatures = getRandomArray(featuresList, getRandomInt(1, featuresCount));
      var randomPhotos = getRandomArray(photosList, photosCount);
      var x = getRandomInt(window.util.MIN_LOCATION_X, window.util.MAX_LOCATION_X);
      var y = getRandomInt(window.util.MIN_LOCATION_Y, window.util.MAX_LOCATION_Y);

      window.util.bookingItems[i] = {
        'author': {
          'avatar': 'img/avatars/user0' + randomAvatar[i] + '.png'
        },
        'offer': {
          'title': randomTitle[i],
          'address': x + ', ' + y,
          'price': getRandomInt(MIN_PRICE, MAX_PRICE),
          'type': randomTypes[getRandomInt(0, typesCount - 1)],
          'rooms': getRandomInt(MIN_ROOMS, MAX_ROOMS),
          'guests': getRandomInt(MIN_GUESTS, MAX_GUESTS),
          'checkin': checkTimeList[getRandomInt(0, ckeckTimesCount - 1)],
          'checkout': checkTimeList[getRandomInt(0, ckeckTimesCount - 1)],
          'features': randomFeatures,
          'description': '',
          'photos': randomPhotos
        },
        'location': {
          'x': x,
          'y': y
        }
      };

      randomFeatures = [];
      randomPhotos = [];
    }
  }

  // запускаем генерацию данных
  generateBookingItems(ITEMS_COUNT);
})();
