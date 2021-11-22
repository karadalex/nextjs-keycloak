import { useUser } from '../lib/hooks'
import Layout from '../components/layout'


const Profile = () => {
  const user = useUser({ redirectTo: '/api/login' })

  return (
    <Layout>
      <h1>Profile</h1>
      {user && (
        <>
          <p>Your session:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}

      <style jsx>{`
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>

      <h2>Keycloak account</h2>
      <a href="http://localhost:8080/auth/realms/nextjs/account/#/">Manage account</a>
    </Layout>
  )
}

export default Profile
