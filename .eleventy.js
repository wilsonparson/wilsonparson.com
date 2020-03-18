module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({'_css-out': '/'});

  eleventyConfig.setTemplateFormats([
    'md',
    'jpg'
  ]);

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    htmlTemplateEngine: 'njk'
  };
}