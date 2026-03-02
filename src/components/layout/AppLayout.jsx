import { Drawer, Grid, Skeleton } from "@mui/material";
import { lazy, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getSocket } from "../../Socket.jsx";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  REFETCH_CHAT,
} from "../../constants/event.js";
import { useErrors, useSocketEvents } from "../../hooks/Hooks.jsx";
import { useMyChatsQuery } from "../../redux/api/api.js";
import {
  incrementNotification,
  setMessagesAlert,
} from "../../redux/reducers/chat.js";
import {
  setIsDeleteMenu,
  setIsMobileMenuFriend,
  setSelectedDeleteChat,
} from "../../redux/reducers/miscSlice.js";
import Title from "../../shared/Title";
import DeleteChatMenu from "../dialogs/DeleteChatMenu.jsx";
import Profile from "../specific/Profile";
import Header from "./Header";
const Chatlist = lazy(() => import("../specific/Chatlist"));

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const dispatch = useDispatch();
    const deleteMunuAnchors = useRef(null);
    const location = useLocation();
    const isLocation = location.pathname === `/chat/${chatId}`;

    const socket = getSocket();

    const { isMobileMenuFriend } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessageAlert } = useSelector((state) => state.chat);
    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      dispatch(setSelectedDeleteChat({ chatId: _id, groupChat }));
      dispatch(setIsDeleteMenu(true));
      deleteMunuAnchors.current = e.currentTarget;
      console.log("delete chat ", _id, groupChat);
    };

    const newMessageHandler = useCallback(
      (data) => {
        if (data.chatId == chatId) return;
        dispatch(setMessagesAlert(data));
      },
      [chatId],
    );
    const newRequestHandler = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const refetchHandler = useCallback(() => {
      refetch();
    }, [refetch]);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageHandler,
      [NEW_REQUEST]: newRequestHandler,
      [REFETCH_CHAT]: refetchHandler,
    };
    useSocketEvents(socket, eventHandlers);

    const handleMobileClose = () => dispatch(setIsMobileMenuFriend(false));

    useErrors([{ isError, error }]);

    return (
      <>
        <Title />
        {/* {isLocation ? "shubham" : <Header />} */}
        <Header />

        <DeleteChatMenu deleteMenuAnchor={deleteMunuAnchors} />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer
            open={isMobileMenuFriend}
            onClose={handleMobileClose}
            PaperProps={{
              sx: {
                backgroundColor: "#2F5F5F",
                color: "white",
              },
            }}
          >
            <Chatlist
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              newMessageAlt={newMessageAlert}
              handleDeleteChat={handleDeleteChat}
            />
          </Drawer>
        )}
        <Grid container minHeight="calc(90dvh - 3rem)" wrap="nowrap">
          {/* LEFT */}
          <Grid
            sx={{
              width: 360, // fixed sidebar
              padding: "0 0.5rem",
              display: { xs: "none", md: "block" },
              backgroundColor: "DarkSlateGray",
            }}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <Chatlist
                chats={data?.chats}
                chatId={chatId}
                newMessageAlt={newMessageAlert}
                handleDeleteChat={handleDeleteChat}
              />
            )}
          </Grid>

          {/* CENTER (AUTO EXPAND) */}
          <Grid
            sx={{
              flexGrow: 1,
              backgroundColor: "DarkSlateGray",
              borderLeft: "1px solid gray",
            }}
          >
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>

          {/* RIGHT */}
          <Grid
            sx={{
              width: 370, // fixed profile panel
              display: { xs: "none", lg: "block" },
              backgroundColor: "rgba(0,0,0,0.7)",
            }}
          >
            <Profile />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
