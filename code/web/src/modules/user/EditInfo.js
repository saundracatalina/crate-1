import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Input from '../../ui/input/Input'

const EditInfo = ({toggleEditInfoForm, userInfo}) => {

  return (
    <section style={{position: 'fixed', justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: '1'}}>
      <form className='edit-info-form' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', width: '60%', height: '50%', backgroundColor: 'white'}}>
        <Input style={{height: '10%', width: '100%'}} type='text' placeholder={userInfo.image}/>
        <Input style={{height: '10%', width: '100%'}} type='text' placeholder={userInfo.description}/>
        <Input style={{height: '10%', width: '100%'}} type='text' placeholder={userInfo.email}/>
        <Input style={{height: '10%', width: '100%'}} type='text' placeholder={userInfo.shippingAddress}/>
        <button className='save-info' onClick={toggleEditInfoForm}>Save</button>
      </form>
    </section>
  )
}

export default EditInfo;
