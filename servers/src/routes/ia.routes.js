import { Router } from "express";
import ActivityIaCtrl from "../controllers/ia.controllers.js";

const activityIaCtrl = new ActivityIaCtrl();
const router = Router();

router.post("/mcgenerate",activityIaCtrl.generateActivityChoise.bind(activityIaCtrl));

export default router;

