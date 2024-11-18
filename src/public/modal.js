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

// モーダルの外側クリックで閉じる処理
document.addEventListener('click', (e) => {
  if (e.target === modalContainer) {
    // モーダルの外側がクリックされた場合
    closeModal();
  }
});

// モーダルのクローズボタンのクリックで閉じる
modalCloseButton.addEventListener('click', () => {
  closeModal();
});

modalShowButton.addEventListener('click', () => {
  showModal();
});
