import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../shared/Table";
import { Avatar } from "@mui/material";
import { dashboardData } from "../../constants/sampleData";
import { transFormImage } from "../../lib/features";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "avatar",
    headerName: "AVATAR",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <Avatar src={params.row.avatar} alt={params.row.name} />
    ),
  },
  {
    field: "name",
    headerName: "name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "friends",
    headerClassName: "table-header",
    width: 130,
  },
  {
    field: "groups",
    headerName: "groups",
    headerClassName: "table-header",
    width: 130,
  },
];

const UsersManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData.users.map((i) => ({
        ...i,
        id: i._id,
        avatar: transFormImage(i.avatar, 50),
      }))
    );
  }, []);
  return (
    <AdminLayout>
      <Table rows={rows} columns={columns} heading="All Users" />
    </AdminLayout>
  );
};

export default UsersManagement;
