// 要素を取得
const modalContainer = document.getElementById('modal-container');
const modalCloseButton = document.getElementById('modal-close');
const modalShowButton = document.getElementById('modal-show');

// モーダルを表示する関数
function showModal() {
  event.preventDefault();
  modalContainer.classList.add('active');
}

// モーダルを閉じる関数
function closeModal() {
  modalContainer.classList.remove('active');
}

// モーダルのクローズボタンのクリックで閉じる
modalCloseButton.addEventListener('click', () => {
  closeModal();
});

modalShowButton.addEventListener('click', () => {
  showModal();
});
