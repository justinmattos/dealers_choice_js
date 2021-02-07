const html = require('html-template-tag');
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

module.exports = (book) => html`<!DOCTYPE html>
  <html>
    <head>
      <title>Great Books</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="book-item">
        <header><a href="/">Great Books</a></header>
        <p>
          ${book.title} by ${book.author}
          <small>
            ${Date.now() < book.date.getTime()
              ? `Expected ${
                  months[book.date.getMonth()]
                } ${book.date.getFullYear()}`
              : `Published ${
                  months[book.date.getMonth()]
                } ${book.date.getFullYear()}`}</small
          >
        </p>
        <p>
          <small
            >Edited by ${book.editor} | ${book.imprint} |
            ${book.publisher}</small
          >
        </p>
      </div>
    </body>
  </html>`;
