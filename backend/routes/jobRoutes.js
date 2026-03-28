const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  addJob,
  getAllJobs,
  updateJobStatus,
  applyForJob,
  deleteJob,
} = require("../controllers/jobController");

const router = express.Router();

router.post("/", auth, addJob);
router.get("/", auth, getAllJobs);
router.patch("/:id/status", auth, updateJobStatus);
router.patch("/:id/apply", auth, applyForJob);
router.delete("/:id", auth, deleteJob);

module.exports = router;
