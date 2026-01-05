import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import PocketView from '../components/PocketView'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/settings')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const canSubmit = email && password

  return (
    <PocketView>
      <form className="section" onSubmit={onSubmit}>
        <h2 className="form-title">Signin to your{`\n`}PopX account</h2>
        <p className="subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
        <label className="field">
          <span className="label">Email Address</span>
          <input type="email" placeholder="Enter email address" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </label>
        <label className="field">
          <span className="label">Password</span>
          <input type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </label>
        {error && <div className="subtitle" style={{color:'#d33'}}>{error}</div>}
        <button className={`btn ${canSubmit? 'primary':'disabled'}`} disabled={!canSubmit || loading}>{loading? 'Logging in...' : 'Login'}</button>
      </form>
    </PocketView>
  )
}