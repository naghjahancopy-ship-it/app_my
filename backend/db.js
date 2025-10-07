const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

let dbPromise = open({
  filename: './app_my.db',
  driver: sqlite3.Database
});

async function setup() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price INTEGER,
      stock INTEGER
    );
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price INTEGER
    );
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phone TEXT
    );
    CREATE TABLE IF NOT EXISTS invoices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER,
      total INTEGER,
      date TEXT,
      FOREIGN KEY(customer_id) REFERENCES customers(id)
    );
  `);
}
setup();

module.exports = {
  run: async (...args) => (await dbPromise).run(...args),
  all: async (...args) => (await dbPromise).all(...args),
  get: async (...args) => (await dbPromise).get(...args)
};