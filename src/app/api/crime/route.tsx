export async function GET(request: Request) {
  // Fetch API URL from environment variables
  const apiURL = process.env.API_URL;
  // Ensure that the API URL is present
  if (!apiURL) return new Response('API URL not found', { status: 500 });

  // Fetch crime data from the API
  const data = await getData(apiURL);

  return Response.json( data, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}

// Fetcher Function
async function getData(apiURL: string) {

  const res = await fetch(apiURL)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
