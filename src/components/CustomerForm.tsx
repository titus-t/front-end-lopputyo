import { DialogContent, TextField } from "@mui/material";
import type { Customer } from "../types";

type CustomerFormType = {
  customer: Customer;
  setCustomer: React.Dispatch<React.SetStateAction<Customer>>;
};

export default function CustomerForm({
  customer,
  setCustomer,
}: CustomerFormType) {
  return (
    <DialogContent>
      <TextField
        required
        margin="dense"
        label="First Name"
        value={customer.firstname}
        onChange={(e) =>
          setCustomer({ ...customer, firstname: e.target.value })
        }
        fullWidth
        variant="standard"
      />
      <TextField
        required
        margin="dense"
        label="Last Name"
        value={customer.lastname}
        onChange={(e) => setCustomer({ ...customer, lastname: e.target.value })}
        fullWidth
        variant="standard"
      />
      <TextField
        required
        margin="dense"
        label="Address"
        value={customer.streetaddress}
        onChange={(e) =>
          setCustomer({ ...customer, streetaddress: e.target.value })
        }
        fullWidth
        variant="standard"
      />
      <TextField
        required
        margin="dense"
        label="Postcode"
        value={customer.postcode}
        onChange={(e) => setCustomer({ ...customer, postcode: e.target.value })}
        fullWidth
        variant="standard"
      />
      <TextField
        required
        margin="dense"
        label="City"
        value={customer.city}
        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
        fullWidth
        variant="standard"
      />
      <TextField
        required
        margin="dense"
        label="Email"
        value={customer.email}
        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
        fullWidth
        variant="standard"
      />
      <TextField
        required
        margin="dense"
        label="Phone"
        value={customer.phone}
        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
        fullWidth
        variant="standard"
      />
    </DialogContent>
  );
}
