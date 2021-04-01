import Section from "components/Layout/Section";
import Split from "components/Layout/Split";
import Badge from "components/Typography/Badge";
import {
  JavaBadge,
  NodeBadge,
  PythonBadge,
  ReactBadge,
} from "components/Typography/Badge/Badge";
import Heading from "components/Typography/Heading";
import React from "react";

const IndividualExperience = ({
  date,
  role,
  title,
  text,
  type,
  img,
  stack,
}) => {
  return (
    <Split
      left={
        <>
          <div>
            <img
              className="inline object-cover w-16 h-16 rounded-full mr-4"
              src={img}
            ></img>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold title-font text-black dark:text-white">
              {title}
            </span>
            <span className="font-semibold title-font text-gray-700">
              {type}
            </span>
            <span className="mt-1 text-gray-500 text-sm">{date}</span>
          </div>
        </>
      }
      right={
        <>
          <h2 className="title-font font-medium text-black dark:text-white title-font mb-2 w-full">
            {role}
          </h2>
          <p className="leading-relaxed">{text}</p>
          <div className="flex mt-1">
            {stack.map((tag) => (
              <div className="mr-2"> {tag} </div>
            ))}
          </div>
        </>
      }
    />
  );
};

const Experience = () => {
  return (
    <Section>
      <Heading
        title="Career Experience"
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
        stack={[<ReactBadge />, <NodeBadge />, <PythonBadge />]}
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
        stack={[<ReactBadge />, <JavaBadge />]}
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
        stack={[]}
      />
      <IndividualExperience
        date="January 2017 - September 2018"
        img="https://www.brindledistillery.co.uk/wp-content/uploads/2017/07/boothsCardImageLarge.png"
        title="Booths, Supermarket"
        type="Part Time Job"
        role="Deli Assistant"
        text={
          <p>
            I provided assistance to the public whilst working at a local
            supermarket, on both the Deli and Bakery. I also took pride in my
            organisational skills and often took it upon myself to ensure the
            stock room was neat and organized correctly. I also enjoyed helping
            serve the public and always worked to the best of my ability to help
            them.
          </p>
        }
        stack={[]}
      />
    </Section>
  );
};

export default Experience;
