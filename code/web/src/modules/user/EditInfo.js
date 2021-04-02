import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Input from '../../ui/input/Input'
import { editInfoResponse } from './api/actions'

const EditInfo = ({toggleEditInfoForm, userInfo, editInfoResponse}) => {

  const handleOnClick = (e) => {
    e.preventDefault()
    toggleEditInfoForm();
    editInfoResponse();
  }

  return (
    <section style={{position: 'fixed', justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: '1'}}>
      <form className='edit-info-form' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', width: '60%', height: '50%', backgroundColor: 'white'}}>
        <Input style={{height: '10%', width: '100%'}} type='text' placeholder={userInfo.image}/>
        <Input style={{height: '10%', width: '100%'}} type='text' placeholder={userInfo.description}/>
        <Input style={{height: '10%', width: '100%'}} type='text' placeholder={userInfo.email}/>
        <Input style={{height: '10%', width: '100%'}} type='text' placeholder={userInfo.shippingAddress}/>
        <button className='save-info' onClick={(e) => handleOnClick(e)}>Save</button>
      </form>
    </section>
  )
}

//Component State
function editInfoState(state) {
  return {
    user: state.user
  }
}

export default connect(editInfoState, { editInfoResponse })(EditInfo);
