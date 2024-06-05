import React, { useState, useEffect } from 'react';
import { cilMagnifyingGlass, cilPen } from '@coreui/icons';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
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
    CFormSelect,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import BaseURL from 'src/assets/contants/BaseURL';

const Groups = () => {
    const [groupData, setGroupData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [filteredGroupData, setFilteredGroupData] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchGroupData();
        fetchUserData();
    }, []);

    useEffect(() => {
        handleSearch(searchQuery);
    }, [groupData, searchQuery]);

    const fetchGroupData = async () => {
        try {
            const response = await axios.get(BaseURL + "app/groups/");
            setGroupData(response.data);
            setFilteredGroupData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching group data:', error);
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.get(BaseURL + "Userauth/userdetail/");
            setUserData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleGroupSelect = (group) => {
        setSelectedGroup(group);
        setModalVisible(true);
    };

    const handleUserSetChange = (event) => {
        const options = event.target.options;
        const selectedUsers = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                selectedUsers.push(parseInt(options[i].value));
            }
        }
        setSelectedGroup(prevGroup => ({
            ...prevGroup,
            user_set: selectedUsers
        }));
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (!groupData) return;

        if (query === '') {
            setFilteredGroupData(groupData);
        } else {
            const lowercasedQuery = query.toLowerCase();
            const filteredData = groupData.filter(group => {
                const name = group.name?.toLowerCase() || '';
                const userSet = group.user_set ? group.user_set.map(userId => userId.toString().toLowerCase()).join(' ') : '';

                return (
                    name.includes(lowercasedQuery) ||
                    userSet.includes(lowercasedQuery)
                );
            });
            setFilteredGroupData(filteredData);
        }
    };

    const handleUpdateGroup = async () => {
        try {
            await axios.put(`${BaseURL}app/groups/${selectedGroup.id}/`, selectedGroup);
            fetchGroupData();
            setSelectedGroup(null);
        } catch (error) {
            console.error('Error updating group:', error);
        }
    };

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Group LIST</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CCol md={4}>
                                <CInputGroup className="flex-nowrap mt-3 mb-4">
                                    <CInputGroupText id="addon-wrapping"><CIcon icon={cilMagnifyingGlass} /></CInputGroupText>
                                    <CFormInput
                                        placeholder="Search by Group Name or User IDs"
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
                                        <CTableHeaderCell scope="col">Group</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">User-Email</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Mobile No</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {filteredGroupData.map((group, index) => (
                                        <CTableRow
                                            key={group.id}
                                            onClick={() => handleGroupSelect(group)}
                                        >
                                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                            <CTableDataCell>{group.name}</CTableDataCell>
                                            <CTableDataCell>{group.user_details.map(user => user.email).join(', ')}</CTableDataCell>
                                            <CTableDataCell>{group.user_details.map(user => user.mobile_no).join(', ')}</CTableDataCell>
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
            <CModal size='lg' visible={modalVisible} onClose={() => setModalVisible(false)} backdrop="static" keyboard={false}>
                <CModalHeader onClose={() => setModalVisible(false)}>
                    <CModalTitle>Groups Details</CModalTitle>
                        </CModalHeader>
                            <CModalBody>
                                <CForm>
                                    <CRow className="mb-3">
                                    <CFormLabel htmlFor="group" className="col-sm-2 col-form-label">Group</CFormLabel>
                                    <CCol md={6}>
                                        <CFormInput type="text" id="group" name="group" value={selectedGroup ? selectedGroup.name : ''} readOnly />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">User List</CFormLabel>
                                    <CCol md={6}>
                                        <CFormSelect id="name" name="name" multiple value={selectedGroup ? selectedGroup.user_set : []} onChange={handleUserSetChange}>
                                            {userData.map(user => (
                                                <option key={user.usermod.id} value={user.usermod.id}>{user.usermod.username}</option>
                                            ))}
                                        </CFormSelect>
                                    </CCol>
                                </CRow>
                                <CRow className="justify-content-center">
                                    <CCol md="auto">
                                        <CButton color="primary" onClick={handleUpdateGroup}>Update</CButton>
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

export default Groups;