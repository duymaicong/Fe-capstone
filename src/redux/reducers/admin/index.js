import * as AdminActionTypes from "../../actions/types/admin/index";

export const ListSalonActive = (
  state = {
    listSalonActive: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case AdminActionTypes.GET_LIST_SALON_ACTIVE_FAILED:
      return { ...state, listSalonActive: null, errMess: action.payload };
    case AdminActionTypes.GET_LIST_SALON_ACTIVE_SUCCESSFULLY:
      return {
        ...state,
        listSalonActive: action.payload.listSalonActive,
        errMess: null,
      };
    case AdminActionTypes.RESET_LIST_SALON_ACTIVE:
      return { ...state, listSalonActive: null, errMess: null };
    default:
      return state;
  }
};

export const ListSalonDeactive = (
  state = {
    listSalonDeactive: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case AdminActionTypes.GET_LIST_SALON_DEACTIVE_FAILED:
      return { ...state, listSalonDeactive: null, errMess: action.payload };
    case AdminActionTypes.GET_LIST_SALON_DEACTIVE_SUCCESSFULLY:
      return {
        ...state,
        listSalonDeactive: action.payload.listSalonDeactive,
        errMess: null,
      };
    case AdminActionTypes.RESET_LIST_SALON_DEACTIVE:
      return { ...state, listSalonDeactive: null, errMess: null };
    default:
      return state;
  }
};

export const ListSalonRequest = (
  state = {
    listSalonRequest: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case AdminActionTypes.GET_LIST_SALON_REQUEST_FAILED:
      return { ...state, listSalonRequest: null, errMess: action.payload };
    case AdminActionTypes.GET_LIST_SALON_REQUEST_SUCCESSFULLY:
      return {
        ...state,
        listSalonRequest: action.payload.listSalonRequest,
        errMess: null,
      };
    case AdminActionTypes.RESET_LIST_SALON_REQUEST:
      return { ...state, listSalonRequest: null, errMess: null };
    default:
      return state;
  }
};

export const SalonBusinessInfo = (
  state = {
    salonActivated: null,
    salonDeactivated: null,
    salonPendingRequest: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case AdminActionTypes.UPDATE_SELECTED_SALON_ACTIVE_BUSINESS_INFO_SUCCESFULLY:
      return {
        ...state,
        salonActivated: action.payload,
        salonDeactivated: null,
        salonPendingRequest: null,
        errMess: null,
      };
    case AdminActionTypes.UPDATE_SELECTED_SALON_DEACTIVE_BUSINESS_INFO_SUCCESFULLY:
      return {
        ...state,
        salonActivated: null,
        salonDeactivated: action.payload,
        salonPendingRequest: null,
        errMess: null,
      };
    case AdminActionTypes.UPDATE_SELECTED_SALON_REQUEST_BUSINESS_INFO_SUCCESFULLY:
      return {
        ...state,
        salonActivated: null,
        salonDeactivated: null,
        salonPendingRequest: action.payload,
        errMess: null,
      };
    default:
      return state;
  }
};

export const DeactiveSalon = (
  state = {
    salonDeactive: null,
    deactiveSuccessMess: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case AdminActionTypes.DEACTIVE_SALON_FAILED:
      return {
        ...state,
        salonDeactive: null,
        deactiveSuccessMess: null,
        errMess: action.payload,
      };
    case AdminActionTypes.DEACTIVE_SALON_SUCCESSFULLY:
      return {
        ...state,
        salonDeactive: action.payload.salonDeactive,
        deactiveSuccessMess: action.payload.deactiveSuccessMess,
        errMess: null,
      };
    case AdminActionTypes.GET_LIST_SALON_ACTIVE_SUCCESSFULLY:
      return {
        ...state,
        salonDeactive: null,
        deactiveSuccessMess: null,
        errMess: null,
      };
    default:
      return state;
  }
};

export const ActiveSalon = (
  state = {
    salonActive: null,
    activeSuccessMess: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case AdminActionTypes.ACTIVE_SALON_FAILED:
      return {
        ...state,
        salonActive: null,
        activeSuccessMess: null,
        errMess: action.payload,
      };
    case AdminActionTypes.ACTIVE_SALON_SUCCESSFULLY:
      return {
        ...state,
        salonActive: action.payload.salonActive,
        activeSuccessMess: action.payload.activeSuccessMess,
        errMess: null,
      };
    case AdminActionTypes.GET_LIST_SALON_ACTIVE_SUCCESSFULLY:
      return {
        ...state,
        salonActive: null,
        activeSuccessMess: null,
        errMess: null,
      };
    default:
      return state;
  }
};

export const RejectSalon = (
  state = {
    salonReject: null,
    rejectSuccessMess: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case AdminActionTypes.REJECT_SALON_FAILED:
      return {
        ...state,
        salonReject: null,
        rejectSuccessMess: null,
        errMess: action.payload,
      };
    case AdminActionTypes.REJECT_SALON_SUCCESSFULLY:
      return {
        ...state,
        salonReject: action.payload.salonReject,
        rejectSuccessMess: action.payload.rejectSuccessMess,
        errMess: null,
      };
    case AdminActionTypes.GET_LIST_SALON_ACTIVE_SUCCESSFULLY:
      return {
        ...state,
        salonReject: null,
        rejectSuccessMess: null,
        errMess: null,
      };
    default:
      return state;
  }
};

export const SalonInfo = (
  state = {
    salonBusinessInfo: null,
    serviceList: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case AdminActionTypes.GET_SALON_INFO_FOR_ADMIN_FAILED:
      return {
        ...state,
        salonBusinessInfo: null,
        serviceList: null,
        errMess: action.payload,
      };
    case AdminActionTypes.GET_SALON_INFO_FOR_ADMIN_SUCCESSFULLY:
      return {
        ...state,
        salonBusinessInfo: action.payload.salonBusinessInfo,
        serviceList: action.payload.serviceList,
        errMess: null,
      };
    case AdminActionTypes.RESET_SALON_INFO_FOR_ADMIN:
      return {
        ...state,
        salonBusinessInfo: null,
        serviceList: null,
        errMess: null,
      };

    default:
      return state;
  }
};

export const SalonReviewList = (
  state = {
    listReview: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case AdminActionTypes.GET_REVIEW_FOR_ADMIN_FAILED:
      return {
        ...state,
        listReview: null,
        errMess: action.payload,
      };
    case AdminActionTypes.GET_REVIEW_FOR_ADMIN_SUCCESSFULLY:
      return {
        ...state,
        listReview: action.payload.listReview,
        errMess: null,
      };
    case AdminActionTypes.RESET_REVIEW_SALON_FOR_ADMIN:
      return {
        ...state,
        listReview: null,
        errMess: null,
      };

    default:
      return state;
  }
};
