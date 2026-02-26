import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../shared/Table";
import { Avatar, Stack } from "@mui/material";
import AvatarCard from "../../shared/AvatarCard";
import { dashboardData } from "../../constants/sampleData";
import { transFormImage } from "../../lib/features";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 120,
    renderCell: (params) => <span>{params.id}</span>,
  },
  {
    field: "avatar",
    headerName: "AVATAR",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => <Avatar avatar={params.row.avatar} />,
  },
  {
    field: "name",
    headerName: "Group name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "totalmembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => <Avatar avatar={params.row.avatar} max={100} />,
  },
  {
    field: "totalmessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 130,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 260,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AvatarCard src={params.row.creator} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];

const ChatManagement = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(
      dashboardData.chats.map((i) => ({
        ...i,
        id: i._id,
        avatar: i.avatar.map((i) => transFormImage(i, 50)),
        members: i.members.map((i) => transFormImage(i.avatar, 50)),
        creator: {
          name: i.creator.name,
          avatar: transFormImage(i.creator.avatar , 50),
        },
      }))
    );
  }, []);

  return (
    <AdminLayout>
      <Table rows={rows} columns={columns} heading={"Chats Managements"} />
    </AdminLayout>
  );
};

export default ChatManagement;
