import React, { memo } from "react";
import { Link } from "../components/styles/StyledComponent";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => { 
  return (
    <Link
      to={`/chat/${_id}`} sx={{padding: "0"}}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          justifyContent: "start",
          padding: "0.6rem",
          backgroundColor: sameSender ? "LightGoldenRodYellow" : "unset",
          color: sameSender ? "black" : "black",
          position: "relative",
          borderRadius: "0.3rem"
        }} 
      >
        {/* Avatar card  */}
        <AvatarCard avatar={avatar} />
        <Stack>
          <Typography>{name}</Typography>
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} New message</Typography>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </Box>
    </Link>
  );
};

export default memo(ChatItem);
