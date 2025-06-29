import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import JobDetails from "./pages/JobDetails";
import JobPosting from "./pages/JobPosting";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/job" element={<JobPosting />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
