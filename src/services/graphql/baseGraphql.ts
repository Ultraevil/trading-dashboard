export const graphqlBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({ body }: { body: string }) => {
    const token = localStorage.getItem('token');
    const result = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
      body,
    });

    const data = await result.json();

    return { data };
  };
