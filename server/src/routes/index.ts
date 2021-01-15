import express from "express";

const router = express.Router();

router.get("/api", (req, res) => {
  res.send("yreee");
});

export { router as indexRouter };
