import React from 'react'
import axios from 'axios';

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormLabel,
    CFormInput,
    CRow,
  } from '@coreui/react'
import BaseURL from 'src/assets/contants/BaseURL';

class Setting extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      application_id: '',
      id:''
    };
  }

  componentDidMount() {
    axios.get(BaseURL +"pushnotification/setting/")
    .then(response => {
      this.setState({ application_id: response.data });
    })
    .catch(error => {
      console.error('Error fetching application ID:', error);
    });
  }

  handleInputChange = (e) => {
    this.setState({ application_id: e.target.value });
  }

  handleUpdate = () => {
    const { application_id } = this.state;
    axios.put(`${BaseURL}pushnotification/setting/`, { application_id })
      .then(response => {
        console.log('Application ID updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating application ID:', error);
      });
  }
  
 render(){ 
  const { application_id } = this.state;

  return (
    <>
     <CRow>

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>SETTING</strong>
          </CCardHeader>
          <CCardBody>
            
            
            
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">Application ID</CFormLabel>
                    <CCol md={6}>
                      <CFormInput type="text" id="name" name="name"  value={application_id} onChange={this.handleInputChange} />
                    </CCol>
                  </CRow>
                  <CRow className="justify-content-center">
                  <CCol xs={1}>
                    <div className='d-grid gap-2'>
                        <CButton color="primary" type="submit" >Update</CButton>
                    </div>
                  </CCol>
                  </CRow>
            
          </CCardBody>
        </CCard>
      </CCol>
      
      </CRow>

     </>
  )
  }
}

export default Setting