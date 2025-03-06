import { useEffect, useState } from "react";
import axios from "axios";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get("http://localhost:5000/api/events/list");
      setEvents(res.data);
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <img
              src={`http://localhost:5000${event.image}`}
              alt={event.title}
              width="200"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
