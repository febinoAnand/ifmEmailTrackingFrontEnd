import React from 'react';
import { Link } from 'react-router-dom';
import { cilTrash, cilFilter, cilMagnifyingGlass } from '@coreui/icons';
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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import BaseURL from 'src/assets/contants/BaseURL';

class EmailTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      filteredEmails: [],
      searchQuery: '',
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
    axios.get(BaseURL + 'EmailTracking/inbox')
      .then(response => {
        this.setState({ emails: response.data });
      })
      .catch(error => {
        console.error('Error fetching emails:', error);
      });
  }

  handleDelete = (emailId) => {
    axios.delete(BaseURL + 'EmailTracking/inbox')
      .then(response => {
        const updatedEmails = this.state.emails.filter(email => email.id !== emailId);
        this.setState({ emails: updatedEmails, successMessage: 'Deleted successfully' });
      })
      .catch(error => {
        console.error('Error deleting email:', error);
      });
  }

  handleSearch = () => {
    const { emails, searchQuery } = this.state;
    const filteredEmails = emails.filter(email =>
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
    this.setState({ filteredEmails });
  }

  handleInputChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  }

  render() {
    const { successMessage, filteredEmails, searchQuery } = this.state;
    const emailsToDisplay = filteredEmails.length > 0 ? filteredEmails : this.state.emails;
  
    let tableContent;
    if (searchQuery !== '' && emailsToDisplay.length === 0) {
      tableContent = (
        <div className="text-center mt-3">
          <p>No results found for &quot;{searchQuery}&quot;.</p>
        </div>
      );
    } else {
      tableContent = (
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
            {emailsToDisplay.map((email, index) => (
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
      );
    }
    
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
                <CInputGroup className="flex-nowrap mt-3 col-sg-3">
                  <CInputGroupText id="addon-wrapping"><CIcon icon={cilMagnifyingGlass} /></CInputGroupText>
                  <CFormInput
                    placeholder="Search by Subject or Message"
                    aria-label="Search"
                    aria-describedby="addon-wrapping"
                    value={this.state.searchQuery}
                    onChange={this.handleInputChange}
                  />
                  <CButton type="button" color="secondary" onClick={this.handleSearch} id="button-addon2">
                    Search
                  </CButton>
                  <CButton color="primary">
                    <CIcon icon={cilFilter} />
                  </CButton>
                </CInputGroup>
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
                    {emailsToDisplay.map((email, index) => (
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