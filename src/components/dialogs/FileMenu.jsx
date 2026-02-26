import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu, setUploadingLoader } from "../../redux/reducers/miscSlice";
import { Image as ImageIcon , AudioFile as AudioFileIcon, VideoFile as VideoFileIcon, UploadFile as UploadFileIcon} from "@mui/icons-material";
import {toast} from "react-hot-toast"
import { useSendAttachmentsMutation } from "../../redux/api/api";

const FileMenu = ({ anchorE1 , chatId}) => {

  const imageRef = useRef()
  const audioRef = useRef()
  const videoRef = useRef()
  const fileRef = useRef()

  const [sendAttachments] = useSendAttachmentsMutation();

  const dispatch = useDispatch();
  const { isFileMenu } = useSelector((state) => state.misc);
  const closeFileMenu = () => dispatch(setIsFileMenu(false));

  const selectImage = ()=> imageRef.current.click()
  const selectVideo = ()=> videoRef.current.click()
  const selectAudio = ()=> audioRef.current.click()
  const selectFile = ()=> fileRef.current.click()

  const fileChangeHandle = async(e, key) => {
    const files = Array.from(e.target.files)
    if(files.length <= 0) return toast.error("Please upload files")
    if(files.length > 0) toast.error(`file upload ${key} at least 5 `)

    dispatch(setUploadingLoader(true))

    const toastId = toast.loading(`Sending ${key}...`)
    closeFileMenu()

    try {
      let myForm = new FormData()
      myForm.append("chatId", chatId)
      files.forEach((file)=> myForm.append("files", file))

      
      const res = await sendAttachments(myForm)
     
      if(res.data){
        toast.success(`${key} send successfully `)
      }else{
         toast.error(`${key} Faield to send `)
      }
    } catch (error) {
      toast.error("error" , {id: toastId})
    }finally{
      dispatch(setUploadingLoader(false))
    }
  };
  return (
    <Menu open={isFileMenu} onClose={closeFileMenu} anchorEl={anchorE1}>
      <div
        style={{
          width: "10rem",
        }}
      >
        <MenuList>
          <MenuItem onClick={selectImage}>
            <Tooltip title="Image">
              <ImageIcon></ImageIcon>
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Image</ListItemText>
            <input
              type="file"
              multiple
              accept="image/png , image/jpeg , image/gif"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandle(e, "Images")}
              ref={imageRef}
            />
          </MenuItem>
        

     
          <MenuItem onClick={selectAudio}>
            <Tooltip title="Audio">
              <AudioFileIcon></AudioFileIcon>
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Audio</ListItemText>
            <input
              type="file"
              multiple
              accept="audio/mpeg , audio/wav"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandle(e, "Audios")}
              ref={audioRef}
            />
          </MenuItem>
        

        
          <MenuItem onClick={selectVideo}>
            <Tooltip title="Video">
              <VideoFileIcon></VideoFileIcon>
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Video</ListItemText>
            <input
              type="file"
              multiple
              accept="video/mp4 , video/webm , video/ogg"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandle(e, "Videos")}
              ref={videoRef}
            />
          </MenuItem>
        

         
          <MenuItem onClick={selectFile}>
            <Tooltip title="file">
              <UploadFileIcon></UploadFileIcon>
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>file</ListItemText>
            <input
              type="file"
              multiple
              accept="*"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandle(e, "Files")}
              ref={fileRef}
            />
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  );
};

export default FileMenu;
