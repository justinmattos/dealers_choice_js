const express = require('express');
const morgan = require('morgan');
const bookList = require('./views/bookList');
const bookDetail = require('./views/bookDetail');
const client = require('./db/client');

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res, next) => {
  try {
    const books = await client.query(`
      SELECT
        books.id AS id,
        books.title AS title,
        books.pubDate AS date,
        auth.author AS author,
        edit.editor AS editor,
        imprintPubs.imprint AS imprint,
        imprintPubs.publisher AS publisher
      FROM books
        JOIN (
          SELECT
            authors.id AS id,
            firstname || ' ' || lastName AS author
          FROM authors
        ) auth ON books.author_id = auth.id
        JOIN (
          SELECT
            editors.id AS id,
            firstname || ' ' || lastName AS editor
          FROM editors
        ) edit ON books.editor_id = edit.id
        JOIN (
          SELECT
            imprints.id AS id,
            imprints.imprint AS imprint,
            publishers.publisher AS publisher
          FROM imprints
          JOIN publishers ON imprints.publisher_id = publishers.id
        ) imprintPubs ON books.imprint_id = imprintPubs.id;
    `);
    res.send(bookList(books.rows));
  } catch (err) {
    next(err);
  }
});

app.get('/books/:id', async (req, res, next) => {
  try {
    const books = await client.query(`
    SELECT
    books.id AS id,
    books.title AS title,
    books.pubDate AS date,
    auth.author AS author,
    edit.editor AS editor,
    imprintPubs.imprint AS imprint,
    imprintPubs.publisher AS publisher
  FROM books
    JOIN (
      SELECT
        authors.id AS id,
        firstname || ' ' || lastName AS author
      FROM authors
    ) auth ON books.author_id = auth.id
    JOIN (
      SELECT
        editors.id AS id,
        firstname || ' ' || lastName AS editor
      FROM editors
    ) edit ON books.editor_id = edit.id
    JOIN (
      SELECT
        imprints.id AS id,
        imprints.imprint AS imprint,
        publishers.publisher AS publisher
      FROM imprints
      JOIN publishers ON imprints.publisher_id = publishers.id
    ) imprintPubs ON books.imprint_id = imprintPubs.id;
    `);
    res.send(bookDetail(books.rows[req.params.id - 1]));
  } catch (err) {
    next(err);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
