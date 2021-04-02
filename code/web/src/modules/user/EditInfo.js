import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Input from '../../ui/input/Input'
import { editInfoResponse } from './api/actions'

class EditInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        image: props.user.details.image,
        email: props.user.details.email,
        shippingAddress: props.user.details.shippingAddress,
        description: props.user.details.description,
      }
    }
  }

  onChange = (event) => {
    let user = this.state.user
    user[event.target.name] = event.target.value

    this.setState({
      user
    })
  }

  handleOnClick = (e) => {
    e.preventDefault()
    this.props.toggleEditInfoForm();
    this.props.editInfoResponse();
  }

  render() {
    return (
      <section style={{position: 'fixed', justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: '1'}}>
        <form className='edit-info-form' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', width: '60%', height: '50%', backgroundColor: 'white'}}>
          <Input style={{height: '10%', width: '100%'}} type='text' name='image' value={this.state.user.image} onChange={this.onChange}/>
          <Input style={{height: '10%', width: '100%'}} type='text' name='description' value={this.state.user.description} onChange={this.onChange}/>
          <Input style={{height: '10%', width: '100%'}} type='text' name='email' value={this.state.user.email} onChange={this.onChange}/>
          <Input style={{height: '10%', width: '100%'}} type='text' name='shippingAddress' value={this.state.user.shippingAddress} onChange={this.onChange}/>
          <button className='save-info' onClick={(e) => this.handleOnClick(e)}>Save</button>
        </form>
      </section>
    )
  }
}

//Component State
function editInfoState(state) {
  return {
    user: state.user
  }
}

export default connect(editInfoState, { editInfoResponse })(EditInfo);
