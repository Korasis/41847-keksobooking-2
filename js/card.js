'use strict';

(function () {
  window.card = {
    // рендерим окошко с объявлением
    renderBookingItem: function (content) {
      window.util.mapPinsElement.insertBefore(generateBookingItem(content), window.util.mapFiltersContainer);
      document.addEventListener('keydown', popupEscPressHandler);
    },

    // закрываем окошко с объявлением
    closeBookingItemHandler: function () {
      var offerModalElement = window.util.mapPinsElement.querySelector('.popup');
      if (offerModalElement) {
        document.removeEventListener('keydown', popupEscPressHandler);
        offerModalElement.remove();
      }

      if (window.util.mapPinsElement.querySelector('.map__pin--active')){
        window.util.mapPinsElement.querySelector('.map__pin--active').classList.remove('map__pin--active');
      }
    }
  }


  var offerTemplate = document.querySelector('template').content.querySelector('.popup');

  // генерим окошко с объялением
  var generateBookingItem = function (content) {
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
      var offerPhotoElement = offerTemplate.querySelector('.popup__photo').cloneNode();
      offerPhotoElement.src = photo;
      offerElement.querySelector('.popup__photos').appendChild(offerPhotoElement);
    });
    offerElement.querySelectorAll('.popup__photo')[0].remove();

    return offerElement;
  };


  // закрытие по esc
  var popupEscPressHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      window.card.closeBookingItemHandler();
    }
  };
})();
