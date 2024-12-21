import React, { useState } from 'react';

const SchedulePickupPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [scheduledPickups, setScheduledPickups] = useState([]);

  const handleSchedule = (e) => {
    e.preventDefault();

    const newPickup = {
      id: Date.now(),
      date: selectedDate,
      time: selectedTime,
      notes: notes.trim(),
    };

    setScheduledPickups((prev) => [...prev, newPickup]);

    // Reset the form fields
    setSelectedDate('');
    setSelectedTime('');
    setNotes('');
    alert('Pickup Scheduled!');
  };

  const handleCancelPickup = (id) => {
    const updatedPickups = scheduledPickups.filter((pickup) => pickup.id !== id);
    setScheduledPickups(updatedPickups);
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

      {scheduledPickups.length > 0 && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Your Scheduled Pickups</h3>
          <ul className="space-y-3">
            {scheduledPickups.map((pickup) => (
              <li
                key={pickup.id}
                className="flex justify-between items-center bg-white p-3 rounded"
              >
                <div>
                  <div className="font-medium">
                    {pickup.date} - {pickup.time.charAt(0).toUpperCase() + pickup.time.slice(1)}
                  </div>
                  {pickup.notes && (
                    <div className="text-sm text-gray-600 mt-1">
                      Notes: {pickup.notes}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleCancelPickup(pickup.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded"
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SchedulePickupPage;




