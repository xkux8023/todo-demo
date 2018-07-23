const fs = require('fs')
const path = require('path')

let secret = fs.readFileSync((path.resolve(__dirname, '../config/secret')), 'utf-8')

module.exports = secret

