import {GET_PEOPLE, SWITCH_STATUS} from '../actions/types';

const initialState = {
  people: []
}

export default(state = initialState, action) => {
  switch (action.type) {
    case GET_PEOPLE:
      return {
        ...state,
        people: action.payload
      }
      case SWITCH_STATUS:
      return {
        ...state,
        people: state.people.map(t =>
          t.id === action.payload
           ? {...t, isOnVacation: !t.isOnVacation}
           : t
         )
      }
    default:
      return state

  }
}
