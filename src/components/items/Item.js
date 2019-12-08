import React from 'react';
import { connect } from 'react-redux';
import {switchStatus} from '../../actions/staffActions';
import PropTypes from 'prop-types'
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import AvatarDummy from './Avatar.png';

const theme = createMuiTheme({

  overrides: {
    MuiFormControlLabel: {
      root: {
        display: 'inline'
      }
    },
    MuiTypography:{
      body1: {
        fontFamily: 'Lato',
        fontSize: '30px',
        lineHeight: '36px',
        letterSpacing: '0.75px'
      },
      subtitle1: {
        fontSize: '16px',
        lineHeight: '16px',
        letterSpacing: '0.75px',
        color: '#747474'
      }
    },
    MuiSwitch:{

      root: {
        padding: '12px 13px 12px 13px'
      },
      switchBase: {
        color: '#979797',
        '&$checked': {
          color: '#1EAAFC',
        },
        '&$checked + $track': {
          backgroundColor: '#BCE6FF',
        },
      },
      checked: {},
      track: {
        backgroundColor: '#E0E0E0',
        borderRadius: '5px'

      },
      thumb: {
        width: '18px',
        height: '18px'
      }
    }
  }

});

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexFlow: 'row no-wrap',
    alignItems: 'center',
    backgroundColor: 'white',
    border: "1px solid #1EAAFC",
    borderRadius: '5px',
    boxShadow: 'none',
    maxWidth: '900px',
    height: '300px',
    margin: '22px 0',
    padding: 32
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch'
  },
  content: {
    flex: '1 0 auto',
    padding: 0

  },
  cover: {
    width: 162,
    height: 162,
    marginRight: 80
  },
  textName: {
    color: '#909090',
    marginBottom: '44px'
  },
  textTitle: {
    color: '#747474'
  },

}));

const Item = ({person, switchStatus}) =>  {
  const classes = useStyles();
  //const theme = useTheme();
  const {fullName, title, department, isOnVacation} = person;

  const changeVacationStatus = () =>{
    switchStatus(person.id);
    //changeStatus(person.id)
  }

  const switchLabel = (
    <Typography component='span' variant='subtitle1'>
      On vacation
    </Typography>
  );
  return (
    <Card className={classes.card}>

      <CardMedia
        className={classes.cover}
        component='img'
        src={AvatarDummy}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <ThemeProvider theme = {theme}>
        <CardContent className={classes.content}>
          <Typography component="p" className={classes.textName} >
            {fullName}
          </Typography>
            <Typography component="p" className={classes.textTitle}>
              {title}{','}
            </Typography>
            <Typography component="p" className={classes.textTitle}>
              {department}
            </Typography>
        </CardContent>
        <div className={classes.controls}>
          <FormControlLabel
            control={
              <Switch
                checked={isOnVacation}
                onChange={changeVacationStatus}
                value="OnVacation"
                color= 'default'
                />
            }
          label={switchLabel}
          />
        </div>
      </ThemeProvider>
      </div>

    </Card>
  );
}

Item.propTypes = {
  person: PropTypes.object.isRequired,
  switchStatus: PropTypes.func.isRequired
};

export default connect(null, {switchStatus})(Item);
