'use strict';

(function() {
  var URL_POST_DATA = 'https://js.dump.academy/keksobooking';
  var URL_GET_DATA = 'https://js.dump.academy/keksobooking/data';

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL_POST_DATA);
    xhr.send(data);
  };

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL_GET_DATA);

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.send();
  };
})();
