export const login = async (username: string, password: string) => {
  const response = await fetch(`/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  return data.access_token;
};
