import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import FileMenu from "../components/dialogs/FileMenu";
import AppLayout from "../components/layout/AppLayout";
import { InputBox } from "../components/styles/StyledComponent";
import { grayColor } from "../constants/color";
import { NEW_MESSAGE, START_TYPING, STOP_TYPING } from "../constants/event";
import { useErrors, useSocketEvents } from "../hooks/Hooks";
import { useChatDetailsQuery, useGetMessaggesQuery } from "../redux/api/api";
import MessageComponent from "../shared/MessageComponent";
import { getSocket } from "../Socket";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/miscSlice";
import { useEffect } from "react";
import { removeNewMessagesAlert } from "../redux/reducers/chat";


const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const socket = getSocket();
  const dispatch = useDispatch();

  // states sections
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPages] = useState(1);
  const [fileAnchor, setFileAnchor] = useState(null);

  const [iAmTyping, setIAmTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typinTimeOut = useRef(null);
  const scrollRef = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const members = chatDetails.data?.chat?.members;
  const oldMessagesChunk = useGetMessaggesQuery({ chatId, page });
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPage,
    page,
    setPages,
    oldMessagesChunk.data?.message,
  );

  const allMessages = [...oldMessages, ...messages];
  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  const onChangeTypingHandler = (e) => {
    setMessage(e.target.value);
    if (!iAmTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIAmTyping(true);
    }

    if (typinTimeOut.current) clearTimeout(typinTimeOut.current);
    typinTimeOut.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIAmTyping(false);
    }, 1000);
  };

  const startypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(true);
    },
    [chatId],
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId],
  );

  const newMessage = useCallback(
    (data) => {
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId],
  );

  useEffect(() => {
    dispatch(removeNewMessagesAlert(chatId));
    return () => {
      setMessage("");
      setMessages([]);
      setPages(1);
      setOldMessages([]);
    };
  }, [chatId, newMessage]);

  // scroll chat page auto
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileAnchor(e.currentTarget);
  };


  const eventHandler = {
    [NEW_MESSAGE]: newMessage,
    [START_TYPING]: startypingListener,
    [STOP_TYPING]: stopTypingListener,
  };
  useSocketEvents(socket, eventHandler);
  useErrors(errors);


  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"0.5rem"}
        bgcolor={grayColor}
        height={"82dvh"}
        sx={{
          overflowX: "hidden",
          overflowY: "scroll",
        }}
      >
        {/* ----------------message-render--------------- */}

        {allMessages?.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
        <div ref={scrollRef} />
        {userTyping && (
          <div
            style={{
              position: "absolute",
              top: "1rem",
              left: "3.5rem",
              color: "white",
            }}
          >
            Typing...
          </div>
        )}
      </Stack>

      {/* form Create  */}

      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack direction={"row"} height={"100%"} alignItems={"center"}>
          <IconButton
            sx={{
              rotate: "30deg",
              marginLeft: "0.3rem",
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type Here..."
            value={message}
            onChange={onChangeTypingHandler}
          />

          <IconButton
            type="submit"
            sx={{
              backgroundColor: "#ea7070",
              color: "white",
              marginRight: "0.3rem",
              "&:hover": {
                backgroundColor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorE1={fileAnchor} chatId={chatId} />
    </>
  );
};

export default AppLayout()(Chat);
