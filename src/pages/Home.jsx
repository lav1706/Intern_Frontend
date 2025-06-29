import React, { useState } from "react";
import { useJob } from "../context/JobContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { job, deleteJob } = useJob();
  const [search, setSearch] = useState("");

  const filteredJobs = job.filter((item) =>
    item.jobTitle.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    deleteJob(id);
    toast.success("Job deleted successfully!");
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div>
        <input
          type="text"
          placeholder="Search by Job Title"
          onChange={(e) => setSearch(e.target.value)}
          className="form-control w-75"
        />
      </div>

      <h2 className="mt-4 mb-3">All Jobs</h2>

      <div className="row g-4">
        {filteredJobs.length === 0 ? (
          <p>No jobs found</p>
        ) : (
          filteredJobs.map((item) => (
            <div className="col-md-4" key={item._id}>
              <div className="card h-100 shadow-sm p-2">
                <div className="card-body">
                  <h5 className="card-title">{item.jobTitle}</h5>
                  <h6 className="card-subtitle mb-2 mt-2">
                    <strong>Company Name-</strong> {item.company}
                  </h6>
                  <h6 className="card-text mb-2 mt-2">
                    <strong>Location-</strong> {item.location}
                  </h6>
                  <p className="card-text mb-2 mt-2">
                    <strong>Job Type-</strong> {item.jobType}
                  </p>
                  <div className="d-flex gap-2">
                    <Link
                      to={`/job/${item._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      See Details
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
