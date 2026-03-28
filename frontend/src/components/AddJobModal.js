import { useState } from "react";
import API from "../services/api";

function AddJobModal({ fetchJobs }) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
  });

  const handleSubmit = async () => {
    try {
      await API.post("/jobs", form);
      fetchJobs();
      alert("Job Added ✅");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="border p-3 bg-white">
      <input
        placeholder="Company"
        className="form-control mb-2"
        onChange={(e) => setForm({ ...form, company: e.target.value })}
      />
      <input
        placeholder="Role"
        className="form-control mb-2"
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      />

      <button className="btn btn-success" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
}

export default AddJobModal;