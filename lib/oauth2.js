import OAuth2Strategy from "passport-oauth2"

const CLIENT_ID = process.env.NEXT_OAUTH2_CLIENT_ID || "nextjs"
const CLIENT_SECRET = process.env.NEXT_OAUTH2_CLIENT_SECRET || ""
const OAUTH_REALM_URL = process.env.OAUTH_REALM_URL || "http://localhost:8080/auth/realms/nextjs"
const OAUTH_REDIRECT_URL = process.env.OAUTH_REDIRECT_URL || "http://localhost:3000/api/oauth2-callback"

export const oauth2Strategy = new OAuth2Strategy({
  authorizationURL: `${OAUTH_REALM_URL}/protocol/openid-connect/auth`,
  tokenURL: `${OAUTH_REALM_URL}/protocol/openid-connect/token`,
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: OAUTH_REDIRECT_URL
},
function(accessToken, refreshToken, profile, cb) {
  var headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);

  var requestOptions = {
    method: 'GET',
    headers: headers
  };

  fetch(`${OAUTH_REALM_URL}/protocol/openid-connect/userinfo`, requestOptions)
    .then(response => response.json())
    .then(user => cb(null, { user, accessToken, refreshToken }))
    .catch(error => cb(error));
})