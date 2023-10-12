export async function GET(request: Request) {
  const apiURL = process.env.API_URL;
  if (!apiURL) return new Response('API URL not found', { status: 500 });

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


async function getData(apiURL: string) {

  const res = await fetch(apiURL)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
