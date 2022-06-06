import * as AdminActionTypes from "../../types/admin/index";
import { api } from "../../../../api/api";

//GET LIST SALON ACTIVE
export const getListSalonActive = (token, nameSalon) => (dispatch) => {
  const data = new URLSearchParams({ ...nameSalon });
  return fetch(`${api}api/admin/getSalonActive`, {
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
          dispatch(getListSalonActiveFail(errMess));
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
          getListSalonActiveSuccessfully({
            listSalonActive: response.data,
            successMessage: response.message,
          })
        );
      } else {
        dispatch(getListSalonActiveFail(response.message));
      }
    })
    .catch((error) => {
      console.log("Get list salon active failed", error);
    });
};

const getListSalonActiveSuccessfully = (payload) => {
  return {
    type: AdminActionTypes.GET_LIST_SALON_ACTIVE_SUCCESSFULLY,
    payload,
  };
};

const getListSalonActiveFail = (errMess) => {
  return {
    type: AdminActionTypes.GET_LIST_SALON_ACTIVE_FAILED,
    payload: errMess,
  };
};

export const resetListSalonActive = () => (dispatch) => {
  dispatch({
    type: AdminActionTypes.RESET_LIST_SALON_ACTIVE,
  });
};

//GET LIST SALON DEACTIVE
export const getListSalonDeactive = (token, nameSalon) => (dispatch) => {
  const data = new URLSearchParams({ ...nameSalon });
  return fetch(`${api}api/admin/getSalonDeactive`, {
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
          dispatch(getListSalonDeactiveFail(errMess));
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
          getListSalonDeactiveSuccessfully({
            listSalonDeactive: response.data,
            successMessage: response.message,
          })
        );
      } else {
        dispatch(getListSalonDeactiveFail(response.message));
      }
    })
    .catch((error) => {
      console.log("Get list salon deactive failed", error);
    });
};

const getListSalonDeactiveSuccessfully = (payload) => {
  return {
    type: AdminActionTypes.GET_LIST_SALON_DEACTIVE_SUCCESSFULLY,
    payload,
  };
};

const getListSalonDeactiveFail = (errMess) => {
  return {
    type: AdminActionTypes.GET_LIST_SALON_DEACTIVE_FAILED,
    payload: errMess,
  };
};

export const resetListSalonDeactive = () => (dispatch) => {
  dispatch({
    type: AdminActionTypes.RESET_LIST_SALON_DEACTIVE,
  });
};

//GET LIST SALON REQUEST
export const getListSalonRequest = (token, nameSalon) => (dispatch) => {
  const data = new URLSearchParams({ ...nameSalon });
  return fetch(`${api}api/admin/getSalonRequest`, {
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
          dispatch(getListSalonRequestFail(errMess));
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
          getListSalonRequestSuccessfully({
            listSalonRequest: response.data,
            successMessage: response.message,
          })
        );
      } else {
        dispatch(getListSalonRequestFail(response.message));
      }
    })
    .catch((error) => {
      console.log("Get list salon request failed", error);
    });
};

const getListSalonRequestSuccessfully = (payload) => {
  return {
    type: AdminActionTypes.GET_LIST_SALON_REQUEST_SUCCESSFULLY,
    payload,
  };
};

const getListSalonRequestFail = (errMess) => {
  return {
    type: AdminActionTypes.GET_LIST_SALON_REQUEST_FAILED,
    payload: errMess,
  };
};

export const resetListSalonRequest = () => (dispatch) => {
  dispatch({
    type: AdminActionTypes.RESET_LIST_SALON_REQUEST,
  });
};

//UPDATE SELECTED SALON BUSSINESS INFO
export const updateSelectedSalonActiveBussinessInfo = (data) => (dispatch) => {
  dispatch({
    type: AdminActionTypes.UPDATE_SELECTED_SALON_ACTIVE_BUSINESS_INFO_SUCCESFULLY,
    payload: data,
  });
};
export const updateSelectedSalonDeactiveBussinessInfo =
  (data) => (dispatch) => {
    dispatch({
      type: AdminActionTypes.UPDATE_SELECTED_SALON_DEACTIVE_BUSINESS_INFO_SUCCESFULLY,
      payload: data,
    });
  };
export const updateSelectedSalonRequestBussinessInfo = (data) => (dispatch) => {
  dispatch({
    type: AdminActionTypes.UPDATE_SELECTED_SALON_REQUEST_BUSINESS_INFO_SUCCESFULLY,
    payload: data,
  });
};

//ACTIVE SALON

export const activeSalon = (token, salonId, callback) => (dispatch) => {
  const data = new URLSearchParams({ ...salonId });
  return fetch(`${api}api/admin/update/activeSalon/`, {
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
          dispatch(activeSalonFail(errMess));
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
          activeSalonSuccessfully({
            salonActive: response.data,
            activeSuccessMess: response.message,
          })
        );
        if (callback) {
          setTimeout(() => {
            callback();
          }, 1500);
        }
      } else {
        dispatch(activeSalonFail(response.message));
      }
    })
    .catch((error) => {
      console.log("Active salon failed", error);
    });
};

