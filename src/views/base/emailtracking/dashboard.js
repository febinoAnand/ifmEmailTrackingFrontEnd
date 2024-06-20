import React, { Component } from 'react';
import axios from 'axios';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsA,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import Chart from 'chart.js/auto';
import { cilPeople, cilUser, cilUserFollow, cilUserUnfollow, cilCommentSquare, cilTags } from '@coreui/icons';
import BaseURL from 'src/assets/contants/BaseURL';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inboxCount: 0,
      ticketCount: 0,
      departments: [],
      ticketData: [],
      barChartLabels: [],
      barChartData: [],
      userData: [],
    };
    this.chartRef = React.createRef();
  }

  async componentDidMount() {
    await this.fetchData();
    this.updateChart();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.barChartData !== prevState.barChartData || this.state.barChartLabels !== prevState.barChartLabels) {
      this.updateChart();
    }
  }

  fetchData = async () => {
    try {
      const responseInbox = await axios.get(BaseURL + "emailtracking/inbox/");
      const responseTickets = await axios.get(BaseURL + "emailtracking/ticket/");
      const responseDepartments = await axios.get(BaseURL + "emailtracking/departments/");
      const responseUsers = await axios.get(BaseURL + "Userauth/userdetail/");

      const barChartLabels = this.generateHourlyLabels();
      const barChartData = this.extractHourlyDepartmentData(responseTickets.data, responseDepartments.data);

      const totalUsers = responseUsers.data.length;
      const activeUsers = responseUsers.data.filter(user => user.userActive).length;

      this.setState({
        inboxCount: responseInbox.data.length,
        ticketCount: responseTickets.data.length,
        departments: responseDepartments.data,
        ticketData: responseTickets.data.reverse(),
        barChartLabels: barChartLabels,
        barChartData: barChartData,
        userData: responseUsers.data,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  generateHourlyLabels() {
    const now = new Date();
    const currentHour = now.getHours();
    return Array.from({ length: 6 }, (_, i) => `${currentHour}:${i * 10}`); // Generate labels for each 10-minute interval
  }

  getDepartmentFromTopology(topology) {
    if (!topology) return null;
    const parts = topology.split(' / ');
    return parts.length > 0 ? parts[parts.length - 1] : null;
  }

  extractHourlyDepartmentData(ticketData, departmentData) {
    const counts = {};
  
    // Initialize counts for each department
    departmentData.forEach(department => {
      counts[department.department] = Array.from({ length: 6 }, () => 0); // Initialize counts for each department
    });
  
    // Process each ticket to count occurrences
    ticketData.forEach(ticket => {
      const actualJson = ticket.actual_json;
      if (actualJson && actualJson.Topology) {
        const topology = actualJson.Topology.toLowerCase(); // Convert to lowercase for case-insensitive comparison
        console.log(`Processing ticket with topology: ${topology}`);
  
        // Iterate over department data to find matches in topology
        departmentData.forEach(department => {
          const departmentName = department.department.toLowerCase(); // Convert to lowercase for case-insensitive comparison
          console.log(`Checking department: ${departmentName}`);
          
          if (topology.includes(departmentName)) {
            const occurred = actualJson["Occurred (UTC+0:00)"];
            if (occurred) {
              const hour = new Date(occurred).getHours();
              const interval = Math.floor(new Date(occurred).getMinutes() / 10);
              if (hour === new Date().getHours()) {
                console.log(`Match found for department: ${department.department}`);
                counts[department.department][interval]++;
              }
            }
          }
        });
      }
    });
  
    console.log('Counts:', counts); // Log the final counts object
  
    return Object.values(counts);
  }  
  
  updateChart() {
    const { barChartLabels, barChartData, departments } = this.state;
    const ctx = this.chartRef.current.getContext('2d');

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const barColors = [
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(255, 206, 86, 0.5)',
      'rgba(75, 192, 192, 0.5)',
      'rgba(153, 102, 255, 0.5)',
      'rgba(255, 159, 64, 0.5)',
      'rgba(199, 199, 199, 0.5)',
      'rgba(255, 99, 71, 0.5)',
      'rgba(144, 238, 144, 0.5)',
      'rgba(173, 216, 230, 0.5)',
      'rgba(240, 128, 128, 0.5)',
      'rgba(32, 178, 170, 0.5)',
      'rgba(240, 230, 140, 0.5)',
      'rgba(123, 104, 238, 0.5)',
      'rgba(255, 105, 180, 0.5)',
      'rgba(205, 92, 92, 0.5)',
      'rgba(50, 205, 50, 0.5)',
      'rgba(100, 149, 237, 0.5)',
      'rgba(255, 228, 181, 0.5)',
      'rgba(147, 112, 219, 0.5)',
    ];

    const datasets = departments.map((department, index) => ({
      label: department.department,
      data: barChartData[index],
      backgroundColor: barColors[index % barColors.length],
      borderColor: barColors[index % barColors.length].replace('0.5', '1'),
      borderWidth: 1,
    }));

    console.log('Bar Chart Data:', datasets);

    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: barChartLabels,
        datasets: datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  render() {
    const { inboxCount, ticketCount, userData } = this.state;

    return (
      <>
        <CRow>
          <CCol sm={6} lg={3}>
            <CWidgetStatsA
              className="mb-4"
              color="primary"
              value={
                <>
                  {userData.length}{' '}
                </>
              }
              title="Total No. Of Users"
              chart={
                <div className="c-chart-wrapper mt-3 mx-3">
                  <CIcon icon={cilPeople} size="xl" className="text-primary" />
                </div>
              }
            />
          </CCol>
          <CCol sm={6} lg={3}>
            <CWidgetStatsA
              className="mb-4"
              color="success"
              value={
                <>
                  {userData.filter(user => user.userActive).length}{' '}
                </>
              }
              title="Total No. Of Active Users"
              chart={
                <div className="c-chart-wrapper mt-3 mx-3">
                  <CIcon icon={cilUserFollow} size="xl" className="text-success" />
                </div>
              }
            />
          </CCol>
          <CCol sm={6} lg={3}>
            <CWidgetStatsA
              className="mb-4"
              color="danger"
              value={
                <>
                  {userData.length - userData.filter(user => user.userActive).length}{' '}
                </>
              }
              title="Total No. Of Inactive Users"
              chart={
                <div className="c-chart-wrapper mt-3 mx-3">
                  <CIcon icon={cilUserUnfollow} size="xl" className="text-danger" />
                </div>
              }
            />
          </CCol>
          <CCol sm={6} lg={3}>
            <CWidgetStatsA
              className="mb-4"
              color="warning"
              value={
                <>
                  {this.state.departments.length}{' '}
                </>
              }
              title="Total No. Of Departments"
              chart={
                <div className="c-chart-wrapper mt-3 mx-3">
                  <CIcon size="xl" className="text-primary" />
                </div>
              }
            />
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol xs="12" sm="6" lg="6">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              backgroundColor: '#f0f0f0', 
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                backgroundColor: '#ff6e6e', 
                width: '30%', 
                padding: '20px', 
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <CIcon icon={cilCommentSquare} size="lg" className="text-white" />
              </div>
              <div style={{ 
                backgroundColor: '#ffffff', 
                width: '30%', 
                padding: '20px', 
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>{inboxCount}</div>
              </div>
              <div style={{ 
                backgroundColor: '#E768E1', 
                width: '30%', 
                padding: '10px', 
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#333' }} className="text-center text-muted mt-2">Total Inbox</div>
              </div>
            </div>
          </CCol>
          <CCol xs="12" sm="6" lg="6">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              backgroundColor: '#f0f0f0', 
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                backgroundColor: '#52DFAD', 
                width: '30%', 
                padding: '20px', 
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <CIcon icon={cilTags} size="lg" className="text-white" />
              </div>
              <div style={{ 
                backgroundColor: '#ffffff', 
                width: '30%', 
                padding: '20px', 
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>{ticketCount}</div>
              </div>
              <div style={{ 
                backgroundColor: '#AA76FA', 
                width: '30%', 
                padding: '10px', 
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#333' }} className="text-center text-muted mt-2">Total Ticket</div>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Department Chart</strong>
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
                <strong>All Users</strong>
              </CCardHeader>
              <CCardBody>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead color="light">
                      <CTableRow>
                        <CTableHeaderCell className="text-center">
                          <CIcon icon={cilPeople} />
                        </CTableHeaderCell>
                        <CTableHeaderCell>Name</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Email</CTableHeaderCell>
                        <CTableHeaderCell>Designation</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Mobile No</CTableHeaderCell>
                        <CTableHeaderCell>Active State</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {userData.map((user, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell className="text-center">
                            <CIcon size="xl" icon={cilUser} />
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{user.usermod.email}</div>
                            <div className="small text-medium-emphasis">
                              Registered: {user.usermod.first_name}
                            </div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <span>{user.usermod.email}</span>
                          </CTableDataCell>
                          <CTableDataCell>
                            <span>{user.designation}</span>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <span>{user.mobile_no}</span>
                          </CTableDataCell>
                          <CTableDataCell>
                            <span style={{ fontWeight: user.userActive ? 'bold' : 'normal', color: user.userActive ? 'green' : 'red' }}>
                                {user.userActive ? 'Active' : 'Inactive'}
                            </span>
                          </CTableDataCell>
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