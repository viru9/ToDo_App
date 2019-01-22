import axios from 'axios';
import {ROOT_BASE_URL} from './../common/common';

export const FETCH_HOME_VALUES = 'fetch_home_values';
const FETCH_HOME_VALUE = '/posts';

export const ADD_DATA = 'add_data_values';
const ADD_DATAS = '/posts';

export function fetchHomeValues(callback) {

  const request = axios.get(`${ROOT_BASE_URL}${FETCH_HOME_VALUE}`);
    return (dispatch) => {
      request.then(({data}) => {
        if (data) {
          dispatch({type: FETCH_HOME_VALUES, payload: request});
          callback();
        }
      });
    };

}
