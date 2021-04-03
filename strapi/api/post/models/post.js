"use strict";

const slugify = require("slugify");

const WORDS_PER_MINUTE = 200;

const onSave = (post) => {
  if (post.title) {
    post.slug = slugify(post.title.toLowerCase());
  }

  if (post.content) {
    const words = post.content.split(" ").length;

    post.reading_time = words / WORDS_PER_MINUTE;
  }
};

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      onSave(data);
    },
    beforeUpdate: async (params, data) => {
      onSave(data);
    },
  },
};
