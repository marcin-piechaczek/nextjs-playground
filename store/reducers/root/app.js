import { appTypes } from '../../actions/root/app';

const initialState = {
  categoryList: [],
  storeConfig: {},
  language: '',
  loading: false,
  error: null,
};

export default function appConfig(state = initialState, action) {
  switch (action.type) {
    case appTypes.FETCHING_APP_CONFIG:
      return {
        ...state,
        loading: true
      };
    case appTypes.FETCHING_APP_CONFIG_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        categoryList: action.data.categoryList[0].children,
        storeConfig: action.data.storeConfig,
        language: action.data.storeConfig.id === 1 ? 'en' : 'pl'
      };
    case appTypes.FETCHING_APP_CONFIG_FAILED:
      return {
        ...state,
        loading: false,
        error: action.data.error
      };
    case appTypes.SET_APP_LANGUAGE:
      return {
        ...state,
        language: action.data
      }
    default:
      return state;
  }
}

export const getAppConfig = (state) => state.appConfig;
