import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const EditInfo = ({show}) => {
  debugger;
  const showEditModal = show ? 'display-absolute' : 'display-none';

  return (
    <section style={{display: showEditModal}}>
      <button>Here</button>
    </section>
  )
}

export default EditInfo;
