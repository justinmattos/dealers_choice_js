DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS editors;
DROP TABLE IF EXISTS imprints;
DROP TABLE IF EXISTS publishers;

CREATE TABLE authors(
  id INTEGER PRIMARY KEY,
  lastName VARCHAR(50),
  firstName VARCHAR(50)
);

CREATE TABLE editors(
  id INTEGER PRIMARY KEY,
  lastName VARCHAR(50),
  firstName VARCHAR(50)
);

CREATE TABLE publishers(
  id INTEGER PRIMARY KEY,
  publisher VARCHAR(50)
);

CREATE TABLE imprints(
  id INTEGER PRIMARY KEY,
  imprint VARCHAR(50),
  publisher_id INTEGER REFERENCES publishers(id)
);

CREATE TABLE books(
  id INTEGER PRIMARY KEY,
  title VARCHAR(50),
  pubDate DATE,
  author_id INTEGER REFERENCES authors(id),
  editor_id INTEGER REFERENCES editors(id),
  imprint_id INTEGER REFERENCES imprints(id)
);

INSERT INTO publishers(id, publisher) VALUES
  (1, 'Penguin Random House'),
  (2, 'Simon & Schuster');

INSERT INTO imprints(id, imprint, publisher_id) VALUES
  (1, 'Delacorte Press', 1),
  (2, 'Random House Children''s Books', 1),
  (3, 'Aladdin', 2),
  (4, 'Margaret K. McElderry Books', 2);

INSERT INTO authors(id, lastName, firstName) VALUES
  (1, 'Gong', 'Chloe'),
  (2, 'Leonardo', 'Cory'),
  (3, 'Bishop', 'Jenn'),
  (4, 'Bowen', 'Natasha'),
  (5, 'Buxbaum', 'Julie');

INSERT INTO editors(id, lastName, firstName) VALUES
  (1, 'Lin', 'Tricia'),
  (2, 'Horowitz', 'Beverly');

INSERT INTO books(id, title, pubDate, author_id, editor_id, imprint_id) VALUES
  (1, 'THESE VIOLENT DELIGHTS', '2020/11/17', 1, 1, 4),
  (2, 'THINGS YOU CAN''T SAY', '2020/03/03', 3, 1, 3),
  (3, 'THE SIMPLE ART OF FLYING', '2019/02/12', 2, 1, 3),
  (4, 'TELL ME THREE THINGS', '2017/03/14', 5, 2, 1),
  (5, 'SKIN OF THE SEA', '2021/11/1', 4, 1, 2);
