"use strict";

const slugify = require("slugify");

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      if (data.title) {
        data.slug = slugify(data.title.toLowerCase());
      }
    },
    beforeUpdate: async (params, data) => {
      if (data.title) {
        data.slug = slugify(data.title.toLowerCase());
      }
    },
  },
};
