import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EventForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    if (image) formData.append("image", image);

    await axios.post("http://localhost:5000/api/events/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    navigate("/");
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;
