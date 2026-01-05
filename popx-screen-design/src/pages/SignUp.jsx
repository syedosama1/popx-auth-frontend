import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase'
import PocketView from '../components/PocketView'

export default function SignUp() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '', company: '', agency: 'yes' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    // Basic validation
    if (!form.email || !form.password || !form.name || !form.phone) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }
    
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password)
      if (form.name) await updateProfile(cred.user, { displayName: form.name })
      navigate('/settings')
    } catch (err) {
      console.error('Firebase Auth Error:', err)
      
      // Provide more user-friendly error messages
      let errorMessage = err.message
      if (err.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection and try again.'
      } else if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please use a different email or try logging in.'
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters long.'
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.'
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  function bind(name) {
    return { value: form[name], onChange: (e) => setForm({ ...form, [name]: e.target.value }) }
  }

  return (
    <PocketView>
      <form className="section" onSubmit={onSubmit}>
        <h2 className="form-title">Create your{`\n`}PopX account</h2>
        <label className="field"><span className="label">Full Name*</span><input placeholder="Enter Full Name" {...bind('name')} /></label>
        <label className="field"><span className="label">Phone number*</span><input placeholder="Enter Phone number" {...bind('phone')} /></label>
        <label className="field"><span className="label">Email address*</span><input type="email" placeholder="Enter email address" {...bind('email')} /></label>
        <label className="field"><span className="label">Password *</span><input type="password" placeholder="Enter Password" {...bind('password')} /></label>
        <label className="field"><span className="label">Company name</span><input placeholder="Company" {...bind('company')} /></label>
        <div className="radio-group">
          <span className="label">Are you an Agency?*</span>
          <div className="radios">
            <label className="radio"><input type="radio" name="agency" value="yes" checked={form.agency==='yes'} onChange={(e)=>setForm({...form, agency:e.target.value})} /><span>Yes</span></label>
            <label className="radio"><input type="radio" name="agency" value="no" checked={form.agency==='no'} onChange={(e)=>setForm({...form, agency:e.target.value})} /><span>No</span></label>
          </div>
        </div>
        {error && <div className="subtitle" style={{color:'#d33'}}>{error}</div>}
        <button className="btn primary" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
      </form>
    </PocketView>
  )
}