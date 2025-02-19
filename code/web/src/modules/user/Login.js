// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import Button from '../../ui/button'
import ImageTile from '../../ui/image/Tile'
import Input from '../../ui/input/Input'
import H3 from '../../ui/typography/H3'
import Icon from '../../ui/icon'
import { level1 } from '../../ui/common/shadows'
import { white } from '../../ui/common/colors'

// App Imports
import { APP_URL } from '../../setup/config/env'
import userRoutes from '../../setup/routes/user'
import { messageShow, messageHide } from '../common/api/actions'
import { login } from './api/actions'
import AuthCheck from '../auth/AuthCheck'

// Component
class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      user: {
        email: '',
        password: '',
      }
    }

    // Function bindings
  }

// This method is for whenever someone types into the form on the login page. It's invokded in both
// the username input and password input which controls the local state of this component.
  onChange = (event) => {
    let user = this.state.user
    user[event.target.name] = event.target.value

    this.setState({
      user
    })
  }

// This method is what handles the event of someone submitting the form. This invoked whenever a user
// clicks enter or the 'Login' button.
  onSubmit = (event) => {
    event.preventDefault()

    this.props.messageShow('Logging in, please wait...')

// This login method here is one of our actions from in ./api/actions.js. This action is where
// our axios fetch request lives to grab a specific users data from the api based on the login credentials
// which then updates our user property of our applications state.
    this.props.login(this.state.user)
      .then(response => {
// A conditional checking for an error message
        if (this.props.user.error && this.props.user.error.length > 0) {
          this.props.messageShow(this.props.user.error)

          window.setTimeout(() => {
            this.props.messageHide()
          }, 5000)
        } else {
          this.props.messageHide()
        }
      })
      .catch(error => {
        this.props.messageShow(this.props.user.error)

        window.setTimeout(() => {
          this.props.messageHide()
        }, 5000)
      })
  }

  render() {
    const { isLoading, error } = this.props.user

    return (
// Lines 85 - 113 are UI components which strictly deal with styling and responsiveness for the site.
      <Grid gutter={true} alignCenter={true} style={{ padding: '2em' }}>
        {/* SEO */}
        <Helmet>
          <title>Login to your account - Crate</title>
        </Helmet>

        {/* Left Content - Image Collage */}
        <GridCell>
          <Grid gutter={true} alignCenter={true}>
            <GridCell justifyCenter={true}>
              <ImageTile width={300} height={530} shadow={level1} image={`${ APP_URL }/images/stock/women/1.jpg`}/>
            </GridCell>

            <GridCell>
              <Grid>
                <GridCell justifyCenter={true}>
                  <ImageTile width={170} height={250} shadow={level1} image={`${ APP_URL }/images/stock/men/2.jpg`}/>
                </GridCell>
              </Grid>

              <Grid>
                <GridCell justifyCenter={true}>
                  <ImageTile width={170} height={250} shadow={level1} image={`${ APP_URL }/images/stock/men/3.jpg`}
                             style={{ marginTop: '1.9em' }}/>
                </GridCell>
              </Grid>
            </GridCell>
          </Grid>
        </GridCell>

        {/* Right Content */}
        <GridCell style={{ textAlign: 'center' }}>
          <H3 font="secondary" style={{ marginBottom: '1em' }}>Login to your account</H3>

          {/* Login Form */}
          <form onSubmit={this.onSubmit}>
            <div style={{ width: '25em', margin: '0 auto' }}>
              {/* Email */}
              <Input
                type="email"
                fullWidth={true}
                placeholder="Email"
                required="required"
                name="email"
                value={this.state.user.email}
                onChange={this.onChange}
                style={{ marginTop: '1em' }}
              />

              {/* Password */}
              <Input
                type="password"
                fullWidth={true}
                placeholder="Password"
                required="required"
                name="password"
                value={this.state.user.password}
                onChange={this.onChange}
                style={{ marginTop: '1em' }}
              />
            </div>

            <div style={{ marginTop: '2em' }}>
              {/* Signup link */}
              <Link to={userRoutes.signup.path}>
                <Button type="button" style={{ marginRight: '0.5em' }}>Signup</Button>
              </Link>

              {/* Form submit */}
              <Button type="submit" theme="secondary" disabled={isLoading}>
                Login
                <Icon size={1.2} style={{ color: white }}>navigate_next</Icon></Button>
            </div>
          </form>
        </GridCell>

        {/* Auth Check */}
        <AuthCheck/>
      </Grid>
    )
  }
}

// Component Properties
Login.propTypes = {
  user: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}

// Component State
function loginState(state) {
  return {
    user: state.user
  }
}

// This is the method that connects our component to the store. The second object argument
// that contains { login, messageShow, messageHide } are all the actions that are dispacthed
export default connect(loginState, { login, messageShow, messageHide })(withRouter(Login))
