type User = {
  created_at: string;
  email: string;
  id: string;
  profile_picture_url: string | null;
  username: string;
};

export default async function getProfile(
  uuid: string | null
): Promise<User | null> {
  if (!uuid) return null;

  let response = await fetch("/api/get-profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: uuid }),
  });

  if (response.ok) {
    let { data, error } = await response.json();
    if (error) {
      console.error(error);
      return null;
    }
    return data;
  } else {
    console.error(response.statusText);
    return null;
  }
}
