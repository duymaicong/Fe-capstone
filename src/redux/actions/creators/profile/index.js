import * as ProfileActionTypes from "../../types/profile";
import { api } from "../../../../api/api";

export const getCustomerProfile = (token) => (dispatch) => {
  return fetch(`${api}api/customer/profile`, {
    method: "GET",
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
          dispatch(getCustomerProfileFailed(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if (response.data?.length) {
        dispatch(getCustomerProfileSuccessfully(response.data[0]));
      } else {
        dispatch(getCustomerProfileFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Get profile error: ", error);
    });
};

const getCustomerProfileSuccessfully = (salonList) => {
  return {
    type: ProfileActionTypes.GET_CUSTOMER_PROFILE_SUCCESSFULLY,
    payload: salonList,
  };
};

const getCustomerProfileFailed = (errMess) => {
  return {
    type: ProfileActionTypes.GET_CUSTOMER_PROFILE_FAILED,
    payload: errMess,
  };
};

export const updateCustomerProfile = (info, token, callback) => (dispatch) => {
  const data = new URLSearchParams({
    nameCustomer: info.nameCustomer,
    phone: info.phone,
    address: info.address,
    birthday: info.birthday,
  });

  return fetch(`${api}api/customer/update/profile`, {
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
          dispatch(updateCustomerProfileFailed(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if (response.data) {
        dispatch(updateCustomerProfileSuccessfully(response.message));
        if (callback) {
          setTimeout(() => {
            callback();
          }, 2000);
        }
      } else {
        dispatch(updateCustomerProfileFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Login error: ", error);
    });
};

const updateCustomerProfileSuccessfully = (successMess) => {
  return {
    type: ProfileActionTypes.UPDATE_CUSTOMER_PROFILE_SUCCESSFULLY,
    payload: successMess,
  };
};

const updateCustomerProfileFailed = (errMess) => {
  return {
    type: ProfileActionTypes.UPDATE_CUSTOMER_PROFILE_FAILED,
    payload: errMess,
  };
};

export const resetMessage = () => (dispatch) => {
  dispatch({ type: ProfileActionTypes.CLEAR_CUSTOMER_PROFILE_MESSAGE });
};

//Change password
export const changePassword = (token, password, callback) => (dispatch) => {
  const data = new URLSearchParams({ ...password });
  return fetch(`${api}api/account/changePassword`, {
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
          dispatch(changePasswordFail(errMess));
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
          changePasswordSuccessfully(response.message)
        );
        if (callback) {
          setTimeout(() => {
            callback();
          }, 2000);
        }
      } else {
        dispatch(changePasswordFail(response.message));
      }
    })
    .catch((error) => {
      console.log("Change password failed", error);
    });
};

const changePasswordSuccessfully = (successMess) => {
  return {
    type: ProfileActionTypes.CHANGE_PASSWORD_SUCCESSFULLY,
    payload:successMess,
  };
};

const changePasswordFail = (errMess) => {
  return {
    type: ProfileActionTypes.CHANGE_PASSWORD_FAILED,
    payload: errMess,
  };
};

