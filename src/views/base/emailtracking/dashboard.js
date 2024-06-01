import React, { Component } from 'react';
import axios from 'axios';
import { cilChartPie } from '@coreui/icons';
import {
  // CButton,
  CCard,
  CCardBody,
  CCardHeader,
  // CCardTitle,
  // CCardSubtitle,
  // CCardText,
  // CCardLink,
  CCol,
  // CFormInput,
  // CInputGroup,
  // CNavLink,
  // CInputGroupText,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CWidgetStatsC,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react';
// import { NavLink } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import BaseURL from 'src/assets/contants/BaseURL';
import Chart from 'chart.js/auto';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inboxCount: 0,
      ticketCount: 0,
      fields: [],
      ticketData: [],
      barChartLabels: [],
      barChartData: [],
    };
    this.chartRef = React.createRef();
  }

  async componentDidMount() {
    try {
      const responseInbox = await axios.get(BaseURL + "emailtracking/inbox/");
      const responseTickets = await axios.get(BaseURL + "emailtracking/ticket/");
      const responseFields = await axios.get(BaseURL + "emailtracking/parameter/");
      const responseParameters = await axios.get(BaseURL + "emailtracking/parameter/");

      const barChartLabels = this.extractLabels(responseTickets.data, responseFields.data);
      const barChartData = this.extractDataCounts(responseTickets.data, responseParameters.data);

      this.setState({
        inboxCount: responseInbox.data.length,
        ticketCount: responseTickets.data.length,
        fields: responseFields.data,
        ticketData: responseTickets.data.reverse(),
        barChartLabels: barChartLabels,
        barChartData: barChartData,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.barChartData !== prevState.barChartData) {
      this.updateChart();
    }
  }

  extractLabels(ticketData, fields) {
    const labels = fields.map(field => field.field);
    return labels;
  }

  extractDataCounts(ticketData, parameterData) {
    const counts = {};
  
    parameterData.forEach(param => {
      counts[param.field] = 0;
    });
  
    ticketData.forEach(ticket => {
      parameterData.forEach(param => {
        if (ticket.required_json[param.field]) {
          counts[param.field]++;
        }
      });
    });
  
    return Object.values(counts);
  }
  
  updateChart() {
    const { barChartLabels, barChartData } = this.state;
    const ctx = this.chartRef.current.getContext('2d');

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: barChartLabels,
        datasets: [{
          label: 'Ticket Data',
          data: barChartData,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    });
  }

  render() {
    const { inboxCount, ticketCount, fields, ticketData } = this.state;
    const customTooltipStyle = {
      '--cui-tooltip-bg': 'var(--cui-primary)',
    }

    return (
      <>
        <CRow>
        <CCol xs={6}>
        <CTooltip
          content="This widget shows the total amount of Inbox received."
          placement="top"
          style={customTooltipStyle}
        >
          <CWidgetStatsC
            className="mb-3"
            icon={<CIcon icon={cilChartPie} height={36} />}
            progress={{ color: 'success', value: 75 }}
            text={inboxCount}
            title="Inbox Total"
            value={inboxCount}
          />
          </CTooltip>
        </CCol>
        <CCol xs={6}>
        <CTooltip
          content="This widget shows the total amount of Tickets received."
          placement="top"
          style={customTooltipStyle}
        >
          <CWidgetStatsC
            className="mb-3"
            icon={<CIcon icon={cilChartPie} height={36} />}
            color="primary"
            inverse
            progress={{ value: 75 }}
            text={ticketCount}
            title="Ticket Total"
            value={ticketCount}
          />
          </CTooltip>
        </CCol>
        </CRow>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Bar Chart</strong>
              </CCardHeader>
              <CCardBody className="d-flex justify-content-center">
                <canvas id="barChart" width="200" height="100" ref={this.chartRef}></canvas>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>TICKETS</strong>
              </CCardHeader>
              <CCardBody>
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
                      {ticketData.map((ticket, index) => (
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

export default Dashboard;