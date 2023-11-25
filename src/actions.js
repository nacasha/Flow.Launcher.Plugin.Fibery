const { METHODS, SETTINGS } = require("./constants")

const actions = [
  {
    "Title": "Sync All",
    "JsonRPCAction": {
      "method": METHODS.SYNC_ALL,
      "settings": {
        "api_token": SETTINGS.API_TOKEN,
        "account": SETTINGS.ACCOUNT,
      },
      "dontHideAfterAction": true
    },
    "IcoPath": "./images/fibery.ico"
  },
  {
    "Title": "Sync Schema",
    "JsonRPCAction": {
      "method": METHODS.SYNC_SCHEMAS,
      "settings": {
        "api_token": SETTINGS.API_TOKEN,
        "account": SETTINGS.ACCOUNT,
      },
      "dontHideAfterAction": true
    },
    "IcoPath": "./images/fibery.ico"
  },
  {
    "Title": "Sync Entities",
    "JsonRPCAction": {
      "method": METHODS.SYNC_ENTITIES,
      "settings": {
        "api_token": SETTINGS.API_TOKEN,
        "account": SETTINGS.ACCOUNT,
      },
      "dontHideAfterAction": true
    },
    "IcoPath": "./images/fibery.ico"
  }
]

module.exports = actions
