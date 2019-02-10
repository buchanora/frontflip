import {  serverGet,
          serverList,
          serverPost,
          serverUpdate,
          serverDelete
} from './utils/queries';
import grant from '../lib/grant/';

const apiBase = 'sampleUrl'

export function makeServerRequest(data){
  return grant(serverPost, ['endpoint', {data}], apiBase)
}

const sampleApi = {
  makeServerRequest
}

export default sampleApi;
