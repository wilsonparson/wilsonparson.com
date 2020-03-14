module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({'_css-out': '/'});

  return {
    dir: {
      input: 'src',
      output: 'dist',
    }
  };
}