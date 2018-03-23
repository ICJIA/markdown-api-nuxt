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
      menuIsActive: false,
      post: {},
      posts: [],
      featured: [],
      news: [],
      tags: [],
      taggedPosts: [],
      categories: [],
      categorizedPosts: [],
      postsByCategory: [],
      postsByTag: []
    },

    mutations: {
      toggleMenuState(state) {
        state.menuIsActive = !state.menuIsActive;
      },
      setPosts: (state, posts) => {
        state.posts = posts;
      },

      setCurrentPost: (state, post) => {
        state.post = post;
      },
      setCategories: (state, categories) => {
        state.categories = categories;
      },
      setPostsByCategory: (state, postsByCategory) => {
        state.postsByCategory = postsByCategory;
      },
      setCategorizedPosts: (state, categorizedPosts) => {
        state.categorizedPosts = categorizedPosts;
      },
      setTags: (state, tags) => {
        state.tags = tags;
      },
      setTaggedPosts: (state, taggedPosts) => {
        state.taggedPosts = taggedPosts;
      },
      setPostsByTag: (state, postsByTag) => {
        state.postsByTag = postsByTag;
      }
    },
    actions: {
      async getPosts({ commit, dispatch }) {
        let { data } = await axios.get(`posts`);
        commit("setPosts", data);

        dispatch("getTags");
        dispatch("getCategories");
        dispatch("getPostsByCategory");
        dispatch("getPostsByTag");
      },
      async getPost({ commit, store }, slug) {
        let { data } = await axios.get(`posts/${slug}`);
        commit("setCurrentPost", data);
      },

      getTaggedPosts({ commit, store }, tag) {
        let postArray = [];
        this.state.posts.map(post => {
          if (post.attrs.tags) {
            if (_.includes(post.attrs.tags, tag)) {
              postArray.push(post);
            }
          }
        });
        commit("setTaggedPosts", postArray);
      },

      getCategorizedPosts({ commit, store }, category) {
        let categoryArray = [];
        this.state.posts.map(post => {
          if (post.attrs.category) {
            if (_.includes(post.attrs.category, category)) {
              categoryArray.push(post);
            }
          }
        });
        commit("setCategorizedPosts", categoryArray);
      },

      getTags({ commit }) {
        let tags = [];
        this.state.posts.map(function(post) {
          if (post.attrs.tags) {
            post.attrs.tags.map(function(tag) {
              tags.push(tag);
            });
          }
        });
        tags = tags.reduce((x, y) => (x.includes(y) ? x : [...x, y]), []);
        commit("setTags", tags);
      },
      getPostsByTag({ commit }) {
        let tagArray = [];
        let tmpObj = {};
        commit("setPostsByTag", tmpObj);
      },
      getCategories({ commit }) {
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
        commit("setCategories", categories);
      },
      getPostsByCategory({ commit }) {
        let categoryArray = [];
        let tmpObj = {};
        this.state.categories.map(category => {
          tmpObj[category] = [];
          this.state.posts.map(post => {
            if (post.attrs.category) {
              if (category === post.attrs.category) {
                let postObj = {};
                let attrs = {};
                attrs.title = post.attrs.title;
                attrs.created = post.attrs.created;
                attrs.updated = post.attrs.updated;
                postObj.slug = post.slug;
                postObj.attrs = attrs;
                tmpObj[category].push(postObj);
              }
            }
          });
        });
        commit("setPostsByCategory", tmpObj);
      },
      getPostsByTag({ commit }) {
        let tagArray = [];
        let tmpObj = {};
        this.state.tags.map(tag => {
          tmpObj[tag] = [];
          this.state.posts.map(post => {
            if (post.attrs.tags) {
              post.attrs.tags.map(targetTag => {
                if (tag === targetTag) {
                  let postObj = {};
                  let attrs = {};
                  attrs.title = post.attrs.title;
                  attrs.created = post.attrs.created;
                  attrs.updated = post.attrs.updated;
                  postObj.slug = post.slug;
                  postObj.attrs = attrs;
                  tmpObj[tag].push(postObj);
                }
              });
            }
          });
        });

        commit("setPostsByTag", tmpObj);
      },

      // Load from server

      async nuxtServerInit({ commit, dispatch }, { store, route, params }) {
        if (process.server) {
          let { data } = await axios.get("posts");
          commit("setPosts", data);
          dispatch("getTags");
          dispatch("getCategories");
          dispatch("getPostsByCategory");
          dispatch("getPostsByTag");
        }
        if (process.server && params.slug) {
          let { data } = await axios.get(`posts/${params.slug}`);
          commit("setCurrentPost", data);
          console.log("getCurrentPost from server");
        }

        if (process.server && params.tag) {
          dispatch("getTaggedPosts", params.tag);
          console.log("getTaggedPosts from server");
        }

        if (process.server && params.category) {
          dispatch("getCategorizedPosts", params.category);
          console.log("getCategorizedPosts from server");
        }
      }
    }
  });
};

export default createStore;
