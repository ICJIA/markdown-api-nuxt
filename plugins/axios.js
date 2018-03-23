import axios from "axios";

export default axios.create({
  baseURL: "https://markdown-api.now.sh/"
});
