import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../shared/Table";
import { dashboardData } from "../../constants/sampleData";
import { Avatar, Stack } from "@mui/material";
import { transFormImage } from "../../lib/features";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "attechment",
    headerName: "Attechments",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      <Avatar alt={params.row.name} src={params.row.avatar} />;
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },
  {
    field: "sender",
    headerName: "Send by",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>;
    },
  },
  {
    field: "chat",
    headerName: "Chats",
    headerClassName: "table-header",
    width: 160,
  },
  {
    field: "groupchat",
    headerName: "Group Chats",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 200,
  },
];

const MessageManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData.messages.map((i) => ({
        ...i,
        id: i._id,
        sender: i.sender.name
      }))
    );
  }, []);
  return (
    <AdminLayout>
      <Table rows={rows} columns={columns} heading={"All Messages"} />
    </AdminLayout>
  );
};

export default MessageManagement;
