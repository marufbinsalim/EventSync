type Event = {
  id?: string;
  title: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
  created_by: string;
};

export default async function addEvent(event: Event): Promise<Event | null> {
  let response = await fetch("/api/add-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });

  if (response.ok) {
    let { error } = await response.json();

    if (error) {
      console.error(error);
      return null;
    }
    return event;
  } else {
    console.error(response.statusText);
    return null;
  }
}
