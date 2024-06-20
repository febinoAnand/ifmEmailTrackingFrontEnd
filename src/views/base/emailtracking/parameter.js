import React from 'react';
import axios from 'axios';
import { cilTrash, cilPen } from '@coreui/icons';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalBody,
  CTooltip,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import BaseURL from 'src/assets/contants/BaseURL';

class Parameter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
      filteredDepartments: [],
      users: [],
      formData: {
        id: '',
        alias: '',
        department: '',
        users_to_send: [],
      },
      searchQuery: '',
      visibleUpdate: false,
      visibleAdd: false,
    };
  }

  componentDidMount() {
    this.fetchDepartments();
    this.fetchUsers();
  }

  fetchUsers = () => {
    axios.get(BaseURL + "Userauth/userdetail/")
      .then(response => {
        const users = response.data.map(user => ({
          id: user.user_id,
          username: user.usermod.username,
        }));
        this.setState({ users });
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  fetchDepartments = () => {
    axios.get(BaseURL + "emailtracking/departments/")
      .then(response => {
        const reversedData = response.data.reverse();
        this.setState({ departments: reversedData, filteredDepartments: reversedData });
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
      });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleAdd = () => {
    const { formData } = this.state;
    const newData = {
      dep_alias: formData.alias,
      department: formData.department,
      users_to_send: formData.users_to_send,
    };
  
    axios.post(`${BaseURL}emailtracking/departments/`, newData)
      .then(response => {
        console.log('Department added successfully:', response.data);
        this.setState({
          formData: {
            id: '',
            alias: '',
            department: '',
            users_to_send: [],
          },
          visibleAdd: false,
        }, () => {
          this.fetchDepartments();
          window.location.reload();
        });
      })
      .catch(error => {
        console.error('Error adding department:', error);
        if (error.response) {
          console.error('Server responded with status code:', error.response.status);
          console.error('Response data:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up the request:', error.message);
        }
      });
  };  

  handleUpdate = () => {
    const { formData } = this.state;
    const { id, alias, department, users_to_send } = formData;
  
    const updatedData = {
      id: id,
      dep_alias: alias,
      department: department,
      users_to_send: users_to_send,
    };
  
    axios.put(`${BaseURL}emailtracking/departments/${id}/`, updatedData)
      .then(response => {
        console.log('Department updated successfully:', response.data);
        this.setState({
          formData: {
            id: '',
            alias: '',
            department: '',
            users_to_send: [],
          }
        });
        this.fetchDepartments();
        this.toggleUpdateModal();
        window.location.reload();
      })
      .catch(error => {
        console.error('Error updating department:', error);
        if (error.response) {
          console.error('Server responded with status code:', error.response.status);
          console.error('Response data:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up the request:', error.message);
        }
      });
  };  

  getRowData = (department) => {
    const { id, dep_alias, department: dep, users_to_send } = department;
    
    this.setState({
      formData: {
        id: id,
        alias: dep_alias,
        department: dep,
        users_to_send: users_to_send,
      },
      visibleUpdate: true,
    });
  };

  handleDelete = (id) => {
    axios.delete(`${BaseURL}emailtracking/departments/${id}/`)
      .then(response => {
        console.log('Department deleted successfully');
        this.setState(prevState => ({
          departments: prevState.departments.filter(department => department.id !== id),
          filteredDepartments: prevState.filteredDepartments.filter(department => department.id !== id),
        }));
      })
      .catch(error => {
        console.error('Error deleting department:', error);
      });
  };

  handleSearch = () => {
    const { departments, searchQuery } = this.state;
    const filteredDepartments = departments.filter(department =>
      department.dep_alias.toLowerCase().includes(searchQuery.toLowerCase()) ||
      department.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
    this.setState({ filteredDepartments });
  };

  handleSearchInputChange = (e) => {
    const { value } = e.target;
    this.setState({ searchQuery: value }, () => {
      this.handleSearch();
    });
  };

  toggleUpdateModal = () => {
    this.setState(prevState => ({
      visibleUpdate: !prevState.visibleUpdate,
    }));
  };

  toggleAddModal = () => {
    this.setState(prevState => ({
      visibleAdd: !prevState.visibleAdd,
      formData: !prevState.visibleAdd ? {
        id: '',
        alias: '',
        department: '',
        users_to_send: [],
      } : prevState.formData
    }));
  };

  handleMultiSelect = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    this.setState({
      formData: {
        ...this.state.formData,
        users_to_send: selectedOptions
      }
    });
  };

  render() {
    const { filteredDepartments, formData, searchQuery, visibleUpdate, visibleAdd, users } = this.state;

    return (
      <>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Departments</strong>
              </CCardHeader>
              <CCardBody>
                <CCol md={4}>
                  <CInputGroup className="flex-nowrap mt-3 mb-4">
                    <CFormInput
                      placeholder="Search by Alias or Department"
                      aria-label="Search"
                      aria-describedby="addon-wrapping"
                      value={searchQuery}
                      onChange={this.handleSearchInputChange}
                    />
                    <CButton type="button" color="secondary" onClick={this.handleSearch}>
                      Search
                    </CButton>
                  </CInputGroup>
                </CCol>
                <CInputGroup className="flex-nowrap mt-3 mb-4">
                  <CTooltip content="Create new department">
                    <CButton type="button" color="primary" onClick={this.toggleAddModal}>
                      Create
                    </CButton>
                  </CTooltip>
                </CInputGroup>
                <CTable striped hover>
                  <CTableHead>
                    <CTableRow color="dark">
                      <CTableHeaderCell scope="col">Sl.No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Department Alias</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Users</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {filteredDepartments.length === 0 ? (
                      <CTableRow>
                        <CTableDataCell colSpan="5" className="text-center">No data available</CTableDataCell>
                      </CTableRow>
                    ) : (
                      filteredDepartments.map((department, index) => (
                        <CTableRow key={department.id}>
                          <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{department.dep_alias}</CTableDataCell>
                          <CTableDataCell>{department.department}</CTableDataCell>
                          <CTableDataCell>
                            {department.users_to_send && department.users_to_send.length > 0 && department.users_to_send.map(userId => {
                              const user = users.find(u => u.id === userId);
                              return user ? user.username : '';
                            }).join(', ')}
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="d-flex gap-2">
                              <CTooltip content="Edit">
                                <CButton style={{ fontSize: '10px', padding: '6px 10px' }} onClick={() => this.getRowData(department)}>
                                  <CIcon icon={cilPen} />
                                </CButton>
                              </CTooltip>
                              <CTooltip content="Delete">
                                <CButton style={{ fontSize: '10px', padding: '6px 10px' }} onClick={() => this.handleDelete(department.id)}>
                                  <CIcon icon={cilTrash} />
                                </CButton>
                              </CTooltip>
                            </div>
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    )}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <CModal
          size="lg"
          visible={visibleAdd}
          backdrop="static"
          keyboard={false}
          onClose={this.toggleAddModal}
          aria-labelledby="AddModalLabel"
        >
          <CModalHeader>
            <strong>Add Department</strong>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <CRow className="mb-3">
                <CFormLabel htmlFor="alias" className="col-sm-2 col-form-label"><strong>Department Alias:</strong></CFormLabel>
                <CCol md={4}>
                  <CFormInput
                        type="text"
                        id="alias"
                        name="alias"
                        value={formData.alias}
                        onChange={this.handleInputChange}
                      />
                    </CCol>
                    <CFormLabel htmlFor="department" className="col-sm-2 col-form-label"><strong>Department:</strong></CFormLabel>
                    <CCol md={4}>
                      <CFormInput
                        type="text"
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={this.handleInputChange}
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="users_to_send" className="col-sm-2 col-form-label"><strong>Users:</strong></CFormLabel>
                    <CCol md={10}>
                      <CFormSelect
                        id="users_to_send"
                        name="users_to_send"
                        multiple
                        value={formData.users_to_send}
                        onChange={this.handleMultiSelect}
                      >
                        {users.map(user => (
                          <option key={user.id} value={user.id}>
                            {user.username}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="justify-content-center">
                    <CCol xs={1}>
                      <div className='d-grid gap-2'>
                        <CButton color="primary" type="button" onClick={this.handleAdd}>Save</CButton>
                      </div>
                    </CCol>
                  </CRow>
                </CForm>
              </CModalBody>
            </CModal>
    
            <CModal
              size="lg"
              visible={visibleUpdate}
              backdrop="static"
              keyboard={false}
              onClose={this.toggleUpdateModal}
              aria-labelledby="UpdateModalLabel"
            >
              <CModalHeader>
                <strong>Update Department</strong>
              </CModalHeader>
              <CModalBody>
                <CForm>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="alias" className="col-sm-2 col-form-label"><strong>Department Alias:</strong></CFormLabel>
                    <CCol md={4}>
                      <CFormInput
                        type="text"
                        id="alias"
                        name="alias"
                        value={formData.alias}
                        onChange={this.handleInputChange}
                      />
                    </CCol>
                    <CFormLabel htmlFor="department" className="col-sm-2 col-form-label"><strong>Department:</strong></CFormLabel>
                    <CCol md={4}>
                      <CFormInput
                        type="text"
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={this.handleInputChange}
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="users_to_send" className="col-sm-2 col-form-label"><strong>Users:</strong></CFormLabel>
                    <CCol md={10}>
                      <CFormSelect
                        id="users_to_send"
                        name="users_to_send"
                        multiple
                        value={formData.users_to_send}
                        onChange={this.handleMultiSelect}
                      >
                        {users.map(user => (
                          <option key={user.id} value={user.id}>
                            {user.username}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="justify-content-center">
                    <CCol xs={1}>
                      <div className='d-grid gap-2'>
                        <CButton color="primary" type="button" onClick={this.handleUpdate}>Save</CButton>
                      </div>
                    </CCol>
                  </CRow>
                </CForm>
              </CModalBody>
            </CModal>
          </>
        );
      }
    }
    
    export default Parameter;