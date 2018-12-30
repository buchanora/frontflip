import { 
    axioGet,
    axioList,
    axioPost,
    axioUpdate,
    axioUpload,
    axioReplaceUpload,
    axioDelete
}   from './helpers/axiosQueries';
import grant from '../lib/grant';

import queryString from '../utils/queryString';

export function getProducts(params){
    return grant( axioGet, [`/path/to/api?${queryString.stringify(params)}`], 'core');
}
