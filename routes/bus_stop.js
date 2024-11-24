const express = require("express");

const router = express.Router();

router.get("/testing", (req, res, next) => {
  res.status(200).json({ list: [1, 2, 3, 4, 5] });
});

router.get("/:id", (req, res, next) => {
  res.status(200)?.json(req.params?.id);
});

module.exports = router;
