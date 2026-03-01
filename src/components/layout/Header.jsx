import {
  Add as AddIcon,
  Group as GroupIcon,
  Menu as MenuIcon,
  Notifications as NotificationIcon,
  PermIdentity,
  Search as SearchIcon
} from "@mui/icons-material";
import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { orange } from "../../constants/color";
import { resetNotifications } from "../../redux/reducers/chat.js";
import { setIsMobileMenuFriend, setIsNewGroup, setIsNotification, setIsProfile, setIsSearch } from "../../redux/reducers/miscSlice.js";


const MobileProfileDialog = lazy(()=> import("../specific/MobileProfile.jsx")) ;
const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationDialog = lazy(() => import("../specific/Notification"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {user} = useSelector((state)=> state.auth);

  const { isSearch, isNotification, isNewGroup, isProfile} = useSelector(state => state.misc)
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
 
  const navigateToGroup = () => navigate("/groups");

  const openProfileHandler = ()=> dispatch(setIsProfile(true))
  

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

              {user && <IconBtn
                title={"Profile"}
                icons={<PermIdentity sx={{display: { xs: "block", lg: "none" }}} />}
                onClick={openProfileHandler}
              />}
               
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

      {isProfile && (
        <Suspense fallback={<Backdrop open />}>
          <MobileProfileDialog />
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
