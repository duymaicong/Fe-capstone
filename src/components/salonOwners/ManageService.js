import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import serviceLists from "../../components/mockUp/serviceData.json";
import fakeReviews from "../../components/mockUp/review.json";
import paperbg from "../../assets/paperbg.jpg";
import bgImg from "../../assets/barbershopbg.jpg";
import patterbg from "../../assets/patterbg.svg";
import { districts, times } from "../../assets/data/data.js";
import { validEmail, validPhone } from "../../validations/regex";

import {
  getListServiceForSalon,
  resetListServiceOfSalon,
  getProfileOfSalon,
  addService,
  deleteService,
  editService,
  editSalonInfo,
  editServiceFirebase,
  editSalonInfoFirebase,
  
} from "../../redux/actions/creators/salon";
import {
  currencyFormatter,
  convertISOStringToLocaleDateString,
} from "../../utils";
import imageUnavailable from "../../assets/image-unavailable.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/creators/auth";

import { Modal, Box, Tooltip, Rating, Stack } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  getListReviewForSalon,
  resetReviewListForSalon,
} from "../../redux/actions/creators/review";

// -- MODAL CSS --
const modalcss = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "25px",
  boxShadow: 24,
  p: 4,
};
const btnTime = {
  width: "2rem",
  height: "2.3rem",
  textAlign: "center",
  borderRadius: "15%",
};

const root = {
  backgroundImage: `url(${bgImg})`,
  backgroundRepeat: "repeat-y",
  backgroundSize: "100%",
};

