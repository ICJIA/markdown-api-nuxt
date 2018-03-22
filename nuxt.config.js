const { join } = require("path");
const axios = require("axios");
const _ = require("lodash");

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "markdown-api-nuxt",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  generate: {
    routes: function(callback) {
      axios
        // get post routes
        .get("http://localhost:4000/posts")
        .then(res => {
          let postRoutes = res.data.map(post => {
            return `/posts/${post.slug}`;
          });
          // Get tag routes
          let tagRoutes = [];
          res.data.map(post => {
            if (post.attrs.tags) {
              post.attrs.tags.map(tag => {
                tagRoutes.push(`/tags/${tag}`);
              });
            }
          });
          // Remove dupe tags
          tagRoutes = tagRoutes.reduce(
            (x, y) => (x.includes(y) ? x : [...x, y]),
            []
          );

          let categoryRoutes = [];
          res.data.map(post => {
            if (post.attrs.category) {
              categoryRoutes.push(`/category/${post.attrs.category}`);
            }
          });

          categoryRoutes = categoryRoutes.reduce(
            (x, y) => (x.includes(y) ? x : [...x, y]),
            []
          );

          // merge all routes
          routes = [...postRoutes, ...tagRoutes, ...categoryRoutes];
          callback(null, routes);
        })
        .catch(callback);
    }
  },
  loading: { color: "#3B8070" },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true
  }
};
