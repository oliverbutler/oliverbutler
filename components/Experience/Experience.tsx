import Section from "components/Layout/Section";
import Split from "components/Layout/Split";
import { RenderBadge } from "components/Typography/Badge/Badge";
import Heading from "components/Typography/Heading";
import React from "react";

// const IndividualExperience = ({ experience }) => {
//   return (
//     <Split
//       key={experience.company}
//       left={
//         <>
//           <BlurImage
//             className="w-16 h-16 mr-4"
//             image={experience.image}
//             rounded
//           />
//           <div className="flex flex-col">
//             <span className="font-semibold title-font text-black dark:text-white">
//               {experience.company}
//             </span>
//             <span className="font-semibold title-font text-gray-700">
//               {experience.type}
//             </span>
//             <span className="mt-1 text-gray-500 text-sm">
//               {experience.dates}
//             </span>
//           </div>
//         </>
//       }
//       right={
//         <>
//           <h2 className="title-font font-medium text-black dark:text-white title-font mb-2 w-full">
//             {experience.role}
//           </h2>
//           <div className="leading-relaxed">{experience.description}</div>
//           <div className="flex mt-1 flex-wrap">
//             {experience.tags.map((tag, index) => (
//               <div className="mr-2 mb-2" key={`tag-${index}`}>
//                 <RenderBadge name={tag.name} />
//               </div>
//             ))}
//           </div>
//         </>
//       }
//     />
//   );
// };

export const Experience = ({ experience }) => {
  const experiences = [...experience.experiences];

  return (
    <Section>
      <Heading title={experience.title} subtitle={experience.subtitle} />

      {experiences
        .sort((a, b) => b.order - a.order)
        .map((e) => (
          // <IndividualExperience experience={e} />
          <p>experience</p>
        ))}
    </Section>
  );
};
