import { Box, Typography } from "@mui/material";
import React, { memo, useEffect } from "react";
import { lightBlue } from "../constants/color";
import moment from "moment";
import { fileFormat } from "../lib/features";
import RenderAttachment from "./RenderAttachment";

const MessageComponent = ({ message, user }) => {
  const { attachments = [], content, sender, createdAt } = message;
    
  const sameSender = sender?._id === user?._id;

  useEffect(()=> {}, [user , sender])

  const timeAgo = moment(createdAt).fromNow();

  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        borderRadius: "6px",
        padding: "2px 8px",
        width: "fit-content",
        maxWidth: "60%",
        wordWrap: "break-word",
        marginTop: "10px"
      }}
    >
      {!sameSender && (
        <Typography color={lightBlue} fontWeight={"600"} variant="caption">
          {sender.name}
        </Typography>
      )}
      {content && <Typography>{content}</Typography>}

      {/* attachments */}
      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url)
           
          return (
            <Box key={index}>
              <a href={url} target="_blank" download style={{ color: "black" }}>
                {RenderAttachment(file , url)}
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color={"text.secondary"}>
        {timeAgo}
      </Typography>
    </div>
  );
};

export default memo(MessageComponent);
