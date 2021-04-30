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

// I think I need to use twin.macro
const SectionHeading = (props: React.PropsWithChildren<{}>) => (
  <h2 className="text-purple-800 text-2xl font-medium border-b-2 border-purple-800">
    {props.children}
  </h2>
);

const JobTitle = (props: React.PropsWithChildren<{}>) => (
  <h3 className="text-purple-800">{props.children}</h3>
);

const Company = (props: React.PropsWithChildren<{}>) => (
  <h4 className="text-green-400 uppercase">{props.children}</h4>
);

const DateRange = (props: { startDate: string; endDate: string | null }) => (
  <span>
    [icon]{props.startDate}&ndash;{props.endDate}
  </span>
);

const Location = (props: React.PropsWithChildren<{}>) => (
  <span>[icon]{props.children}</span>
);

const Divider = () => <hr className="my-4" />;

const Pill = (props: React.PropsWithChildren<{}>) => (
  <li className="bg-green-100 text-green-700 text-xs font-semi-bold rounded-full py-1 px-2">
    {props.children}
  </li>
);

export default function Resume() {
  return (
    <div className="container mx-auto">
      <header className="flex justify-between">
        <div>
          <h1 className="text-purple-800 text-4xl font-medium">
            Wilson Parson
          </h1>
          <p className="text-green-400 text-lg">Software Engineer</p>
        </div>
        <div className="text-right text-purple-800">
          <p>wilson.parson@gmail.com</p>
          <p>(435) 740-1131</p>
        </div>
      </header>
      <SectionHeading>Experience</SectionHeading>
      <JobTitle>Senior UI Developer</JobTitle>
      <Company>Snap Finance</Company>
      <DateRange startDate="Oct '19" endDate="Apr '20" />
      <Location>SLC, UT</Location>
      <ul className="list-outside list-disc pl-8">
        <li>
          Developed high-impact, well-tested customer-facing web apps in Angular
          9, with heavy use of RxJS and reactive programming principles.
        </li>
        <li>
          Built an interactive catalog of Snap Finance's component library using
          Storybook.js.
        </li>
        <li>
          <a href="">Migrated an Nx Monorepo</a> of 54 Angular apps and
          libraries from Karma test runner to Jest.
        </li>
      </ul>
      <Divider />

      <SectionHeading>Expertise</SectionHeading>
      <ul className="flex">
        <Pill>UI Development</Pill>
      </ul>
    </div>
  );
}
