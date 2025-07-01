import express from "express";
import {
  getAllDistricts,
  getDistrictByCode,
  getMandalsByDistrict,
  getVillagesByMandal,
  getMandalByVillageCode,
  getLocationByCode,
} from "./controller/locationController.js";

import {
  registerUser,
  verifyOTP,
  requestLoginOTP,
  verifyLoginOTP
} from "./controller/auth/userAuthController.js";

const router = express.Router();

router.get("/", (req, res) => res.send("📍 @Ease Location API Running"));

// All use POST now
router.post("/districts/all", getAllDistricts);
router.post("/districts/by-code", getDistrictByCode);
router.post("/mandals/by-district", getMandalsByDistrict);
router.post("/villages/by-mandal", getVillagesByMandal);
router.post("/mandal/by-village-code", getMandalByVillageCode);
router.post("/location/by-code", getLocationByCode);

//Auth Routes
router.post("/register", registerUser);
router.post("/register/verify", verifyOTP);
router.post("/login/request", requestLoginOTP);
router.post("/login/verify", verifyLoginOTP);

export default router;
