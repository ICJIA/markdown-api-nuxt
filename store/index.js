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
      taggedPosts: []
    },

    mutations: {
      toggleMenuState(state) {
        state.menuIsActive = !state.menuIsActive;
      },
      setPosts: (state, posts) => {
        state.posts = posts;
      },
      setFeaturedPosts: (state, featured) => {
        state.featured = featured;
      },
      setNewsPosts: (state, news) => {
        state.news = news;
      },
      setCurrentPost: (state, post) => {
        state.post = post;
      },
      setTags: (state, tags) => {
        state.tags = tags;
      },
      setTaggedPosts: (state, taggedPosts) => {
        state.taggedPosts = taggedPosts;
      }
    },
    actions: {
      async getPosts({ commit, dispatch }) {
        let { data } = await axios.get(`posts`);
        commit("setPosts", data);
        dispatch("getFeaturedPosts");
        dispatch("getNewsPosts");
        dispatch("getTags");
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

      getFeaturedPosts({ commit }) {
        let featured = this.state.posts.filter(post => {
          if (post.attrs.category === "Featured") {
            return post;
          }
        });
        commit("setFeaturedPosts", featured);
      },
      getNewsPosts({ commit }) {
        let news = this.state.posts.filter(post => {
          if (post.attrs.category === "News") {
            return post;
          }
        });
        commit("setNewsPosts", news);
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

      async nuxtServerInit({ commit, dispatch }, { store, route, params }) {
        if (process.server) {
          let res;
          res = await axios.get("posts");
          commit("setPosts", res.data);
          dispatch("getFeaturedPosts");
          dispatch("getNewsPosts");
          dispatch("getTags");
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
      }
    }
  });
};

export default createStore;
