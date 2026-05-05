import { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import type { Customer, CustomerData } from "../types";
import CustomerForm from "./CustomerForm";

type EditCustomerProps = {
  customer: CustomerData;
  handleUpdate: (url: string, updatedCustomer: Customer) => void;
};

export default function EditCustomer(props: EditCustomerProps) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<Customer>({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const handleClickOpen = () => {
    setCustomer({
      firstname: props.customer.firstname,
      lastname: props.customer.lastname,
      streetaddress: props.customer.streetaddress,
      postcode: props.customer.postcode,
      city: props.customer.city,
      email: props.customer.email,
      phone: props.customer.phone,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    props.handleUpdate(props.customer._links.self.href, customer);
    handleClose();
  };

  return (
    <>
      <Button size="small" onClick={handleClickOpen}>
        EDIT
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
        <CustomerForm customer={customer} setCustomer={setCustomer} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
