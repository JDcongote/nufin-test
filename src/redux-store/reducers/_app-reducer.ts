import { NETWORK_ERROR, Error, iErrorState } from '../_types';

const initialState: iErrorState = {
  reason: '',
  message: ''
};

export function AppReducer(state = initialState, action: Error): iErrorState {
  switch (action.type) {
    case NETWORK_ERROR: {
      const error = action.payload.toJSON();
      return {
        reason: error.code,
        message: error.message
      };
    }
    default:
      return state;
  }
}
