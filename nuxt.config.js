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
    // routes: function() {
    //   return axios.get("http://localhost:4000/posts").then(res => {
    //     return _.map(res.data, function(post, key) {
    //       return `/posts/${post.slug}`;
    //     });
    //   });
    // }

    routes: function(callback) {
      axios
        .get("http://localhost:4000/posts")
        .then(res => {
          let postRoutes = res.data.map(post => {
            return `/posts/${post.slug}`;
          });
          let tagArray = [];
          let tagRoutes = res.data.map(post => {
            if (post.attrs.tags) {
              post.attrs.tags.map(tag => {
                tagArray.push(`/tags/${tag}`);
              });
            }
          });
          // Remove dupes
          tagArray = tagArray.reduce(
            (x, y) => (x.includes(y) ? x : [...x, y]),
            []
          );

          routes = [...postRoutes, ...tagArray];
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
