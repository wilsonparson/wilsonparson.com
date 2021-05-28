const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.setDataDeepMerge(true);
  return {
    dir: {
      input: 'src',
      layouts: '_includes/layouts',
    },
  };
};
