const html = require('html-template-tag');

module.exports = (books) => html`<!DOCTYPE html>
  <html>
    <head>
      <title>Great Books</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="book-list">
        <header>Great Books</header>
        ${books
          .sort((a, b) => b.date - a.date)
          .map(
            (book) => html` <div class="book-item">
              <p>
                <span class="book-position">${book.date.getFullYear()}</span>
                <a href="/books/${book.id}">${book.title} by ${book.author}</a>
              </p>
              <small class="book-info">
                ${book.imprint} | ${book.publisher}
              </small>
            </div>`
          )}
      </div>
    </body>
  </html>`;
