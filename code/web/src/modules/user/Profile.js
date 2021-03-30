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
import { APP_URL } from '../../setup/config/env'
import userRoutes from '../../setup/routes/user'
import { logout } from './api/actions'

// Component
const Profile = (props) => {
  return (
  <div>
    {/* SEO */}
    <Helmet>
      <title>My Profile - Crate</title>
    </Helmet>

    {/* Top title bar */}
    <Grid style={{ backgroundColor: grey }}>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H3 font="secondary">My profile</H3>
      </GridCell>
    </Grid>
    <Grid style={{justifyContent: 'center'}}>

      <Link to={userRoutes.subscriptions.path}>
        <Button theme="primary">Subscriptions</Button>
      </Link>

      <Button theme="secondary" onClick={props.logout} style={{ marginLeft: '1em' }}>Logout</Button>
    </Grid>
    <Grid>
      <GridCell style={{ padding: '2em', display: 'flex', flexDirection: 'column'}}>
        <div className='profile-pic-container' style={{display: 'flex', flexDirection: 'column', border: 'solid 1px black', height: '10em', width: '10em', marginBottom: '3em'}}>
          <img className='edit-image' src={`${ APP_URL }/images/edit.png`} style={{width: '1.5em', alignSelf: 'flex-end'}}/>
          <img className='profile-pic' src='' alt='Your profile picture'/>
        </div>
        <img className='edit-image' src={`${ APP_URL }/images/edit.png`} style={{width: '1.5em', alignSelf: 'flex-end'}}/>
        <H4 style={{ marginBottom: '0.5em' }}>{props.user.details.name}</H4>
        <div className='info-container'>
          <p style={{ color: grey2, marginBottom: '2em' }}>{props.user.details.description} This is where the description will be</p>
          <p style={{ color: grey2, marginBottom: '2em' }}>{props.user.details.email}</p>
          <p style={{ color: grey2, marginBottom: '2em' }}>{props.user.details.shippingAddress} The shipping address will be here</p>
        </div>
      </GridCell>
      <GridCell style={{ padding: '2em', border: 'solid 1px black', marginTop: '2em', marginBottom: '1.5em'}}>
        <H4 style={{ marginBottom: '0.5em', textAlign: 'center' }}>Items Kept</H4>
      </GridCell>
      <GridCell style={{ padding: '2em'}}>
        <div className='next-delivery-container' style={{border: 'solid 1px black', height: '10em', width: '15em', marginBottom: '1.5em'}}>
          <p className='next-delivery' style={{ marginBottom: '2em' }}>Next Delivery</p>
        </div>
        <div className='products-received-container' style={{border: 'solid 1px black', height: '20em', width: '15em', marginBottom: '3em'}}>
          <p className='products-received' style={{ marginBottom: '2em' }}>Product History</p>
        </div>
      </GridCell>
    </Grid>
  </div>
)
}

// Component Properties
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

// Component State
function profileState(state) {
  return {
    user: state.user
  }
}

export default connect(profileState, { logout })(Profile)
