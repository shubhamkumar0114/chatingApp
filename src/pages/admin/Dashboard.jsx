import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Chat as ChatIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import moment from "moment";
import { Buttons, SearchField } from "../../components/styles/StyledComponent";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";

const Dashboard = () => {

  const Widgets = (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={"2rem"}
      justifyContent={"space-between"}
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget title={"Users"} value={12} icon={<PersonIcon />} />
      <Widget title={"Chats"} value={14} icon={<ChatIcon />} />
      <Widget title={"Messages"} value={18} icon={<MessageIcon />} />
    </Stack>
  );

  return (
    <AdminLayout>
      <Container component={"main"}>
        {AppBar}

        <Stack direction={{
          xs: "column",
          lg: "row"
        }} spacing={"2rem"} flexWrap={"wrap"}>
          <Paper
            elevation={3}
            sx={{
              padding: "1.8rem 1rem",
              margin: "1rem 0",
              borderRadius: "0.4rem",
              width: { xs: "100%" , sm: "50%"},
              height: "20rem",
            }}
          >
            <Typography>Last Messages</Typography>
            <LineChart value={[1, 12, 25, 2, 56]} />
          </Paper>

          <Paper
            elevation={3}
            sx={{
              padding: "0.5rem 0.4rem",
              margin: "1.5rem 2rem",
              borderRadius: "0.4rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              position: "relative",
              width: "100%",
              maxWidth: "25rem",
              height: {xs: "0", sm:"20rem"},
            }}
          >
            <DoughnutChart
              value={[34, 65]}
              labels={["Single chats", "Group Chats"]}
            />

            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <GroupIcon />
              <Typography>Vs</Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>
        {Widgets}
      </Container>
    </AdminLayout>
  );
};



//  ----------COMPONENTS--------------
const AppBar = (
  <Paper
    elevation={3}
    sx={{ padding: "0.5rem 0.4rem", margin: "1rem 0", borderRadius: "0.4rem" }}
  >
    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
      <AdminPanelSettingsIcon sx={{ fontSize: "2.2rem" }} />

      <SearchField />

      <Buttons>click</Buttons>
      <Typography sx={{ display: { md: "none" } }}>
        <NotificationsIcon />
      </Typography>
      <Box flexGrow={1} />
      <Typography
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        {moment().format("MMMM Do YYYY, h:mm:ss a")}{" "}
      </Typography>
      <NotificationsIcon sx={{ display: { xs: "none", md: "block" } }} />
    </Stack>
  </Paper>
);

const Widget = ({ title, value, icon }) => <Paper>
  <Stack alignItems={"center"} spacing={"1rem"}>
  <Typography sx={{
    color: "rgba(0,0,0,0.7)",
    borderRadius: "50%",
    border: "5px solid rgba(0,0,0,0.9)",
    width: "5rem",
    height: "5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }}>{value}</Typography>
  <Stack sx={{
    padding: "2rem",
    margin: "2rem 0",
    borderRadius: "1rem",
    width: "20rem",
  }} direction={"row"} spacing={"1rem"} alignItems={"center"}>
    {icon}
    <Typography>{title}</Typography>
  </Stack>
  </Stack>
</Paper>;

export default Dashboard;
