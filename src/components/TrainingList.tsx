import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

type Training = {
  id: number;
  date: string;
  duration: number;
  activity: string;
  customer: {
    firstname: string;
    lastname: string;
  } | null;
};

export default function TrainingList() {
  const [trainings, setTrainings] = useState<Training[]>([]);

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      width: 160,
      valueFormatter: (value) => dayjs(value).format("DD.MM.YYYY HH:mm"),
    },
    { field: "duration", headerName: "Duration (min)", width: 150 },
    { field: "activity", headerName: "Activity", width: 150 },
    {
      field: "customer",
      headerName: "Customer",
      width: 200,
      valueGetter: (value, row) => {
        if (row.customer) {
          return `${row.customer.firstname} ${row.customer.lastname}`;
        }
        return "";
      },
    },
  ];

  useEffect(() => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings",
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching trainings");
        }
        return response.json();
      })
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={trainings}
        columns={columns}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        showToolbar
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </div>
  );
}
