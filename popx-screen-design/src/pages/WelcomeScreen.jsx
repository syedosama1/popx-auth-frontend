import { Link } from 'react-router-dom'
import PocketView from '../components/PocketView'
export default function Welcome() {
  return (
    <PocketView>
      <div className="section welcome">
        <div>
        </div>
        <div style={{ paddingBottom: '30px' }}>
          <h1 className="title">Welcome to PopX</h1>
          <p className="subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
          <Link className="btn primary" to="/signup">Create Account</Link>
          <Link className="btn ghost" to="/login">Already Registered? Login</Link>
        </div>
      </div>
    </PocketView>
  )
}