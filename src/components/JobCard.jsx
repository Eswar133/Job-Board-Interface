import React from "react";

const highlight = (text, term) => {
  if (!term) return [text];
  const safe = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(safe, "ig");
  const parts = [];
  let lastIndex = 0;
  let match;
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(<mark key={match.index}>{match[0]}</mark>);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
};

export default function JobCard({ job, searchTerm }) {
  const badgeClass = job.type === "Internship" ? "badge internship" : "badge fulltime";

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="job-title">
          {highlight(job.title, searchTerm)}
        </h3>
        <span className={badgeClass}>{job.type}</span>
      </div>
      <p className="meta">{job.company} • {job.location}</p>
    </div>
  );
}
