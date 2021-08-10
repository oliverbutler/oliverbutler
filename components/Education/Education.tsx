import Split from "components/Layout/Split";
import React from "react";
import Section from "components/Layout/Section";
import { RenderBadge } from "components/Typography/Badge/Badge";
import { SectionWidth } from "components/Layout/Section/Section";

// const IndividualEducation = ({ education }) => {
//   return (
//     <Split
//       left={
//         <>
//           <BlurImage
//             className="w-16 h-16 mr-4 "
//             image={education.image}
//             rounded
//           />
//           <div className="flex flex-col">
//             <span className="font-semibold title-font text-black dark:text-white">
//               {education.name}
//             </span>
//             <span className="mt-1 text-gray-500 text-sm">
//               {education.dates}
//             </span>
//           </div>
//         </>
//       }
//       right={
//         <>
//           {education.modules.map((module) => (
//             <div className="mb-4" key={"module-" + module.title}>
//               <h2 className="title-font font-medium text-black dark:text-white title-font">
//                 {module.title}
//               </h2>
//               <h2 className="text-gray-500 text-sm mb-1">{module.grades}</h2>
//               <div className="leading-relaxed">{module.description}</div>
//               <div className="mt-1 flex flex-row flex-wrap">
//                 {module.tags.map((tag, index) => (
//                   <div className="mr-2 mb-2" key={`tag-${index}`}>
//                     <RenderBadge name={tag.name} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </>
//       }
//     />
//   );
// };

export const Education = ({ education }) => {
  return (
    <Section>
      {/* <Heading title={education.title} subtitle={education.subtitle} /> */}
      {/* {education.educations.map((e) => (
        // <IndividualEducation education={e} />
        <p>education</p>
      ))} */}
    </Section>
  );
};
