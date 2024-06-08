import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import { cilMagnifyingGlass, cilTrash, cilPen } from '@coreui/icons';
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
    CForm,
    CFormLabel,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CFormSwitch,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import BaseURL from 'src/assets/contants/BaseURL';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [userActive, setUserActive] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchQuery]);

    const fetchUsers = () => {
        axios.get(BaseURL + 'Userauth/userdetail/')
            .then(response => {
                setUsers(response.data);
                setFilteredUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    };

    const handleSearch = () => {
        const filtered = users.filter(user => {
            const searchFields = [
                user.usermod.username,
                user.designation,
                user.mobile_no,
                user.device_id,
                user.auth_state,
                user.expiry_time,
            ];
            const query = searchQuery.toLowerCase();
            return searchFields.some(field =>
                field ? field.toString().toLowerCase().includes(query) : false
            );
        });
        setFilteredUsers(filtered);
    };

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleTableRowClick = (user) => {
        setSelectedUser(user);
        setModalVisible(true);
        setUserActive(user.userActive);
        document.getElementById('name').value = user.usermod.username;
        document.getElementById('email').value = user.usermod.email;
        document.getElementById('designation').value = user.designation;
        document.getElementById('mobileno').value = user.mobile_no;
    };

    const handleToggleChange = (event) => {
      const { checked } = event.target;
      setUserActive(checked);
  };

const handleDeleteUser = (userdetailId) => {
    axios.delete(`${BaseURL}Userauth/userdetail/${userdetailId}/`)
        .then(response => {
            fetchUsers();
        })
        .catch(error => {
            console.error('Error deleting user:', error);
        });
};

const handleUpdateUser = () => {
  if (!selectedUser || !selectedUser.userdetail_id) {
      console.error('Error: No user selected for update.');
      return;
  }

  const designation = document.getElementById('designation').value;
  const mobileno = document.getElementById('mobileno').value;

  if (!designation || !mobileno) {
      console.error('Error: Designation or mobile number cannot be empty.');
      return;
  }

  const updatedUser = {
      userdetail_id: selectedUser.userdetail_id,
      user_id: selectedUser.user_id,
      usermod: {
          id: selectedUser.usermod.id,
          username: selectedUser.usermod.username,
          email: selectedUser.usermod.email,
          first_name: selectedUser.usermod.first_name,
          last_name: selectedUser.usermod.last_name
      },
      designation: designation,
      mobile_no: mobileno,
      device_id: selectedUser.device_id,
      auth_state: selectedUser.auth_state,
      expiry_time: selectedUser.expiry_time,
      userActive: userActive
  };

  axios.put(`${BaseURL}Userauth/userdetail/${selectedUser.userdetail_id}/`, updatedUser)
      .then(response => {
          console.log('User updated successfully:', response.data);
          fetchUsers();
      })
      .catch(error => {
          console.error('Error updating user:', error);
      });
};

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>USER LIST</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CCol md={4}>
                                <CInputGroup className="flex-nowrap mt-3 mb-4">
                                    <CInputGroupText id="addon-wrapping"><CIcon icon={cilMagnifyingGlass}/></CInputGroupText>
                                    <CFormInput
                                        placeholder="Search by Subject or Message"
                                        aria-label="Search"
                                        aria-describedby="addon-wrapping"
                                        value={searchQuery}
                                        onChange={handleInputChange}
                                    />
                                    <CButton type="button" color="secondary" onClick={handleSearch} id="button-addon2">
                                        Search
                                    </CButton>
                                    {/* <CButton color="primary">
                                        <CIcon icon={cilFilter} />
                                    </CButton> */}
                                </CInputGroup>
                            </CCol>
                            <CTable striped hover>
                                <CTableHead>
                                    <CTableRow color="dark">
                                        <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Ext User</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Mobile No</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Device ID</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Auth State</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Expiry Time</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {filteredUsers.map((user, index) => (
                                        <CTableRow key={index} onClick={() => handleTableRowClick(user)}>
                                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                            <CTableDataCell>{user.usermod.username}</CTableDataCell>
                                            <CTableDataCell>{user.designation}</CTableDataCell>
                                            <CTableDataCell>{user.mobile_no}</CTableDataCell>
                                            <CTableDataCell>{user.device_id}</CTableDataCell>
                                            <CTableDataCell>{user.auth_state}</CTableDataCell>
                                            <CTableDataCell>{user.expiry_time}</CTableDataCell>
                                            <CTableDataCell>
                                                <div className="d-flex gap-2">
                                                    <CButton>
                                                        <CIcon icon={cilPen} />
                                                    </CButton>
                                                    <CButton onClick={() => handleDeleteUser(user.userdetail_id)}>
                                                        <CIcon icon={cilTrash} />
                                                    </CButton>
                                                </div>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CModal size='lg' visible={modalVisible} onClose={() => setModalVisible(false)} backdrop="static" keyboard={false}>
                <CModalHeader onClose={() => setModalVisible(false)}>
                    <CModalTitle>User Details</CModalTitle>
                    </CModalHeader>
                        <CModalBody>
                            <CForm>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">User Name</CFormLabel>
                                    <CCol md={6}>
                                        <CFormInput type="text" id="name" name="name" />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">Email Address</CFormLabel>
                                    <CCol md={6}>
                                        <CFormInput type="text" id="email" name="email" readOnly/>
                                    </CCol>
                                </CRow>
                      <CRow className="mb-3">
                        <CFormLabel htmlFor="designation" className="col-sm-2 col-form-label">Designation</CFormLabel>
                        <CCol md={6}>
                          <CFormInput type="text" id="designation" name="designation" />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel htmlFor="mobileno" className="col-sm-2 col-form-label">Mobile Number</CFormLabel>
                        <CCol md={6}>
                          <CFormInput type="text" id="mobileno" name="mobileno" readOnly/>
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel htmlFor="password" className="col-sm-2 col-form-label">Password</CFormLabel>
                        <CCol md={6}>
                          <CFormInput type="text" id="password" name="password" readOnly/>
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel htmlFor="confirmpassword" className="col-sm-2 col-form-label">Confirm Password</CFormLabel>
                        <CCol md={6}>
                          <CFormInput type="text" id="confirmpassword" name="confirmpassword" readOnly/>
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                          <CFormLabel htmlFor="toggle" className="col-sm-2 col-form-label">Active Status</CFormLabel>
                          <CCol md={6}>
                          <CFormSwitch
                              id="toggle"
                              checked={userActive}
                              onChange={handleToggleChange}
                          />
                          </CCol>
                        </CRow>
                      <CRow className="justify-content-center">
                        <CCol md="auto">
                          <CButton color="primary" onClick={handleUpdateUser}>Update</CButton>
                        </CCol>
                      </CRow>
                      </CForm>
                    </CModalBody>
                <CModalFooter>
                <CButton color="secondary" onClick={() => setModalVisible(false)}>
                    Close
                </CButton>
                </CModalFooter>
      </CModal>
        </>
    );
};

export default Users;