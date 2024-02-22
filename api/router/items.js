const express = require("express");
const { v4: uuid } = require("uuid");
const status = require("http-status");
const Item = require("../models/item");

const itemRouter = express.Router();

itemRouter.get("/", async (req, res) => {
  try {
    const resp = await Item.find();
    res.status(status.OK).send(resp);
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send(error.message);
  }
});

itemRouter.post("/", async (req, res) => {
  try {
    const _id = uuid();
    const resp = await Item.create({ ...req.body, _id });
    res.status(status.CREATED).send(resp);
  } catch (error) {
    res.status(status.NOT_FOUND).send(error.message);
  }
});

itemRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const resp = await Item.findByIdAndUpdate(id, data);
    if (!resp) {
      res
        .status(status.NOT_FOUND)
        .send("The product against given id not exits!");
      return;
    }
    res.status(status.OK).send({ ...data, id });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send(error.message);
  }
});

itemRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await Item.findByIdAndDelete(id);
    if (!resp) {
      res.status(status.NOT_FOUND).send("Already deleted!");
      return;
    }
    res.status(status.OK).send("Successfully Deleted");
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send(error.message);
  }
});

itemRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await Item.findById(id);
    res.status(status.OK).send(resp);
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send(error.message);
  }
});

module.exports = itemRouter;
