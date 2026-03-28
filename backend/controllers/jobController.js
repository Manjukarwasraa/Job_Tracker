const mongoose = require("mongoose");
const { Job, JOB_STATUSES } = require("../models/Job");

const sendError = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

const validateStatus = (status) => {
  return JOB_STATUSES.includes(status);
};

const findUserJob = async (jobId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return null;
  }

  return Job.findOne({ _id: jobId, userId });
};

const addJob = async (req, res, next) => {
  try {
    const { company, role, status, notes, applicationLink } = req.body;

    if (!company || !company.trim()) {
      return sendError(res, 400, "Company name is required.");
    }

    if (!role || !role.trim()) {
      return sendError(res, 400, "Role is required.");
    }

    if (status && !validateStatus(status)) {
      return sendError(
        res,
        400,
        `Status must be one of: ${JOB_STATUSES.join(", ")}.`
      );
    }

    const job = await Job.create({
      userId: req.user.id,
      company: company.trim(),
      role: role.trim(),
      status: status || "Applied",
      notes: notes?.trim() || "",
      applicationLink: applicationLink?.trim() || "",
      appliedAt: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "Job added successfully.",
      data: job,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllJobs = async (req, res, next) => {
  try {
    const requestedUserId = req.query.userId;

    if (requestedUserId && requestedUserId !== req.user.id) {
      return sendError(res, 403, "You can only view your own jobs.");
    }

    const jobs = await Job.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Jobs fetched successfully.",
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    return next(error);
  }
};

const updateJobStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status) {
      return sendError(res, 400, "Status is required.");
    }

    if (!validateStatus(status)) {
      return sendError(
        res,
        400,
        `Status must be one of: ${JOB_STATUSES.join(", ")}.`
      );
    }

    const job = await findUserJob(req.params.id, req.user.id);

    if (!job) {
      return sendError(res, 404, "Job not found.");
    }

    job.status = status;

    if (status === "Applied" && !job.appliedAt) {
      job.appliedAt = new Date();
    }

    await job.save();

    return res.status(200).json({
      success: true,
      message: "Job status updated successfully.",
      data: job,
    });
  } catch (error) {
    return next(error);
  }
};

const applyForJob = async (req, res, next) => {
  try {
    const job = await findUserJob(req.params.id, req.user.id);

    if (!job) {
      return sendError(res, 404, "Job not found.");
    }

    job.status = "Applied";
    job.appliedAt = new Date();

    await job.save();

    return res.status(200).json({
      success: true,
      message: "Job marked as applied successfully.",
      data: job,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const job = await findUserJob(req.params.id, req.user.id);

    if (!job) {
      return sendError(res, 404, "Job not found.");
    }

    await job.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully.",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  addJob,
  getAllJobs,
  updateJobStatus,
  applyForJob,
  deleteJob,
};
