type Event = {
  id?: string;
  title: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
  created_by: string;
};

// export default async function ad(
//   uuid: string | null
// ): Promise<User | null> {
//   if (!uuid) return null;

//   let response = await fetch("/api/get-profile", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ user_id: uuid }),
//   });

//   if (response.ok) {
//     let { data, error } = await response.json();
//     if (error) {
//       console.error(error);
//       return null;
//     }
//     return data;
//   } else {
//     console.error(response.statusText);
//     return null;
//   }
// }

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
