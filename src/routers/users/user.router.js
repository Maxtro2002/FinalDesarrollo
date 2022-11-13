const express = require("express");

const {
  getDocuments,
  insertDocument,
  getDocumentById,
  deleteDocumentById,
  updateDocumentById,
} = require("../../controllers/mongoDB");
const { middleware } = require("../../middleware/jwt.middleware");
const Users = require("../../models/Users");

const router = express.Router()

router.post('/usuarios', async(req, res) => {
    
})
