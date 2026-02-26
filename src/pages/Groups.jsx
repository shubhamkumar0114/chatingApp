import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyBoardBackSpaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { lazy, memo, Suspense, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAsyncMutation, useErrors } from "../hooks/Hooks";
import {
  useChatDetailsQuery,
  useDeleteGroupsMutation,
  useGetMyGroupsQuery,
  useRemoveGroupMembersMutation,
  useRenameGroupsMutation,
} from "../redux/api/api";
import AvatarCard from "../shared/AvatarCard";
import UserItem from "../shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../redux/reducers/miscSlice";
import toast from "react-hot-toast";
const ConfirmDeleteDialog = lazy(
  () => import("../components/dialogs/confirmDeleteDialog"),
);
const AddMemberDialog = lazy(
  () => import("../components/dialogs/AddMemberDialog"),
);

const isAddMember = false;

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const myGroups = useGetMyGroupsQuery("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [renameGroup] = useAsyncMutation(useRenameGroupsMutation);
  const [deleteGroup] = useAsyncMutation(useDeleteGroupsMutation);
  const [removeGroupMember] = useAsyncMutation(useRemoveGroupMembersMutation);

  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdateValue, setGroupNameUpdateValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const { isAddMember } = useSelector((state) => state.misc);

  // navigate to home page
  const navigateBack = () => {
    navigate("/");
  };

  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId },
  );
 
  const error = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];

  

  useEffect(() => {
    if (groupDetails.data) {
      setGroupName(groupDetails.data?.chat.name);
      setGroupNameUpdateValue(groupDetails.data?.chat.name);
    }
    return () => {
      setGroupName("");
      setGroupNameUpdateValue("");
      setIsEdit("");
    };
  }, [groupDetails.data]);

  // handle-mobile function
  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupName = () => {
    setIsEdit(false);
    if(user?._id === groupDetails?.data?.chat?.creator){
        renameGroup("Updating Group Name...", {
      name: groupNameUpdateValue,
      chatId,
    });
    }else{
      toast.error("Only group admins can rename group")
    }
  };

  useEffect(() => {
    if (chatId) {
      setGroupName(`group name ${chatId}`);
      setGroupNameUpdateValue(`group name update ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdateValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  useErrors(error);

  const IconBtn = (
    <>
      <IconButton
        onClick={handleMobile}
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <MenuIcon />
      </IconButton>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "0.9rem",
            left: "0.9rem",
            cursor: "pointer",
          }}
          onClick={navigateBack}
        >
          <KeyBoardBackSpaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  // ---------------------group name--------------------------
  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      paddingTop={"3rem"}
      paddingLeft={"4rem"}
      spacing={"1rem"}
    >
      {isEdit ? (
        <>
          <TextField
            placeholder="group name"
            value={groupNameUpdateValue}
            onChange={(e) => setGroupNameUpdateValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h5">{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  // ------------------------button group--------------------------
  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const deleteHandler = () => {
    if(user?._id === groupDetails?.data?.chat?.creator){
      deleteGroup("Deleting Group...", chatId)
      closeConfirmDeleteHandler();
    }else{
      toast.error("not allow to delete group")
    }
    
  };
  const openMemberHandler = () => {
    dispatch(setIsAddMember(true));
  };
  const removeMemberHandler = (userId) => {
    removeGroupMember("Removing member...", { chatId, userId });
  };

  const ButtonGroup = (
    <Stack
      direction={{
        sm: "row",
        xs: "row-reverse",
      }}
      spacing={"1rem"}
      padding={{ sm: "1rem", xs: "0", md: "1rem 4rem" }}
    >
      <Button
        size="large"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
      >
        Delete group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openMemberHandler}
      >
        Add Member
      </Button>
    </Stack>
  );
  return (
    <Grid container spacing={2} height={"calc(100dvh - 0rem)"}>
      <Grid
        overflow={"auto"}
        height={"100dvh"}
        size={{ xs: 0, sm: 4 }}
        sx={{
          display: { xs: "none", sm: "block" },
          bgcolor: "bisque",
        }}
      >
        <GroupList myGroups={myGroups.data?.groups} chatId={chatId} />
      </Grid>
      <Grid
        size={{ xs: 12, sm: 8 }}
        sx={{
          padding: "1rem 1rem",
          position: "relative",
        }}
      >
        {IconBtn}

        {groupName && (
          <>
            {GroupName}

            <Typography
              variant="h6"
              style={{
                alignItems: "center",
                margin: " 1rem 4rem",
              }}
            >
              Members
            </Typography>

            <Stack
              maxWidth={"45rem"}
              margin={"0 4rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 2rem",
              }}
              spacing={"2rem"}
              bgcolor={"bisque"}
              overflow={"auto"}
              height={"54vh"}
            >
              {/* -------------Member-show----------- */}
              {groupDetails.data?.chat.members?.map((i) => (
                <UserItem
                  key={i._id}
                  user={i}
                  isAdded
                  handler={removeMemberHandler}
                />
              ))}
            </Stack>

            {ButtonGroup}
          </>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}

      {/* -------------drawer section ---------- */}
      <Drawer
        sx={{
          display: { xs: "block", sm: "none" },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupList w={"50%"} myGroups={myGroups.data?.groups} chatId={chatId} />
      </Drawer>
    </Grid>
  );
};

// component---------------
const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack w={w}>
    {myGroups.length > 0 ? (
      myGroups?.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding={"1rem"}>
        No Groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} alignItems={"center"} padding={"1rem"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
