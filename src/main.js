const open = require("../node_modules/open")

const { getDatabase } = require('./connections')
const { getEntities, getSchemas } = require("./repositories")
const { getSelectedSchema, showResultToFlow, getProcessEnv, getValueOrDefault } = require("./utils")
const { METHODS, STORE, SETTINGS } = require("./constants")
const fiberyServices = require("./fibery-services")

/**
 * Flow launcher query handler
 */
async function queryHandler() {
  const { parameters } = getProcessEnv()
  const parametersLowerCase = `${parameters}`.toLowerCase()

  let results = []
  const listOfSchema = await getSchemas()
  const selectedSchema = getSelectedSchema(listOfSchema, parameters)

  /**
   * Show list of entity if only schema if selected
   * Or search mode is Offline
   */
  if (selectedSchema || SETTINGS.SEARCH_MODE === "Offline") {
    const selectedSchemaTitle = getValueOrDefault(selectedSchema, { Title: "" }).Title

    const query = parametersLowerCase.replace(selectedSchemaTitle.toLowerCase(), "").trim()
    const listOfEntities = await getEntities(selectedSchemaTitle, query)

    results = listOfEntities.filter((entity) => entity.Title.toLowerCase().includes(query))
  }

  /**
   * Show list of schema is there is no schema selected
   */
  if (!selectedSchema) {
    results = listOfSchema.filter((schema) => schema.Title.toLowerCase().includes(parametersLowerCase)).concat(results)
  }

  showResultToFlow(results, true)
}

/**
 * Open entity url
 */
function openEntityHandler() {
  const { parameters } = getProcessEnv()
  open(parameters[0])
}

/**
 * Fetch all schemas with it"s entities and store in local json file.
 */
async function syncAllHandler() {
  const database = getDatabase()
  const listOfSchema = await fiberyServices.fetchListOfSchema()
  database.set(STORE.SCHEMAS, listOfSchema)

  for (let i = 0; i < listOfSchema.length; i++) {
    const schema = listOfSchema[i]
    const listOfEntities = await fiberyServices.fetchListOfEntity(schema.name)
    database.set(STORE.ENTITIES + "." + schema.name, listOfEntities)
  }
}

const methodHandler = {
  [METHODS.QUERY]: queryHandler,
  [METHODS.OPEN_ENTITY]: openEntityHandler,
  [METHODS.SYNC_ALL]: syncAllHandler,
  [METHODS.SYNC_SCHEMAS]: syncAllHandler,
  [METHODS.SYNC_ENTITIES]: syncAllHandler,
}

const { method } = getProcessEnv()
methodHandler[method]()
