const { MongoClient, ObjectId } = require('mongodb')

const uri = "mongodb+srv://hospital:kqCnDNqqo5B2snGo@crappdb.olfywkb.mongodb.net/?retryWrites=true&w=majority";

const mongoClient = new MongoClient(uri)

const getDocuments = async (dbName, collectionName) => {
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.find({}).toArray();
    return result
}

const getDocumentsWithFilter = async (dbName, collectionName, filter) => {
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.find(filter).toArray();
    return result
}


const getDocumentById = async (dbName, collectionName, id) => {
    const idMongo = new ObjectId(id)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.findOne({ _id: idMongo });
    return result
}

const insertDocument = async (dbName, collectionName, data) => {
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.insertOne(data);
    return result
}

const updateDocumentById = async (dbName, collectionName, { id, data }) => {
    const idMongo = new ObjectId(id)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    delete data._id
    const result = await collection.replaceOne({ _id: idMongo }, data);
    return result
}

const deleteDocumentById = async (dbName, collectionName, id) => {
    const idMongo = new ObjectId(id)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.deleteOne({ _id: idMongo });
    return result
}


module.exports = { getDocuments, insertDocument, getDocumentById, deleteDocumentById, updateDocumentById, getDocumentsWithFilter }