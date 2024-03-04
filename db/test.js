const {open} = require('sqlite');
const path = require('path');
const sqlite3 = require('sqlite3');

open({
    filename: path.join(__dirname, './sql.db'),
    driver: sqlite3.Database
}).then(d => {
    d.all('SELECT * FROM Run').then(data => console.log(data))
});