import {FETCH_HOME_VALUES} from './../../actions/home';
import {USE_DUMMY_DATA, HOME_DATA} from './../dummy_data/home'; //import dummy data...

export default function(state = {}, action) {

  switch (action.type) {

    case FETCH_HOME_VALUES:
    if(USE_DUMMY_DATA){
      return HOME_DATA;
    }
    else {
      return action.payload.data;
    }


    default:
      return state;
  }

}
