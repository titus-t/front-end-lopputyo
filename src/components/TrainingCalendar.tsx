import { useState, useEffect } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = dayjsLocalizer(dayjs);

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

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
};

export default function TrainingCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<any>("week");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/gettrainings`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching trainings");
        }
        return response.json();
      })
      .then((data: Training[]) => {
        const calendarEvents = data.map((training) => {
          const startDate = dayjs(training.date).toDate();
          const endDate = dayjs(training.date)
            .add(training.duration, "minute")
            .toDate();
          const customerName = training.customer
            ? `${training.customer.firstname} ${training.customer.lastname}`
            : "";

          return {
            title: `${training.activity} / ${customerName}`,
            start: startDate,
            end: endDate,
          };
        });
        setEvents(calendarEvents);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ height: "80vh", margin: "20px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        view={currentView}
        onView={(newView) => setCurrentView(newView)}
        date={currentDate}
        onNavigate={(newDate) => setCurrentDate(newDate)}
      />
    </div>
  );
}
