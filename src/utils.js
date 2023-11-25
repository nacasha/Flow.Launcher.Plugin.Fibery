function getProcessEnv() {
  return JSON.parse(process.argv[2])
}

function getSettings(key) {
  const { settings } = getProcessEnv()

  if (!!settings) return settings[key]
  return undefined
}

function getSelectedSchema(listOfSchema, input) {
  const selectedSchemaIndex = listOfSchema.findIndex((schema) => `${input}`.trim().startsWith(schema.Title))
  return listOfSchema[selectedSchemaIndex]
}

function getArray(data) {
  if (typeof data == 'object' && data.hasOwnProperty('length')) {
    return data
  }
  return []
}

function getValueOrDefault(data, defaultValue) {
  if (!!data) return data
  return defaultValue
}

function getValueOrEmptyString(value) {
  if (!!value) return value
  return ""
}

function showResultToFlow(results, withExtraAction = false) {
  if (withExtraAction) {
    const extraActions = require("./actions")

    const { parameters } = getProcessEnv()
    const filteredExtraActions = extraActions.filter((schema) => schema.Title.toLowerCase().includes(`${parameters}`.toLowerCase()))

    results = results.concat(filteredExtraActions)
  }

  console.log(JSON.stringify({ "result": results }))
}

module.exports = {
  showResultToFlow,
  getSelectedSchema,
  getArray,
  getProcessEnv,
  getSettings,
  getValueOrEmptyString,
  getValueOrDefault
}
