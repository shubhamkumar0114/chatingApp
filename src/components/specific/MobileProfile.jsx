import { Avatar, Dialog, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsProfile } from "../../redux/reducers/miscSlice";
import { transFormImage } from "../../lib/features";
import {
  AlternateEmail,
  CalendarMonth,
  Face,
  Logout,
} from "@mui/icons-material";
import moment from "moment";
import axios from "axios";
import { server } from "../../constants/config";
import { userNoExist } from "../../redux/reducers/auth";
import toast from "react-hot-toast";

const MobileProfile = () => {
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {}, [user]);

  const dispatch = useDispatch();
  const { isProfile } = useSelector((state) => state.misc);
  const closeProfileHandler = () => dispatch(setIsProfile(false));

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      localStorage.removeItem("token");
      dispatch(userNoExist());
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <Dialog
      open={isProfile}
      onClose={closeProfileHandler}
      style={{ marginTop: "1.5rem" }}
    >
      <Stack width={"100vw"} spacing={"1rem"} padding={"1rem"}>
        <Typography sx={{ fontSize: "1.3rem" }}>Profile</Typography>
        <Avatar
          src={transFormImage(user?.avatar?.url)}
          sx={{
            width: "120px",
            height: "120px",
            objectFit: "contain",
            marginBottom: "1rem",
            border: "5px solid black",
          }}
        />

        <ProfileCard text={user?.bio} Icon={"Bio"} heading={"Bio"} />

        <ProfileCard
          heading={"Username"}
          text={user?.username}
          Icon={<AlternateEmail />}
        />
        <ProfileCard heading={"Name"} text={user?.name} Icon={<Face />} />

        <ProfileCard
          heading={"Joined"}
          text={moment(user?.createdAt).fromNow()}
          Icon={<CalendarMonth />}
        />

        <Typography
          sx={{ paddingTop: "0.2rem" }}
          title={"Logput"}
          onClick={logoutHandler}
        >
          {" "}
          <Logout
            sx={{
              fontSize: "2.9rem",
              color: "white",
              borderRadius: "0.4rem",
              backgroundColor: "red",
              padding: "0.7rem",
              marginBottom: "0.5rem",
            }}
          />{" "}
        </Typography>
      </Stack>
    </Dialog>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    sx={{
      display: "flex",
      gap: "1rem",
      justifyContent: "start",
      alignItems: "center",
      spacing: "1.6rem",
      color: "black",
      textAlign: "start",
      backgroundColor: "AntiqueWhite",
      borderRadius: "0.4rem",
      padding: "0.4rem",
    }}
    direction={"row"}
  >
    <Stack marginTop={"1.3rem"} fontSize={"1.3rem"} marginRight={"0.4rem"}>
      {Icon && Icon}
    </Stack>
    <Stack direction={"column-reverse"}>
      <Typography variant="body1" sx={{ fontSize: "1.3rem" }}>
        {text}
      </Typography>
      <Typography color="black" sx={{ fontSize: "1.2rem" }} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default MobileProfile;
