import React from 'react'
import { cilTrash, cilFilter } from '@coreui/icons';



import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormCheck,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CFormTextarea,
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react';

  import {
    cilMagnifyingGlass
  } from '@coreui/icons'

  class SearchParameter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          hunt_word: '',
          message: '',
          mobile: '',
          country_code: '',
          errors: {}
        };
      }
    
      handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
      };
      
      handleAdd = (e) => {
        e.preventDefault();
        const errors = this.validate();
        if (Object.keys(errors).length === 0) {
          console.log('Form submitted successfully');
        } else {
          this.setState({ errors });
        }
      };
    
      handleUpdate = (e) => {
        e.preventDefault();
        const errors = this.validate();
        if (Object.keys(errors).length === 0) {
          console.log('Form updated successfully');
        } else {
          this.setState({ errors });
        }
      };
    
      validate = () => {
        const { name, hunt_word, message, mobile, country_code } = this.state;
        const errors = {};

        if (!name.trim()) {
          errors.name = 'Name is required';
        } else if (name.length > 20) {
          errors.name = 'Name must be less than 20 characters';
        }
    
        if (!hunt_word.trim()) {
          errors.hunt_word = 'Hunt word is required';
        } else if (hunt_word.length > 50) {
          errors.hunt_word = 'Hunt word must be less than 50 characters';
        }
    
        if (!message.trim()) {
          errors.message = 'Message is required';
        } else if (message.length > 250) {
          errors.message = 'Message must be less than 250 characters';
        }
    
        if (!mobile.trim()) {
          errors.mobile = 'Mobile number is required';
        } else if (isNaN(mobile) || mobile.length !== 10) {
          errors.mobile = 'Mobile number must be 10 digits';
        }
    
        if (!country_code.trim()) {
            errors.country_code = 'Country code is required';
        } else if (isNaN(country_code) || country_code.length < 1 || country_code.length > 3) {
            errors.country_code = 'Country code must be 1 to 3 digits';
        }
    
        return errors;
      };
    render() {
        const { errors } = this.state;
  
      return (
        <>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>Search Parameter</strong>
                </CCardHeader>
                <CCardBody>
                <CForm onSubmit={this.handleSubmit}>
                    <CRow className="mb-3">
                    <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">Name</CFormLabel>
                    <CCol md={6}>
                        <CFormInput type="text" id="name" name="name" onChange={this.handleChange} />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </CCol>
                    </CRow>
                    <CRow className="mb-3">
                    <CFormLabel htmlFor="hunt_word" className="col-sm-2 col-form-label">Hunt Word</CFormLabel>
                    <CCol md={6}>
                        <CFormInput type="text" id="hunt_word" name="hunt_word" onChange={this.handleChange} />
                        {errors.hunt_word && <div className="text-danger">{errors.hunt_word}</div>}
                    </CCol>
                    </CRow>
                    <CRow className="mb-3">
                    <CFormLabel htmlFor="message" className="col-sm-2 col-form-label">Message</CFormLabel>
                    <CCol md={6}>
                        <CFormTextarea id="message" name="message" rows={3} onChange={this.handleChange} />
                        {errors.message && <div className="text-danger">{errors.message}</div>}
                    </CCol>
                    </CRow>
                    <CRow className="mb-3">
                    <CCol sm={2}>
                        <CFormLabel htmlFor="country_code" className="col-form-label">Mobile</CFormLabel>
                    </CCol>
                    <CCol sm={2}>
                        <CFormSelect id="country_code" name="country_code" onChange={this.handleChange}>
                        <option value="1">+1</option>
                        <option value="91">+91</option>
                        {/* Add more options as needed */}
                        </CFormSelect>
                        {errors.country_code && <div className="text-danger">{errors.country_code}</div>}
                        <CFormLabel htmlFor="mobile" className="col-form-label"></CFormLabel>
                    </CCol>
                    <CCol sm={5}>
                        <CFormInput id="mobile" type="tel" name="mobile" placeholder="Enter your mobile number" onChange={this.handleChange} />
                        {errors.mobile && <div className="text-danger">{errors.mobile}</div>}
                    </CCol>
                    </CRow>
                    <CRow className="justify-content-center">
                    <CCol md="auto">
                        <CButton color="primary" type="submit" onClick={this.handleAdd}>Add</CButton>
                        <CButton color="primary" type="button" onClick={this.handleUpdate}>Update</CButton>
                    </CCol>
                    </CRow>
                </CForm>
                </CCardBody>
                <CCardBody>
              {/* <p className="text-medium-emphasis small">
                Use <code>hover</code> property to enable a hover state on table rows within a{' '}
                <code>&lt;CTableBody&gt;</code>.
              </p>
              */}


              <CCol md={4}>
              
              
              <CInputGroup className="flex-nowrap mt-3 col-sg-3">
                  <CInputGroupText id="addon-wrapping"><CIcon icon={cilMagnifyingGlass}/></CInputGroupText>
                  <CFormInput
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                  />
                  <CButton type="button" color="secondary"  id="button-addon2">
                    Search
                  </CButton>
                    <CButton color="primary">
                    <CIcon icon={cilFilter} />
                    </CButton>
                </CInputGroup>
                {/* <CButton color='primary'>Search</CButton> */}
                </CCol>
                <CCol className='mb-3'>

                </CCol>
                <CTable>
                    <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Hunt Word</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Mobile</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                    </CTableHead>
                    <CTableBody>
                    <CTableRow>
                        <CTableHeaderCell scope="row">1</CTableHeaderCell>
                        <CTableDataCell>Violation</CTableDataCell>
                        <CTableDataCell>Violation : 21</CTableDataCell>
                        <CTableDataCell>Violation more than 21 Alert</CTableDataCell>
                        <CTableDataCell>+ 91- ***********</CTableDataCell>
                        <CTableDataCell><CButton><CIcon icon={cilTrash} /></CButton></CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableHeaderCell scope="row">2</CTableHeaderCell>
                        <CTableDataCell>Violation</CTableDataCell>
                        <CTableDataCell>Violation : 21</CTableDataCell>
                        <CTableDataCell>Violation more than 21 Alert</CTableDataCell>
                        <CTableDataCell>+ 91- ***********</CTableDataCell>
                        <CTableDataCell><CButton><CIcon icon={cilTrash} /></CButton></CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableHeaderCell scope="row">3</CTableHeaderCell>
                        <CTableDataCell>Violation</CTableDataCell>
                        <CTableDataCell>Violation : 21</CTableDataCell>
                        <CTableDataCell>Violation more than 21 Alert</CTableDataCell>
                        <CTableDataCell>+ 91- ***********</CTableDataCell>
                        <CTableDataCell><CButton><CIcon icon={cilTrash} /></CButton></CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableHeaderCell scope="row">4</CTableHeaderCell>
                        <CTableDataCell>Violation</CTableDataCell>
                        <CTableDataCell>Violation : 21</CTableDataCell>
                        <CTableDataCell>Violation more than 21 Alert</CTableDataCell>
                        <CTableDataCell>+ 91- ***********</CTableDataCell>
                        <CTableDataCell><CButton><CIcon icon={cilTrash} /></CButton></CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableHeaderCell scope="row">5</CTableHeaderCell>
                        <CTableDataCell>Violation</CTableDataCell>
                        <CTableDataCell>Violation : 21</CTableDataCell>
                        <CTableDataCell>Violation more than 21 Alert</CTableDataCell>
                        <CTableDataCell>+ 91- ***********</CTableDataCell>
                        <CTableDataCell><CButton><CIcon icon={cilTrash} /></CButton></CTableDataCell>
                    </CTableRow>
                    </CTableBody>
                </CTable>
                <CRow className="justify-content-center">
                <CCol md="auto">
                    <CButton color="primary">Download</CButton>
                    </CCol>
                </CRow>
            </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </>
      );
    }
  }
  
  export default SearchParameter;