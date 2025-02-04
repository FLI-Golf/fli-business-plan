/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_894376215")

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "json3407166484",
    "maxSize": 0,
    "name": "chartData",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_894376215")

  // remove field
  collection.fields.removeById("json3407166484")

  return app.save(collection)
})
