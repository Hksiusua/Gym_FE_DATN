import React, { useState } from 'react';
import { Calendar } from 'antd';

const Histories = (props) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({}); 
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const onSelect = (date) => {
    setSelectedDate(date);
    const selectedEvents = events[date.format('YYYY-MM-DD')] || [];
    console.log('Events on selected date:', selectedEvents);
  };

  return (
    <div className="histories">
      <Calendar 
        onPanelChange={onPanelChange}
        onSelect={onSelect} 
      />
      {selectedDate && (
        <div className="event-details">
          <h2>Sự kiện cho ngày: {selectedDate.format('YYYY-MM-DD')}</h2>
          <ul>
            {events[selectedDate.format('YYYY-MM-DD')] 
              ? events[selectedDate.format('YYYY-MM-DD')].map((event, index) => (
                  <li key={index}>{event}</li>
                ))
              : <li>Không có sự kiện nào.</li>
            }
          </ul>
        </div>
      )}
    </div>
  );
};

export default Histories;
