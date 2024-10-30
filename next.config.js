const { withPlugins } = require("next-compose-plugins");

/** @type {import('next').NextConfig} */

module.exports = withPlugins([], {
  output: "standalone",
  // distDir: 'dist',
  experimental: {
    appDir: true,
    outputStandalone: true,
  },
  images: {
    domains: ["ap-south-1.linodeobjects.com", "vedaimg.enjoycx.com"],
   
  },

  // async rewrites() {
  //   return [
  //     ...proxy,
  //   ];
  // },
});
