const express = require("express");

const {
  getDocuments,
  insertDocument,
  getDocumentById,
  deleteDocumentById,
  updateDocumentById,
} = require("../../controllers/mongoDB");
const { middlewareToken } = require("../../middleware/jwt.middleware");

const Appointment = require("../../models/Appointment");

const router = express.Router();

router.post("/citas", middlewareToken, async (req, res) => {
  try {
    const appointmentObject = req.body;
    const appointment = new Appointment(appointmentObject);
    const responseDB = await insertDocument("hospital", "citas", appointment);
    res.send({
      ok: true,
      messages: "Cita Asignada",
      info: responseDB,
    });
  } catch (err) {
    if (Object.keys(error).length > 0) {
      res.status(500).send(error);
    } else {
      res.status(500).send({
        ok: true,
        message: "Cita NO asignada.",
        info: error.toString(),
      });
    }
  }
});
