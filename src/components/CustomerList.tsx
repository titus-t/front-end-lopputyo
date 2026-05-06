import { useState, useEffect } from "react";
import { DataGrid, type GridRenderCellParams } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { Button, Snackbar, Stack } from "@mui/material";
import type { Customer, CustomerData } from "../types";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";

export default function CustomerList() {
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchCustomers = () => {
    fetch(`${import.meta.env.VITE_API_URL}/customers`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching customers");
        }
        return response.json();
      })
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const deleteCustomer = (url: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error in deletion");
          }
          fetchCustomers();
          setSnackbarMessage("Customer deleted successfully");
          setOpenSnackbar(true);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleAdd = (customer: Customer) => {
    fetch(`${import.meta.env.VITE_API_URL}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error adding customer");
        return response.json();
      })
      .then(() => {
        fetchCustomers();
        setSnackbarMessage("Customer added successfully");
        setOpenSnackbar(true);
      })
      .catch((err) => console.error(err));
  };

  const handleUpdate = (url: string, updatedCustomer: Customer) => {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCustomer),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error editing customer");
        return response.json();
      })
      .then(() => {
        fetchCustomers();
        setSnackbarMessage("Customer updated successfully");
        setOpenSnackbar(true);
      })
      .catch((err) => console.error(err));
  };

  const saveTraining = (training: any) => {
    fetch(`${import.meta.env.VITE_API_URL}/trainings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(training),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error while adding training");
        return response.json();
      })
      .then(() => {
        setSnackbarMessage("Training added successfully");
        setOpenSnackbar(true);
      })
      .catch((err) => console.error(err));
  };

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "First Name", width: 130 },
    { field: "lastname", headerName: "Last Name", width: 130 },
    { field: "streetaddress", headerName: "Address", width: 180 },
    { field: "postcode", headerName: "Postcode", width: 100 },
    { field: "city", headerName: "City", width: 130 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "phone", headerName: "Phone", width: 130 },

    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      sortable: false,
      filterable: false,
      disableExport: true,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" spacing={1}>
          <AddTraining
            customerUrl={params.row._links.self.href}
            saveTraining={saveTraining}
          />
          <EditCustomer customer={params.row} handleUpdate={handleUpdate} />
          <Button
            color="error"
            size="small"
            onClick={() => deleteCustomer(params.row._links.self.href)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <>
      <Stack sx={{ mt: 2, mb: 2 }} direction="row">
        <AddCustomer handleAdd={handleAdd} />
      </Stack>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={customers}
          columns={columns}
          getRowId={(row) => row._links.self.href}
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
    </>
  );
}
