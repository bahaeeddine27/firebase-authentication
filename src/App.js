import { useState, useEffect } from "react";
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);
  const [registrationEmail, setRegistrationEmail] = useState('');
  const [registrationPassword, setRegistrationPassword] = useState('');
  const [registrationError, setRegistrationError] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  async function register() {
    setRegistrationError(null);
    try {
      await createUserWithEmailAndPassword(auth, registrationEmail, registrationPassword);
    } catch (e) {
      setRegistrationError(e);
    }
  }

  async function login() {
    try {
      setLoginError(null);
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (e) {
      setLoginError(e);
    }
  }

  async function logout() {
    await signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="container mt-5">
      {!!user && (
        <div className="text-center">
          <p>Logged in as: {user.email}</p>
          <button className="btn btn-danger" onClick={logout}>Logout</button>
        </div>
      )}
      {!user && (
        <div>
          <h3 className="mb-3">Register</h3>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Email" value={registrationEmail} onChange={e => setRegistrationEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Password" value={registrationPassword} onChange={e => setRegistrationPassword(e.target.value)} />
          </div>
          <button className="btn btn-primary" onClick={register}>Register</button>
          <div className="text-danger">{registrationError?.message}</div>

          <h3 className="mt-4 mb-3">Login</h3>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
          </div>
          <button className="btn btn-success" onClick={login}>Login</button>
          <div className="text-danger">{loginError?.message}</div>
        </div>
      )}
    </div>
  );
}

export default App;