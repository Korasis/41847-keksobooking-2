'use strict';

(function () {

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
    window.util.mapPins.insertBefore(generateBookingItem(content), mapFiltersContainer);
    document.addEventListener('keydown', onPopupEscPress);
  }


  // закрываем окошко с объявлением
  function closeBookingItem() {
    var offerModal = window.util.mapPins.querySelector('.popup');
    document.removeEventListener('keydown', onPopupEscPress);
    offerModal.remove();
  }

  // закрытие по esc
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === 27) {
      closeBookingItem();
    }
  };

})()