export default function ManageService() {
  //create state for add service
  const [serviceName, setServiceName] = useState("");
  const [serviceTime, setServiceTime] = useState(15);
  const [price, setPrice] = useState("");
  const [promotion, setPromotion] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  // const [imageService, setImageService] = useState(null);
  const [imageService, setImageService] = useState("");
  const [messageAddService,setMessageAddService]= useState("")

  //create state for error
  const [error, setError] = useState(false);
  const [priceError, setPiceError] = useState(false);
  const [promotioError, setPromotionError] = useState(false);

  //STATE EDIT SERVICE
  const [serviceInfo, setServiceInfo] = useState(undefined);
  const [messageEditService,setMessageEditService]= useState("");
  const [checkImage,setCheckImage]= useState("")

  //STATE EDIT SALON INFOR
  const [checkImageSalon,setCheckImageSalon]= useState("")

  //setServiceTime,
  const addTime = () => {
    setServiceTime(serviceTime + 15);
  };
  const minusTime = () => {
    if (serviceTime >= 30) {
      setServiceTime(serviceTime - 15);
    } else {
      setServiceTime(15);
    }
  };

  const addTimeEdit = () => {
    if (!serviceInfo) {
      return;
    } else {
      setServiceInfo({
        ...serviceInfo,
        service_time: serviceInfo.service_time + 15,
      });
    }
  };

  const minusTimeEdit = (time) => {
    if (!serviceInfo) return;
    if (serviceInfo?.service_time >= 30) {
      setServiceInfo({
        ...serviceInfo,
        service_time: serviceInfo.service_time - 15,
      });
    } else {
      setServiceInfo({
        ...serviceInfo,
        service_time: 15,
      });
    }
  };

  //reset form
  const resetAddServiceForm = () => {
    setServiceName("");
    setServiceTime(15);
    setPrice("");
    setPromotion("");
    setContent("");
    setDescription("");
    setImageService("");
  };

  //add new service
  const handleAddService = (e) => {
    e.preventDefault();
    setError(false);
    setPiceError(false);
    setPromotionError(false);

    const newService = {
      name: serviceName,
      price: price,
      service_time: serviceTime,
      promotion: promotion,
      content: content,
      description: description,
      image: imageService,
    };
    let pass = true;
    if (
      serviceName === "" ||
      price === "" ||
      serviceTime === "" ||
      promotion === "" ||
      content === "" ||
      description === ""
    ) {
      setError(true);
      pass = false;
      return;
    }
    if (price <= 0) {
      setPiceError(true);
      pass = false;
      return;
    }
    if (promotion < 0) {
      setPromotionError(true);
      pass = false;
      return;
    }
    if (price > 10000000) {
      setPiceError(true);
      pass = false;
      return;
    }
    if (promotion > 100) {
      setPromotionError(true);
      pass = false;
      return;
    }
    if (pass) {
      console.log(newService);
      
      const successCallback = () => {
        resetAddServiceForm();
        setMessageAddService('t???o d???ch v??? th??nh c??ng')
        console.log("success callback");
        dispatch(resetListServiceOfSalon());
        dispatch(getListServiceForSalon(token));
        setTimeout(handleCloseService(), 1000)
      };
      const errCallback = (mess) => {
        if (mess==="Could not upload the file: undefined. TypeError: Cannot read properties of undefined (reading 'originalname')") {
          setMessageAddService("ch???n ???nh ????? t???o service")
        } else if(mess==='Could not upload the file: undefined. Error: Only .png, .jpg and .jpeg format allowed!') {
          setMessageAddService("ch???n file ???nh .png, .jpg and .jpeg ????? t???o service")
        } else if(mess==="File size cannot be larger than 2MB!"){
          setMessageAddService("ch???n ???nh c?? dung l?????ng l???n nh???t l?? 2M")
        }
        
        else{
          setMessageAddService(mess)
        }


        console.log("err callback");
      };
      dispatch(addService(token, newService, successCallback, errCallback));
     
    }
  };

  const dispatch = useDispatch();
  // -- FIXED DATA --
  // const fakeServiceList = serviceLists;
  const fakeReview = fakeReviews;

  // -- API DATA --
  const { listService } = useSelector((state) => state.listServiceSalon);
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );
  useEffect(() => {
    dispatch(getListServiceForSalon(token));
    return () => {
      dispatch(resetListServiceOfSalon());
    };
  }, [dispatch, token]);

  // -- GET SALON PROFILE --
  const { profileSalon } = useSelector((state) => state.profileSalon);

  useEffect(() => {
    dispatch(getProfileOfSalon(token));
  }, [dispatch, token]);

  // -- TABS --
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // -- MODAL SERVICE --
  const [openService, setOpenSerive] = useState(false);
  const handleOpenService = () => {
    setOpenSerive(true);
    setError(false);
    setMessageAddService("");
  };
  const handleCloseService = () => {
    setOpenSerive(false);
  };

  // -- MODAL EDIT SERVICE --
  const [openEditService, setOpenEditService] = useState(false);
  const handleOpenEditService = (serviceInfo) => {
    setEditError(null);
    setOpenEditService(true);
    setMessageEditService('');
    setServiceInfo(serviceInfo);
    setCheckImage(serviceInfo.image)
    console.log(serviceInfo.image)
  };
  const handleCloseEditService = () => {
    setOpenEditService(false);
    setServiceInfo(undefined);
  };

  // -- MODAL DELETE SERVICE --
  const [openDeleteService, setOpenDeleteSerive] = useState(false);
  const handleOpenDeleteService = (data) => {
    setOpenDeleteSerive(true);
    setServiceDeleteSelected(data);
  };
  const handleCloseDeleteService = () => {
    setOpenDeleteSerive(false);
    setServiceDeleteSelected("");
  };

  //STATE DELETE SERVICE
  const [serviceDeleteSelected, setServiceDeleteSelected] = useState("");

  //DELETE SERVICE
  const hanldeDeleteService = () => {
    if (!serviceDeleteSelected) return;
    const successCallback = () => {
      dispatch(resetListServiceOfSalon());
      handleCloseDeleteService();
      dispatch(getListServiceForSalon(token));
    };
    dispatch(
      deleteService(
        token,
        { serviceId: serviceDeleteSelected.serviceId },
        successCallback
      )
    );
  };

  //CALL SUCESSMESS EDIT SERVICE
  const { serviceEdited, successMess } = useSelector(
    (state) => state.editService
  );

  // STATE ERROR FOR EDIT SERVICE
  const [editError, setEditError] = useState(null);

  //EDIT SERVICE
  const handleEditService = (event) => {
    event.preventDefault();
    const {
      name,
      price,
      service_time,
      promotion,
      content,
      description,
      image,
    } = serviceInfo;
    console.log(serviceInfo);
    if (
      !name ||
      !price ||
      !service_time ||
      !content ||
      !description
    ) {
      setEditError("Vui l??ng ??i???n ?????y ????? th??ng tin c???a d???ch v???");
      return;
    }
    if (price <= 0) {
      setEditError("Gi?? d???ch v??? ph???i l???n h??n 0");
      return;
    }
    if (price > 10000000) {
      setEditError("Gi?? d???ch v??? kh??ng th??? l???n cao h??n 10 tri???u!");
      return;
    }
    if (promotion < 0) {
      setEditError("Khuy??n m???i ph???i l???n h??n ho???c b???ng 0");
      return;
    }
    if (promotion > 100) {
      setEditError("Khuy???n m???i kh??ng th??? l???n h??n 100%");
      return;
    }
    setEditError(null);
    const submitServiceObject = {
      name,
      price,
      service_time,
      promotion,
      content,
      description,
      image,
    };
    if (!image) {
      submitServiceObject.image=checkImage;
    }
    const successCallback = () => {
      handleCloseEditService();
      dispatch(resetListServiceOfSalon());
      dispatch(getListServiceForSalon(token));
    };
    const errorCallback = (mess) =>{
      console.log(mess)
      setMessageEditService(mess)
      if (mess==="Could not upload the file: undefined. TypeError: Cannot read properties of undefined (reading 'originalname')") {
        setMessageEditService("ch???n ???nh ????? t???o service")
      } else if(mess==='Could not upload the file: undefined. Error: Only .png, .jpg and .jpeg format allowed!') {
        setMessageEditService("ch???n file ???nh .png, .jpg and .jpeg ????? t???o service")
      }else if(mess==="File size cannot be larger than 2MB!"){
        setMessageEditService("ch???n ???nh c?? dung l?????ng l???n nh???t l?? 2M")
      }
      else{
        setMessageEditService(mess)
      }

    }
    if (typeof submitServiceObject.image == 'string') {
      dispatch(
        editService(
          token,
          submitServiceObject,
          successCallback,
          serviceInfo.serviceId,errorCallback,
        )
      );
    } else {
      dispatch(
        editServiceFirebase(
          token,
          submitServiceObject,
          successCallback,
          serviceInfo.serviceId,errorCallback,
        )
      );
    }
  };

  // -- MODAL EDIT PROFILE SALON --
  const [openSalon, setOpenSalon] = useState(false);
  const handleOpenSalon = () => {
    if (profileSalon) {
      setBusinessInfo(profileSalon[0]);
      setCheckImageSalon(profileSalon[0].image)
      console.log(profileSalon[0].image)
    }
    setEmptyError(false);
    setPhoneErr(false);
    setOpenSalon(true);
  };
  const handleCloseSalon = () => setOpenSalon(false);

  //STATE EDIT BUSINESS INFO
  const [businessInfo, setBusinessInfo] = useState(null);

  //LOAD BUSINESS INFO
  useEffect(() => {
    if (profileSalon) {
      setBusinessInfo(profileSalon[0]);
    }
  }, [profileSalon]);

  // VALIDATE ERROR MESSAGE STATE
  const [emptyError, setEmptyError] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);

  // CALL EDIT SALON FROM REDUX
  const { salonInfoEdited, successMessage, errMessage } = useSelector(
    (state) => state.editSalonInfo
  );

  // EDIT SALON INFO
  const handleEditSalonInfo = (e) => {
    e.preventDefault();
    setEmptyError(false);
    setPhoneErr(false);
    const {
      nameSalon,
      phone,
      timeOpen,
      timeClose,
      district,
      city,
      detailAddress,
      image,
      description,
    } = businessInfo;

    if (
      !nameSalon ||
      !description ||
      !phone ||
      !district ||
      !city ||
      !detailAddress ||
      !timeOpen ||
      !timeClose
     
    ) {
      setEmptyError(true);
      return;
    }
    if (!validPhone.test(phone)) {
      setPhoneErr(true);
      return;
    }
    setEmptyError(false);
    setPhoneErr(false);
    const submitOjb = {
      nameSalon,
      phone,
      timeOpen,
      timeClose,
      district,
      city,
      detailAddress,
      image,
      description,
    };
    if (!image) {
      submitOjb.image=checkImageSalon;
    }
    console.log(submitOjb);
    const callback = () => {
      handleCloseSalon();
      dispatch(getProfileOfSalon(token));
    };
    if (typeof submitOjb.image == 'string') {dispatch(editSalonInfo(token, submitOjb, callback));}
    else{
      dispatch(editSalonInfoFirebase(token, submitOjb, callback));
    }
    
  };

  //STATE REVIEW
  const [rate, setRate] = useState(null);

  //CALL LIST REVIEW FROM REDUX
  const { listReviewSalon } = useSelector((state) => state.listReviewForSalon);

  //CALL API REVIEW
  useEffect(() => {
    if (!rate) {
      setRate("");
    }
    dispatch(getListReviewForSalon(token, { star: rate }));
    return () => {
      dispatch(resetReviewListForSalon());
    };
  }, [dispatch, rate, token]);

  return (
    <div>
      {" "}
      <div style={root}>
        <div className="columns">
          <div className="column is-3"></div>
          <div
            className="column is-6 mt-5 mb-5 p-0"
            style={{ boxShadow: "1px 1px 20px black" }}
          >
            <div
              className="p-0 container"
              style={{ backgroundColor: "#FBE8CA" }}
            >
              <div>
                {profileSalon?.map((salon) => (
                  <div
                    className=""
                    style={{ background: "url(" + patterbg + ")" }}
                    key={salon.salonId}
                  >
                    <div className="columns mt-0 pt-0">
                      <div
                        className="column is-6"
                        style={{ paddingTop: "0px" }}
                      >
                        <img
                          style={{ height: "100%", width: "auto" }}
                          src={salon.image}
                          alt="..."
                        />
                      </div>
                      <div className="column is-6 pt-3">
                        <div className="pb-2 mb-3">
                          <h2
                            style={{ color: "#134068" }}
                            className="is-size-2 has-text-weight-semibold"
                          >
                            {salon.nameSalon}
                          </h2>

                          <p className="is-size-5 font-weight-bold">
                            M??? c???a:{" "}
                            <span className="text-danger">
                              T2-CN {salon.timeOpen} - {salon.timeClose}
                            </span>
                          </p>
                          <p>
                            <span className="is-size-5 font-weight-bold">
                              S??T:{" "}
                            </span>
                            <span
                              className="is-size-5 is-underlined"
                              style={{ color: "#134068" }}
                            >
                              {salon.phone}
                            </span>
                          </p>
                          <p>
                            <i className="fa-solid fa-location-dot text-secondary"></i>{" "}
                            <span
                              className="is-size-5 font-weight-bold"
                              style={{ color: "#134068" }}
                            >
                              {salon.detailAddress}
                            </span>
                          </p>
                          <div>
                            <span>{salon.description}</span>
                          </div>
                        </div>
                        <div className="has-text-right mb-5 mr-5">
                          <button
                            style={{ width: "120px" }}
                            className="button is-info is-rounded"
                            onClick={handleOpenSalon}
                          >
                            Ch???nh s???a
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Modal Salon */}
              <Modal
                open={openSalon}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalcss}>
                  <div>
                    <form>
                      <div className="form-outline mb-4">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text" id="">
                              T??n salon
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            maxLength={40}
                            value={businessInfo?.nameSalon}
                            onChange={(e) => {
                              setBusinessInfo({
                                ...businessInfo,
                                nameSalon: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>

                      <div className="form-outline mb-4">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text" id="">
                              S??T
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            maxLength={40}
                            value={businessInfo?.phone}
                            onChange={(e) => {
                              setBusinessInfo({
                                ...businessInfo,
                                phone: e.target.value,
                              });
                            }}
                          />
                        </div>
                        {phoneErr && (
                          <p className="text-danger">
                            S??? ??i???n tho???i kh??ng h???p l???!
                          </p>
                        )}
                      </div>

                      <div className="form-outline mb-4">
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <label
                              className="input-group-text"
                              htmlFor="inputGroupSelect01"
                            >
                              Qu???n
                            </label>
                          </div>
                          <select
                            className="custom-select"
                            id="inputGroupSelect01"
                            onChange={(e) => {
                              setBusinessInfo({
                                ...businessInfo,
                                district: e.target.value,
                              });
                            }}
                          >
                            <option defaultValue={businessInfo?.district}>
                              {businessInfo?.district}
                            </option>
                            {districts.map((district) => (
                              <option
                                key={district.toString()}
                                value={district}
                              >
                                {district}
                              </option>
                            ))}
                          </select>
                          <div className="input-group-prepend ml-3">
                            <label
                              className="input-group-text"
                              htmlFor="inputGroupSelect02"
                            >
                              Th??nh ph???
                            </label>
                          </div>
                          <select
                            className="custom-select"
                            id="inputGroupSelect02"
                          >
                            <option value={businessInfo?.city}>
                              {businessInfo?.city}
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="form-outline mb-4">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text" id="">
                              ?????a ch??? c??? th???
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            maxLength={40}
                            value={businessInfo?.detailAddress}
                            onChange={(e) => {
                              setBusinessInfo({
                                ...businessInfo,
                                detailAddress: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <label
                              className="input-group-text"
                              htmlFor="inputGroupSelect03"
                            >
                              M??? c???a
                            </label>
                          </div>
                          <select
                            className="custom-select"
                            id="inputGroupSelect03"
                            onChange={(e) => {
                              setBusinessInfo({
                                ...businessInfo,
                                timeOpen: e.target.value,
                              });
                            }}
                          >
                            <option defaultValue={businessInfo?.timeOpen}>
                              {businessInfo?.timeOpen}
                            </option>
                            {times.map((time) => (
                              <option key={time.toString()} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                          <div className="input-group-prepend ml-3">
                            <label
                              className="input-group-text"
                              htmlFor="inputGroupSelect04"
                            >
                              ????ng c???a
                            </label>
                          </div>
                          <select
                            className="custom-select"
                            id="inputGroupSelect04"
                            onChange={(e) => {
                              setBusinessInfo({
                                ...businessInfo,
                                timeClose: e.target.value,
                              });
                            }}
                          >
                            <option value={businessInfo?.timeClose}>
                              {businessInfo?.timeClose}
                            </option>
                            {times.map((time) => (
                              <option key={time.toString()} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text" id="">
                              ???nh ?????i di???n
                            </span>
                          </div>
                          {/* <input
                            type="text"
                            className="form-control"
                            maxLength={2000}
                            value={businessInfo?.image}
                            onChange={(e) => {
                              setBusinessInfo({
                                ...businessInfo,
                                image: e.target.value,
                              });
                            }}
                          /> */}
                          <input type="file" accept=".png, .jpg, .jpeg" onChange={(e) => {setBusinessInfo({
                                ...businessInfo,
                                image: e.target.files[0],
                              }); }} />

                        </div>
                        {!businessInfo?.image ?(<></>):(<>{typeof businessInfo?.image==='string' ? (<img alt="" width={"150px"} src={businessInfo?.image}></img>):(<img alt="" width={"150px"} src={URL.createObjectURL(businessInfo?.image)}/>)}</>) }
                      </div>
                      <div className="">
                        <div className="form-group">
                          <label className="font-weight-bold">
                            M?? t??? v??? salon c???a b???n:
                          </label>
                          <textarea
                            value={businessInfo?.description}
                            type="text"
                            className="form-control"
                            maxLength={2000}
                            onChange={(e) => {
                              setBusinessInfo({
                                ...businessInfo,
                                description: e.target.value,
                              });
                            }}
                            placeholder="Description for your salon"
                            style={{ minHeight: "10rem" }}
                          />
                        </div>
                      </div>

                      <div className="text-center">
                        {successMessage && (
                          <p className="text-success">
                            Ch???nh s???a th??ng tin salon th??nh c??ng!
                          </p>
                        )}
                        {errMessage && (
                          <p className="text-danger">{errMessage}</p>
                        )}
                        {emptyError && (
                          <p className="text-danger">
                            Vui l??ng ??i???n ?????y ????? th??ng tin!
                          </p>
                        )}
                      </div>

                      <div className="has-text-right">
                        <button
                          className="button is-rounded is-danger"
                          onClick={handleCloseSalon}
                        >
                          {" "}
                          H???y
                        </button>
                        <button
                          className="button is-rounded is-primary ml-4"
                          onClick={handleEditSalonInfo}
                        >
                          {" "}
                          Ch???nh s???a
                        </button>
                      </div>
                    </form>
                  </div>
                </Box>
              </Modal>
              <div style={{ background: "url(" + paperbg + ")" }}>
                <TabContext value={value}>
                  <Box
                    sx={{
                      bgcolor: "background.paper",
                      borderBottom: 1,
                      borderColor: "divider",
                    }}
                  >
                    <TabList
                      variant="fullWidth"
                      onChange={handleChange}
                      aria-label="disabled tabs example"
                    >
                      <Tab label="D???ch v???" value="1" />
                      <Tab label="????nh gi??" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <div className="has-text-right mb-5">
                      <button
                        className="button is-info is-rounded"
                        onClick={handleOpenService}
                      >
                        Th??m d???ch v???
                      </button>
                    </div>
                    <div style={{ overflowY: "scroll", height: "700px" }}>
                      {listService?.map((service) => (
                        <div
                          className="card mb-3"
                          style={{
                            maxWidth: "98%",
                            backgroundColor: " #F5F3ED",
                            minHeight: "12rem",
                            borderRadius: "25px",
                          }}
                          key={service.serviceId}
                        >
                          <div className="columns">
                            <div className="column is-3">
                              <img
                                src={
                                  service.image
                                    ? service.image
                                    : imageUnavailable
                                }
                                alt="..."
                                style={{
                                  height: "100%",
                                  width: "100%  ",
                                  maxHeight: "12rem",
                                  borderRadius: "25px",
                                }}
                              />
                            </div>
                            <div className="column is-7 mt-2 has-text-left">
                              <div>
                                <h4 className="has-text-info-dark is-size-3 has-text-weight-bold">
                                  {service.name}
                                </h4>
                                <p className="has-text-dark is-size-5">
                                  {service.service_time} ph??t
                                </p>

                                {service.promotion === 0 && (
                                  <p className="has-text-danger has-text-weight-semibold">
                                    {" "}
                                    {currencyFormatter.format(
                                      service.price
                                    )}{" "}
                                  </p>
                                )}

                                {service.promotion !== 0 && (
                                  <p className="has-text-grey-light has-text-weight-semibold">
                                    <del>
                                      {" "}
                                      {currencyFormatter.format(service.price)}
                                    </del>

                                    <span className="has-text-danger-dark has-text-weight-semibold">
                                      {" -> "}
                                      {currencyFormatter.format(
                                        service.price -
                                          (service.price / 100) *
                                            service.promotion
                                      )}{" "}
                                    </span>
                                    <span className="tag is-danger has-text-weight-semibold">
                                      {" "}
                                      {service.promotion} %
                                    </span>
                                  </p>
                                )}

                                <p className="">{service.content}</p>
                                <p className="">{service.description}</p>
                              </div>
                            </div>
                            <div className="column is-2 has-text-right">
                              <Tooltip title="X??a" placement="right">
                                <button
                                  onClick={() =>
                                    handleOpenDeleteService(service)
                                  }
                                  className="button mr-3 mt-3 is-danger is-rounded is-small"
                                >
                                  <i className="fa-solid fa-trash-can"></i>
                                </button>
                              </Tooltip>
                              <br></br>
                              <Tooltip title="S???a" placement="right">
                                <button
                                  onClick={() => handleOpenEditService(service)}
                                  className="button mr-3 is-primary is-rounded  mt-3 is-small"
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Modal Service */}
                    <Modal
                      open={openService}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={modalcss}>
                        <div>
                          <form>
                            <div>
                              <label>T??n d???ch v???*:</label>
                            </div>
                            <div className="form-outline mb-4">                              
                              <input
                                type="text"
                                maxLength={40}
                                className="form-control form-control-lg"
                                value={serviceName}
                                onChange={(event) => {
                                  setServiceName(event.target.value);
                                }}
                                placeholder="T??n d???ch v???*"
                              />
                            </div>
                            <div>
                              <label>Th???i gian*:</label>
                            </div>
                            <div className="input-group form-outline mb-4">
                              <input
                                type="text"
                                className="form-control form-control-lg"
                                disabled
                                value={serviceTime}
                                onChange={(event) => {
                                  setServiceTime(event.target.value);
                                }}
                                placeholder="Th???i gian"
                              />
                              <div className="input-group-append">
                                <span
                                  className="input-group-text rounded-right"
                                  id="basic-addon1"
                                >
                                  Ph??t
                                </span>
                              </div>
                              <div className="mt-1">
                                <button
                                  className="btn btn-outline-secondary bg-dark text-white mr-1 ml-1"
                                  type="button"
                                  style={btnTime}
                                  onClick={addTime}
                                >
                                  +
                                </button>
                                <button
                                  className="btn btn-outline-secondary bg-dark text-white"
                                  type="button"
                                  style={btnTime}
                                  onClick={minusTime}
                                >
                                  -
                                </button>
                              </div>
                            </div>
                            <div className="row">
                              <label className="col-6">Gi??*:</label>
                              <label className="col-6">Khuy???n m???i*:</label>
                            </div>
                            <div className="row">
                              <div className="col-6 input-group form-outline mb-4">
                                <input
                                  type="number"
                                  className="form-control form-control-lg"
                                  value={price}
                                  min="0"
                                  onChange={(event) => {
                                    setPrice(event.target.value);
                                  }}
                                  placeholder="Gi??"
                                />
                                <div className="input-group-append">
                                  <span
                                    className="input-group-text"
                                    id="basic-addon1"
                                  >
                                    VND
                                  </span>
                                </div>
                              </div>
                              <div className="col-6 input-group form-outline mb-4">
                                <input
                                  type="number"
                                  className="form-control form-control-lg"
                                  min="0"
                                  value={promotion}
                                  onChange={(event) => {
                                    setPromotion(event.target.value);
                                  }}
                                  placeholder="Khuy??n m???i"
                                />
                                <div className="input-group-append">
                                  <span
                                    className="input-group-text"
                                    id="basic-addon1"
                                  >
                                    %
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-6">
                                {priceError && (
                                  <p className="text-danger">
                                    Gi?? d???ch v??? ph???i l???n h??n 0 v?? nh??? h??n 10
                                    tri???u!
                                  </p>
                                )}
                              </div>
                              <div className="col-6">
                                {promotioError && (
                                  <p className="text-danger">
                                    Khuy???n m???i ph???i l???n h??n 0% v?? kh??ng v?????t qu??
                                    100%
                                  </p>
                                )}
                              </div>
                            </div>
                            <div>
                              <label>D???ch v??? ??i k??m*:</label>
                            </div>
                            <div className="form-outline mb-4">
                              <input
                                type="text"
                                maxLength={40}
                                className="form-control form-control-lg"
                                value={content}
                                onChange={(event) => {
                                  setContent(event.target.value);
                                }}
                                placeholder="D???ch v??? ??i k??m"
                              />
                            </div>
                            <div>
                              <label>???nh:.png, .jpg .jpeg max 2M</label>
                            </div>
                            <div className="form-outline mb-4">
                              {/* <input
                                type="text"
                                maxLength={2000}
                                className="form-control form-control-lg"
                                value={imageService}
                                onChange={(event) => {
                                  setImageService(event.target.value);
                                }}
                                placeholder="???nh"
                              /> */}
                              <input type="file" accept=".png, .jpg, .jpeg" onChange={(e) => { setImageService(e.target.files[0]) }} />
                            </div>
                            {!imageService ?(<></>):(<>{typeof imageService==='string' ? (<img alt="" width={"150px"} src={imageService}></img>):(<img alt="" width={"150px"} src={URL.createObjectURL(imageService)}/>)}</>) }
                            
                            <div>
                              {/* {imageService &&(
                                <div>
                                  <img alt="" width={"150px"} src={URL.createObjectURL(imageService)}/>
                                  <button onClick={()=>{setImageService(null)}}>Remove</button>
                                </div>
                              )} */}
                            </div>
                            <div>
                              <label>M?? t??? v??? d???ch v???*:</label>
                            </div>
                            <div className="form-outline mb-4">
                              <textarea
                                rows={4}
                                cols={50}
                                type="text"
                                maxLength={200}
                                className="form-control form-control-lg"
                                value={description}
                                onChange={(event) => {
                                  setDescription(event.target.value);
                                }}
                                placeholder="M?? t??? "
                              />
                            </div>
                            <p className="text-success">{messageAddService}</p>
                            <div>
                              {error && (
                                <p className="text-danger">
                                  Vui l??ng ??i???n ?????y ????? th??ng tin!
                                </p>
                              )}
                            </div>

                            <div className="has-text-right">
                              <button
                                className="button is-rounded is-danger"
                                onClick={handleCloseService}
                              >
                                {" "}
                                H???y
                              </button>
                              <button
                                className="button is-rounded is-primary ml-4"
                                onClick={handleAddService}
                              >
                                {" "}
                                X??c nh???n
                              </button>
                            </div>
                          </form>
                        </div>
                      </Box>
                    </Modal>{" "}
                    {/* Modal Edit Service */}
                    <Modal
                      open={openEditService}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={modalcss}>
                        <div>
                          <form>
                            <div>
                              <label>T??n d???ch v???*:</label>
                            </div>
                            <div className="form-outline mb-4">
                              <input
                                type="text"
                                maxLength={40}
                                className="form-control form-control-lg"
                                value={serviceInfo?.name}
                                onChange={(event) => {
                                  setServiceInfo({
                                    ...serviceInfo,
                                    name: event.target.value,
                                  });
                                }}
                                placeholder="T??n d???ch v???"
                              />
                            </div>
                            <div>
                              <label>Th???i gian*:</label>
                            </div>
                            <div className="input-group form-outline mb-4">
                              <input
                                type="text"
                                className="form-control form-control-lg"
                                disabled
                                value={serviceInfo?.service_time}
                                onChange={(event) => {
                                  setServiceInfo({
                                    ...serviceInfo,
                                    service_time: event.target.value,
                                  });
                                }}
                                placeholder="Th???i gian"
                              />
                              <div className="input-group-append">
                                <span
                                  className="input-group-text rounded-right"
                                  id="basic-addon1"
                                >
                                  Ph??t
                                </span>
                              </div>
                              <div className="mt-1">
                                <button
                                  className="btn btn-outline-secondary bg-dark text-white mr-1 ml-1"
                                  type="button"
                                  style={btnTime}
                                  onClick={addTimeEdit}
                                >
                                  +
                                </button>
                                <button
                                  className="btn btn-outline-secondary bg-dark text-white"
                                  type="button"
                                  style={btnTime}
                                  onClick={minusTimeEdit}
                                >
                                  -
                                </button>
                              </div>
                            </div>
                            <div className="row">
                              <label className="col-6">Gi??*:</label>
                              <label className="col-6">Khuy???n m???i*:</label>
                            </div>
                            <div className="row">
                              <div className="col-6 input-group form-outline mb-4">
                                <input
                                  type="number"
                                  className="form-control form-control-lg"
                                  min="0"
                                  value={serviceInfo?.price}
                                  onChange={(event) => {
                                    setServiceInfo({
                                      ...serviceInfo,
                                      price: event.target.value,
                                    });
                                  }}
                                  placeholder="Gi??"
                                />
                                <div className="input-group-append">
                                  <span
                                    className="input-group-text"
                                    id="basic-addon1"
                                  >
                                    VND
                                  </span>
                                </div>
                              </div>
                              <div className="col-6 input-group form-outline mb-4">
                                <input
                                  type="number"
                                  className="form-control form-control-lg"
                                  min="0"
                                  value={serviceInfo?.promotion}
                                  onChange={(event) => {
                                    setServiceInfo({
                                      ...serviceInfo,
                                      promotion: event.target.value,
                                    });
                                  }}
                                  placeholder="Khuy???n m???i"
                                />
                                <div className="input-group-append">
                                  <span
                                    className="input-group-text"
                                    id="basic-addon1"
                                  >
                                    %
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <label>D???ch v??? ??i k??m*:</label>
                            </div>
                            <div className="form-outline mb-4">
                              <input
                                type="text"
                                maxLength={40}
                                className="form-control form-control-lg"
                                value={serviceInfo?.content}
                                onChange={(event) => {
                                  setServiceInfo({
                                    ...serviceInfo,
                                    content: event.target.value,
                                  });
                                }}
                                placeholder="D???ch v??? ??i k??m"
                              />
                            </div>
                            <div>
                              <label>???nh*:</label>
                            </div>
                            <div className="form-outline mb-4">
                              {/* <input
                                type="text"
                                maxLength={2000}
                                className="form-control form-control-lg"
                                value={serviceInfo?.image}
                                onChange={(event) => {
                                  setServiceInfo({
                                    ...serviceInfo,
                                    image: event.target.value,
                                  });
                                }}
                                placeholder="???nh"
                              /> */}
                              <input type="file" accept=".png, .jpg, .jpeg" onChange={(e) => {
                                setServiceInfo({...serviceInfo,image: e.target.files[0],})
                              }}/>
                            </div>
                            {!serviceInfo?.image ?(<></>):(<>{typeof serviceInfo?.image==='string' ? (<img alt="" width={"150px"} src={serviceInfo?.image}></img>):(<img alt="" width={"150px"} src={URL.createObjectURL(serviceInfo?.image)}/>)}</>) }
                            <div>
                              <label>M?? t??? d???ch v???*:</label>
                            </div>
                            <div className="form-outline mb-4">
                              <textarea
                                rows={4}
                                cols={50}
                                type="text"
                                maxLength={200}
                                className="form-control form-control-lg"
                                value={serviceInfo?.description}
                                onChange={(event) => {
                                  setServiceInfo({
                                    ...serviceInfo,
                                    description: event.target.value,
                                  });
                                }}
                                placeholder="M??t t???"
                              />
                            </div>
                            <div><p className="text-success">{messageEditService}</p></div>
                            {/* <div>
                              {successMess && (
                                <p className="text-success">{successMess}</p>
                              )}
                              {editError && (
                                <p className="text-danger">{editError}</p>
                              )}
                            </div> */}

                            <div className="has-text-right">
                              <button
                                className="button is-rounded is-danger"
                                onClick={handleCloseEditService}
                              >
                                {" "}
                                H???y
                              </button>
                              <button
                                className="button is-rounded is-primary ml-4"
                                onClick={handleEditService}
                              >
                                {" "}
                                X??c nh???n
                              </button>
                            </div>
                          </form>
                        </div>
                      </Box>
                    </Modal>
                    {/* Modal delete service */}
                    <Modal
                      open={openDeleteService}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={modalcss}>
                        <div className="has-text-centered">
                          <h1 className="is-size-4 has-text-weight-semibold">
                            {" "}
                            B???n c?? th???t s??? mu???n{" "}
                            <span className="has-text-danger">x??a</span> d???ch v???
                            n??y?
                          </h1>
                          <br></br>{" "}
                          <button
                            onClick={handleCloseDeleteService}
                            className="button is-rounded is-danger mr-5"
                            style={{ width: "150px" }}
                          >
                            H???y
                          </button>
                          <button
                            className="button is-rounded is-info ml-5"
                            style={{ width: "150px" }}
                            onClick={hanldeDeleteService}
                          >
                            X??c nh???n
                          </button>
                        </div>
                      </Box>
                    </Modal>
                    {/*  */}
                  </TabPanel>
                  <TabPanel value="2">
                    {" "}
                    <div className=" columns">
                      {profileSalon ? (
                        <div className="column is-3 has-text-centered">
                          <p className="has-text-info">
                            {" "}
                            <div className="font-weight-bold" style={{ fontSize: "1.5rem" }}>
                              {profileSalon[0]?.AverangeVote ? (
                                <label>
                                  {profileSalon[0]?.AverangeVote.toFixed(1)}/5
                                </label>
                              ) : (
                                <label>0/5</label>
                              )}
                            </div>
                            <Rating
                              name="half-rating-read"
                              defaultValue={profileSalon[0]?.AverangeVote}
                              precision={0.5}
                              readOnly
                            />
                            <br></br>
                            <span className="text-dark font-weight-bold">{profileSalon[0]?.TotalVote}</span> b??nh lu???n {"&"} ????nh gi??
                          </p>
                        </div>
                      ) : (
                        <div></div>
                      )}
                      <div className="col-6"></div>
                      <div
                        className="col-6 has-text-centered mt-3"
                        style={{ display: "inline-block" }}
                      >
                        <div className="col-3 font-weight-bold pr-0 pl-5 text-center">
                          <label>????nh gi??:</label>
                        </div>
                        <div className="col-3 pl-2">
                          <Rating
                            name="simple-controlled"
                            value={rate}
                            onChange={(event, newValue) => {
                              setRate(newValue);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        overflowY: "scroll",
                        height: "700px",
                        backgroundColor: "white",
                      }}
                      className="rounded"
                    >
                      {listReviewSalon ? (
                        listReviewSalon.map((review) => (
                          <div
                            className="m-4 pl-3 pr-3 pt-5 pb-5 mb-5 "
                            style={{
                              backgroundColor: "white",
                              height: "12rem",
                              borderRadius: "25px",
                            }}
                          >
                            <div className="row pt-3 pb-3">
                              <div className="col-6">
                                <h2 className="is-size-5 row">
                                  <div
                                    className="is-size-5 ml-4 mt-5 mr-2 has-text-weight-semibold rounded p-2 text-center"
                                    style={{
                                      backgroundColor: "#dddddd",
                                      width: "35px",
                                      height: "35px",
                                    }}
                                  >
                                    {review.nameCustomer.charAt(0)}
                                  </div>
                                  <span className="is-size-5 p-2 mt-5 has-text-weight-semibold">
                                    {review.nameCustomer}
                                  </span>
                                </h2>
                              </div>
                              <div className="col-6 has-text-right mt-5 pt-2">
                                <p className=" font-weight-bold">
                                  <span>
                                    <i className="fa-regular fa-clock mr-1"></i>
                                  </span>
                                  {convertISOStringToLocaleDateString(
                                    review.dateCreate
                                  )}
                                </p>
                              </div>
                            </div>
                            <div
                              className="rounded p-4"
                              style={{ backgroundColor: "#f3f4f6" }}
                            >
                              <div className="pl-1">
                                <span className="font-weight-bold">
                                  ????nh gi??:
                                </span>
                                <Rating
                                  name="half-rating-read"
                                  value={review.rate / 2}
                                  precision={0.5}
                                  readOnly
                                />
                              </div>

                              <div className="pl-1">
                                <p>
                                  <span className="font-weight-bold">
                                    B??nh lu???n:{" "}
                                  </span>{" "}
                                  {review.content}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div
                          className="text-center pt-5 font-weight-bold"
                          style={{ fontSize: "1.5rem" }}
                        >
                          Kh??ng c?? b??nh lu???n v?? ????nh gi?? n??o!
                        </div>
                      )}
                    </div>
                  </TabPanel>
                </TabContext>
              </div>
            </div>
          </div>
          <div className="column is-3"></div>
        </div>
      </div>
    </div>
  );
}
