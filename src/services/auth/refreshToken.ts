export const refreshTokenRequest = async (
  baseUrl: string,
  refreshToken: string,
): Promise<{ accessToken: string; refreshToken: string } | null> => {
  try {
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation Refresh($refreshToken: String!) {
            refresh(refreshToken: $refreshToken) {
              accessToken
              refreshToken
            }
          }
        `,
        variables: { refreshToken },
      }),
    });

    const json = await res.json();

    return json.data?.refresh ?? null;
  } catch {
    return null;
  }
};
