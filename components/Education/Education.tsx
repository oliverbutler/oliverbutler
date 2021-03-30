import Section from "components/Layout/Section";
import Split from "components/Layout/Split";
import Heading from "components/Typography/Heading";
import React from "react";

const IndividualEducation = ({ date, img, title, modules }) => {
  return (
    <Split
      left={
        <>
          <img
            className="inline object-cover w-14 h-14 rounded-full mr-4"
            src={img}
          ></img>
          <div className="flex flex-col">
            <span className="font-semibold title-font text-white">{title}</span>
            <span className="mt-1 text-gray-500 text-sm">{date}</span>
          </div>
        </>
      }
      right={
        <>
          {modules.map((module) => (
            <div className="mb-4">
              <h2 className="title-font font-medium text-white title-font mb-2">
                {module.title}
              </h2>
              <p className="leading-relaxed">{module.text}</p>
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
        img="https://lh3.googleusercontent.com/proxy/5EdQsAAdMWcWKIdJU80ixY6Fv_4hoVlkB6SH190b4jZl4KxTHbVonhQ_uN5NCJ8uSUuFdR1jVUWom1ResBJGC31-ocjMaweoPJZZO2WREaLJLgMac2x135qYRtUrdTxRxTgHJTtS5EFm1znA1i9K3dzXuKjvOwTIn4mG53CWSmfBKHSZOnTG"
        modules={[
          {
            title: "BSc (Hons) Computer Science",
            text: (
              <p>
                Includes algorithm design and analysis, databases, operating
                systems, and networking. Was the lead developer for a stage 2
                client development project. <br />
                Writing a dissertation on utilizing blockchain (Hyperledger
                Fabric) to manage smart buildings through the use of incentive
                mechanisms.
              </p>
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
