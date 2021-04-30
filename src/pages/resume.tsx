import * as React from 'react';

const experience = [
  {
    title: 'Software Engineer II - Front End',
    company: 'Earnest LLC',
    startDate: 'Apr. 2020',
    endDate: 'current',
    content: <>hi</>,
  },
];

export default function Resume() {
  return (
    <>
      <h1>Wilson Parson</h1>
      <p>Software Engineer</p>
      <h2>Experience</h2>
      {experience.map((job) => (
        <>
          <span>{job.title}</span>
          <br />
          <span>{job.company}</span>
          <br />
          <span>
            {job.startDate}&ndash;{job.endDate}
          </span>
          {job.content}
        </>
      ))}
    </>
  );
}
