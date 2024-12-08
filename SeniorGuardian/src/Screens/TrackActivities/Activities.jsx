import React, { useState, useEffect } from "react";
import "./Activities.css";
import axios from "axios";

import med from "../../assets/med.jpg";
import calorie from "../../assets/calorie.jpg";
import todo from "../../assets/imp.jpg";
import physical from "../../assets/physical activities.jpg";

const Activities = () => {
  const [activityTypes, setActivityTypes] = useState([
    "Physical Activities",
    "Important Tasks",
    "Medicine",
    "Calorie Counter",
  ]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [activities, setActivities] = useState([]);
  const [activityName, setActivityName] = useState("");
  const [activityTime, setActivityTime] = useState("");
  const [reminder, setReminder] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [editId, setEditId] = useState(null);

  const selectActivityType = (type) => {
    setSelectedActivity(type);
    fetchActivities(type);
  };

  const activityInfo = {
    "Physical Activities": { image: physical },
    "Important Tasks": { image: todo },
    Medicine: { image: med },
    "Calorie Counter": { image: calorie },
  };

  const addOrUpdateActivity = async () => {
    if (!activityName || !activityTime || !selectedActivity) {
      alert("Please enter activity type, name, and time.");
      return;
    }
    
    const activityData = {
      type: selectedActivity,
      name: activityName,
      time: activityTime,
      reminder,
    };
  
    try {
      if (editId) {
        const response = await axios.put(
          `http://localhost:3000/api/activities/${editId}`,
          activityData
        );
        setActivities(
          activities.map((act) => (act._id === editId ? response.data : act))
        );
        setEditId(null); 
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/activities",
          activityData
        );
        setActivities([...activities, response.data]);
      }
      setActivityName("");
      setActivityTime("");
      setReminder(false);
      setSelectedActivity("");
    } catch (error) {
      console.error("Error adding/updating activity:", error);
      alert("Error adding/updating activity. Please try again.");
    }
  };  

  const deleteActivity = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/activities/${id}`);
      const updatedActivities = activities.filter(
        (activity) => activity._id !== id
      );
      setActivities(updatedActivities);
    } catch (error) {
      console.error("Error deleting activity:", error);
      alert("Error deleting activity. Please try again.");
    }
  };

  const editActivity = (activity) => {
    setEditId(activity._id); 
    setActivityName(activity.name);
    setActivityTime(activity.time); 
    setReminder(activity.reminder); 
    setSelectedActivity(activity.type); 
  };
  

  const fetchActivities = async (activityType = "") => {
    try {
      const response = await axios.get("http://localhost:3000/api/activities", {
        params: { type: activityType },
      });
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  const filteractivitities = () => {
    if (!startTime || !endTime) {
      alert("Please select both start and end times.");
      return;
    }

    const filtered = activities.filter((activity) => {
      const activityTime = new Date(`2024-11-29T${activity.time}:00`);
      const start = new Date(`2024-11-29T${startTime}:00`);
      const end = new Date(`2024-11-29T${endTime}:00`);
      return activityTime >= start && activityTime <= end;
    });

    setSearchResults(filtered);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="activity">
      <br />
      <br />
      <h2>Track and Manage Your Activities with Ease</h2>
      <div>
        <h3>Select Activity Type:</h3>
        <div className="activity-types">
          {activityTypes.map((type) => (
            <div
              key={type}
              className={`activity-type ${
                selectedActivity === type ? "selected" : ""
              }`}
              onClick={() => selectActivityType(type)}
            >
              <img className="pic" src={activityInfo[type].image} alt={type} />
            </div>
          ))}
        </div>
      </div>

      <h3>Search Activities by Time Range</h3>
      <div className="time-filter">
  <label htmlFor="start-time">Start Time:</label>
  <input
    type="time"
    id="start-time"
    value={startTime}
    onChange={(e) => setStartTime(e.target.value)}
  />
  
  <label htmlFor="end-time">End Time:</label>
  <input
    type="time"
    id="end-time"
    value={endTime}
    onChange={(e) => setEndTime(e.target.value)}
  />
  
  <button onClick={filteractivitities}>Search</button>
</div>


      {selectedActivity && (
        <div className="activitydesc">
        <div className="inputtext">
          <input
            type="text"
            placeholder="Activity Name"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
          />
          <input
            className="clock"
            type="time"
            value={activityTime}
            onChange={(e) => setActivityTime(e.target.value)}
          />
          <label className="clock-label">⏰ Select Time</label>
        </div>
        <button onClick={addOrUpdateActivity}>Add Activity</button>
      </div>      
      )}

<div className="list">
  {searchResults.length > 0
    ? searchResults.map((activity) => (
        <li key={activity._id}>
          <span>
            {activity.name} at {activity.time}
          </span>
          <div className="button-container">
            <button onClick={() => editActivity(activity)}>Edit</button>
            <button onClick={() => deleteActivity(activity._id)}>Delete</button>
          </div>
        </li>
      ))
    : activities.map((activity) => (
        <li key={activity._id}>
          <span>
            {activity.name} at {activity.time}
          </span>
          <div className="button-container">
            <button onClick={() => editActivity(activity)}>Edit</button>
            <button onClick={() => deleteActivity(activity._id)}>Delete</button>
          </div>
        </li>
      ))}
</div>

    </div>
  );
};

export default Activities;
