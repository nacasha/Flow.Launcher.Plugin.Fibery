const { getSettings } = require("./utils")

const METHODS = {
  QUERY: "query",
  OPEN_ENTITY: "open-entity",
  SYNC_ALL: "sync-all",
  SYNC_SCHEMAS: "sync-schemas",
  SYNC_ENTITIES: "sync-entities"
}

const STORE = {
  SCHEMAS: "schemas",
  ENTITIES: "entities",
  LAST_SYNCED_SCHEMA: "lastSyncedSchema",
  LAST_SYNCED_ENTITY: "lastSyncedEntity",
}

const SETTINGS = {
  API_TOKEN: getSettings("api_token"),
  ACCOUNT: getSettings("account"),
  HOST: "{ACCOUNT}.fibery.io".replace("{ACCOUNT}", getSettings("account")),
  SEARCH_MODE: getSettings("search_mode"),
  KEYWORD: getSettings("keyword")
}

module.exports = {
  METHODS,
  STORE,
  SETTINGS,
}
