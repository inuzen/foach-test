import React, {Fragment, useState, useEffect, useRef} from "react";
import { Redirect} from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const theme = createMuiTheme({
  palette: {
  primary: {main:"#1EAAFC"},
},
  overrides: {
    root: {
      fontSize: '14px',
      lineHeight: '17px',
      fontFamily: 'Lato',
    },
   MuiInputLabel: {
     root: {
       color: '#C2C2C2'
     },
   },
   MuiFormControlLabel: {
     label: {
       color: "#161616",
     },
   },
 },
});


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Lato',
    fontSize: '14px',
    lineHeight: '20px',
    backgroundColor: '#FFF',
    padding: '48px',
    maxWidth: '518px',
    height: 'max-content'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
    maxWidth: '470px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    maxWidth: '200px',
    backgroundColor: '#1EAAFC',
    borderRadius: '0px',
    letterSpacing: '3px'
  },
  root: {
    display: 'flex',
    flexFlow: 'flow no-wrap',
    justifyContent: 'center',
    backgroundColor: '#ECF6FE',
    height: '100%',
    maxWidth: '1024px'
  },
  title:{
    '&::before':{
      content: '""',
      position: 'absolute',
      height: '3px',
      transform: 'translateY(-6px)',
      width: '48px',
      backgroundColor: "#3AB047"
    },
    alignSelf: 'flex-start',
    fontFamily: 'Playfair Display',
    fontSize: '25px',
    lineHeight: '33px',
    position: 'relative'
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  customLink: {
    '&:hover':{
      textDecoration:'underline'
    },
    fontWeight: 'bold',
    color: "#1EAAFC",
    textDecoration: 'none'
  }

}));

const hasErrors = (object) => Object.values(object).some(x => x.error === true || x.value ==='')

