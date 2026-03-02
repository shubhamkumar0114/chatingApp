import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/Hooks";
import {
  useAvilableFriendsQuery,
  useNewGroupsMutation,
} from "../../redux/api/api";
import { setIsNewGroup } from "../../redux/reducers/miscSlice";
import UserItem from "../../shared/UserItem";
import toast from "react-hot-toast";

const NewGroup = () => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const groupName = useInputValidation("");
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvilableFriendsQuery("");
  const [newGroups, isLoadingNewGroup] = useAsyncMutation(useNewGroupsMutation);

  const errors = [
    {
      error,
      isError,
    },
  ];
  useErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((curr) => curr !== id) : [...prev, id],
    );
  };

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Please Group Name");
    if (selectedMembers.length < 2) toast.error("Select 3 members");
    newGroups("Creating New Group", {
      name: groupName.value,
      members: selectedMembers,
    });
  };

  const { isNewGroup } = useSelector((state) => state.misc);
  const closeHandler = () => dispatch(setIsNewGroup(false));

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        sx={{ backgroundColor: "#2F5F5F", color: "white" }}
        spacing={"1rem"}
        width={"70vw"}
      >
        <DialogTitle variant="h5" textAlign={"center"}>
          New Groups
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
          sx={{
            backgroundColor: "#2F5F5F",
            color: "white",
            '& label': { color: 'white' }
          }}
          InputProps={{
            style: { color: "white" },
          }}
        />
        <Typography>Members</Typography>

        <Stack>
          {data?.friends.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(user._id)}
            />
          ))}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button variant="text" color="gray" size="large">
            Cancel
          </Button>
          <Button variant="contained" size="large" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
