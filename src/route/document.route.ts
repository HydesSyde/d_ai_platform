import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { upload, getAllDoc, deleteDocument } from "../controller/document.controller.js";


const router = express.Router();

router.use(authMiddleware);

router.post("/upload",upload);
router.get("/getAllDoc", getAllDoc);
router.post("/delete/:id",deleteDocument);

export default router;