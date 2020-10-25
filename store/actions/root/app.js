import {initializeApollo} from "~/lib/apollo-client";
import APP_QUERY from '../../../components/App/App.graphql';

export const appTypes = {
  FETCHING_APP_CONFIG: 'APP/FETCHING_APP_CONFIG',
  FETCHING_APP_CONFIG_SUCCESS: 'APP/FETCHING_APP_CONFIG_SUCCESS',
  FETCHING_APP_CONFIG_FAILED: 'APP/FETCHING_APP_CONFIG_FAILED',
  SET_APP_LANGUAGE: 'APP/SET_APP_LANGUAGE'
};

export const fetch = () => ({ type: appTypes.FETCHING_APP_CONFIG });
export const fetchSuccess = (action) => ({
  type: appTypes.FETCHING_APP_CONFIG_SUCCESS,
  payload: action
});
export const fetchFailed = (action) => ({
  type: appTypes.FETCHING_APP_CONFIG_FAILED,
  payload: action
});

export const setAppLang = (action) => ({
  type: appTypes.SET_APP_LANGUAGE,
  payload: action
})

export function fetchAppConfigAction() {
  return async (dispatch) => {
    dispatch({ type: appTypes.FETCHING_APP_CONFIG });
    const apolloClient = initializeApollo();

    const { error, data } = await apolloClient.query({
      query: APP_QUERY,
      fetchPolicy: 'network-only'
    });

    if (error) {
      dispatch({ type: appTypes.FETCHING_APP_CONFIG_FAILED, data: error });
    }

    if (data) {
      dispatch({ type: appTypes.FETCHING_APP_CONFIG_SUCCESS, data });
    }
  };
}
