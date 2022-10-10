import { checkingCredentials, login, logout } from "./authSlice";
import {
  registerUserWithEmailAndPassword,
  signInWithGoogle,
  signInUserWithEmailAndPassword,
  logoutFirebase,
} from "../../firebase/providers";
import { async } from "@firebase/util";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();

    if (!result.ok) {
      return dispatch(logout(result.errorMessage));
    }

    dispatch(login(result));

    console.log(result);
  };
};

export const startCreatingUserWithEmailAndPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailAndPassword({ email, password, displayName });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, photoURL, email }));
  };
};

export const startSignInWithEmailAndPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage, displayName } =
      await signInUserWithEmailAndPassword({ email, password });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, photoURL, email }));
  };
};

export const startLogOut =  () => {
  return async (dispatch) => {
    await logoutFirebase();


          
    dispatch(logout({errorMessage: null}))
  };
};
 