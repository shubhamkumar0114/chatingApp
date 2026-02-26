import React from "react";
import { transFormImage } from "../lib/features";
import { FileOpen as FileOpenIcon } from "@mui/icons-material";

const RenderAttachment = (file, url) => {
  switch (file) {
    case "video":
      return <video src={url} preload="none" width={"200px"} controls />;
    case "audio":
      return <audio src={url} preload="none" controls />;
    case "image":
      return (
        <img
          src={transFormImage(url, 150)}
          width={"200px"}
          height={"150px"}
          alt="attachtment"
          style={{
            objectFit: "contain",
          }}
        />
      );

    default:
      return <FileOpenIcon />;
      break;
  }
};

export default RenderAttachment;
