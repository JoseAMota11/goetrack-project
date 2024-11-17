import Database from 'better-sqlite3';

const db = new Database('my_db.db', {
  verbose: console.log,
});

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS people (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    fullName TEXT NOT NULL,
    dateOfBirth TEXT NOT NULL,
    nationality TEXT NOT NULL,
    age INTEGER NOT NULL
  )
`
).run();

export default db;
