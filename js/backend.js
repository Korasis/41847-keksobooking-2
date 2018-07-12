'use strict';

(function () {
  var URL_POST_DATA = 'https://js.dump.academy/keksobooking';
  var URL_GET_DATA = 'https://js.dump.academy/keksobooking/data';

  window.backend = {
    upload: function (data, onSuccess) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        onSuccess(xhr.response);
      });

      xhr.open('POST', URL_POST_DATA);
      xhr.send(data);
    },

    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
          window.bookingItemsData = xhr.response;
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000; // 10s

      xhr.open('GET', URL_GET_DATA);
      xhr.send();
    }
  };
})();
