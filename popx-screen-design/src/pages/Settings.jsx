import { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import PocketView from '../components/PocketView'

export default function Settings() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <PocketView>
        <div className="section">
          <h3 className="settings-title">Account Settings</h3>
          <div className="card profile">
            <div>Loading...</div>
          </div>
        </div>
      </PocketView>
    )
  }

  return (
    <PocketView>
      <div className="section">
        <h3 className="settings-title">Account Settings</h3>
        <div className="card profile">
          <img className="avatar" src="https://i.pravatar.cc/100?img=12" alt="avatar" />
          <div className="profile-texts">
            <div className="name">{user?.displayName || 'User'}</div>
            <div className="email">{user?.email || 'No email'}</div>
          </div>
        </div>
        <p className="lorem">Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam</p>
      </div>
    </PocketView>
  )
}