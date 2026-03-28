const mongoose = require("mongoose");

const JOB_STATUSES = ["Applied", "Interview", "Selected", "Rejected"];

const jobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: JOB_STATUSES,
      default: "Applied",
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    applicationLink: {
      type: String,
      trim: true,
      default: "",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  Job: mongoose.model("Job", jobSchema),
  JOB_STATUSES,
};
