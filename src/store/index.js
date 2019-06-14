const context = require.context("./", false, /\.js$/);
const keys = context.keys().filter(path => {
    return path !== './index.js'
})

export const Stores = {}
export const stores = {}

keys.forEach(path => {
    const Store = context(path).default
    const name = path.match(/.\/(\w+)\.js/)[1]

    Stores[`${name}Store`] = Store
    stores[`${name}Store`] = new Store()
})