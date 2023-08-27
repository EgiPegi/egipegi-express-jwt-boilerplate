import * as express from "express";
import authorize from "../middlewares/authorize";

const router = express.Router();

// Rute yang hanya dapat diakses oleh admin
router.get("/admin", authorize(["admin"]), (req, res) => {
  res.send("Admin route");
});

// Rute yang dapat diakses oleh admin dan pengguna dengan peran "logistic"
router.get("/logistic", authorize(["admin", "logistic"]), (req, res) => {
  res.send("Logistic route");
});

// Rute yang dapat diakses oleh admin dan pengguna dengan peran "finance"
router.get("/finance", authorize(["admin", "finance"]), (req, res) => {
  res.send("Finance route");
});

// Rute yang dapat diakses oleh admin dan pengguna dengan peran "marketing"
router.get("/marketing", authorize(["admin", "marketing"]), (req, res) => {
  res.send("Marketing route");
});

export default router;
