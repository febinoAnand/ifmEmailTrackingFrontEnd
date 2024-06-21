import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { cilTrash, cilPen } from '@coreui/icons';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CInputGroup,
    CRow,
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
    CFormLabel,
    CForm
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import BaseURL from 'src/assets/contants/BaseURL';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userActive, setUserActive] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchQuery, users]);

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
        setUserActive(user.userActive);
        setModalVisible(true);
    };

    const handleToggleChange = (event) => {
        const { checked } = event.target;
        setUserActive(checked);
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(filteredUsers.map(user => user.user_id));
        }
        setSelectAll(!selectAll);
    };

    const handleSelectUser = (userId) => {
        const selectedIndex = selectedUsers.indexOf(userId);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = [...selectedUsers, userId];
        } else if (selectedIndex === 0) {
            newSelected = [...selectedUsers.slice(1)];
        } else if (selectedIndex === selectedUsers.length - 1) {
            newSelected = [...selectedUsers.slice(0, -1)];
        } else if (selectedIndex > 0) {
            newSelected = [
                ...selectedUsers.slice(0, selectedIndex),
                ...selectedUsers.slice(selectedIndex + 1),
            ];
        }

        setSelectedUsers(newSelected);
        setSelectAll(newSelected.length === filteredUsers.length);
    };

    const handleDeleteSelectedUsers = () => {
        selectedUsers.forEach(userId => {
            axios.delete(`${BaseURL}Userauth/delete-user/${userId}/`)
                .then(response => {
                    fetchUsers();
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                });
        });
        setSelectedUsers([]);
    };

    const handleUpdateUser = () => {
        if (!selectedUser || !selectedUser.userdetail_id) {
            console.error('Error: No user selected for update.');
            return;
        }

        const username = document.getElementById('name').value;
        const designation = document.getElementById('designation').value;
        const mobileno = document.getElementById('mobileno').value;

        if (!username || !designation || !mobileno) {
            console.error('Error: Username, designation, or mobile number cannot be empty.');
            return;
        }

        const updatedUser = {
            ...selectedUser,
            usermod: {
                ...selectedUser.usermod,
                username: username,
            },
            designation: designation,
            mobile_no: mobileno,
            userActive: userActive
        };

        axios.put(`${BaseURL}Userauth/userdetail/${selectedUser.userdetail_id}/`, updatedUser)
            .then(response => {
                console.log('User updated successfully:', response.data);
                fetchUsers();
                setModalVisible(false);
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    };

    const handleDeleteUser = (userId) => {
        axios.delete(`${BaseURL}Userauth/delete-user/${userId}/`)
            .then(response => {
                fetchUsers();
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    };

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <div className="d-flex align-items-center justify-content-between">
                                <strong>USER LIST</strong>
                                <CButton type="button" color="primary" size='sm' onClick={handleDeleteSelectedUsers}>
                                    Delete Selected
                                </CButton>
                            </div>
                        </CCardHeader>
                        <CCardBody>
                            <CCol md={4}>
                                <CInputGroup className="flex-nowrap mt-3 mb-4">
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
                                </CInputGroup>
                            </CCol>
                            <CTable striped hover>
                                <CTableHead>
                                    <CTableRow color="dark">
                                        <CTableHeaderCell scope="col">
                                            <input
                                                type="checkbox"
                                                checked={selectAll}
                                                onChange={handleSelectAll}
                                            />
                                        </CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Ext User</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Mobile No</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Device ID</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Active Status</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Expiry Time</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {filteredUsers.map((user, index) => (
                                        <CTableRow key={index}>
                                            <CTableDataCell>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedUsers.includes(user.user_id)}
                                                    onChange={() => handleSelectUser(user.user_id)}
                                                />
                                            </CTableDataCell>
                                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                            <CTableDataCell>{user.usermod.username}</CTableDataCell>
                                            <CTableDataCell>{user.designation}</CTableDataCell>
                                            <CTableDataCell>{user.mobile_no}</CTableDataCell>
                                            <CTableDataCell>{user.device_id}</CTableDataCell>
                                            <CTableDataCell>
                                                <span style={{ fontWeight: user.userActive ? 'bold' : 'bold', color: user.userActive ? 'green' : 'red' }}>
                                                    {user.userActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </CTableDataCell>
                                            <CTableDataCell>{user.expiry_time}</CTableDataCell>
                                            <CTableDataCell>
                                                <div className="d-flex gap-2">
                                                    <CButton onClick={() => handleTableRowClick(user)}>
                                                        <CIcon icon={cilPen} />
                                                    </CButton>
                                                    <CButton onClick={(e) => { e.stopPropagation(); handleDeleteUser(user.user_id); }}>
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
                    {selectedUser && (
                        <CForm>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">User Name</CFormLabel>
                                <CCol md={4}>
                                    <CFormInput type="text" id="name" name="name" defaultValue={selectedUser.usermod.username} readOnly  />
                                </CCol>
                                <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">Email Address</CFormLabel>
                                <CCol md={4}>
                                    <CFormInput type="text" id="email" name="email" defaultValue={selectedUser.usermod.email} readOnly />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="designation" className="col-sm-2 col-form-label">Designation</CFormLabel>
                                <CCol md={4}>
                                    <CFormInput type="text" id="designation" name="designation" defaultValue={selectedUser.designation} />
                                </CCol>
                                <CFormLabel htmlFor="mobileno" className="col-sm-2 col-form-label">Mobile N0</CFormLabel>
                                <CCol md={4}>
                                    <CFormInput type="text" id="mobileno" name="mobileno" defaultValue={selectedUser.mobile_no} />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="password" className="col-sm-2 col-form-label">Password</CFormLabel>
                                <CCol md={4}>
                                    <CFormInput type="text" id="password" name="password" readOnly />
                                </CCol>
                                <CFormLabel htmlFor="confirmpassword" className="col-sm-2 col-form-label">Confirm Password</CFormLabel>
                                <CCol md={4}>
                                    <CFormInput type="text" id="confirmpassword" name="confirmpassword" readOnly />
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
                    )}
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