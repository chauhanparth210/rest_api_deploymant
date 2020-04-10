const express = require("express");

const Item = require("../models/item");

const addItem = async (req, res) => {
  const { item_name, quantity } = req.body;
  const newItem = new Item({
    item_name,
    quantity,
  });
  try {
    const response = await newItem.save();
    if (response) return res.status(201).json({ message: "add item" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to add new item", error: error.errmsg });
  }
};

const getItems = async (req, res) => {
  try {
    const items = await Item.find().select("-__v");
    if (items) return res.status(201).json({ items });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to query database", error: error.errmsg });
  }
};

const updateItem = async (req, res) => {
  const { item } = req.params;
  const { quantity } = req.body;
  try {
    const response = await Item.updateOne(
      { item_name: item },
      {
        $set: {
          quantity,
        },
      }
    );
    console.log(response);
    if (response.nModified > 0)
      return res.status(201).json({ message: "update item" });
    else res.status(404).json({ message: "item not found" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "failed to update item", error: error.errmsg });
  }
};

const deleteItem = async (req, res) => {
  const { item } = req.params;
  try {
    const response = await Item.deleteOne({ item_name: item });
    if (response.deletedCount > 0)
      return res.status(200).json({ message: "delete item" });
    else res.status(404).json({ message: "item not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to delete item", error: error.errmsg });
  }
};

const router = express.Router();
router.get("/", getItems);
router.post("/", addItem);
router.put("/:item", updateItem);
router.delete("/:item", deleteItem);
module.exports = router;
