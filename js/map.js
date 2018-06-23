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

var typeList = {
  palace: {
    ru: 'Дворец'
  },
  flat: {
    ru: 'Квартира'
  },
  house: {
    ru: 'Дом'
  },
  bungalo: {
    ru: 'Бунгало'
  }
};

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

var PIN_SIZE = {
  draggableRoundPin: 65,
  draggableArrow: 22,
  userPinWidth: 50,
  userPinHeight: 70
};

var titlesCount = titleList.length;
var typesCount = Object.keys(typeList).length;
var ckeckTimesCount = checkTimeList.length;
var featuresCount = featuresList.length;
var photosCount = photosList.length;

var bookingItems = [];

// элементы для отрисовки
var mapPins = document.querySelector('.map');
var mapPinsListElement = mapPins.querySelector('.map__pins');
var mapFiltersContainer = mapPins.querySelector('.map__filters-container');
var offerTemplate = document.querySelector('template').content.querySelector('.popup');

// элементы формы
var fieldsetArray = document.querySelector('.ad-form').querySelectorAll('fieldset');
var formElement = document.querySelector('.ad-form');
var pinButton = document.querySelector('.map__pin--main');


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
  var randomTypes = Object.keys(typeList);
  var randomTitle = [];

  for (var i = 0; i < count; i++) {
    var j = randomTitleIndex[i];
    randomTitle[i] = titleList[j - 1];
    var randomFeatures = getRandomArray(featuresList, getRandomInt(1, featuresCount));
    var randomPhotos = getRandomArray(photosList, photosCount);
    var x = getRandomInt(MIN_LOCATION_X, MAX_LOCATION_X);
    var y = getRandomInt(MIN_LOCATION_Y, MAX_LOCATION_Y);

    bookingItems[i] = {
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

// генериим метки и их события на карте
var generatePins = function (bookingItem) {
  var mapPinTemplate = document.querySelector('template').content;
  var mapPinElement = mapPinTemplate.querySelector('.map__pin').cloneNode(true);

  mapPinElement.style.left = (bookingItem.location.x - Math.floor(PIN_SIZE.userPinWidth * 0.5)) + 'px';
  mapPinElement.style.top = (bookingItem.location.y - PIN_SIZE.userPinHeight) + 'px';

  mapPinElement.querySelector('img').src = bookingItem.author.avatar;
  mapPinElement.querySelector('img').alt = bookingItem.offer.title;

  mapPinElement.onclick = function () {
    if (mapPins.querySelector('.popup')) {
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

  bookingItems.forEach(function (item) {
    fragment.appendChild(generatePins(item));
  });

  mapPinsListElement.appendChild(fragment);
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

  var featuresElement = offerElement.querySelector('.popup__features');
  featuresElement.innerHTML = '';

  var tempFeatures = content.offer.features;
  tempFeatures.forEach(function (feature, i) {
    featuresElement.appendChild(document.createElement('li'));
    featuresElement.querySelectorAll('li')[i].classList.add('feature', 'feature--' + feature);
  });

  offerElement.querySelector('.popup__description').textContent = content.offer.description;

  content.offer.photos.forEach(function (photo) {
    var offerPhoto = offerTemplate.querySelector('.popup__photo').cloneNode();
    offerPhoto.src = photo;
    offerElement.querySelector('.popup__photos').appendChild(offerPhoto);
  });
  offerElement.querySelectorAll('.popup__photo')[0].remove();

  return offerElement;
}

// рендерим окошко с объявлением
function renderBookingItem(content) {
  mapPins.insertBefore(generateBookingItem(content), mapFiltersContainer);
}

// закрываем окошко с объявлением
function closeBookingItem() {
  var offerModal = mapPins.querySelector('.popup');
  offerModal.remove();
}

// отключаем элементы формы
function disableFormElements() {
  fieldsetArray.forEach(function (fieldsetElement) {
    fieldsetElement.disabled = true;
  });
}

// включаем элементы формы
function enableFormElements() {
  formElement.classList.remove('ad-form--disabled');
  fieldsetArray.forEach(function (fieldsetElement) {
    fieldsetElement.disabled = false;
  });
}

// прячем затемняшку
function showMap() {
  mapPins.classList.remove('map--faded');
}

// получаем координаты метки
function getAddress() {
  var addressX = 0;
  var addressY = 0;

  if (mapPins.classList.contains('.map--faded')) {
    addressX = Math.floor(pinButton.offsetLeft + 0.5 * PIN_SIZE.draggableRoundPin);
    addressY = Math.floor(pinButton.offsetTop + 0.5 * PIN_SIZE.draggableRoundPin);
  } else {
    addressX = Math.floor(pinButton.offsetLeft + 0.5 * PIN_SIZE.draggableRoundPin);
    addressY = pinButton.offsetTop + PIN_SIZE.draggableArrow;
  }

  return addressX + ', ' + addressY;
}

// передаем координаты метки в поле Адрес
function setAddress() {
  var address = getAddress();
  document.querySelector('#address').value = address;
}

// функция для активации формы
var pinButtonMouseupHandler = function () {
  enableFormElements();
  showMap();
  setAddress();
  renderPins();
};

// вызываем функции по генерации данных и отрисовке всех необходимых элементов
generateBookingItems(ITEMS_COUNT);
setAddress();

if (document.querySelector('.ad-form--disabled')) {
  disableFormElements();
}

pinButton.addEventListener('mouseup', pinButtonMouseupHandler);
