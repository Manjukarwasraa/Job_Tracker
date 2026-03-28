import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import JobCard from "../components/JobCard";
import EmptyState from "../components/EmptyState";
import AddJobModal from "../components/AddJobModal";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (err) {
      setJobs([]);
      console.log(err);
    }
  };

  const deleteJob = async (id) => {
    try {
      await API.delete(`/jobs/${id}`);
      fetchJobs();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.company?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 bg-light min-vh-100">
        <Navbar />

        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="fw-bold">Dashboard</h3>

            <button
              className="btn btn-primary"
              onClick={() => setShowModal(!showModal)}
            >
              + Add Job
            </button>
          </div>

          <input
            type="text"
            placeholder="Search by company..."
            className="form-control mb-4 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {showModal && (
            <AddJobModal
              fetchJobs={fetchJobs}
              editingJob={editingJob}
              setEditingJob={setEditingJob}
              setShowModal={setShowModal}
            />
          )}

          {filteredJobs.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="row">
              {filteredJobs.map((job) => (
                <div className="col-md-4" key={job._id}>
                  <JobCard
                    job={job}
                    onDelete={deleteJob}
                    onEdit={setEditingJob}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
