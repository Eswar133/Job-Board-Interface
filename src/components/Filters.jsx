import React from "react";

export default function Filters({
  searchTerm,
  setSearchTerm,
  locationFilter,
  setLocationFilter,
  typeFilter,
  setTypeFilter,
  sortAlpha,
  setSortAlpha
}) {
  return (
    <div className="filters">
      <input
        type="text"
        aria-label="Search jobs"
        placeholder="Search job title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <select className="select" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
        <option value="All">All locations</option>
        <option value="Remote">Remote</option>
        <option value="On-site">On-site</option>
      </select>
      <select className="select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
        <option value="All">All types</option>
        <option value="Internship">Internship</option>
        <option value="Full-time">Full-time</option>
      </select>

      <label className="sort">
        <input type="checkbox" checked={sortAlpha} onChange={(e) => setSortAlpha(e.target.checked)} /> Sort A–Z
      </label>
    </div>
  );
}
