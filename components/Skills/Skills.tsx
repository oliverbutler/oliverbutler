import { Heading } from "components/Typography/Heading/Heading";
import React from "react";
import { motion } from "framer-motion";

const Skills = () => {
  return (
    <div>
      <Heading title="Skills" subtitle="Below you can see the skills" />

      <div className="flex flex-col">
        {[
          { length: 600, colour: "bg-blue-400", name: "React" },
          { length: 200, colour: "bg-red-400", name: "Java" },
          { length: 500, colour: "bg-green-400", name: "Python" },
          { length: 200, colour: "bg-yellow-400", name: "Node.js" },
        ].map((tech, index) => (
          <motion.div
            animate={{ width: tech.length }}
            transition={{ duration: 0.5 }}
            key={`skill-bar-${tech.name.toLowerCase()}-${index}`}
          >
            <p>{tech.name}</p>
            <div className={`h-5 ${tech.colour} rounded-lg mb-2`}></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
