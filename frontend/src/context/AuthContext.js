import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import axios from 'axios'
import { AXIOS_HEADER } from '../constants';

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'))
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  async function signup(email, password) {
    const res = await auth.createUserWithEmailAndPassword(email, password)
    var credential = res.user._delegate.uid;
    return credential
  }

  function login(email, password) {
    localStorage.setItem("email", email);

    return axios({
      url: 'http://localhost:3003/login',
      method: 'POST',
      headers: AXIOS_HEADER,
      params: {
        email: email,
        password: password
      },
    }).then((res) => {
      if (res.status === 200) {
          alert("Successfully logged in!");
          setCurrentUser(res.data);
          localStorage.setItem("name", res.data.fname);
          localStorage.setItem("user", JSON.stringify(res.data));
          setIsAuthenticated(true);
          setLoading(false);
      } else {
          throw res;
      }
    }).catch((err) => {
      alert(err.message);
    })
  }

  function logout() {
    alert("Bye....");
    localStorage.clear()
    // if(hasLogin) signOutWithGoogle()
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  //   function updateEmail(email) {
  //     return currentUser.updateEmail(email)
  //   }

  //   function updatePassword(password) {
  //     return currentUser.updatePassword(password)
  //   }

  function deleteUser(uid) {
    console.log(uid);
    auth.deleteUser(uid);
  }

  useEffect(() => {
    const unsubscribe = async  () => {
      const user = localStorage.getItem('user');
      setCurrentUser(user);
      setLoading(false)
    }
    unsubscribe();
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    // updateEmail,
    // updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthContext;

// Setup google login tutorial: https://www.youtube.com/watch?v=vDT7EnUpEoo
const provider = new GoogleAuthProvider()
// provider.addScope('https://www.googleapis.com/auth/fitness.activity.read')
// provider.addScope('https://www.googleapis.com/auth/fitness.heart_rate.read')
// provider.addScope('https://www.googleapis.com/auth/fitness.sleep.read')
// provider.addScope('https://www.googleapis.com/auth/fitness.blood_pressure.read')
export const signInWithGoogle = () => {
  //const [user, setUser] = useState({hasLogin:false, accessToken: ''})  
  signInWithPopup(auth, provider)
    .then((result) => {

      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user
      const name = result.user.displayName
      const email = result.user.email
      const profilePic = result.user.photoURL

      localStorage.setItem("token", token)
      localStorage.setItem("user", user)
      localStorage.setItem("name", name)
      localStorage.setItem("email", email)
      localStorage.setItem("profilePic", profilePic)

      // Authorization: `Bearer ${accessToken}`
      // axios.post('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate?alt=json', data, axiosconfig)

      window.location = "/home"
    })
    .catch((error) => {
      console.log(error)
    })
}
