import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../components/Copyright";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { signupUser, signupProps } from "../redux/actions/userActions";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import { LinearProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type SignupProps = {
  user: any;
  UI: any;
  signupUser: any;
};
type ErrorSignup = {
  message: string;
  field?: string;
};
const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "password too short, minimum 8 character"),
  firstName: Yup.string().min(2, "password too short, minimum 2 character"),
  lastName: Yup.string().min(2, "password too short, minimum 2 character"),
});

const SignUp = ({ user, UI, signupUser }: SignupProps) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
            firstName: "",
            lastName: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={async (values: signupProps) => {
            const { email, password, firstName, lastName } = values;
            try {
              const userData: signupProps = {
                email,
                password,
                firstName,
                lastName,
              };
              signupUser(userData, () => {
                history.push("/");
              });
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  {UI.errors &&
                    UI.errors.map((err: ErrorSignup) => {
                      return <Alert severity="error">{err.message}</Alert>;
                    })}
                  {UI.loading && <LinearProgress />}

                  <Field
                    component={TextField}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="fname"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="LastName"
                    name="lastName"
                    autoComplete="lname"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
  UI: state.UI,
});
const mapActionsToProps = {
  signupUser,
};

export default connect(mapStateToProps, mapActionsToProps)(SignUp);
