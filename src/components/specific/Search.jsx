import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import {toast} from "react-hot-toast"
import React, { useEffect, useState } from "react";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../../shared/UserItem";
import { sampleUsers } from "../../constants/sampleData";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/miscSlice";
import { useLazySearchUsersQuery, useSendFriendRequestMutation } from "../../redux/api/api";
import { useAsyncMutation } from "../../hooks/Hooks";


const Search = () => {
  const search = useInputValidation("");
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUsersQuery();
  const [sendFriendRequest , isLoadingSendFriendRequest , data] = useAsyncMutation(useSendFriendRequestMutation);

  const addFriendHandler = async(id) => {
    await sendFriendRequest("Sending friend request...", {userId: id})
  };

  const handleSearchClose = () => dispatch(setIsSearch(false));

  useEffect(() => {
    const timeOut = setTimeout(() => {
     searchUser(search.value).then(({data})=> setUsers(data?.user))
    }, 1000);

    return ()=> {
      clearTimeout(timeOut)
    }
  }, [search.value]);
  return (
    <Dialog open={isSearch} onClose={handleSearchClose}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"} height={"20rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <List>
        {users?.map((user) => (
          <UserItem
            user={user}
            key={user._id}
            handler={addFriendHandler}
            handlerIsLoading={isLoadingSendFriendRequest}
          />
        ))}
      </List>
    </Dialog>
  );
};

export default Search;
