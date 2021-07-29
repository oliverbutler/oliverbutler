"use strict";

const slugify = require("slugify");

const WORDS_PER_MINUTE = 200;

const onSave = (post) => {
  if (post.title) {
    post.slug = slugify(post.title.toLowerCase());
  }

  var wordTotal = 0;

  if (post.dynamic) {
    post.dynamic.forEach((section) => {
      if (section.__component == "display.text")
        wordTotal += section.markdown.split(" ").length;
    });
  }

  post.readingTime = wordTotal / WORDS_PER_MINUTE;
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
