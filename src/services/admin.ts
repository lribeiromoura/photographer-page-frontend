export const login = async (username: string, password: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    }
  );
  const data = await response.json();
  return data.access_token;
};
