'use strict';

(function () {
  // перемещение пина по карте
  window.util.pinButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (window.util.MIN_LOCATION_X < startCoords.x
        && startCoords.x < window.util.MAX_LOCATION_X
        && window.util.MIN_LOCATION_Y < startCoords.y
        && startCoords.y < window.util.MAX_LOCATION_Y) {
        window.util.pinButton.style.top = (window.util.pinButton.offsetTop - shift.y) + 'px';
        window.util.pinButton.style.left = (window.util.pinButton.offsetLeft - shift.x) + 'px';
        window.util.setAddress();
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})()
