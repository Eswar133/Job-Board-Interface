import React, { useState, useMemo } from "react";
import jobsData from "../data/jobs";
import JobCard from "./JobCard";
import Filters from "./Filters";
import Pagination from "./Pagination";

const JOBS_PER_PAGE = 8;

export default function Dashboard({ onLogout }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortAlpha, setSortAlpha] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const displayedJobs = useMemo(() => {
    let list = jobsData.filter((job) => {
      const matchesTitle = job.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = locationFilter === "All" || job.location === locationFilter;
      const matchesType = typeFilter === "All" || job.type === typeFilter;
      return matchesTitle && matchesLocation && matchesType;
    });

    if (sortAlpha) {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [searchTerm, locationFilter, typeFilter, sortAlpha]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, locationFilter, typeFilter, sortAlpha]);

  const totalPages = Math.ceil(displayedJobs.length / JOBS_PER_PAGE);
  const paginatedJobs = displayedJobs.slice((currentPage - 1) * JOBS_PER_PAGE, currentPage * JOBS_PER_PAGE);

  return (
    <div className="app">
      <header>
        <div className="brand">
          <h1>Job Board</h1>
          <p className="subtitle">Find internships and full-time roles</p>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </header>

      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        sortAlpha={sortAlpha}
        setSortAlpha={setSortAlpha}
      />

      <main>
        {displayedJobs.length === 0 ? (
          <p className="no-results">No jobs found.</p>
        ) : (
          <>
            <div className="grid">
              {paginatedJobs.map((job) => (
                <JobCard key={job.id} job={job} searchTerm={searchTerm} />
              ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            <p className="results-info">Showing {paginatedJobs.length} of {displayedJobs.length} jobs</p>
          </>
        )}
      </main>
    </div>
  );
}
