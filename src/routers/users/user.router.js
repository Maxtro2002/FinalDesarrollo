const express = require("express");

const {
  getDocuments,
  insertDocument,
  getDocumentById,
  deleteDocumentById,
  updateDocumentById,
} = require("../../controllers/mongoDB");
const { middlewareToken } = require("../../middleware/jwt.middleware");
const Users = require("../../models/Users");

const router = express.Router();

router.post("/usuarios", async (req, res) => {
  try {
    const userObject = req.body;
    userObject.create_by = req.user_logged.email;
    const user = new Users(userObject);
    const responseDB = await insertDocument(
      "hospital",
      "usuarios",
      user.initUser()
    );
    res.send({
      ok: true,
      message: "Usuario creado",
      info: responseDB,
    });
  } catch (err) {
    if (Object.keys(err).length > 0) {
      res.status(500).send(err);
    } else {
      res.status(500).send({
        ok: true,
        message: "ERROR: NO se pudo crear el usuario",
        info: err.toString(),
      });
    }
  }
});

router.get("/usuarios", middlewareToken, async (req, res) => {
  try {
    const responseDB = await getDocuments("hospital", "usuarios");
    const users = Users.removePassword(responseDB);
    res.send({
      ok: true,
      message: "Usuario consultado",
      info: users,
    });
  } catch (err) {
    res.status(500).send({
      ok: false,
      message: "No se pudo consultar el usuario",
      info: err.toString(),
    });
  }
});

router.get("/usuarios/:id", middlewareToken, async (req, res) => {
  try {
    const id = req.params.id;
    const responseDB = await getDocumentById("hospital", "usuarios", id);
    delete responseDB.password;
    res.send({
      ok: true,
      message: "Usuario encontrado",
      info: responseDB,
    });
  } catch (err) {
    res.status(500).send({
      ok: false,
      message: "No se pudo consultar el usuario",
      info: err.toString(),
    });
  }
});

router.put("/usuarios/:id", middlewareToken, async (req, res) => {
  try {
    const id = req.params.id;
    const userObject = req.body;
    const user = new Users(userObject);

    const responseDB = await updateDocumentById("hospital", "usuarios", {
      id,
      data: user.initUser(),
    });
    if (responseDb.modifiedCount > 0) {
      return res.status(200).send({
        ok: true,
        message: "Usuario actualizado.",
        info: userObject,
      });
    } else {
      res.status(404).send({
        ok: false,
        message: "El usuario no existe.",
        info: "",
      });
    }
  } catch (err) {
    res.status(500).send({
      ok: false,
      message: "No se pudo actualizar el usuario",
      info: error.toString(),
    });
  }
});

router.delete("/usuarios/:id", middlewareToken, async (req, res) => {
  try {
    const id = req.params.id;
    const responseDb = await deleteDocumentById("hospital", "usuarios", id);
    if (responseDb.deletedCount === 1) {
      res.status(200).send({
        ok: true,
        message: "Usuario eliminado",
        info: "",
      });
    } else {
      res.status(404).send({
        ok: false,
        message: "El usuario no existe.",
        info: responseDb,
      });
    }
  } catch (err) {
    res.status(500).send({
      ok: false,
      message: "Ha ocurrido un error eliminando el usuario.",
      info: err.toString(),
    });
  }
});

module.exports = router;
