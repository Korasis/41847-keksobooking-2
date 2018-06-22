'use strict';

var ITEMS_COUNT = 8; // константа для количества объявлений

// массивы заданных значений
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

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

var typeList = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var MIN_ROOMS = 1;
var MAX_ROOMS = 5;

var MIN_GUESTS = 0;
var MAX_GUESTS = 3;

var checkTimeList = [
  '12:00',
  '13:00',
  '14:00'
];

var featuresList = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var photosList = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var MIN_LOCATION_X = 300;
var MAX_LOCATION_X = 900;
var MIN_LOCATION_Y = 150;
var MAX_LOCATION_Y = 500;

var titlesCount = titleList.length;
var typesCount = typeList.length;
var ckeckTimesCount = checkTimeList.length;
var featuresCount = featuresList.length;
var photosCount = photosList.length;

var bookingItems = [];

// элементы для отрисовки
var mapPins = document.querySelector('.map');
var mapPinsListElement = mapPins.querySelector('.map__pins');
var mapFiltersContainer = mapPins.querySelector('.map__filters-container');
var offerTemplate = document.querySelector('template').content.querySelector('.popup');

// рандомайзер в диапазоне
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// рандомайзер индексов массивов - для аватарки и заголовка
function generateRandomIndex(count) {
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
function getRandomArray(array, n) {
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
function generateBookingItems(count) {
  var randomAvatar = generateRandomIndex(count);
  var randomTitleIndex = generateRandomIndex(titlesCount);
  var randomFeatures = getRandomArray(featuresList, getRandomInt(1, featuresCount));
  var randomPhotos = getRandomArray(photosList, photosCount);
  var randomTitle = [];

  for (var i = 0; i < count; i++) {
    var x = getRandomInt(MIN_LOCATION_X, MAX_LOCATION_X);
    var y = getRandomInt(MIN_LOCATION_Y, MAX_LOCATION_Y);
    var j = randomTitleIndex[i];
    randomTitle[i] = titleList[j - 1];
    bookingItems[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + randomAvatar[i] + '.png'
      },
      'offer': {
        'title': randomTitle[i],
        'address': x + ', ' + y,
        'price': getRandomInt(MIN_PRICE, MAX_PRICE),
        'type': typeList[getRandomInt(0, typesCount - 1)],
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

// генериим метки на карте
var generatePins = function (bookingItem) {
  var mapPinTemplate = document.querySelector('template').content;
  var mapPinElement = mapPinTemplate.querySelector('.map__pin').cloneNode(true);

  mapPinElement.style.left = (bookingItem.location.x - 25) + 'px';
  mapPinElement.style.top = (bookingItem.location.y - 70) + 'px';

  mapPinElement.querySelector('img').setAttribute('src', bookingItem.author.avatar);
  mapPinElement.querySelector('img').setAttribute('alt', bookingItem.offer.title);

  return mapPinElement;
};

// рендерим метки на карте
function renderPins() {
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < bookingItems.length; j++) {
    fragment.appendChild(generatePins(bookingItems[j]));
  }
  mapPinsListElement.appendChild(fragment);
}

// прячем затемняшку
function showMap() {
  mapPins.classList.remove('map--faded');
}

// рендерим фоточки
function renderOfferPhotos(content) {
  for (var j = 0; j < photosCount; j++) {
    var offerPhoto = offerTemplate.querySelector('.popup__photos img').cloneNode();
    offerPhoto.src = content.offer.photos[j];
    offerTemplate.querySelector('.popup__photos').appendChild(offerPhoto);
  }
  offerTemplate.querySelectorAll('.popup__photos img')[0].remove();
  return offerTemplate.querySelector('.popup__photos');
}

// генерим окошко с объялением
function generateBookingItem(content) {
  var offerElement = offerTemplate.cloneNode(true);
  offerElement.querySelector('.popup__avatar').setAttribute('src', content.author.avatar);
  offerElement.querySelector('.popup__title').textContent = content.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = content.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = content.offer.price + '₽/ночь';
  switch (content.offer.type) {
    case 'palace':
      offerElement.querySelector('.popup__type').textContent = 'Дворец';
      break;
    case 'house':
      offerElement.querySelector('.popup__type').textContent = 'Дом';
      break;
    case 'flat':
      offerElement.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'bungalo':
      offerElement.querySelector('.popup__type').textContent = 'Бунгало';
      break;
  }
  offerElement.querySelector('.popup__text--capacity').textContent = content.offer.rooms + ' комнаты для ' + content.offer.guests + ' гостей';
  offerElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + content.offer.checkin + ', выезд до ' + content.offer.checkout;

  var featureElement = offerElement.querySelectorAll('.popup__features li');
  featureElement.forEach(function (element) {
    element.remove();
  });

  var tempFeatures = content.offer.features;

  function renderFeatureElement(featureName, index) {
    if (tempFeatures.indexOf(featureName) >= 0) {
      offerElement.querySelectorAll('li')[index].setAttribute('class', 'feature feature--' + featureName);
      var featureIndex = tempFeatures.indexOf(featureName);
      tempFeatures[featureIndex] = '';
    }
  }

  for (var i = 0; i < content.offer.features.length; i++) {
    offerElement.querySelector('.popup__features').appendChild(document.createElement('li'));
    if (!offerElement.querySelectorAll('li')[i].hasAttribute('class')) {
      renderFeatureElement(tempFeatures[i], i);
    }
  }

  offerElement.querySelector('.popup__description').textContent = content.offer.description;
  offerElement.querySelector('.popup__photos').remove();
  offerElement.appendChild(renderOfferPhotos(content));

  return offerElement;
}

// рендерим окошко с объявлением
function renderBookingItem(content) {
  mapPins.insertBefore(generateBookingItem(content), mapFiltersContainer);
}

// вызываем функции по генерации данных и отрисовке всех необходимых элементов
generateBookingItems(ITEMS_COUNT);
showMap();
renderPins();
renderBookingItem(bookingItems[0]);
