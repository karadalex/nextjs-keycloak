import passport from 'passport'
import nextConnect from 'next-connect'
import { setLoginSession } from '../../lib/auth'
import { oauth2Strategy } from "../../lib/oauth2"

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, (error, token) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })(req, res)
  })

passport.use(oauth2Strategy)

export default nextConnect()
  .use(passport.initialize())
  .get(async (req, res) => {
    try {
      const user = await authenticate('oauth2', req, res)
      // session is the payload to save in the token, it may contain basic info about the user
      const session = { ...user }

      await setLoginSession(res, session)

      res.status(200).send({ done: true, user })
    } catch (error) {
      console.error(error)
      res.status(401).send(error.message)
    }
  })