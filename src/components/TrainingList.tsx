import { useState, useEffect } from "react";
import { DataGrid, type GridRenderCellParams } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { Button, Snackbar } from "@mui/material";
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
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchTrainings = () => {
    fetch(`${import.meta.env.VITE_API_URL}/gettrainings`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching trainings");
        }
        return response.json();
      })
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const deleteTraining = (id: number) => {
    if (window.confirm("Are you sure you want to delete this training?")) {
      fetch(`${import.meta.env.VITE_API_URL}/trainings/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error in deletion");
          }
          fetchTrainings();
          setSnackbarMessage("Training deleted successfully");
          setOpenSnackbar(true);
        })
        .catch((err) => console.error(err));
    }
  };

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
      valueGetter: (_value, row) => {
        if (row.customer) {
          return `${row.customer.firstname} ${row.customer.lastname}`;
        }
        return "";
      },
    },
    {
      field: "delete",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableExport: true,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          color="error"
          size="small"
          onClick={() => deleteTraining(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </div>
  );
}
