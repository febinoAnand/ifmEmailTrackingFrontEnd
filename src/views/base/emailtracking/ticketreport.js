import React from 'react';
import axios from 'axios';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CButton,
  CFormInput,
  CInputGroup,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import BaseURL from 'src/assets/contants/BaseURL';

class TicketReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      filteredTickets: [],
      searchQuery: '',
    };
  }

  componentDidMount() {
    this.fetchTickets();
  }

  fetchTickets() {
    axios
      .get(BaseURL + 'emailtracking/ticket/')
      .then((response) => {
        const reversedTickets = response.data.slice().reverse();
        this.setState({ tickets: reversedTickets, filteredTickets: reversedTickets });
      })
      .catch((error) => {
        console.error('Error fetching tickets:', error);
      });
  }
  

  handleSearchChange = (event) => {
    const searchQuery = event.target.value;
    const { tickets } = this.state;

    const filteredTickets = tickets.filter((ticket) =>
      ticket.ticketname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    this.setState({ searchQuery, filteredTickets });
  };

  render() {
    const { filteredTickets, searchQuery } = this.state;

    return (
      <>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>TICKETS REPORT</strong>
              </CCardHeader>
              <CCardBody>
                <CCol md={4}>
                  <CInputGroup className="flex-nowrap mt-3 mb-4">
                    <CFormInput
                      placeholder="Search by Ticket Name"
                      aria-label="Search"
                      aria-describedby="addon-wrapping"
                      value={searchQuery}
                      onChange={this.handleSearchChange}
                    />
                    <CButton type="button" color="secondary" id="button-addon2">
                      Search
                    </CButton>
                  </CInputGroup>
                </CCol>
                <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                  <CTable striped hover>
                    <CTableHead color='dark'>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Ticket Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Time</CTableHeaderCell>
                        {/* <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Extracted json</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Actual json</CTableHeaderCell> */}
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {filteredTickets.map((ticket, index) => (
                        <CTableRow key={index}>
                          <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{ticket.ticketname}</CTableDataCell>
                          <CTableDataCell>{ticket.date}</CTableDataCell>
                          <CTableDataCell>{ticket.time}</CTableDataCell>
                          {/* <CTableDataCell>{ticket.inboxMessage}</CTableDataCell>
                          <CTableDataCell>{JSON.stringify(ticket.required_json)}</CTableDataCell>
                          <CTableDataCell>{JSON.stringify(ticket.actual_json)}</CTableDataCell> */}
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}

export default TicketReport;