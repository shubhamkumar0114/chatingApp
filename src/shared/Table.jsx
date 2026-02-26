import { Container, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const Table = ({ rows, columns, heading, rowHeight = 50 }) => {
  return (
    <Container
      sx={{
        height: "100dvh",
      }}
    >
      <Paper elevation={3} sx={{
        padding: "0.2rem 4rem",
        borderRadius: "0.5rem",
        width: "100%",
        overflow: "hidden",
        height: "100%",
        boxShadow: "none"
      }}>
        <Typography textAlign={"center"} variant="h5" sx={{
            margin: "2rem"
        }}>{heading}</Typography>

        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          style={{
            height: "80%",
          }}
          sx={{
            border: "none",
            ".table-header": {
                bgcolor: "black",
                color: "white"
            }
          }}
        />
      </Paper>
    </Container>
  );
};

export default Table;
