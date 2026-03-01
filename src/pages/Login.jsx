import { useInputValidation } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../components/styles/StyledComponent";
import { server } from "../constants/config";
import { userExist } from "../redux/reducers/auth";
import { userValidator } from "../utils/Validators";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", userValidator);
  const password = useInputValidation("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  const avatarChangeHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const toggleLogin = () => setIsLogin((prev) => !prev);

  // --------------------Signup Handler-----------------------
  const handleSign = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("name", name.value);
    formData.append("username", username.value);
    formData.append("password", password.value);
    formData.append("bio", bio.value);
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/register`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      localStorage.setItem("token", data?.token);
      dispatch(userExist(data?.user));
      toast.success(data?.message);
      setLoading(false)
    } catch (error) {
      toast.error(error?.response?.data.message);
    }finally{
      setLoading(false)
    }
  };

  // ----------------------Login------------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      localStorage.setItem("token", res?.data?.token);
      dispatch(userExist(res?.data?.user));
      toast.success(res?.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 6,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h5">Login</Typography>
            <form
              onSubmit={handleLogin}
              style={{
                width: "100%",
                marginTop: "12px",
              }}
            >
              <TextField
                fullWidth
                required
                label="Username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />

              {/*---------password field-----------  */}
              <TextField
                fullWidth
                required
                label="Password"
                margin="normal"
                type="password"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              />
              <Button
                sx={{
                  marginTop: "1rem",
                }}
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Login
              </Button>

              <Typography textAlign={"center"} m={"1rem"}>
                Or
              </Typography>

              <Button
                variant="text"
                fullWidth
                color="primary"
                type="submit"
                onClick={toggleLogin}
              >
                Sign up
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">Register</Typography>
            <form
              onSubmit={handleSign}
              style={{
                width: "100%",
                marginTop: "12px",
              }}
            >
              <Stack position={"relative"} width={"7rem"} margin={"auto"}>
                <Avatar
                  sx={{
                    width: "6rem",
                    height: "6rem",
                    objectFit: "contain",
                  }}
                  src={avatarPreview}
                />

                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    bgcolor: "rgba(0,0,0,0.7)",
                    color: "white",
                    ":hover": { bgcolor: "rgba(0,0,0,0.4)" },
                  }}
                  component="label"
                >
                  <>
                    <CameraAltIcon />
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/*"
                      onChange={avatarChangeHandler}
                    />
                  </>
                </IconButton>
              </Stack>

              <TextField
                fullWidth
                required
                label="Name"
                margin="normal"
                variant="outlined"
                value={name.value}
                onChange={name.changeHandler}
              />

              {/*---------username field-----------  */}
              <TextField
                fullWidth
                required
                label="Username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />
              {username.error && (
                <Typography color="error" variant="caption">
                  {username.error}
                </Typography>
              )}
              {/*---------bio field-----------  */}
              <TextField
                fullWidth
                required
                label="Bio"
                margin="normal"
                type="text"
                variant="outlined"
                value={bio.value}
                onChange={bio.changeHandler}
              />

              {/*---------password field-----------  */}
              <TextField
                fullWidth
                required
                label="Password"
                margin="normal"
                type="password"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              />
              {/* {password.error && (
                <Typography color="error" variant="caption">
                  {password.error}
                </Typography>
              )} */}
              <Button
                sx={{
                  marginTop: "1rem",
                }}
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                {loading ? <LoaderIcon /> : "Register"}
              </Button>

              <Typography textAlign={"center"} m={"1rem"}>
                Or
              </Typography>

              <Button
                variant="text"
                fullWidth
                color="primary"
                onClick={toggleLogin}
              >
                Login
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
