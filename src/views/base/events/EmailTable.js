import React from 'react'
import { Link } from 'react-router-dom';
import { cilTrash, cilFilter } from '@coreui/icons';
import axios from 'axios';


import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
  } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import BaseURL from 'src/assets/contants/BaseURL';
import {
  cilMagnifyingGlass
} from '@coreui/icons'

class EmailTable extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      successMessage: ''
    };
  }

  componentDidMount() {
    this.fetchEmails();
    this.interval = setInterval(this.fetchEmails, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchEmails = () => {
    axios.get(BaseURL+'EmailTracking/inbox')
      .then(response => {
        this.setState({ emails: response.data });
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching emails:', error);
      });
  }
  handleDelete = (emailId) => {
    axios.delete(BaseURL+'EmailTracking/inbox')
      .then(response => {
        const updatedEmails = this.state.emails.filter(email => email.id !== emailId);
        this.setState({ emails: updatedEmails });
        this.setState({ successMessage: 'Deleted successfully', errors: {} });
      })
      .catch(error => {
        console.error('Error deleting email:', error);
      });
  }
  
  render(){
    const { successMessage } = this.state;
    return (
      <>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>E-Mail box</strong>
            </CCardHeader>
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
                        <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Time</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Subject</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                    </CTableHead>
                    <CTableBody>
                    {this.state.emails.map((email, index) => (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell><Link to={'/event/emailsubpage'}>{email.date}</Link></CTableDataCell>
                        <CTableDataCell><Link to={'/event/emailsubpage'}>{email.time}</Link></CTableDataCell>
                        <CTableDataCell><Link to={'/event/emailsubpage'}>{email.subject}</Link></CTableDataCell>
                        <CTableDataCell><Link to={'/event/emailsubpage'}>{email.message}</Link></CTableDataCell>
                        <CTableDataCell>
                          <CButton onClick={() => this.handleDelete(email.id)}><CIcon icon={cilTrash} /></CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
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
    )
  }
}

export default EmailTable;