const path = require('path')

module.exports = {
    preset: path.resolve('.'),
    testPathIgnorePatterns: ['bench-files', 'node_modules'],
}
