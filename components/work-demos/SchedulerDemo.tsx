"use client";

import { useState } from "react";
import { DemoHeading, DemoStatus } from "./Shared";

const slots = ["09:00", "10:00", "11:00"];
const rooms = [
  { name: "Birch", seats: 6, busy: "10:00" },
  { name: "Cedar", seats: 4, busy: "09:00" },
];

export default function SchedulerDemo() {
  const [time, setTime] = useState("10:00");
  const [room, setRoom] = useState("Birch");
  const [prepared, setPrepared] = useState(false);
  const selected = rooms.find((candidate) => candidate.name === room)!;
  const available = selected.busy !== time;
  return (
    <div className="demo-split">
      <div className="demo-main">
        <DemoHeading
          title="Find a room that is actually free"
          detail="Project check-in · Monday, sample day · 30 minutes"
        />
        <fieldset className="demo-options">
          <legend>Start time</legend>
          {slots.map((slot) => (
            <label key={slot} data-selected={time === slot}>
              <input
                type="radio"
                name="meeting-time"
                value={slot}
                checked={time === slot}
                onChange={() => {
                  setTime(slot);
                  setPrepared(false);
                }}
              />
              {slot}
            </label>
          ))}
        </fieldset>
        <table className="demo-room-table">
          <caption className="sr-only">
            Sample room availability by start time
          </caption>
          <thead>
            <tr>
              <th scope="col">Room</th>
              {slots.map((slot) => (
                <th scope="col" key={slot}>
                  {slot}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rooms.map((candidate) => (
              <tr key={candidate.name}>
                <th scope="row">
                  {candidate.name}
                  <small>{candidate.seats} seats</small>
                </th>
                {slots.map((slot) => (
                  <td key={slot} data-busy={candidate.busy === slot}>
                    {candidate.busy === slot ? "Busy" : "Free"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <fieldset className="demo-options">
          <legend>Choose a room</legend>
          {rooms.map((candidate) => (
            <label key={candidate.name} data-selected={room === candidate.name}>
              <input
                type="radio"
                name="meeting-room"
                value={candidate.name}
                checked={room === candidate.name}
                onChange={() => {
                  setRoom(candidate.name);
                  setPrepared(false);
                }}
              />
              {candidate.name}
            </label>
          ))}
        </fieldset>
      </div>
      <div className="demo-aside">
        <h4>Meeting preview</h4>
        <dl className="demo-facts">
          <div>
            <dt>Time</dt>
            <dd>{time} · 30 minutes</dd>
          </div>
          <div>
            <dt>Room</dt>
            <dd>{room}</dd>
          </div>
          <div>
            <dt>Attendees</dt>
            <dd>Alex, Jamie, Morgan</dd>
          </div>
        </dl>
        <DemoStatus tone={available ? "success" : "warning"}>
          {prepared
            ? `Sample event prepared for ${time} in ${room}. No calendar invitation was sent.`
            : available
              ? `${room} is free for this example. You can prepare the sample event.`
              : `${room} is occupied at ${time}. Choose another room or start time.`}
        </DemoStatus>
        <button
          className="demo-button"
          disabled={!available || prepared}
          onClick={() => setPrepared(true)}
        >
          Prepare sample event
        </button>
        <p className="demo-caption">
          Availability is fictional and changes only within this demo.
        </p>
      </div>
    </div>
  );
}
