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
      async getPost({ commit, store }, slug) {
        let { data } = await axios.get(`posts/${slug}`);
        commit("setCurrentPost", data);
      },

      async getPostsByCategory({ commit, store }, category) {
        let { data } = await axios.get(`categories/${category}`);
        commit("setPostsByCategory", data);
      },

      async getPostsByTag({ commit, store }, tag) {
        let { data } = await axios.get(`tags/${tag}`);
        commit("setPostsByTag", data);
      },
      async getTags({ commit, dispatch }) {
        let { data } = await axios.get(`tags`);
        commit("setTags", data);
      },
      async getCategories({ commit, dispatch }) {
        let { data } = await axios.get(`categories`);
        commit("setCategories", data);
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
        }
        if (process.server && params.slug) {
          let { data } = await axios.get(`posts/${params.slug}`);
          commit("setCurrentPost", data);
          console.log("set current post from server");
        }
        if (process.server && route.name === "categories") {
          let { data } = await axios.get(`categories`);
          commit("setCategories", data);
          console.log("get categories from server", data);
        }

        if (process.server && route.name === "tags") {
          let { data } = await axios.get(`tags`);
          commit("setTags", data);
          console.log("get tags from server");
        }

        if (process.server && params.category) {
          let { data } = await axios.get(`categories/${params.category}`);
          commit("setPostsByCategory", data);
          console.log("get single category from server");
        }

        if (process.server && params.tag) {
          let { data } = await axios.get(`tags/${params.tag}`);
          commit("setPostsByTag", data);
          console.log("get single tag from server");
        }
      }
    }
  });
};

export default createStore;
