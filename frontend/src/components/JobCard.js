import React from "react";

function JobCard({ job }) {
  return (
    <div className="card p-3 shadow-sm mb-3">
      <h5>{job.company}</h5>
      <p>{job.role}</p>
      <span className="badge bg-primary">{job.status}</span>
    </div>
  );
}

export default JobCard;