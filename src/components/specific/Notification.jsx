import React, { memo } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { sampleNotification } from "../../constants/sampleData";
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/Hooks";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/miscSlice";
import toast from "react-hot-toast";
const Notification = () => {

  const dispatch = useDispatch()

  const {isNotification} = useSelector((state)=> state.misc)
  const {isLoading, data, error, isError} = useGetNotificationsQuery();

  const [acceptRequest] = useAcceptFriendRequestMutation();
  

  const friendRequestHandler = async({_id , accept})=> {
    try {
      dispatch(setIsNotification(false))
     const res = await acceptRequest({ requestId: _id, accept})
     toast.success(res.data?.success)
    } catch (error) {
      console.log(error?.message)
    }
  }

  const closeHandle = ()=> dispatch(setIsNotification(false))

  useErrors([{error , isError}])
  return (
    <Dialog open={isNotification} onClose={closeHandle}>
      <Stack p={{ xs: "1rem", sm: "2rem", }} sx={{backgroundColor: "#2F5F5F", color: "white"}} maxWidth={"25rem"}>
        <DialogTitle>Notification</DialogTitle>

       {
        isLoading ? <Skeleton/> : <>
         {data?.allRequest.length > 0 ? (
          data?.allRequest?.map((i)=> <NotificationItem sender={i} _id={i._id} handler={friendRequestHandler} key={i._id}  />)
        ) : (
          <Typography textAlign={"center"}> 0 notification</Typography>
        )}
        </>
       }
      </Stack>
    </Dialog>
  );
};


const NotificationItem = memo(({ sender, _id, handler }) => {
  const {name , avatar} = sender.sender;

    return (
      <ListItem>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={"1rem"}
          width={"100%"}
        >
          <Avatar src={avatar} />
          <Typography
            variant="body1"
            sx={{
              flexGrow: 1,
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
          
            }}
          >
            {`${name} send you a friend request`}
          </Typography>

          <Stack direction={{
            xs: "column",
            sm: "row"
          }}>
            <Button onClick={() => handler({ _id, accept: true })}>
              Accept
            </Button>
            <Button color="error" onClick={() => handler({ _id, accept: false })}>
              Reject
            </Button>
          </Stack>
        </Stack>
      </ListItem>
    );
});

export default Notification;
