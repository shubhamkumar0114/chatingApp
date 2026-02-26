import React from "react";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useInputValidation } from "6pp";
import { Navigate } from "react-router-dom";

const AdminLogin = () => {
  const secretKey = useInputValidation("");

  const isAdmin = true;
  if(isAdmin) return <Navigate to={"/admin/dashboard"} />

  const submitAdminHandler = () => {};
  return (
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        
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
        <Typography variant="h5">Admin</Typography>
        <form
          onSubmit={submitAdminHandler}
          style={{
            width: "100%",
            marginTop: "12px",
          }}
        >
          {/*---------password field-----------  */}
          <TextField
            fullWidth
            required
            label="Password"
            margin="normal"
            type="password"
            placeholder="SecretKey"
            variant="outlined"
            value={secretKey.value}
            onChange={secretKey.changeHandler}
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
        </form>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
