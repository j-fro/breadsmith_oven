const path = require('path');
const fs = require('fs');
const knex = require('../database/dbConfig');

let sql = fs.readFileSync(path.join(__dirname, 'create_tables.sql'), 'utf8');

knex
    .raw(sql)
    .then(() => {
        console.log('Created tables');
        let users = fs.readFileSync(
            path.join(__dirname, 'test_data/users.sql'),
            'utf8'
        );
        knex
            .raw(users)
            .then(() => {
                console.log('Added Users');
                process.exit(0);
            })
            .catch(err => {
                console.log(err);
                process.exit(0);
            });
    })
    .catch(err => {
        console.log(err);
        process.exit(-1);
    });
