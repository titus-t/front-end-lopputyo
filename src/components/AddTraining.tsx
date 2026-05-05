import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";

type TrainingPayload = {
  date: string;
  activity: string;
  duration: number;
  customer: string;
};

type AddTrainingProps = {
  customerUrl: string;
  saveTraining: (training: TrainingPayload) => void;
};

export default function AddTraining({
  customerUrl,
  saveTraining,
}: AddTrainingProps) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: dayjs(),
    activity: "",
    duration: "",
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    const newTraining: TrainingPayload = {
      date: training.date.toISOString(),
      activity: training.activity,
      duration: Number(training.duration),
      customer: customerUrl,
    };
    saveTraining(newTraining);

    setTraining({ date: dayjs(), activity: "", duration: "" });
    handleClose();
  };

  return (
    <>
      <Button size="small" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Date & Time"
              value={training.date}
              onChange={(newValue) =>
                setTraining({ ...training, date: newValue as Dayjs })
              }
              sx={{ mt: 2, width: "100%" }}
            />
          </LocalizationProvider>
          <TextField
            margin="dense"
            label="Activity"
            fullWidth
            variant="standard"
            value={training.activity}
            onChange={(e) =>
              setTraining({ ...training, activity: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Duration (min)"
            fullWidth
            variant="standard"
            type="number"
            value={training.duration}
            onChange={(e) =>
              setTraining({ ...training, duration: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
