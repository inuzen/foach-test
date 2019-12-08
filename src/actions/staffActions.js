import {GET_PEOPLE, SWITCH_STATUS} from '../actions/types';

const initialList = [  {
    id: 0,
    fullName: 'Phil Schiller',
    title: 'Senior Vice President',
    department: 'Worldwide Marketing',
    isOnVacation: true,
  },
  {
    id: 1,
    fullName: 'Craig Federighi',
    title: 'Senior Vice President',
    department: 'Software Engineering',
    isOnVacation: false,
  },
  {
    id: 2,
    fullName: 'Eddy Cue',
    title: 'Senior Vice President',
    department:'Internet Software and Services',
    isOnVacation: false,
  }];

export const getPeople = () => dispatch => {
    dispatch({type: GET_PEOPLE, payload: initialList});
};

export const switchStatus = (id) => dispatch => {
    dispatch({type: SWITCH_STATUS, payload: id});
};
