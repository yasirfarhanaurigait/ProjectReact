import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,updateProfile } from 'firebase/auth';
import Cookies from 'js-cookie';
import { auth } from '../../firebase';
import { getDatabase, ref, set,get } from "firebase/database";

const database = getDatabase();
export const login = (email, password) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await user.reload();
    Cookies.set('userToken', user.accessToken, { expires: 1 });
    const userRef = ref(database, 'users/' + user.uid);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      console.log("User data fetched from database:", userData);

     
      localStorage.setItem('name', userData.username);
      localStorage.setItem('email', userData.email);

    

    } else {
      console.log("No user data found!");
    }
    

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.message,
    });
  }
};

export const signup = (email,password,name) => async (dispatch) => {
  try {
    console.log("emailPass",email,password)
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
     
      const user = userCredential.user;
      Cookies.set('userToken', user.accessToken, { expires: 1 });
       user.reload();
       set(ref(database, 'users/' + user.uid), {
        username: name,
        email: user.email,
      });
      localStorage.setItem('name', name);
      localStorage.setItem('email', user.email);

      dispatch({
        type: 'SIGNUP_SUCCESS',
        payload: user,
      });
    })
    .catch((error) => {
      console.error("Error during signup:", error.message);
    });
    
  } catch (error) {
    dispatch({
      type: 'SIGNUP_FAILURE',
      payload: error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await signOut(auth);

    Cookies.remove('userToken');

    dispatch({
      type: 'LOGOUT_SUCCESS',
    });
  } catch (error) {
    dispatch({
      type: 'LOGOUT_FAILURE',
      payload: error.message,
    });
  }
};
export const setAuthenticated = ({ name, email,isAuthenticated }) => ({
  type: "SET_AUTHENTICATED",
  payload: { name, email,isAuthenticated },
});

export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};