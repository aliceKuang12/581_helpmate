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

  async function login(email, password) {
    localStorage.setItem("email", email);

    try {
      const res = await axios({
        url: 'http://localhost:3003/login',
        method: 'POST',
        headers: AXIOS_HEADER,
        data: {
          email: email,
          password: password
        },
      })
      if (res.status === 200) {
        setCurrentUser(res.data);
        localStorage.setItem("name", res.data.fname);
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("user", JSON.stringify(res.data));
        setIsAuthenticated(true);
        setLoading(false);
        return true;
      }
    } catch(e) {
      alert(e.response.data.message);
      return false;
    }
  }

  function logout() {
    localStorage.clear()
    // if(hasLogin) signOutWithGoogle()
    return auth.signOut()
  }

  function resetPassword(email, password) {
    return axios({
      url: 'http://localhost:3003/user',
      method: 'PUT',
      headers: AXIOS_HEADER,
      data: {
        email: email,
        password: password
      }
    })
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
      setLoading(false);
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
