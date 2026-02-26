import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  Chat as ChatIcon,
  Close as CloseIcon,
  ExitToApp as ExitToAppIcon,
  Groups as GroupsIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useLocation, Link as LinkComponent, Navigate } from "react-router-dom";
import { Dashboard as DashboardIcon } from "@mui/icons-material";

const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 0.8rem 1.4rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;

const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/users-management",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Messages",
    path: "/admin/messages-management",
    icon: <ChatIcon />,
  },
  {
    name: "Chats",
    path: "/admin/chats-management",
    icon: <GroupsIcon />,
  },
];

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const handleMobile = () => {
    setIsMobile(!isMobile);
  };
  const handleClose = () => {
    setIsMobile(false);
  };
  return (
    <>
      <Grid container minHeight={"100dvh"}>
        {/* --------------menu-icon----------- */}
        <Box
          sx={{
            display: { xs: "block", sm: "none" },
            position: "fixed",
            right: "1rem",
            top: "1.7rem",
          }}
        >
          <IconButton onClick={handleMobile}>
            {isMobile ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>

        <Grid
          size={{ md: 4, lg: 2 }}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <SideBar />
        </Grid>
        {/* -------------Right-section----------- */}
        <Grid size={{ xs: 12, md: 8, lg: 10 }} sx={{ bgcolor: "#f5f5f5" }}>
          {children}
        </Grid>

        {/* -------------drawer-sidebar--------- */}
        <Drawer open={isMobile} onClose={handleClose}>
          <SideBar w="50vw" />
        </Drawer>
      </Grid>
    </>
  );
};

const SideBar = ({ w }) => {
  const location = useLocation();

  const logoutHandler = ()=> {
    console.log("logout")
  }
  const isAdmin = true;
  if(!isAdmin) return <Navigate to={"/adminlogin"} />;

  return (
    <Stack width={w} direction={"column"} p={"0.5rem"} spacing={"1rem"}>
      <Typography variant="h5">Admin</Typography>

      <Stack spacing={"0.4rem"}>
        {adminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            sx={
              location.pathname === tab.path && {
                bgcolor: "MarkText",
                color: "white",
                "&:hover": { color: "white" },
              }
            }
          >
            <Stack direction={"row"} spacing={"0.3rem"} alignItems={"center"}>
              {tab.icon}
              <Typography>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}

        {/* -----------Logout-section---------- */}
        <Link onClick={logoutHandler}>
          <Stack
            direction={"row"}
            spacing={"0.3rem"}
            alignItems={"center"}
            sx={{
              bgcolor: "#F54927",
              padding: "0.5rem 0.6rem",
              borderRadius: "0.4rem",
              color: "white",
            }}
          >
            <ExitToAppIcon />
            <Typography fontWeight={600}>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

export default AdminLayout;