const activeSalonSuccessfully = (payload) => {
  return {
    type: AdminActionTypes.ACTIVE_SALON_SUCCESSFULLY,
    payload,
  };
};

const activeSalonFail = (errMess) => {
  return {
    type: AdminActionTypes.ACTIVE_SALON_FAILED,
    payload: errMess,
  };
};

//DEACTIVE SALON
export const deactiveSalon = (token, salonId, callback) => (dispatch) => {
  const data = new URLSearchParams({ ...salonId });
  return fetch(`${api}api/admin/update/deactiveSalon/`, {
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
          dispatch(deactiveSalonFail(errMess));
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
          deactiveSalonSuccessfully({
            salonDeactive: response.data,
            deactiveSuccessMess: response.message,
          })
        );
        if (callback) {
          setTimeout(() => {
            callback();
          }, 1500);
        }
      } else {
        dispatch(deactiveSalonFail(response.message));
      }
    })
    .catch((error) => {
      console.log("Deactive salon failed", error);
    });
};

const deactiveSalonSuccessfully = (payload) => {
  return {
    type: AdminActionTypes.DEACTIVE_SALON_SUCCESSFULLY,
    payload,
  };
};

const deactiveSalonFail = (errMess) => {
  return {
    type: AdminActionTypes.DEACTIVE_SALON_FAILED,
    payload: errMess,
  };
};

//REJECT SALON
export const rejectSalon = (token, salonId, callback) => (dispatch) => {
  const data = new URLSearchParams({ ...salonId });
  return fetch(`${api}api/admin/delete/accountSalon/`, {
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
          dispatch(rejectSalonFail(errMess));
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
          rejectSalonSuccessfully({
            salonReject: response.data,
            rejectSuccessMess: response.message,
          })
        );
        if (callback) {
          setTimeout(() => {
            callback();
          }, 1500);
        }
      } else {
        dispatch(rejectSalonFail(response.message));
      }
    })
    .catch((error) => {
      console.log("Reject salon failed", error);
    });
};

const rejectSalonSuccessfully = (payload) => {
  return {
    type: AdminActionTypes.REJECT_SALON_SUCCESSFULLY,
    payload,
  };
};

const rejectSalonFail = (errMess) => {
  return {
    type: AdminActionTypes.REJECT_SALON_FAILED,
    payload: errMess,
  };
};

//GET SALON INFO
export const getSalonInfo = (token, salonId) => (dispatch) => {
  const data = new URLSearchParams({ ...salonId });
  return fetch(`${api}api/admin/get/serviceOfSalon`, {
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
          dispatch(getSalonInfoFail(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if (response.dataSalon?.length && response.message) {
        dispatch(
          getSalonInfoSuccessfully({
            salonBusinessInfo: response.dataSalon[0],
            serviceList: response.data,
          })
        );
      } else {
        dispatch(getSalonInfoFail(response.message));
      }
    })
    .catch((error) => {
      console.log("Get salon info failed", error);
    });
};

const getSalonInfoSuccessfully = (payload) => {
  return {
    type: AdminActionTypes.GET_SALON_INFO_FOR_ADMIN_SUCCESSFULLY,
    payload,
  };
};

const getSalonInfoFail = (errMess) => {
  return {
    type: AdminActionTypes.GET_SALON_INFO_FOR_ADMIN_FAILED,
    payload: errMess,
  };
};

export const resetSalonInfo = () => (dispatch) => {
  dispatch({
    type: AdminActionTypes.RESET_SALON_INFO_FOR_ADMIN,
  });
};

//REVIEW
export const getSalonReview = (token, info) => (dispatch) => {
  const data = new URLSearchParams({ ...info });
  return fetch(`${api}api/admin/get/feedbackByStar`, {
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
          dispatch(getSalonReviewFail(errMess));
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
          getSalonReviewSuccessfully({
            listReview: response.data,
          })
        );
      } else {
        dispatch(getSalonReviewFail(response.message));
      }
    })
    .catch((error) => {
      console.log("Get review failed", error);
    });
};

const getSalonReviewSuccessfully = (payload) => {
  return {
    type: AdminActionTypes.GET_REVIEW_FOR_ADMIN_SUCCESSFULLY,
    payload,
  };
};

const getSalonReviewFail = (errMess) => {
  return {
    type: AdminActionTypes.GET_REVIEW_FOR_ADMIN_FAILED,
    payload: errMess,
  };
};

export const resetSalonReview = () => (dispatch) => {
  dispatch({
    type: AdminActionTypes.RESET_REVIEW_SALON_FOR_ADMIN,
  });
};
