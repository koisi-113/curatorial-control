"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl);  // 'Tooltip' に変更
  });
});

//update_book.njkのscript
async function handleSubmit(event) {
  event.preventDefault();
  const id = document.getElementById('id').value;
  const name = document.getElementById('name').value;
  const categoryId = document.getElementById('{{book.categoryId}}').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;
  const publisher = document.getElementById('publisher').value;
  const is_borrowing = document.getElementById('is_borrowing').checked;
  const userId = document.getElementById('{{book.userId}}').value;
  try {
    const response = await fetch(`top/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        name,
        categoryId: parseInt(categoryId),
        author,
        isbn,
        publisher,
        is_borrowing,
      }),
    });
    if (response.ok) {
      const result = await response.json();
      alert('本が更新されました。');
    } else {
      alert('データの更新に失敗しました。');
    }
  } catch (error) {
    console.error('エラー:', error);
  }
}
function cancelUpdate() {
  if (confirm('変更をキャンセルしますか？')) {
    window.location.href=window.location.href.replace(/\/edit$/, '');
  }
}

