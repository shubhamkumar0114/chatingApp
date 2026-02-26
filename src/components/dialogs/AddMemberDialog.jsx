import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../../shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/miscSlice";
import { useAsyncMutation, useErrors } from "../../hooks/Hooks";
import { useAddGroupMembersMutation, useAvilableFriendsQuery } from "../../redux/api/api";
const AddMemberDialog = ({ chatId }) => {


  const [selectedMembers, setSelectedMembers] = useState([]);
  const dispatch = useDispatch();

    const {isAddMember} = useSelector((state)=> state.misc)
    const [addGroupMember] = useAsyncMutation(useAddGroupMembersMutation)

    const {isError , isLoading , error , data} = useAvilableFriendsQuery(chatId)
    console.log(data)
    const errors =[
      {isError , error}
    ]
    useErrors(errors)

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((curr) => curr !== id) : [...prev, id]
    );
  };

  
  const addMemberSubmitHandler = () => {
    addGroupMember("Member adding...", {members: selectedMembers , chatId})
  };

  const closeHandler = () => {
  
    dispatch(setIsAddMember(false))
  };


  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack>
        <DialogTitle>Add Member</DialogTitle>
        {data?.avilableFriend?.length > 0 ? (
          data?.avilableFriend?.map((i) => (
            <UserItem key={i._id} user={i} handler={selectMemberHandler} isAdded={
                selectedMembers.includes(i._id)
            } />
          ))
        ) : (
          <Typography textAlign={"center"}>No Friend</Typography>
        )}
      </Stack>

      <Stack
        direction={"row"}
        textAlign={"center"}
        padding={"1rem 1rem"}
        spacing={"0.4rem"}
      >
        <Button color="error" onClick={closeHandler}>
          cancel
        </Button>
        <Button
          onClick={addMemberSubmitHandler}
          variant="contained"
          disabled={isLoading}
        >
          submit change
        </Button>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
