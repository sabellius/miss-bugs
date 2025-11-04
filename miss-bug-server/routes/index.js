import express from "express";
import bugsRouter from "./bugs.js";

const router = express.Router();

router.use("/bugs", bugsRouter);

export default router;
