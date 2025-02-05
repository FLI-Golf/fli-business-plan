/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_292221920")

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_4143549482",
    "hidden": false,
    "id": "relation3522489242",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "flag",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_292221920")

  // remove field
  collection.fields.removeById("relation3522489242")

  return app.save(collection)
})
