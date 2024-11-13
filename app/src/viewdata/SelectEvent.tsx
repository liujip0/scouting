import { useState } from "react";
import { Link } from "react-router-dom";
import { trpc } from "../utils/trpc.ts";

type SelectEventProps = {
  eventKey: string | null;
  setEventKey: (value: string) => void;
};
export default function SelectEvent({
  eventKey,
  setEventKey,
}: SelectEventProps) {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const events = trpc.data.getEvents.useQuery();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}>
      <Link to="/">Back to Landing Page</Link>
      <div
        style={{
          height: "5em",
          border: "1px solid red",
        }}>
        Select an Event
      </div>
      <div
        style={{
          flex: "1",
          border: "1px solid purple",
          padding: "1em",
          overflowY: "scroll",
        }}>
        <table
          style={{
            width: "100%",
          }}>
          <thead>
            <tr>
              <th>Event Code</th>
              <th>Event Name</th>
            </tr>
          </thead>
          <tbody>
            {events.data?.map((event) => (
              <tr
                key={event.eventKey}
                onClick={() => {
                  setSelectedEvent(eventKey ? null : event.eventKey);
                }}>
                <td>{event.eventKey}</td>
                <td>{event.eventName}</td>
              </tr>
            )) ?? (
              <tr>
                <td>Error</td>
                <td>{events.error?.message}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div
        style={{
          height: "5em",
          border: "1px solid green",
          display: "flex",
          padding: "1em",
        }}>
        <div>Currently Selected: {selectedEvent}</div>
        <button
          disabled={!selectedEvent}
          onClick={() => {
            setEventKey(selectedEvent!);
          }}>
          Continue
        </button>
      </div>
    </div>
  );
}
