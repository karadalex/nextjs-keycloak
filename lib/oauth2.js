import OAuth2Strategy from "passport-oauth2"

const CLIENT_ID = process.env.NEXT_OAUTH2_CLIENT_ID || "nextjs"
const CLIENT_SECRET = process.env.NEXT_OAUTH2_CLIENT_SECRET || ""

export const oauth2Strategy = new OAuth2Strategy({
  authorizationURL: 'http://localhost:8080/auth/realms/nextjs/protocol/openid-connect/auth',
  tokenURL: 'http://localhost:8080/auth/realms/nextjs/protocol/openid-connect/token',
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: "http://localhost:3000/api/oauth2-callback"
},
function(accessToken, refreshToken, profile, cb) {
  console.log("accessToken", accessToken)
  console.log("refreshToken", refreshToken)
  return cb(null, { accessToken, refreshToken })
}
)