import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";


const Home = () => {
  return (
    <Box sx={{  justifyContent: "center", marginTop: "5rem" }}>
      <Typography
        p={"0rem"}
        variant="h6"
        textAlign={"center"}
        bgcolor={"white"}
        borderRadius={"12rem"}
        paddingTop={"0.6rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
        paddingBottom={"0.6rem"}
        fontWeight={"600"}
        fontSize={"1.6rem"}
      >
        Welcome
      </Typography>
       <Typography
        p={"0rem"}
        variant="h6"
        textAlign={"center"}
        bgcolor={"white"}
        borderRadius={"12rem"}
        paddingTop={"0.6rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
        paddingBottom={"0.6rem"}
      >
        Select a friend to chat
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
