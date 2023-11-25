const { SETTINGS, METHODS } = require("./constants")

function mapActionOfEntity(entity) {
  const normalizedEntityName = `${entity.name}`.replace(" ", "-")
  const entityUrl = `https://${SETTINGS.ACCOUNT}.fibery.io/${entity.schema}/${normalizedEntityName}-${entity.id}`

  return {
    "Title": entity.name,
    "Subtitle": entity.schema,
    "JsonRPCAction": {
      "method": METHODS.OPEN_ENTITY,
      "parameters": [entityUrl],
    },
    "IcoPath": "./images/fibery.ico"
  }
}

function mapActionOfSchema(schema) {
  return {
    "Title": schema.name,
    "JsonRPCAction": {
      "method": "Flow.Launcher.ChangeQuery",
      "parameters": [`fib ${schema.name} `, true],
      "dontHideAfterAction": true
    },
    "IcoPath": "./images/fibery.ico"
  }
}

module.exports = {
  mapActionOfEntity,
  mapActionOfSchema
}
