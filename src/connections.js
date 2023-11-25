const Fibery = require("../node_modules/fibery-unofficial")
const { FSDB } = require("../node_modules/file-system-db")

const { SETTINGS } = require("./constants")

function getDatabase() {
  return new FSDB("./data/database.json")
}

function getFibery() {
  return new Fibery({ host: SETTINGS.HOST, token: SETTINGS.API_TOKEN })
}

module.exports = {
  getDatabase,
  getFibery,
}
