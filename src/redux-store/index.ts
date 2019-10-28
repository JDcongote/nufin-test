import { TeamReducer } from './reducers/_team-reducer';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { ConferenceReducer } from './reducers/_conference-reducer';
import { AppReducer } from './reducers/_app-reducer';

/**
 * Combine main app reducers
 */
const rootReducer = combineReducers({
  teamReducer: TeamReducer,
  conferenceReducer: ConferenceReducer,
  appReducer: AppReducer
});

export type AppState = ReturnType<typeof rootReducer>;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Configure the default store to use the thunk middleware
 */
export default function configureStore() {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}
