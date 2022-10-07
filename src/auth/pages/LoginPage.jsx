import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Grid,
  Link,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  startGoogleSignIn,
  startSignInWithEmailAndPassword,
} from "../../store/auth";
import { useMemo } from "react";

export const LoginPage = () => {
  const { email, password, onInputChange, formState } = useForm({
    email: "",
    password: "123456",
  });
  const { status, errorMessage } = useSelector((state) => state.auth);

  const isAutenticating = useMemo(() => status === "checking", [status]);
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password });
    dispatch(startSignInWithEmailAndPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    console.log("On google sign in ");
    dispatch(startGoogleSignIn());
  };

  const isCheckingAuthentication = useMemo(
    () => status == "checking",
    [status]
  );

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              disabled={isAutenticating}
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              disabled={isAutenticating}
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                disabled={isCheckingAuthentication}
                type="submit"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button onClick={onGoogleSignIn} variant="contained" fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
