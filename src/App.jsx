import React, { useState, useMemo } from "react";
import jobsData from "./data/jobs";
import JobCard from "./components/JobCard";
import Filters from "./components/Filters";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortAlpha, setSortAlpha] = useState(false);

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

  return (
    <div className="app">
      <header>
        <h1>Job Board</h1>
        <p className="subtitle">Find internships and full-time roles</p>
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
          <div className="grid">
            {displayedJobs.map((job) => (
              <JobCard key={job.id} job={job} searchTerm={searchTerm} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
