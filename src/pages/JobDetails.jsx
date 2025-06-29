import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useJob } from "../context/JobContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobDetails = () => {
  const { id } = useParams();
  const { job, getJobById } = useJob();

  useEffect(() => {
    if (id) {
      getJobById(id).catch(() => {
        toast.error("Failed to load job details.");
      });
    }
  }, [id, getJobById]);

  const data = job.find((j) => j._id === id);

  if (!data) {
    return (
      <>
        <ToastContainer position="top-right" />
        <p className="text-center mt-5">Loading job details...</p>
      </>
    );
  }

  return (
    <div className="container mt-5">
      <ToastContainer position="top-right" />
      <h1 className="mb-4">{data.jobTitle}</h1>

      <div className="border p-4 rounded shadow-sm">
        <p>
          <strong>Company:</strong> {data.company}
        </p>
        <p>
          <strong>Location:</strong> {data.location}
        </p>
        <p>
          <strong>Job Type:</strong> {data.jobType}
        </p>
        <p>
          <strong>Salary:</strong> ₹{data.salary}
        </p>
        <p>
          <strong>Description:</strong>
        </p>
        <p>{data.description}</p>
        <p>
          <strong>Qualifications:</strong>
        </p>
        <p>{data.qualifications}</p>
      </div>
    </div>
  );
};

export default JobDetails;
