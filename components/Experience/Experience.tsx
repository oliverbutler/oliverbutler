import Section from "components/Layout/Section";
import Split from "components/Layout/Split";
import Heading from "components/Typography/Heading";
import React from "react";

const IndividualExperience = ({ date, role, title, text, type, img }) => {
  return (
    <Split
      left={
        <>
          <div>
            <img
              className="inline object-cover w-14 h-14 rounded-full mr-4"
              src={img}
            ></img>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold title-font text-white">{title}</span>
            <span className="font-semibold title-font text-gray-700">
              {type}
            </span>
            <span className="mt-1 text-gray-500 text-sm">{date}</span>
          </div>
        </>
      }
      right={
        <>
          <h2 className="title-font font-medium text-white title-font mb-2 w-full">
            {role}
          </h2>
          <p className="leading-relaxed">{text}</p>
        </>
      }
    />
  );
};

const Experience = () => {
  return (
    <Section>
      <Heading
        title="My Work Experience"
        subtitle="I have had several placements throughout the industry, in addition to several freelance full stack projects."
      />

      <IndividualExperience
        date="2017 - Present"
        title="Freelance"
        role="Full Stack Developer"
        img="https://avatars.githubusercontent.com/u/47489826?v=4"
        type=""
        text={
          <p>
            Ongoing web development for a national dance and drama photography
            company. Volunteered to develop the web stack for
            <span className="italic"> Hambleton Paddlers Canoe Club</span> using
            React, Nodejs, Strapi, and Stripe.
          </p>
        }
      />
      <IndividualExperience
        img="https://yt3.ggpht.com/ytc/AAUvwnhr8kN2eebXR1zAqiF--WVa9ub_ViUYAZTjzX9YTQ=s900-c-k-c0x00ffffff-no-rj"
        date="July 2020 - August 2020"
        title="Lockheed Martin RMS"
        type="Summer Internship"
        role="Software Engineer"
        text={
          <p>
            Worked alongside the team to develop an interoperability layer using
            React, SSE Events, and Java to compliment the existing
            infrastructure of a common services data network of an existing
            project. Also actively worked to design and develop an overhaul of a
            STEM application focussed to help get school children interested in
            Cyber.
          </p>
        }
      />
      <IndividualExperience
        img="https://ak.picdn.net/shutterstock/videos/1012970891/thumb/1.jpg"
        date="July 2019 - August 2019"
        title="Cyber Training Course"
        type="Summer Placement"
        role="Student"
        text={
          <p>
            Developed malware analysis, penetration testing, and network
            analysis skills. Worked to develop a full stack application for LSB
            image steganography called <i>Stegosaurus</i>. The software was
            capable of encryption, decryption, and obfuscation of any data
            source and was built with Vue.js and Python. Contact for more
            information.
          </p>
        }
      />
      <IndividualExperience
        date="February 2019"
        img="/first.jpeg"
        title="FIRST Face to Face"
        type="Volunteering"
        role="Volunteer"
        text={
          <p>
            Contributed to host a one-day workshop at University for a group of
            30 sixth formers to give information about my University experience
            and answer any questions. I also gave a tour of both Newcastle and
            Northumbria University whilst keeping the group attentive and
            interested, whilst remaining in constant contact with other groups.
          </p>
        }
      />
    </Section>
  );
};

export default Experience;
