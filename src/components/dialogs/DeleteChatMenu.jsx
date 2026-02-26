import { Menu, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../redux/reducers/miscSlice";
import toast from "react-hot-toast";
import { Delete, ExitToApp } from "@mui/icons-material";
import { useAsyncMutation } from "../../hooks/Hooks";
import { useDeleteGroupsMutation } from "../../redux/api/api";
import { useNavigate } from "react-router-dom";

const DeleteChatMenu = ({ disptch, deleteMenuAnchor }) => {
  const dispatch = useDispatch();
  const { isDeleteMenu, selectedDeleteChat } = useSelector(
    (state) => state.misc,
  );
  const navigate = useNavigate();
  const [deleteChat,_, deleteData] = useAsyncMutation(useDeleteGroupsMutation)

  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteMenuAnchor.current = null;
  };

  const leaveGroupHandler = () => {
    toast.success("group deleted");
  };

  const chatDeleteHandler = () => {
    closeHandler();
    console.log(selectedDeleteChat.chatId)
    deleteChat("Deleting Chat...", selectedDeleteChat.chatId)
    toast.success("chat deleted");
  };

  useEffect(()=> {
    if(deleteData) navigate("/")
  },[deleteData])

  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteMenuAnchor.current}
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
    >
      <Stack
        sx={{
          padding: "0.2rem 0.5rem",
          cursor: "pointer",
        }}
        direction={"row"}
        alignItems={"center"}
        onClick={
          selectedDeleteChat.groupChat ? leaveGroupHandler : chatDeleteHandler
        }
      >
        <Typography>
          {selectedDeleteChat.groupChat ? (
            <Stack direction={"row"}>
        
              <ExitToApp /> <Typography>Leave Group</Typography>
            </Stack>
          ) : (
            <Stack direction={"row"}>
           
              <Delete /> <Typography>Chat Delete</Typography>
            </Stack>
          )}
        </Typography>
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
