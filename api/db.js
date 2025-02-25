// url/server/db.js

// Import path module
const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

// Create connection to SQLite database
const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
})

// Create a table in the database called "users"
knex.schema
  // Make sure no "users" table exists
  // before trying to create new
  .hasTable('users')
  .then((exists) => {
    if (!exists) {
      // If no "users" table exists
      // create new, with "id", "username", "password" columns
      // and use "id" as a primary identification
      return knex.schema.createTable('users', (table) => {
        table.increments('id').primary()
        table.string('username').unique().notNullable()
        table.string('password').notNullable()
        table.timestamps(true, true)
      })
        .then(() => {
          // Log success message
          console.log('Table \'users\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
    }
  })
  .then(() => {
    // Log success message

  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error.errors}`)
  })

// Create a table in the database called "links"
knex.schema
  // Make sure no "links" table exists
  // before trying to create new
  .hasTable('links')
  .then((exists) => {
    if (!exists) {
      // If no "links" table exists
      // create new, with "id", "author", "title",
      // "pubDate" and "rating" columns
      // and use "id" as a primary identification
      // and increment "id" with every new record (URL)
      return knex.schema.createTable('links', (table) => {
        table.bigInteger('id').primary
        table.string('author')
        table.string('code').unique
        table.text('url').nullable
        table.integer('clicks').nullable
      })
        .then(() => {
          // Log success message
          console.log('Table \'links\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
    }
  })
  .then(() => {
    // Log success message
    console.log('Db connected')
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error.errors}`)
  })

// Just for debugging purposes:
// Log all data in "links" table
// knex.select('*').from('links')
//   .then(data => console.log('data:', data))
//   .catch(err => console.log(err))

// Export the database
module.exports = knex