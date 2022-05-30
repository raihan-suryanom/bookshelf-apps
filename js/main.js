const createBook = (event) => {
  event.preventDefault();
  alert('f');
};

document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('book_form');
  submitForm.addEventListener('submit', createBook);
});
