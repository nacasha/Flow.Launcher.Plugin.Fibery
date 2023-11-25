const { getDatabase } = require("./connections")
const { getValueOrDefault } = require('./utils')
const { mapActionOfEntity, mapActionOfSchema } = require("./model")
const { STORE, SETTINGS } = require("./constants")
const fiberyServices = require("./fibery-services")

async function getSchemas() {
  let listOfSchema = []

  if (SETTINGS.SEARCH_MODE === "Offline") {
    const database = getDatabase()
    listOfSchema = getValueOrDefault(database.get(STORE.SCHEMAS), [])
  } else if (SETTINGS.SEARCH_MODE === "Online") {
    listOfSchema = await fiberyServices.fetchListOfSchema()
  }

  return listOfSchema.map(mapActionOfSchema)
}

async function getEntities(schemaName, query = "") {
  let listOfEntities = []

  if (SETTINGS.SEARCH_MODE === "Offline") {
    const database = getDatabase()

    if (schemaName) {
      listOfEntities = database.get(STORE.ENTITIES + "." + schemaName)
    } else {
      listOfEntities = database.get(STORE.ENTITIES)
      listOfEntities = Object.values(listOfEntities).flat()
    }

    listOfEntities = getValueOrDefault(listOfEntities, [])
  } else if (SETTINGS.SEARCH_MODE === "Online") {
    listOfEntities = await fiberyServices.fetchListOfEntity(schemaName, query)
  }

  return listOfEntities.map(mapActionOfEntity)
}

module.exports = {
  getSchemas,
  getEntities,
}
