import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import axios from 'axios'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  async function signup(email, password) {
    const res = await auth.createUserWithEmailAndPassword(email, password)
    var credential = res.user._delegate.uid;
    return credential
  }

  function login(email, password) {
    localStorage.setItem("email", email);

    localStorage.setItem("name", email);

    return auth.signInWithEmailAndPassword(email, password)

  }

  function logout() {
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
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
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


      // The signed-in user info.
      const user = result.user
      const name = result.user.displayName
      const email = result.user.email
      const profilePic = result.user.photoURL


      localStorage.setItem("user", user)
      localStorage.setItem("name", name)
      localStorage.setItem("email", email)
      localStorage.setItem("profilePic", profilePic)

      // Authorization: `Bearer ${accessToken}`
      // axios.post('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate?alt=json', data, axiosconfig)

      window.location = "/home"

      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = result.credential.accessToken

      localStorage.setItem("token", token)
    })
    .catch((error) => {
      console.log(error)
    })
}
