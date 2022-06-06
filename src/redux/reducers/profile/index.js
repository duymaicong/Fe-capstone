import * as ProfileActionTypes from "../../actions/types/profile";

export const Profile = (
  state = {
    info: null,
    errMess: null,
    successMess: null,
  },
  action
) => {
  switch (action.type) {
    case ProfileActionTypes.GET_CUSTOMER_PROFILE_FAILED:
      return {
        ...state,
        info: null,
        errMess: action.payload,
        successMess: null,
      };

    case ProfileActionTypes.GET_CUSTOMER_PROFILE_SUCCESSFULLY:
      return {
        ...state,
        info: action.payload,
        errMess: null,
        successMess: null,
      };

    case ProfileActionTypes.UPDATE_CUSTOMER_PROFILE_SUCCESSFULLY:
      return {
        ...state,
        successMess: action.payload,
        errMess: null,
      };

    case ProfileActionTypes.UPDATE_CUSTOMER_PROFILE_FAILED:
      return {
        ...state,
        successMess: null,
        errMess: action.payload,
      };
      case ProfileActionTypes.CHANGE_PASSWORD_SUCCESSFULLY:
      return {
        ...state,
        successMess: action.payload,
        errMess: null,
      };

    case ProfileActionTypes.CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        successMess: null,
        errMess: action.payload,
      };      

    case ProfileActionTypes.CLEAR_CUSTOMER_PROFILE_MESSAGE:
      return { ...state, successMess: null, errMess: null };

    default:
      return state;
  }
};
