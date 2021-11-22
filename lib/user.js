// Here you should lookup for the user in your DB
export async function findUser({ accessToken }) {
  var headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);

  var requestOptions = {
    method: 'GET',
    headers: headers
  };

  const response = await fetch("http://localhost:8080/auth/realms/nextjs/protocol/openid-connect/userinfo", requestOptions)
  return response.json()
}
