 var config = {}

 config.host = process.env.HOST || "https://location-occupancy.documents.azure.com:443/";
 config.authKey = process.env.AUTH_KEY || "bzxl0hucWsUBlfhj2Blmrw2lTO0JvRPlFRzQhfSESlVvyiK3msvmDxIgwltxGnlyex1Fpr1BmUtSd7F3cWJCDg==";
 config.databaseId = "location-occupancy";
 config.collectionId = "locations";

 module.exports = config;

