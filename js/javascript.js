"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl);  // 'Tooltip' に変更
  });
});


function cancelUpdate() {
  if (confirm('変更をキャンセルしますか？')) {
    window.location.href=window.location.href.replace(/\/edit$/, '');
  }
}

