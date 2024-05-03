import React, { useState, useEffect }  from 'react'
import BaseURL from 'src/assets/contants/BaseURL';
import { cilTrash, cilFilter, cilMagnifyingGlass } from '@coreui/icons';

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    // CFormCheck,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CRow,
    CInputGroup,
    CInputGroupText,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
  } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import axios from 'axios';


const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [filteredgroups, setFilteredgroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRow ,setSelectedRow] = useState([]);
  const [ItemSelecte ,setItemSelecte] = useState([]);
  
  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = () => {
    axios.get(BaseURL + 'EmailTracking/groupemailtracking')
      .then(response => {
        console.log(response.data);
        setGroups(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };
  const handleSearch = () => {
    const filteredgroups = groups.filter(group =>
      group.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredgroups(filteredgroups);
  };

  const handleAdd = () => {
    const groupName = document.getElementById("GroupName").value;
    const selectedUserList = Array.from(document.getElementById("userlist").selectedOptions).map(option => option.value);
    const newData = {
        user_group: groupName,
        user_list: selectedUserList,
    };

    axios.post(BaseURL + 'EmailTracking/groupemailtracking', newData)
        .then(response => {
            console.log("Data added successfully:", response.data);
            fetchGroups();
        })
        .catch(error => {
            console.error('Error adding data:', error);
        });
};

  const handleUpdate = () => {
    console.log("Updating group:", selectedRow);
    if (!selectedRow || !selectedRow.user_group) {
        console.error("No group selected for update");
        return;
    }
    const updatedData = {
        user_group: selectedRow.user_group,
        user_list: ItemSelecte,
    };

    console.log("Updated data:", updatedData);

    const url = BaseURL + 'EmailTracking/groupemailtracking';
    console.log("Request URL:", url);

    axios.put(url, updatedData)
        .then(response => {
            console.log("Group updated successfully:", response.data);
            fetchGroups();
        })
        .catch(error => {
            console.error('Error updating group:', error);
        });
  };
  
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRowClick = (group) =>{
    setSelectedRow(group);
    console.log(group);
  };

  const handleMultipleSelect = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    if (selectedOptions.length > 0) {
      const lastSelectedOption = selectedOptions[selectedOptions.length - 1];
      let markUntilNext = false;
      const options = event.target.options;
      for (let i = 0; i < options.length; i++) {
        if (markUntilNext || options[i].value === lastSelectedOption) {
          options[i].selected = true;
          markUntilNext = true;
        } else {
          options[i].selected = false;
        }
      }
    }
    setItemSelecte(selectedOptions);
    console.log("Selected Row",selectedRow);
    console.log(selectedOptions);
  };
  
  const groupsToDisplay = filteredgroups.length > 0 ? filteredgroups : groups || [];

    return (
      <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>USER LIST</strong>
            </CCardHeader>
            <CCardBody>
            <CRow className="mb-3">
                <CFormLabel htmlFor="GroupName" className="col-sm-2 col-form-label">Group Name</CFormLabel>
                <CCol sm={10}>
                    <CFormInput type="text" id="GroupName" name="GroupName" value={selectedRow.user_group}/>
                </CCol>
            </CRow>
            <CRow className="mb-3">
                <CFormLabel htmlFor="userlist" className="col-sm-2 col-form-label">User List</CFormLabel>
                <CCol sm={10}>
                    <CFormSelect aria-label="Default select example" id="userlist" multiple value={ItemSelecte} onChange={handleMultipleSelect}>
                      {groups.map((group, index) => (
                          <option key={index} value={group.user_group}>{group.user_list}</option>
                      ))}
                    </CFormSelect>
                </CCol> 
            </CRow>
            <CRow className="justify-content-center">
                <CCol xs={1}>
                  <div className='d-grid gap-2'>
                    <CButton color="primary" type="submit" onClick={handleAdd}>Add</CButton>
                  </div>
                </CCol>
                <CCol xs={1}>
                  <div className='d-grid gap-2'>
                    <CButton color="primary" onClick={handleUpdate}>Update</CButton>
                  </div>
                </CCol>
            </CRow>
            </CCardBody>
            <CCardBody>
            <CCol md={12}>
            <CInputGroup className="flex-nowrap mt-3 col-sg-3">
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
                <CButton color="primary">
                    <CIcon icon={cilFilter} />
                </CButton>
              </CInputGroup>
            </CCol>
            <CCol className='mb-3'>
            </CCol>
                <CTable striped hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Users</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Count</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                  {groupsToDisplay.map((group, index) => (
                      <CTableRow key={index} onClick={ () =>handleRowClick(group)}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{group.user_group}</CTableDataCell>
                        <CTableDataCell>{group.user_list}</CTableDataCell>
                        <CTableDataCell>{group.user_list_count}</CTableDataCell>
                        <CTableDataCell>
                          <CButton><CIcon icon={cilTrash} /></CButton>
                        </CTableDataCell>
                      </CTableRow>
                  ))}
                  </CTableBody>
                </CTable>
                <CRow className="justify-content-center">
                  <CCol md="auto">
                    <CButton color="primary">Download</CButton>
                  </CCol>
                </CRow>
              </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      </>
    )
}

export default Groups