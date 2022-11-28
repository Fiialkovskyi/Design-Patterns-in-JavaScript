// The Single-responsibility principle: "There should never be more than one reason for a class to change."
// In other words, every class should have only one responsibility.
const fs = require("fs");

class Journal {
  constructor() {
    this.entries = {};
    this.count = 0;
  }

  addEntrie(text) {
    const key = ++this.count;
    const entrie = `${key}: ${text}`;
    this.entries[key] = entrie;
  }

  removeEntrie(key) {
    delete this.entrie[key];
  }

  toString() {
    return Object.values(this.entries).join("\n");
  }
}

class PersistenceManager {
  saveToFile(file, fileName) {
    fs.writeFileSync(fileName, file);
  }
}

const journal = new Journal();
journal.addEntrie("I found a bug");
journal.addEntrie("I read a book");

const pm = new PersistenceManager();
const fileName = "c:/journal.txt";
const file = journal.toString();
pm.saveToFile(file, fileName);
