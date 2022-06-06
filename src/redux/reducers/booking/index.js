import * as BookingActionTypes from "../../actions/types/booking";

export const Booking = (
  state = {
    selectedSalonId: null,
    selectedServiceId: null,
    selectedStaffId: null,
    priceOriginal: null,
    serviceTime: null,
    bookingDetails: null,
    successMessage: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case BookingActionTypes.UPDATE_SELECTED_SALON_ID:
      return { ...state, selectedSalonId: action.payload, errMess: null };

    case BookingActionTypes.UPDATE_SELECTED_SERVICE:
      return {
        ...state,
        selectedServiceId: action.payload.serviceId,
        serviceTime: action.payload.service_time,
        priceOriginal: action.payload.price,
        errMess: null,
      };

    case BookingActionTypes.UPDATE_SELECTED_STAFF_ID:
      return { ...state, selectedStaffId: action.payload, errMess: null };

    case BookingActionTypes.BOOK_SERVICE_SUCCESSFULLY:
      return { ...state, bookingDetails: action.payload.bookingDetails, successMessage: action.payload.successMessage, errMess: null };

    case BookingActionTypes.BOOK_SERVICE_FAILED:
      return { ...state, bookingDetails: null, successMessage: null, errMess: action.payload };

    case BookingActionTypes.RESET_BOOKING_DETAILS:
      return {
        ...state,
        selectedSalonId: null,
        selectedServiceId: null,
        selectedStaffId: null,
        priceOriginal: null,
        serviceTime: null,
        bookingDetails: null,
        successMessage: null,
        errMess: null,
      };

    default:
      return state;
  }
};

export const Salon = (
  state = {
    salonList: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case BookingActionTypes.GET_SALON_LIST_FAILED:
      return { ...state, salonList: null, errMess: action.payload };

    case BookingActionTypes.GET_SALON_LIST_SUCCESSFULLY:
      return { ...state, salonList: action.payload, errMess: null };

    case BookingActionTypes.RESET_SALON_LIST:
      return { ...state, salonList: null, errMess: null };

    default:
      return state;
  }
};

export const Service = (
  state = {
    serviceList: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case BookingActionTypes.GET_SERVICE_LIST_FAILED:
      return { ...state, serviceList: null, errMess: action.payload };

    case BookingActionTypes.GET_SERVICE_LIST_SUCCESSFULLY:
      return { ...state, serviceList: action.payload, errMess: null };

    case BookingActionTypes.RESET_SERVICE_LIST:
      return { ...state, serviceList: null, errMess: null };

    default:
      return state;
  }
};

export const Staff = (
  state = {
    staffList: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case BookingActionTypes.GET_STAFF_LIST_FAILED:
      return { ...state, staffList: null, errMess: action.payload };

    case BookingActionTypes.GET_STAFF_LIST_SUCCESSFULLY:
      return { ...state, staffList: action.payload, errMess: null };

    case BookingActionTypes.RESET_STAFF_LIST:
      return { ...state, staffList: null, errMess: null };

    default:
      return state;
  }
};

export const StaffCalendar = (
  state = {
    calendar: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case BookingActionTypes.GET_STAFF_CALENDAR_FAILED:
      return { ...state, calendar: null, errMess: action.payload };

    case BookingActionTypes.GET_STAFF_CALENDAR_SUCCESSFULLY:
      return { ...state, calendar: action.payload, errMess: null };

    case BookingActionTypes.RESET_STAFF_CALENDAR:
      return { ...state, calendar: null, errMess: null };

    default:
      return state;
  }
};

export const HistoryBooking = (
  state = {
    historyList: null,
    reservationList: null,
    historyErrMess: null,
    reservationErrMess: null,
  },
  action
) => {
  switch (action.type) {
    case BookingActionTypes.GET_HISTORY_BOOKING_SUCCESSFULLY:
      return { ...state, historyList: action.payload, historyErrMess: null };

    case BookingActionTypes.GET_HISTORY_BOOKING_FAILED:
      return { ...state, historyErrMess: action.payload, historyList: null };

    case BookingActionTypes.GET_RESERVATION_SUCCESSFULLY:
      return { ...state, reservationList: action.payload, reservationErrMess: null };

    case BookingActionTypes.GET_RESERVATION_FAILED:
      return { ...state, reservationErrMess: action.payload, reservationList: null };

    case BookingActionTypes.RESET_RESERVATION_LIST:
      return { ...state, reservationErrMess: null, reservationList: null };

    default:
      return state;
  }
};
