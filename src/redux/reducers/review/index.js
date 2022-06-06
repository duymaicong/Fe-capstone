import * as ReviewActionTypes from "../../actions/types/review";

export const ListReviewForCustomer = (
  state = {
    listReview: null,
    myReview: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ReviewActionTypes.GET_REVIEW_FOR_CUSTOMER_FAILED:
      return {
        ...state,
        listReview: null,
        myReview: null,
        errMess: action.payload.errMess,
      };
    case ReviewActionTypes.GET_REVIEW_FOR_CUSTOMER_SUCCESSFULLY:
      return {
        ...state,
        listReview: action.payload.listReview,
        myReview: action.payload.myReview,
        errMess: null,
      };
    case ReviewActionTypes.RESET_LIST_REVIEW_FOR_CUSTOMER:
      return { ...state, listReview: null, myReview: null, errMess: null };
    default:
      return state;
  }
};

export const AddReviewForCustomer = (
  state = {
    reviewData: null,
    successMessage: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ReviewActionTypes.ADD_REVIEW_FOR_CUSTOMER_FAILED:
      return {
        ...state,
        reviewData: null,
        successMessage: null,
        errMess: action.payload,
      };
    case ReviewActionTypes.ADD_REVIEW_FOR_CUSTOMER_SUCCESSFULLY:
      return {
        ...state,
        reviewData: action.payload.reviewData,
        successMessage: action.payload.successMessage,
        errMess: null,
      };
    case ReviewActionTypes.GET_REVIEW_FOR_CUSTOMER_SUCCESSFULLY:
      return {
        ...state,
        reviewData: null,
        successMessage: null,
        errMess: null,
      };
    default:
      return state;
  }
};

export const ListReviewForSalon = (
  state = {
    listReviewSalon: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ReviewActionTypes.GET_REVIEW_FOR_SALON_FAILED:
      return {
        ...state,
        listReviewSalon: null,
        errMess: action.payload.errMess,
      };
    case ReviewActionTypes.GET_REVIEW_FOR_SALON_SUCCESSFULLY:
      return {
        ...state,
        listReviewSalon: action.payload.listReviewSalon,
        errMess: null,
      };
    case ReviewActionTypes.RESET_LIST_REVIEW_FOR_SALON:
      return { ...state, listReviewSalon: null, errMess: null };
    default:
      return state;
  }
};


export const EditReviewForCustomer = (
  state = {
    reviewData: null,
    successMessage: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ReviewActionTypes.EDIT_REVIEW_FOR_CUSTOMER_FAILED:
      return {
        ...state,
        reviewData: null,
        successMessage: null,
        errMess: action.payload,
      };
    case ReviewActionTypes.EDIT_REVIEW_FOR_CUSTOMER_SUCCESSFULLY:
      return {
        ...state,
        reviewData: action.payload.reviewData,
        successMessage: action.payload.successMessage,
        errMess: null,
      };
    case ReviewActionTypes.GET_REVIEW_FOR_CUSTOMER_SUCCESSFULLY:
      return {
        ...state,
        reviewData: null,
        successMessage: null,
        errMess: null,
      };
    default:
      return state;
  }
};

export const DeleteReviewForCustomer = (
  state = {
    reviewData: null,
    successMessage: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ReviewActionTypes.DELETE_REVIEW_FOR_CUSTOMER_FAILED:
      return {
        ...state,
        reviewData: null,
        successMessage: null,
        errMess: action.payload,
      };
    case ReviewActionTypes.DELETE_REVIEW_FOR_CUSTOMER_SUCCESSFULLY:
      return {
        ...state,
        reviewData: action.payload.reviewData,
        successMessage: action.payload.successMessage,
        errMess: null,
      };
    case ReviewActionTypes.GET_REVIEW_FOR_CUSTOMER_SUCCESSFULLY:
      return {
        ...state,
        reviewData: null,
        successMessage: null,
        errMess: null,
      };
    default:
      return state;
  }
};