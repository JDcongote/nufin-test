import { TeamReducer } from './reducers/_team-reducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({ teamReducer: TeamReducer });

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(thunk));
}
