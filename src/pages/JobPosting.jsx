import React, { useState } from "react";
import { useJob } from "../context/JobContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobPosting = () => {
  const { addJob } = useJob();

  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    location: "",
    salary: "",
    jobType: "Full-Time",
    description: "",
    qualifications: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let key in formData) {
      if (!formData[key]) {
        toast.error(`Please fill in the ${key}`);
        return;
      }
    }

    try {
      await addJob(formData);
      toast.success("Job posted successfully!");

      setFormData({
        jobTitle: "",
        company: "",
        location: "",
        salary: "",
        jobType: "Full-Time",
        description: "",
        qualifications: "",
      });
    } catch (error) {
      toast.error("Failed to post job.");
    }
  };

  return (
    <div className="container mt-2">
      <ToastContainer position="top-right" />
      <h2 className="mx-3">Post a Job</h2>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input
            type="text"
            className="form-control"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Company</label>
          <input
            type="text"
            className="form-control"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Job Type</label>
          <select
            className="form-select"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            required
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input
            type="number"
            className="form-control"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Job Description</label>
          <textarea
            className="form-control"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Job Qualification</label>
          <textarea
            className="form-control"
            name="qualifications"
            rows="4"
            value={formData.qualifications}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default JobPosting;
