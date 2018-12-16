import axios from 'axios';
 const apiVersion = 'v1/'

//Configure axios instance for making API calls to the api end points
const serverURL = ()=>{
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
  switch (url) {
    case 'sampleUrl':
      return serverURL() + 'sample/' + apiVersion
      break;
    default:
      return serverURL()

  }
}

export const axiosRaw = axios;

export default launchServer;
