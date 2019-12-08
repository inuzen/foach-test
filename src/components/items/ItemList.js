import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import Item from './Item'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import {connect} from 'react-redux';
import {getPeople} from '../../actions/staffActions';


const ItemList = ({ getPeople, staff: {people} }) => {

  useEffect(() => {
    getPeople();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <CssBaseline />
      <Container style = {{maxWidth: '1024px'}}>
        {people && people.map(person => (<Item key={person.id} person={person}/>))}
      </Container>
    </Fragment>
  );}

ItemList.propTypes = {
    staff: PropTypes.object.isRequired,
    getPeople: PropTypes.func.isRequired
  };

  const mapStateToProps = state => ({staff: state.staff});

  export default connect(mapStateToProps, {getPeople})(ItemList);
