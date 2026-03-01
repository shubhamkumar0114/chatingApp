import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { lazy, Suspense, useState } from "react";
import { toast } from "react-hot-toast"
import axios from "axios"
import { orange } from "../../constants/color";
import { server } from "../../constants/config.js"
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationIcon,

} from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { userNoExist } from "../../redux/reducers/auth.js"
import { setIsMobileMenuFriend, setIsNotification, setIsSearch, setIsNewGroup } from "../../redux/reducers/miscSlice.js";
import { resetNotifications } from "../../redux/reducers/chat.js";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationDialog = lazy(() => import("../specific/Notification"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { isSearch, isNotification, isNewGroup } = useSelector(state => state.misc)
  const { chatNotificationCount } = useSelector(state => state.chat)

  const handleMobile = () => {
    dispatch(setIsMobileMenuFriend(true))
  };
  const openSearch = () => {
    dispatch(setIsSearch(true))
  };
  const openNewGroup = () => {
    dispatch(setIsNewGroup(true))
  };
  const openNotification = () => {
    dispatch(setIsNotification(true))
    dispatch(resetNotifications())
  }
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${server}/api/v1/user/logout`, { withCredentials: true })
      localStorage.removeItem("token");
      dispatch(userNoExist())
      toast.success(res?.data?.message)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  const navigateToGroup = () => navigate("/groups");

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"3rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: orange,
            height: "100%",
          }}
        >
          <Toolbar variant="h6">
            <Typography
              sx={{
                display: { xs: "none", md: "block" },
              }}
            >
              Chat App
            </Typography>

            {/* icons  */}
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn
                title={"Search"}
                icons={<SearchIcon />}
                onClick={openSearch}
              />

              <IconBtn
                title={"New group"}
                icons={<AddIcon />}
                onClick={openNewGroup}
              />

              <IconBtn
                title={"manage group"}
                icons={<GroupIcon />}
                onClick={navigateToGroup}
              />

              <IconBtn
                title={"Notification"}
                icons={<NotificationIcon />}
                onClick={openNotification}
                value={chatNotificationCount}
              />

              <IconBtn
                title={"Logput"}
                icons={<LogoutIcon />}
                onClick={logoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDialog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icons, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? <Badge badgeContent={value} color="error">{icons}</Badge> : icons}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
