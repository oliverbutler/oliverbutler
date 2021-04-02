import Section from "components/Layout/Section";
import Split from "components/Layout/Split";
import Badge from "components/Typography/Badge";
import {
  CPPBadge,
  CSharpBadge,
  JavaBadge,
  SwiftBadge,
} from "components/Typography/Badge/Badge";
import Heading from "components/Typography/Heading";
import React from "react";

const IndividualEducation = ({ date, img, title, modules }) => {
  return (
    <Split
      left={
        <>
          <img
            className="inline object-cover w-16 h-16 rounded-full mr-4"
            src={img}
          ></img>
          <div className="flex flex-col">
            <span className="font-semibold title-font text-black dark:text-white">
              {title}
            </span>
            <span className="mt-1 text-gray-500 text-sm">{date}</span>
          </div>
        </>
      }
      right={
        <>
          {modules.map((module) => (
            <div className="mb-4" key={"module-" + module.title}>
              <h2 className="title-font font-medium text-black dark:text-white title-font mb-2">
                {module.title}
              </h2>
              <div className="leading-relaxed">{module.text}</div>
            </div>
          ))}
        </>
      }
    />
  );
};

const Education = () => {
  return (
    <Section>
      <Heading title="Education" subtitle="" />

      <IndividualEducation
        date="2018-2021"
        title="Newcastle University"
        img="/uni.jpeg"
        modules={[
          {
            title: "BSc (Hons) Computer Science",
            text: (
              <>
                <p>
                  Includes algorithm design and analysis, databases, operating
                  systems, and networking. Was the lead developer for a stage 2
                  client development project. <br />
                  Writing a dissertation on utilizing blockchain (Hyperledger
                  Fabric) to manage smart buildings through the use of incentive
                  mechanisms.
                </p>
                <ul className="list list-disc ml-6 mt-2">
                  <li>
                    Algorithm Design &amp; Analysis <JavaBadge />
                  </li>
                  <li>
                    Programming I and II <JavaBadge />
                  </li>
                  <li>
                    Game Design <CSharpBadge />
                  </li>
                  <li>
                    Programming for Games <CPPBadge />
                  </li>
                  <li>
                    Mobile Development <SwiftBadge />
                  </li>
                </ul>
              </>
            ),
          },
        ]}
      />
      <IndividualEducation
        date="2017-2018"
        title="Ripon Grammar School"
        img="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Ripon_Grammar_School_crest_%281920%29.jpg/220px-Ripon_Grammar_School_crest_%281920%29.jpg"
        modules={[
          {
            title: "A Levels",
            text: <p>Maths (B), Physics (B), ICT (C) </p>,
          },
          {
            title: "AS Levels",
            text: <p>Chemistry (A*)</p>,
          },
          {
            title: "GCSE",
            text: (
              <p>
                3 A* (Inc. Maths, Chemistry), 3 A (Inc. Physics, DT), 2 B (Inc.
                English Language)
              </p>
            ),
          },
        ]}
      />
    </Section>
  );
};

export default Education;
