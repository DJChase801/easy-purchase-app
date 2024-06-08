const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/easydb.sqlite', (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Database connected.');
    db.exec('PRAGMA foreign_keys = ON;', (error) => {
      if (error) {
        console.error("Pragma statement didn't execute." + error.message);
      } else {
        console.log("Foreign Key Enforcement is on.");
      }
    });
  }
});

const init = () => {
  db.run(`CREATE TABLE IF NOT EXISTS program (
    program_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    deleted_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );`, handleRunError);

  db.run(`CREATE TABLE IF NOT EXISTS member (
    member_id INTEGER PRIMARY KEY AUTOINCREMENT,
    program_id INTEGER NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT,
    deleted_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (program_id) REFERENCES program(program_id)
  );`, handleRunError);

  db.run(`CREATE TABLE IF NOT EXISTS product (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    program_id INTEGER,
    name TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image TEXT,
    deleted_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (program_id) REFERENCES program(program_id)
  );`, handleRunError);

  db.run(`CREATE TABLE IF NOT EXISTS purchase (
    purchase_id INTEGER PRIMARY KEY AUTOINCREMENT,
    program_id INTEGER,
    member_id INTEGER,
    product_id INTEGER,
    processed BOOLEAN DEFAULT 0,
    deleted_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (program_id) REFERENCES program(program_id),
    FOREIGN KEY (member_id) REFERENCES member(member_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
  );`, handleRunError);
};

// Error handling for db.run()
function handleRunError(err) {
  if (err) {
    console.error("SQL error: " + err.message);
  }
}

db.serialize(init);

module.exports = db;
