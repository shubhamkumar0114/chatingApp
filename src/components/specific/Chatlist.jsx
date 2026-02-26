import { Stack } from "@mui/material";
import React from "react";
import ChatItem from "../../shared/ChatItem";

const Chatlist = ({w = "100%", chats = [], chatId, onlineUsers = [],newMessageAlt = [{
  chatId: "",
  count: 0
}],
  handleDeleteChat, 
}) => {
  return (
    <Stack width={w} direction={"column"} overflow={"auto"} height={"90dvh"}>
      {chats?.map((data, index) => {
        const { avatar, name, _id, groupChat, members } = data;
       
     
        const newMessageAlert = newMessageAlt.find(
          ({ chatId }) => chatId === _id
        );
        

        const isOnline = members?.some((member) => onlineUsers.includes(_id));

        return (
          <ChatItem
            index={index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default Chatlist;
