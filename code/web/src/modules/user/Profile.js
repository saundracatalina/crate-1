// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3, H4 } from '../../ui/typography'
import Button from '../../ui/button'
import { grey, grey2 } from '../../ui/common/colors'

// App Imports
import userRoutes from '../../setup/routes/user'
import { logout } from './api/actions'

// Component
// This is the file where we will be doing the bulk of our work.
const Profile = (props) => (
  <div>
    {/* SEO */}
    <Helmet>
      <title>My Profile - Crate</title>
    </Helmet>
    {/* Helmet is a react npm package that takes a resuable component and manage all changes to the document head. It takes plain HTML tags and output plain HTML tags - here it's output will be a head tage */}

    {/* Top title bar */}
    <Grid style={{ backgroundColor: grey }}>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H3 font="secondary">My profile</H3>
      </GridCell>
    </Grid>

    {/* Grid & GridCell is being imported from the ui directory whichs styles the page as each subsciption is added a new card appears next to it */}

    <Grid>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H4 style={{ marginBottom: '0.5em' }}>{props.user.details.name}</H4>

        <p style={{ color: grey2, marginBottom: '2em' }}>{props.user.details.email}</p>

        <Link to={userRoutes.subscriptions.path}>
          <Button theme="primary">Subscriptions</Button>
        </Link>
        {/* This button once a user clicks on will re route to the subscription page */}

        <Button theme="secondary" onClick={props.logout} style={{ marginLeft: '1em' }}>Logout</Button>
        {/* This button upon click logs the user out */}
      </GridCell>
      {/* Possible add another gridcell here for a profile picture section,  email & shipping address section, current delivery, past crate products and products kept*/}
    </Grid>
  </div>
)

// Component Properties
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}
// Here we are typechecking to make sure that we have everything we need on the page before moving on

// Component State
function profileState(state) {
  return {
    user: state.user
  }
}
// This is our component which will always return a specific user

export default connect(profileState, { logout })(Profile)
// We are connecting our componenet to the store taking in a mapsStateToProps and matchDispatchToProps
