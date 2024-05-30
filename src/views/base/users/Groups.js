import React, { useState, useEffect } from 'react';
import { cilFilter, cilMagnifyingGlass, cilPen } from '@coreui/icons';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormSwitch,
    CFormLabel,
    CForm,
    CRow,
    CInputGroup,
    CInputGroupText,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import BaseURL from 'src/assets/contants/BaseURL';

const Groups = () => {
    const [userData, setUserData] = useState([]);
    const [filteredUserData, setFilteredUserData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        handleSearch(searchQuery);
    }, [userData, searchQuery]);

    const fetchData = async () => {
        try {
            const responseGroups = await axios.get(BaseURL + 'Userauth/groups/');
            const groupData = responseGroups.data;
            const usersPromises = groupData.map(async group => {
                const responseUsers = await axios.get(BaseURL + `Userauth/groups/${group.id}/users/`);
                const usersData = responseUsers.data.map(user => ({
                    id: user.id,
                    name: group.name,
                    ...user
                }));
                return usersData;
            });
            const usersResponses = await Promise.all(usersPromises);
            const allUsers = usersResponses.flat();
            setUserData(allUsers);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleUsernameChange = (event) => {
        const newValue = event.target.value;
        setSelectedUser(prevUser => ({
            ...prevUser,
            username: newValue
        }));
    };

    const handleUpdateUser = async () => {
        try {
            if (!selectedUser) return;

            const response = await axios.put(BaseURL + `Userauth/groups/${selectedUser.id}/add-users/`, {
                username: selectedUser.username
            });
            const updatedUser = response.data;
            setUserData(prevData => prevData.map(user => user.id === updatedUser.id ? updatedUser : user));
            setSelectedUser(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleSearch = (query) => {
      setSearchQuery(query);
      if (!userData) return;
    
      if (query === '') {
        setFilteredUserData(userData);
      } else {
        const lowercasedQuery = query.toLowerCase();
        const filteredData = userData.filter(user => {
          const name = user.name?.toLowerCase() || '';
          const email = user.email?.toLowerCase() || '';
          const username = user.username?.toLowerCase() || '';
          const mobileNo = user.mobile_no?.toLowerCase() || '';
    
          return (
            name.includes(lowercasedQuery) ||
            email.includes(lowercasedQuery) ||
            username.includes(lowercasedQuery) ||
            mobileNo.includes(lowercasedQuery)
          );
        });
        setFilteredUserData(filteredData);
      }
    };    

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Trigger</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CForm>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="group" className="col-sm-2 col-form-label">Group</CFormLabel>
                                    <CCol md={6}>
                                        <CFormInput type="text" id="group" name="group" value={selectedUser ? selectedUser.name : ''} readOnly />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">User Name</CFormLabel>
                                    <CCol md={6}>
                                        <CFormInput type="text" id="name" name="name" value={selectedUser ? selectedUser.username : ''} onChange={handleUsernameChange} />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">Email Address</CFormLabel>
                                    <CCol md={6}>
                                        <CFormInput type="text" id="email" name="email" value={selectedUser ? selectedUser.email : ''} readOnly />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="mobileno" className="col-sm-2 col-form-label">Mobile Number</CFormLabel>
                                    <CCol md={6}>
                                        <CFormInput type="text" id="mobileno" name="mobileno" value={selectedUser ? selectedUser.mobile_no : ''} readOnly />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="toggle" className="col-sm-2 col-form-label">Login Status</CFormLabel>
                                    <CCol md={6}>
                                        <CFormSwitch defaultChecked />
                                    </CCol>
                                </CRow>
                                <CRow className="justify-content-center">
                                    <CCol md="auto">
                                        <CButton color="primary" onClick={handleUpdateUser}>Update</CButton>
                                    </CCol>
                                </CRow>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>USER LIST</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CCol md={4}>
                                <CInputGroup className="flex-nowrap mt-3 col-sg-3">
                                    <CInputGroupText id="addon-wrapping"><CIcon icon={cilMagnifyingGlass} /></CInputGroupText>
                                    <CFormInput
                                        placeholder="Search by Subject or Message"
                                        aria-label="Search"
                                        aria-describedby="addon-wrapping"
                                        value={searchQuery}
                                        onChange={(e) => handleSearch(e.target.value)}
                                    />
                                    <CButton type="button" color="secondary" id="button-addon2">
                                        Search
                                    </CButton>
                                </CInputGroup>
                            </CCol>
                            <CCol className='mb-3'></CCol>
                            <CTable striped hover>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Groups</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Mobile No</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {filteredUserData.map((user, index) => (
                                        <CTableRow
                                            key={user.id}
                                            onClick={() => handleUserSelect(user)}
                                        >
                                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                            <CTableDataCell>{user.name}</CTableDataCell>
                                            <CTableDataCell>{user.email}</CTableDataCell>
                                            <CTableDataCell>{user.username}</CTableDataCell>
                                            <CTableDataCell>{user.mobile_no}</CTableDataCell>
                                            <CTableDataCell>
                                                <div className="d-flex gap-2">
                                                    <CButton>
                                                        <CIcon icon={cilPen} />
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
        </>
    )
}

export default Groups;