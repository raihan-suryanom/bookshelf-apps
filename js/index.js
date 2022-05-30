const books = [];
const RENDER_EVENT = 'render-book';

const generateId = () => new Date().toISOString();

const bookTemplate = ({ id, title, author, year, didRead }) => {
  const btnMessage = didRead ? 'Selesai dibaca' : 'Belum Selesai dibaca';
  const status = didRead ? 'read' : 'unread';

  return `
    <article>
      <header>
        <h3>${title}</h3>
        <p>Penulis: ${author}</p>
        <p>Tahun: ${year}</p>
      </header>
      <footer>
        <button id="${id}" onclick="toggleStatus(id)" data-action="${status}" type="button">
          ${btnMessage}
        </button>
        <button id="${id}" onclick="deleteBookshelf(id)" data-action="delete" type="button">
          Hapus
        </button>
      </footer>
    </article>`;
};

const addBookshelf = (event) => {
  event.preventDefault();

  const getFormData = document.querySelectorAll('form input');

  const bookForm = {};
  Array.from(getFormData).forEach((book) => {
    const { name } = book;

    if (name) {
      bookForm[name] = name === 'didRead' ? book.checked : book.value;
    }
  });

  books.push({ id: generateId(), ...bookForm });
  document.dispatchEvent(new Event(RENDER_EVENT));
};

const deleteBookshelf = (bookId) => {
  const targetedBook = books.findIndex((book) => book.id === bookId);
  books.splice(targetedBook, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
};

const toggleStatus = (bookId) => {
  const targetedBook = books.findIndex((book) => book.id === bookId);
  const findBook = books.find((book) => book.id === bookId);
  books.splice(targetedBook, 1, { ...findBook, didRead: !findBook.didRead });
  document.dispatchEvent(new Event(RENDER_EVENT));
};

document.addEventListener('DOMContentLoaded', () => {
  // Apply onchange event on checkbox
  const readToggle = document.getElementById('didRead');
  const submitButton = document.getElementById('submit_form');
  readToggle.addEventListener('change', () => {
    submitButton.value = readToggle.checked
      ? 'Masukkan Buku ke rak Selesai Dibaca'
      : 'Masukkan Buku ke rak Belum Selesai Dibaca';
  });

  // Apply onsubmit event on form
  const submitForm = document.getElementById('book_form');
  submitForm.addEventListener('submit', addBookshelf);
});

document.addEventListener(RENDER_EVENT, () => {
  const unfinishedContainer = document.getElementById('unfinished');
  const readContainer = document.getElementById('finished');

  // clearing book list
  unfinishedContainer.innerHTML = '';
  readContainer.innerHTML = '';

  books.forEach((book) => {
    if (book.didRead) {
      readContainer.insertAdjacentHTML('beforeend', bookTemplate(book));
    } else {
      unfinishedContainer.insertAdjacentHTML('beforeend', bookTemplate(book));
    }
  });
});
