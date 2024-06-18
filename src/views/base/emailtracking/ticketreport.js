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
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import BaseURL from 'src/assets/contants/BaseURL';

class TicketReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      filteredTickets: [],
      searchTerm: '',
    };
  }

  componentDidMount() {
    this.fetchTickets();
  }

  fetchTickets = () => {
    axios.get(BaseURL + "emailtracking/report/")
      .then(response => {
        const reversedData = response.data.reverse();
        this.setState({
          tickets: reversedData,
          filteredTickets: reversedData,
        });
      })
      .catch(error => {
        console.error('Error fetching tickets:', error);
      });
  }

  handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const { tickets } = this.state;

    const filteredTickets = tickets.filter(ticket =>
      ticket.date.toLowerCase().includes(searchTerm) ||
      ticket.time.toLowerCase().includes(searchTerm) ||
      ticket.ticket.ticketname.toLowerCase().includes(searchTerm) ||
      ticket.active_trigger.trigger_name.toLowerCase().includes(searchTerm) ||
      ticket.actual_value.toLowerCase().includes(searchTerm) ||
      ticket.active_trigger.users_to_send.some(user =>
        user.username.toLowerCase().includes(searchTerm)
      )
    );

    this.setState({ filteredTickets, searchTerm });
  }

  handleDownloadPDF = () => {
    const { filteredTickets } = this.state;
    const doc = new jsPDF();

    const tableColumn = ["Sl.No", "Date", "Time", "Ticket", "Rule Engine", "Actual Value", "Send to User"];
    const tableRows = [];

    filteredTickets.forEach((ticket, index) => {
      const ticketData = [
        index + 1,
        ticket.date,
        ticket.time,
        ticket.ticket.ticketname,
        ticket.active_trigger.trigger_name,
        ticket.actual_value,
        ticket.active_trigger.users_to_send.map(user => user.username).join(', ')
      ];
      tableRows.push(ticketData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("tickets_report.pdf");
  }

  render() {
    const { filteredTickets, searchTerm } = this.state;

    return (
      <>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong> REPORT</strong>
              </CCardHeader>
              <CCardBody>
                <CCol md={4}>
                  <CInputGroup className="flex-nowrap mt-3 mb-4">
                    <CFormInput
                      placeholder="Search by Date, Time, Ticket, Rule Engine, Actual Value, Send to User"
                      aria-label="Search"
                      aria-describedby="addon-wrapping"
                      value={searchTerm}
                      onChange={this.handleSearchChange}
                    />
                    <CButton type="button" color="secondary" id="button-addon2">
                      Search
                    </CButton>
                  </CInputGroup>
                </CCol>
                <div id="pdf-content" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                  <CTable striped hover>
                    <CTableHead color='dark'>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Sl.No</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Time</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Ticket</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Rule Engine</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Actual Value</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Send to User</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {filteredTickets.length === 0 ? (
                        <CTableRow>
                          <CTableDataCell colSpan="7" className="text-center">No matching tickets found.</CTableDataCell>
                        </CTableRow>
                      ) : (
                        filteredTickets.map((ticket, index) => (
                          <CTableRow key={index}>
                            <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                            <CTableDataCell>{ticket.date}</CTableDataCell>
                            <CTableDataCell>{ticket.time}</CTableDataCell>
                            <CTableDataCell>{ticket.ticket.ticketname}</CTableDataCell>
                            <CTableDataCell>{ticket.active_trigger.trigger_name}</CTableDataCell>
                            <CTableDataCell>{ticket.actual_value}</CTableDataCell>
                            <CTableDataCell>
                              {ticket.active_trigger.users_to_send.map(user => user.username).join(', ')}
                            </CTableDataCell>
                          </CTableRow>
                        ))
                      )}
                    </CTableBody>
                  </CTable>
                </div>
                <CRow className="justify-content-center mt-4">
                  <CCol xs={1}>
                    <div className='d-grid gap-2'>
                      <CButton color="primary" type="button" onClick={this.handleDownloadPDF}>
                        Download
                      </CButton>
                    </div>
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

export default TicketReport;