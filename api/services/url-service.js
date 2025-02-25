const knex = require("../db")
const { int2radix64, radix64toint } = require('./radix64-service');

async function createRandomShortCode(author, url) {
    const genCode = parseInt(Math.random() * 999999999999);
    const exists = await knex('links')
        .where('id', genCode)
        .first();

    if (exists) {
        return await createRandomShortCode(url);
    }

    return await knex('links')
        .insert({
            id: genCode,
            author: author,
            code: int2radix64(genCode),
            url: url,
            clicks: 0
        }).returning("*");
}

async function createCustomShortCode(author, code, url) {
    const id = radix64toint(code);
    const exists = await knex('links')
        .where('id', id)
        .first();

    if (exists) {
        throw new Error('This shortcode [' + code + '] already exists');
    }

    return await knex('links')
        .insert({
            id: id,
            author, author,
            code: code,
            url: url,
            clicks: 0
        })
        .returning('*');
}

async function findLongUrl(code) {
    const id = radix64toint(code);

    var clicks = await knex('links')
        .select('clicks')
        .where('id', id)
        .first()
        
    console.log(clicks);
        
    var link = await knex('links')
        .update('clicks', clicks.clicks+1)
        .where('id', id)
    return await knex('links')
        .where('id', id)
        .first();
}

module.exports = {
    createCustomShortCode,
    createRandomShortCode,
    findLongUrl
};