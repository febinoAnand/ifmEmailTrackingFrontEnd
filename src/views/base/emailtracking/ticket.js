import React, { Component } from 'react';
import axios from 'axios';
import { cilMagnifyingGlass } from '@coreui/icons';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CButton,
  CFormInput,
  CInputGroupText,
  CInputGroup,
  // CFormSelect,
  // CForm,
  // CFormLabel,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
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
    const responseFields = await axios.get(BaseURL + "emailtracking/parameter/");
    this.setState({ fields: responseFields.data });

    const responseTickets = await axios.get(BaseURL + "emailtracking/ticket/");
    this.setState({ ticketData: responseTickets.data.reverse() });
  }

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  getFilteredData = () => {
    const { ticketData, searchQuery } = this.state;
    return ticketData.filter(ticket =>
      ticket.ticketname.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  render() {
    const { fields } = this.state;
    const filteredData = this.getFilteredData();

    return (
      <>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>TICKET TABLE</strong>
              </CCardHeader>
              <CCardBody>
              <CCol md={4}>
                <CInputGroup className="flex-nowrap mt-3 col-sg-3">
                  <CInputGroupText id="addon-wrapping"><CIcon icon={cilMagnifyingGlass} /></CInputGroupText>
                  <CFormInput
                    placeholder="Search by Ticket Name"
                    aria-label="Search"
                    aria-describedby="addon-wrapping"
                    value={this.state.searchQuery}
                    onChange={this.handleSearchChange}
                  />
                  <CButton type="button" color="secondary" id="button-addon2">
                    Search
                  </CButton>
                </CInputGroup>
              </CCol>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <CTable striped hover>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Time</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Ticket Name</CTableHeaderCell>
                        {fields.map(field => (
                          <CTableHeaderCell scope="col" key={field.field}>
                            {field.field}
                          </CTableHeaderCell>
                        ))}
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {filteredData.map((ticket, index) => (
                        <CTableRow key={index}>
                          <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{ticket.date}</CTableDataCell>
                          <CTableDataCell>{ticket.time}</CTableDataCell>
                          <CTableDataCell>{ticket.ticketname}</CTableDataCell>
                          {fields.map((field, i) => (
                            <CTableDataCell key={i}>{ticket.required_json[field.field]}</CTableDataCell>
                          ))}
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

export default Ticket;