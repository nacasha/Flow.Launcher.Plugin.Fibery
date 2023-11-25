const { getFibery } = require("./connections")
const { getValueOrDefault } = require("./utils")

/**
 * Fetch list of schema from Fibery
 * 
 * @returns
 */
async function fetchListOfSchema() {
  const fibery = getFibery()

  const schemas = await fibery.getSchema()
  const listOfSchema = schemas
    .filter((schema) => !schema["fibery/meta"]["fibery/platform?"])
    .filter((schema) => !schema["fibery/deleted?"] && !schema["fibery/meta"]["fibery/enum?"])
    .map((schema) => ({
      name: getValueOrDefault(schema["fibery/name"], "")
    }))

  return listOfSchema
}

/**
 * Fetch list of entity from Fibery within selected schema and query
 * 
 * @param {*} schemaName 
 * @param {*} query 
 * @returns 
 */
async function fetchListOfEntity(schemaName, query = "") {
  const fibery = getFibery()

  const schemaRoot = schemaName.split("/")[0]
  const entityName = schemaRoot + "/Name"

  const entities = await fibery.entity.query(
    {
      "q/from": schemaName,
      "q/select": [entityName, "fibery/public-id"],
      "q/where": ["q/contains", [entityName], "$query"],
      "q/limit": "q/no-limit",
    },
    {
      "$query": query
    }
  )

  const listOfEntities = entities.map((entity) => ({
    id: entity["fibery/public-id"],
    name: getValueOrDefault(entity[entityName], ""),
    schema: schemaName
  }))

  return listOfEntities
}

module.exports = {
  fetchListOfSchema,
  fetchListOfEntity,
}
