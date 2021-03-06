import React, { useState } from "react";
import { styled } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import MuiTableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import MuiTableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";
import { currencyFormatter } from "../../utils";
import { Box, Tooltip, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelReservation,
  getReservation,
  resetReservationList,
  updateSelectedService,
  updateSelectedSalonId,
} from "../../redux/actions/creators/booking";
import { useNavigate } from "react-router";
import moment from "moment";

const TableRow = styled(MuiTableRow)({
  "& td:last-child, & th:last-child": { borderRight: 0 },
});

const TableCell = styled(MuiTableCell)({
  borderBottom: "1px solid #e1b58c",
  borderRight: "1px solid #e1b58c",
});

const PrimaryText = styled("span")({
  fontFamily: "Segoe UI",
  color: "#1e6296",
  fontSize: 20,
});

const HeaderText = styled(PrimaryText)({
  fontSize: 28,
});

const ServicePriceText = styled("span")({
  fontFamily: "Segoe UI",
  color: "#ff6060",
  fontSize: 20,
  marginLeft: 16,
});

const TimeUseText = styled("span")({
  fontFamily: "Segoe UI",
  color: "#c6a788",
  fontSize: 14,
});

const StatusText = styled("span")({
  fontFamily: "Segoe UI",
  fontSize: 20,
});

const ReservationTable = ({ data, historyTable }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(undefined);

  const { token } = useSelector((state) => state.loginAccount.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickOpen = (item) => {
    setAlertOpen(true);
    setSelectedItem(item);
  };

  const handleClose = () => {
    setAlertOpen(false);
    setSelectedItem(undefined);
  };

  const handleCancel = () => {
    if (!selectedItem) return;
    const { registerServiceId, service_time } = selectedItem;
    const successCallback = () => {
      dispatch(resetReservationList());
      handleClose();
      dispatch(getReservation(token));
    };
    dispatch(
      cancelReservation(
        { registerServiceId, service_time },
        token,
        successCallback
      )
    );
  };

  const handleClickNewReservation = (item) => {
    const { salonId, serviceId, service_time, price_original: price } = item;
    dispatch(updateSelectedSalonId(salonId));
    dispatch(updateSelectedService({ serviceId, service_time, price }));
    navigate(`/staff/${salonId}`);
  };

  return (
    <>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">
                <HeaderText>#</HeaderText>
              </TableCell>
              <TableCell sx={{ width: "40%" }}>
                <HeaderText>D???ch v???</HeaderText>
              </TableCell>
              <TableCell>
                <HeaderText>Th???i gian</HeaderText>
              </TableCell>
              <TableCell>
                <HeaderText>Tr???ng th??i</HeaderText>
              </TableCell>
              <TableCell>
                <HeaderText>Barber</HeaderText>
              </TableCell>
              <TableCell>
                <HeaderText></HeaderText>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={row.registerServiceId}
                sx={{ "&:last-child td, &:last-child th": { borderBottom: 0 } }}
              >
                <TableCell align="right">
                  <PrimaryText>{index + 1}</PrimaryText>
                </TableCell>
                <TableCell>
                  <Box>
                    <Box display="flex" flexDirection="row">
                      <PrimaryText>{row.nameSalon}</PrimaryText>
                    </Box>
                    <Box>
                      <PrimaryText style={{fontWeight:"bold"}}>{row.nameService}</PrimaryText>
                      <br></br>
                      {/* <ServicePriceText>{currencyFormatter.format(row.price_original-(row.price_original*(row.promotion/100)))}</ServicePriceText> */}
                      <p>
                        <span className="font-weight-bold text-danger is-size-5">
                          {row.promotion === 0 && (
                            <p className="has-text-danger has-text-weight-semibold">
                              {" "}
                              {currencyFormatter.format(
                                row.price_original
                              )}{" "}
                            </p>
                          )}

                          {row.promotion !== 0 && (
                            <p className="has-text-grey-light has-text-weight-semibold">
                              <del>
                                {" "}
                                {currencyFormatter.format(
                                  row.price_original
                                )}{" "}
                              </del>

                              <span className="has-text-danger-dark has-text-weight-semibold">
                                {" "}
                                {"-> "}
                                {currencyFormatter.format(
                                  row.price_original -
                                    (row.price_original / 100) *
                                    row.promotion
                                )}{" "}
                              </span>
                              <span className="tag is-danger has-text-weight-semibold">
                                {" "}
                                {row.promotion} %
                              </span>
                            </p>
                          )}
                        </span>
                      </p>
                    </Box>
                    <Box display="flex" flexDirection="row">
                      <TimeUseText>{`${row.service_time} ph??t`}</TimeUseText>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <PrimaryText>
                    {moment(row.timeUse).format("DD/MM/YYYY HH:mm")}
                  </PrimaryText>
                </TableCell>
                <TableCell>
                  <StatusText
                    style={{
                      textTransform: "capitalize",
                      color:
                        String(row.nameStatus).toLowerCase() === "finished"
                          ? "#3ecf0a"
                          : String(row.nameStatus).toLowerCase() === "cancelled"
                          ? "#ED4337"
                          : "#2082c9",
                    }}
                  >
                    {row.nameStatus}
                  </StatusText>
                </TableCell>
                <TableCell>
                  <PrimaryText>{row.nameStaff}</PrimaryText>
                </TableCell>
                <TableCell>
                  <Box display="flex" justifyContent="center">
                    {historyTable ? (
                      <Tooltip title="?????t l???i">
                        <IconButton
                          onClick={() => handleClickNewReservation(row)}
                        >
                          <ReplayCircleFilledIcon fontSize="large" />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="H???y l???ch">
                        <IconButton onClick={() => handleClickOpen(row)}>
                          <CancelIcon fontSize="large" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={alertOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">X??c nh???n h???y d???ch v???</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            B???n c?? ch???c ch???n mu???n h???y ?????t ch??? n??y kh??ng?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>X??c nh???n</Button>
          <Button onClick={handleClose} color="error">
            H???y
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReservationTable;
