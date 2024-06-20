import React, { Component } from 'react';
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

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      ticketData: [],
      searchQuery: '',
    };
  }

  async componentDidMount() {
    const responseTickets = await axios.get(BaseURL + "emailtracking/ticket/");
    this.setState({ ticketData: responseTickets.data.reverse() });
  }

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  getFilteredData = () => {
    const { ticketData, searchQuery } = this.state;
    return ticketData.filter(ticket =>
      ticket.ticketname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.time.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  handleDownloadPDF = () => {
    const { ticketData, searchQuery } = this.state;
    const filteredData = this.getFilteredData();
    const doc = new jsPDF();
  
    const tableColumn = ["Sl.No", "Date-Time", "Ticket Name", ...Object.keys(ticketData[0]?.actual_json || {})];
    const tableRows = [];
  
    filteredData.forEach((ticket, index) => {
      const ticketData = [
        index + 1,
        `${ticket.date} ${ticket.time}`,
        ticket.ticketname,
        ...tableColumn.slice(3).map(field => ticket.actual_json[field] || '')
      ];
      tableRows.push(ticketData);
    });
  
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });
  
    doc.save(`tickets${searchQuery ? `_${searchQuery}` : ''}.pdf`);
  };
  
  handleDownloadCSV = () => {
    const { ticketData, searchQuery } = this.state;
    const filteredData = this.getFilteredData();
    const headers = ["Sl.No", "Date-Time", "Ticket Name", ...Object.keys(ticketData[0]?.actual_json || {})];
    
    const csvRows = [];
    csvRows.push(headers.join(','));
  
    filteredData.forEach((ticket, index) => {
      const ticketData = [
        index + 1,
        `${ticket.date} ${ticket.time}`,
        ticket.ticketname,
        ...headers.slice(3).map(field => ticket.actual_json[field] || '')
      ];
      csvRows.push(ticketData.join(','));
    });
  
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `tickets${searchQuery ? `_${searchQuery}` : ''}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };  

  render() {
    const { ticketData, searchQuery } = this.state;
    const filteredData = this.getFilteredData();
  
    const tableColumn = ["Sl.No", "Date-Time", "Ticket Name", ...Object.keys(ticketData[0]?.actual_json || {})];
  
    return (
      <>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>TICKETS</strong>
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
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <CTable striped hover>
                    <CTableHead color='dark'>
                      <CTableRow>
                        {tableColumn.map((header, index) => (
                          <CTableHeaderCell key={index} scope="col">
                            {header}
                          </CTableHeaderCell>
                        ))}
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {filteredData.length === 0 ? (
                        <CTableRow>
                          <CTableHeaderCell colSpan={tableColumn.length} className="text-center">
                            No data available
                          </CTableHeaderCell>
                        </CTableRow>
                      ) : (
                        filteredData.map((ticket, index) => (
                          <CTableRow key={index}>
                            <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                            <CTableDataCell>{`${ticket.date} ${ticket.time}`}</CTableDataCell>
                            <CTableDataCell>{ticket.ticketname}</CTableDataCell>
                            {tableColumn.slice(3).map((field, i) => (
                              <CTableDataCell key={i}>{ticket.actual_json[field]}</CTableDataCell>
                            ))}
                          </CTableRow>
                        ))
                      )}
                    </CTableBody>
                  </CTable>
                </div>
                <CRow className="justify-content-center mt-4">
                  <CCol xs={12}>
                    <div className='d-flex justify-content-center gap-2'>
                      <CButton color="primary" type="button" onClick={this.handleDownloadPDF}>
                        Download as PDF
                      </CButton>
                      <CButton color="primary" type="button" onClick={this.handleDownloadCSV}>
                        Download as CSV
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

export default Ticket;