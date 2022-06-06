import * as ReviewActionTypes from "../../types/review";
import { api } from "../../../../api/api";

//GET REVIEW FOR CUSTOMER
export const getListReviewForCustomer = (rate, token) => (dispatch) => {
  const data = new URLSearchParams({ ...rate });
  return fetch(`${api}api/customer/get/feedbackByStar`, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "x-access-token": `${token}`,
    },
  })
    .then(
      async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          const errMess = (await response.json()).message;
          dispatch(getListReviewForCustomerFail(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if ((response.data?.length && response.message) || (response.dataAccount?.length && response.message)) {
        dispatch(
          getListReviewForCustomerSuccessfully({
            listReview: response.data,
            myReview: response.dataAccount,
            successMessage: response.message,
          })
        );
      } else {
        dispatch(getListReviewForCustomerFail(response.message));
      }
    })
    .catch((error) => {
      console.log("Get list review failed", error);
    });
};

const getListReviewForCustomerSuccessfully = (payload) => {
  return {
    type: ReviewActionTypes.GET_REVIEW_FOR_CUSTOMER_SUCCESSFULLY,
    payload,
  };
};

const getListReviewForCustomerFail = (errMess) => {
  return {
    type: ReviewActionTypes.GET_REVIEW_FOR_CUSTOMER_FAILED,
    payload: errMess,
  };
};

export const resetReviewListForCustomer = () => (dispatch) => {
  dispatch({
    type: ReviewActionTypes.RESET_LIST_REVIEW_FOR_CUSTOMER,
  });
};

//Add REVIEW FOR CUSTOMER
export const addReview = (token, review, callback) => (dispatch) => {
  const data = new URLSearchParams({ ...review });
  return fetch(`${api}api/customer/create/feedbackByCustomer`, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "x-access-token": `${token}`,
    },
  })
    .then(
      async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          const errMess = (await response.json()).message;
          dispatch(addReviewForCustomerFail(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if (response.data && response.message) {
        dispatch(
          addReviewForCustomerSuccessfully({
            reviewData: response.data,
            successMessage: response.message,
          })
        );
        if (callback) {
          setTimeout(() => {
            callback();
          }, 1500);
        }
      } else {
        dispatch(addReviewForCustomerFail(response.message));
      }
    })
    .catch((error) => {
      console.log("Add review failed", error);
    });
};

const addReviewForCustomerSuccessfully = (payload) => {
  return {
    type: ReviewActionTypes.ADD_REVIEW_FOR_CUSTOMER_SUCCESSFULLY,
    payload,
  };
};

const addReviewForCustomerFail = (errMess) => {
  return {
    type: ReviewActionTypes.ADD_REVIEW_FOR_CUSTOMER_FAILED,
    payload: errMess,
  };
};

//GET REVIEW FOR SALON
export const getListReviewForSalon = (token, rate) => (dispatch) => {
  const data = new URLSearchParams({ ...rate });
  return fetch(`${api}api/salonowner/get/feedbackByStar`, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "x-access-token": `${token}`,
    },
  })
    .then(
      async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          const errMess = (await response.json()).message;
          dispatch(getListReviewForSalonFail(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if (response.data?.length && response.message) {
        dispatch(
          getListReviewForSalonSuccessfully({
            listReviewSalon: response.data,
            successMessage: response.message,
          })
        );
      } else {
        dispatch(getListReviewForSalonFail(response.message));
      }
    })
    .catch((error) => {
      console.log("Get list review failed", error);
    });
};

const getListReviewForSalonSuccessfully = (payload) => {
  return {
    type: ReviewActionTypes.GET_REVIEW_FOR_SALON_SUCCESSFULLY,
    payload,
  };
};

const getListReviewForSalonFail = (errMess) => {
  return {
    type: ReviewActionTypes.GET_REVIEW_FOR_SALON_FAILED,
    payload: errMess,
  };
};

export const resetReviewListForSalon = () => (dispatch) => {
  dispatch({
    type: ReviewActionTypes.RESET_LIST_REVIEW_FOR_SALON,
  });
};

//EDIT REVIEW FOR CUSTOMER
export const editReview = (token, review, callback, id) => (dispatch) => {
  const data = new URLSearchParams({ ...review });
  return fetch(`${api}api/customer/update/feedback/${id}`, {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "x-access-token": `${token}`,
    },
  })
    .then(
      async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          const errMess = (await response.json()).message;
          dispatch(editReviewForCustomerFail(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if (response.data && response.message) {
        dispatch(
          editReviewForCustomerSuccessfully({
            reviewData: response.data,
            successMessage: response.message,
          })
        );
        if (callback) {
          setTimeout(() => {
            callback();
          }, 1500);
        }
      } else {
        dispatch(editReviewForCustomerFail(response.message));
      }
    })
    .catch((error) => {
      console.log("Edit review failed", error);
    });
};

const editReviewForCustomerSuccessfully = (payload) => {
  return {
    type: ReviewActionTypes.EDIT_REVIEW_FOR_CUSTOMER_SUCCESSFULLY,
    payload,
  };
};

const editReviewForCustomerFail = (errMess) => {
  return {
    type: ReviewActionTypes.EDIT_REVIEW_FOR_CUSTOMER_FAILED,
    payload: errMess,
  };
};

//DELETE REVIEW FOR CUSTOMER
export const deleteReview = (token, callback, id) => (dispatch) => {  
  return fetch(`${api}api/customer/delete/feedback/${id}`, {
    method: "DELETE",    
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "x-access-token": `${token}`,
    },
  })
    .then(
      async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          const errMess = (await response.json()).message;
          dispatch(deleteReviewForCustomerFail(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if (response.data && response.message) {
        dispatch(
          deleteReviewForCustomerSuccessfully({
            reviewData: response.data,
            successMessage: response.message,
          })
        );
        if (callback) {
          setTimeout(() => {
            callback();
          }, 1500);
        }
      } else {
        dispatch(deleteReviewForCustomerFail(response.message));
      }
    })
    .catch((error) => {
      console.log("Delete review failed", error);
    });
};

const deleteReviewForCustomerSuccessfully = (payload) => {
  return {
    type: ReviewActionTypes.DELETE_REVIEW_FOR_CUSTOMER_SUCCESSFULLY,
    payload,
  };
};

const deleteReviewForCustomerFail = (errMess) => {
  return {
    type: ReviewActionTypes.DELETE_REVIEW_FOR_CUSTOMER_FAILED,
    payload: errMess,
  };
};