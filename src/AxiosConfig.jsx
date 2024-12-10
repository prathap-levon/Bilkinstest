import axios from "axios";

const Instance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://bilkins-cms.onrender.com",
  // baseURL : "https://bilkins-cms-ywcd.onrender.com"
  // baseURL: "https://bilkins.com:5000/", //production
});
 
export default Instance;
