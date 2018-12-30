import axios from 'axios';
const apiVersion = 'v1/'

//Configure axios instance for making API calls to the api endpoints
const serverURL = () => {
  const stagingURL = '/',
      productionURL = '/',
      developmentURL = 'http://localhost:8000/';


  if (process.env.NODE_ENV === 'production'){
    return productionURL;
  } else if(process.env.NODE_ENV === 'staging'){
    return stagingURL;
  } else {
    return developmentURL;
  }
};

function launchServer(url){
  return axios.create({
    baseURL: getEndpointBase(url),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

function getEndpointBase(url){
    return serverURL() + url + '/' + apiVersion;
}

export const axiosRaw = axios;

export default launchServer;
