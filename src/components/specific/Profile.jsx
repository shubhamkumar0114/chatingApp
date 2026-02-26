import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import moment from "moment";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import {transFormImage} from "../../lib/features"
import { useEffect } from "react";

const Profile = () => {

  const {user} = useSelector((state)=> state.auth);
  useEffect(()=> {},[user])

  return (
    <Stack
      spacing={"1.4rem"}
      marginTop={"2rem"}
      direction={"column"}
      alignItems={"center"}
    >
      <Avatar src={transFormImage(user?.avatar?.url)}
        sx={{
          width: "140px",
          height: "140px",
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard text={user?.bio} Icon={""} heading={"Bio"} />
      <ProfileCard
        heading={"Username"}
        text={user?.username}
        Icon={<UserNameIcon />}
      />
      <ProfileCard
        heading={"Name"}
        text={user?.name}
        Icon={<FaceIcon />}
      />

      <ProfileCard
        heading={"Joined"}
        text={moment(user?.createdAt).fromNow()}
        Icon={<CalendarIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      spacing: "1rem",
      color: "white",
      textAlign: "center",
    }} direction={"row"} 
  >
    <Stack marginTop={"1.3rem"} marginRight={"0.4rem"} >{Icon && Icon}</Stack>
    <Stack direction={"column-reverse"}>
      <Typography variant="body1">{text}</Typography>
      <Typography color="lightblue" variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