export default function Register() {
  const classes = useStyles();

  const [labelWidth, setLabelWidth] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const [allFilled, setAllFilled] = useState(false);

  const [values, setValues] = useState({
    firstName: {
      value: '',
      error: false,
      helperText: ''
    },
    lastName: {
      value: '',
      error: false,
      helperText: ''
    },
    phoneNumber: {
      value: '',
      error: false,
      helperText: ''
    },
    investAmnt: {
      value: '',
      error: false,
      helperText: ''
    },
    email: {
      value: '',
      error: false,
      helperText: ''
    },
    emailConfirm: {
      value: '',
      error: false,
      helperText: ''
    },
    password: {
      value: '',
      error: false,
      helperText: ''
    },
    passwordConfirm: {
      value: '',
      error: false,
      helperText: ''
    },
    showPassword: false,
    showConfirmPassword: false,
    allowExtraEmails: false,
    ageConfirm: false,
});

const checkIfFilled = ()=>{
  if (!hasErrors(values) && values.ageConfirm && values.allowExtraEmails) {
    setAllFilled(true);
  } else {
    setAllFilled(false);
  }

}


const handleChange = event => {
  let trg = event.target;
  let helperText = '';
  let error = false;

  switch(trg.name) {
    case 'investAmnt':
      if (trg.value==='') {
        error = true;
        helperText = 'Please select something!';
      }
    break;
    case 'email':
      if (!trg.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        error = true;
        helperText = 'Incorrect email format';
      }
      break;
    case 'emailConfirm':
      if (!trg.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        error = true;
        helperText = 'Incorrect email format';
      } else if(values.email.value!==trg.value){
        error = true;
        helperText = 'Emails do not match';
      }
    break;
    case 'password':
      if (trg.value.length<8) {
        error = true;
        helperText = 'Passwords must be at least 8 symbols';
      }
    break;
    case 'passwordConfirm':
    console.log(values.password.value + "" + trg.value);
      if (trg.value.length<8) {
        error = true;
        helperText = 'Passwords must be at least 8 symbols';
      } else if (values.password.value!==trg.value) {
         error= true;
         helperText= 'Passwords do not match!';
       }
      break;
    default:
      if (trg.value.length<2 || trg.value.length>12) {
        error = true;
        helperText = 'min 2 and max 12 chars';
      }
  }

    if (trg.value.length===0 && trg.name!=='investAmnt') {
      helperText = '';
      error = false;
    }

  setValues({ ...values, [trg.name]: {value: trg.value, error, helperText} });

};

const handleCheckboxChange = name => event => {
  setValues({ ...values, [name]: event.target.checked });

};

const handleClickShowPassword = () => {
  setValues({ ...values, showPassword: !values.showPassword });
};
const handleClickShowConfirmPassword = () => {
  setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
};

const handleMouseDownPassword = event => {
  event.preventDefault();
};

  const inputLabel = useRef(null);

  useEffect(() => {
    checkIfFilled();
    setLabelWidth(inputLabel.current.offsetWidth);

//eslint-disable-next-line
}, [values]);


const onCreateAccount = e => {
  e.preventDefault();
  setRedirect(true);



}
const tosLabel = (
  <span>I certify that I am 18 years of age or older,&nbsp;and I agree to the <a className={classes.customLink} href='#!'>Terms of Service</a> and <a className={classes.customLink} href='#!'>Privacy Policy.</a></span>
);

if (redirect) {
   return <Redirect push to="/items" />;
 }

  return (
    <Fragment>
    <CssBaseline />
    <Container component="main" className={classes.root}>
      <div className={classes.paper}>
        <Typography  component="h1" variant="h5" className={classes.title}>
          Sign up
        </Typography>
        <ThemeProvider theme = {theme}>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                inputProps = {{minLength: 2, maxLength: 12}}
                error = {values.firstName.error}
                helperText = {values.firstName.helperText}
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputProps = {{minLength: 2, maxLength: 12}}
                variant="outlined"
                error = {values.lastName.error}
                helperText = {values.lastName.helperText}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputProps = {{minLength: 2, maxLength: 12}}
                name="phoneNumber"
                variant="outlined"
                error = {values.phoneNumber.error}
                helperText = {values.phoneNumber.helperText}
                required
                fullWidth
                onChange={handleChange}
                id="phoneNumber"
                label="Phone Number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
                error={values.investAmnt.error}
                >
                <InputLabel ref={inputLabel} id="inputLabel">
                          Amount to invest
                </InputLabel>
                <Select
                  labelId="investAmnt-label"
                  id="investAmnt"
                  name="investAmnt"
                  value={values.investAmnt.value}

                  onChange={handleChange}
                  labelWidth={labelWidth}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>{values.investAmnt.helperText}</FormHelperText>
            </FormControl>

            </Grid>
            <Grid item xs={12}>
              <TextField
                inputProps = {{minLength: 6, maxLength: 30}}
                variant="outlined"
                error = {values.email.error}
                helperText = {values.email.helperText}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputProps = {{minLength: 6, maxLength: 30}}
                variant="outlined"
                required
                fullWidth
                error = {values.emailConfirm.error}
                helperText = {values.emailConfirm.helperText}
                id="emailConfirm"
                label="Confirm Email Address"
                name="emailConfirm"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                label="Password"
                error = {values.password.error}
                helperText = {values.password.helperText}
                inputProps = {{minLength: 8}}
                type={values.showPassword ? "text" : "password"}
                required
                fullWidth
                variant="outlined"
                onChange={handleChange}

                InputProps = {{
                  endAdornment:
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}>
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>

                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="passwordConfirm"
                name="passwordConfirm"
                error = {values.passwordConfirm.error}
                helperText = {values.passwordConfirm.helperText}
                label="Confirm Password"
                inputProps = {{minLength: 8}}
                type={values.showConfirmPassword ? "text" : "password"}
                required
                fullWidth
                variant="outlined"
                onChange={handleChange}

                InputProps = {{
                  endAdornment:
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}>
                      {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>

                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="ageConfirm" onChange={handleCheckboxChange("ageConfirm")} color="primary" />}
                label={tosLabel}
              />
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails"  onChange={handleCheckboxChange("allowExtraEmails")} color="primary" />}
                label="I would like to receive important information and periodic news updates."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            disabled={!allFilled}
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {onCreateAccount}
          >
           CREATE ACCOUNT
          </Button>
        </form>
      </ThemeProvider>
      </div>
    </Container>
  </Fragment>
  );
}
