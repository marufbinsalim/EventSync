import { render, screen } from "@testing-library/react";
import EventCard from "@/components/Events/EventCard";

describe("EventCard", () => {
  it("If the user is attending the event, the attendance status should be 'You are attending this event'", () => {
    render(
      <EventCard
        user_id="1"
        event={{
          title: "Event Title",
          location: "Event Location",
          startDate: "2022-01-01T00:00:00Z",
        }}
        isAttending={false}
        toggleAttendance={() => {}}
        togglingAttendance={null}
        setView={() => {}}
        setSelectedEvent={() => {}}
      />
    );
    const element = screen.getByTestId("attendance-status");
    // the text content should be "You are not attending this event"
    expect(element.textContent).toBe("You are not attending this event");
  });

  it("If the user is not attending the event, the attendance status should be 'You are not attending this event'", () => {
    render(
      <EventCard
        user_id="1"
        event={{
          title: "Event Title",
          location: "Event Location",
          startDate: "2022-01-01T00:00:00Z",
        }}
        isAttending={true}
        toggleAttendance={() => {}}
        togglingAttendance={null}
        setView={() => {}}
        setSelectedEvent={() => {}}
      />
    );
    const element = screen.getByTestId("attendance-status");
    // the text content should be "You are attending this event"
    expect(element.textContent).toBe("You are attending this event");
  });
});
