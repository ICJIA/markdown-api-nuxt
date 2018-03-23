import Vuex from "vuex";
import axios from "~/plugins/axios.js";
import _ from "lodash";

function slugifyPath(path) {
  return encodeURI(
    path
      .split("/")
      .pop()
      .replace(/\.[^/.]+$/, "")
  );
}

const createStore = () => {
  return new Vuex.Store({
    state: {
      post: {},
      posts: [],
      postsByCategory: [],
      postsByTag: [],
      tags: [],
      categories: [],
      categoryArray: [],
      tagArray: []
    },

    mutations: {
      setPosts: (state, posts) => {
        state.posts = posts;
      },
      setCurrentPost: (state, post) => {
        state.post = post;
      },
      setPostsByCategory: (state, postsByCategory) => {
        state.postsByCategory = postsByCategory;
      },
      setPostsByTag: (state, postsByTag) => {
        state.postsByTag = postsByTag;
      },
      setTags: (state, tags) => {
        state.tags = tags;
      },
      setCategories: (state, categories) => {
        state.categories = categories;
      },
      setTagArray: (state, tagArray) => {
        state.tagArray = tagArray;
      },
      setCategoryArray: (state, categoryArray) => {
        state.categoryArray = categoryArray;
      }
    },
    actions: {
      async getPosts({ commit, dispatch }) {
        let { data } = await axios.get(`posts`);
        commit("setPosts", data);
      },
      getPost({ commit, store }, slug) {
        //let { data } = await axios.get(`posts/${slug}`);
        let data = this.state.posts.filter(function(post) {
          if (post.slug === slug) {
            return post;
          }
        });

        commit("setCurrentPost", Object.assign({}, data[0]));
      },

      getPostsByCategory({ commit, store }, category) {
        //let { data } = await axios.get(`categories/${category}`);
        let data = this.state.posts.filter(function(post) {
          if (post.attrs.category === category) {
            return post;
          }
        });
        commit("setPostsByCategory", data);
      },

      getPostsByTag({ commit, store }, tag) {
        //let { data } = await axios.get(`tags/${tag}`);
        let data = [];
        this.state.posts.map(post => {
          if (post.attrs.tags) {
            if (_.includes(post.attrs.tags, tag)) {
              let clone = Object.assign({}, post);
              data.push(post);
            }
          }
        });
        commit("setPostsByTag", data);
      },
      getTags({ commit, dispatch }) {
        //let { data } = await axios.get(`tags`);
        let tagObj = {};
        this.state.posts.map(post => {
          if (post.attrs.tags) {
            post.attrs.tags.map(tag => {
              tagObj[tag] = [];
            });
          }
        });
        for (var tag in tagObj) {
          this.state.posts.map(post => {
            if (post.attrs.tags) {
              post.attrs.tags.map(t => {
                if (t === tag) {
                  let clone = Object.assign({}, post);
                  delete clone.body;
                  tagObj[t].push(clone);
                }
              });
            }
          });
        }

        commit("setTags", tagObj);
      },
      getCategories({ commit, dispatch }) {
        // let { data } = await axios.get(`categories`);
        let categoryObj = {};
        this.state.posts.map(function(post) {
          if (post.attrs.category) {
            categoryObj[post.attrs.category] = [];
          }
        });
        for (var category in categoryObj) {
          this.state.posts.map(function(post) {
            if (post.attrs.category === category) {
              let clone = Object.assign({}, post);
              delete clone.body;
              categoryObj[category].push(clone);
            }
          });
        }
        commit("setCategories", categoryObj);
      },

      getTagArray({ commit }) {
        let tags = [];
        this.state.posts.map(function(post) {
          if (post.attrs.tags) {
            post.attrs.tags.map(function(tag) {
              tags.push(tag);
            });
          }
        });
        tags = tags.reduce((x, y) => (x.includes(y) ? x : [...x, y]), []);
        commit("setTagArray", tags);
      },

      getCategoryArray({ commit }) {
        let categories = [];
        this.state.posts.map(function(post) {
          if (post.attrs.category) {
            categories.push(post.attrs.category);
          }
        });
        categories = categories.reduce(
          (x, y) => (x.includes(y) ? x : [...x, y]),
          []
        );
        commit("setCategoryArray", categories);
      },

      // Load from server

      async nuxtServerInit({ commit, dispatch }, { store, route, params }) {
        if (process.server) {
          let { data } = await axios.get("posts");
          commit("setPosts", data);
          dispatch("getCategories");
          dispatch("getTags");
        }
        if (process.server && params.slug) {
          //let { data } = await axios.get(`posts/${params.slug}`);
          //commit("setCurrentPost", data);
          dispatch("getPostsByCategory", params.slug);
          console.log("set current post from server");
        }
        if (process.server && route.name === "categories") {
          //   let { data } = await axios.get(`categories`);
          //   commit("setCategories", data);
          // console.log("get categories from server", data);
        }

        if (process.server && route.name === "tags") {
          //   let { data } = await axios.get(`tags`);
          //   commit("setTags", data);
          //   console.log("get tags from server");
        }

        if (process.server && params.category) {
          //let { data } = await axios.get(`categories/${params.category}`);
          dispatch("getPostsByCategory", params.category);
          console.log("get single category from server");
        }

        if (process.server && params.tag) {
          //let { data } = await axios.get(`tags/${params.tag}`);
          dispatch("getPostsByTag", params.tag);
          console.log("get single tag from server");
        }
      }
    }
  });
};

export default createStore;
