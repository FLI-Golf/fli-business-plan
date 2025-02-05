/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2274991674")

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_563804874",
    "hidden": false,
    "id": "relation376926767",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "avatar",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2274991674")

  // remove field
  collection.fields.removeById("relation376926767")

  return app.save(collection)
})
