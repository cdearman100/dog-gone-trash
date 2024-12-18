import React, { useState} from 'react';

// Schedule Pickup Page Component
const SchedulePickupPage = () => {
    
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [notes, setNotes] = useState('');
  
    const handleSchedule = (e) => {
      e.preventDefault();
      // In a real app, this would trigger an API call to schedule
      alert('Pickup Scheduled!');
    };
  
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold">Schedule Pickup</h2>
        <form onSubmit={handleSchedule} className="mt-4 space-y-4">
          <div>
            <label className="block mb-2">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Select Time</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Pickup Time</option>
              <option value="morning">Morning (8am-12pm)</option>
              <option value="afternoon">Afternoon (12pm-4pm)</option>
              <option value="evening">Evening (4pm-8pm)</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Additional Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Any special instructions?"
              rows="3"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded"
          >
            Schedule Pickup
          </button>
        </form>
      </div>
    );
  };


  export default SchedulePickupPage;