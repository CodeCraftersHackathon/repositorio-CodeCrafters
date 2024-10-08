import { Router } from "express";
import ActivityIaCtrl from "../controllers/ia.controllers.js";


const activityIaCtrl = new ActivityIaCtrl();
const router = Router();

router.post(
  "/mcgenerate",
  activityIaCtrl.generateActivity.bind(activityIaCtrl),
);
router.post(
  "/questioncorrection",
  activityIaCtrl.correctionQuestion.bind(activityIaCtrl),
);
router.post(
  "/generateResumen",
  activityIaCtrl.resumeGenerate.bind(activityIaCtrl),
);
router.post('/saveMCQuestion', activityIaCtrl.saveActivityMC.bind(activityIaCtrl));

export default router;
