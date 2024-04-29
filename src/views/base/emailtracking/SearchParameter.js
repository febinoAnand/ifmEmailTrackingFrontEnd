import React from 'react';
import axios from 'axios';
import { cilTrash, cilFilter, cilMagnifyingGlass } from '@coreui/icons';
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
  CInputGroupText,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormTextarea,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import BaseURL from 'src/assets/contants/BaseURL';

class SearchParameter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      hunt_word: '',
      message: '',
      usergroup: '',
      errors: {},
      successMessage: '',
      data: [],
      searchQuery: '',
      filteredData: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.get(BaseURL + 'EmailTracking/searchparameters')
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  postData = () => {
    const { name, hunt_word, message, usergroup } = this.state;
    axios.post(BaseURL + 'EmailTracking/searchparameters', {
      name,
      hunt_word,
      message,
      usergroup
    })
      .then(response => {
        console.log('Data added successfully:', response.data);
        this.setState({ successMessage: 'Data added successfully', errors: {} });
        this.fetchData();
      })
      .catch(error => {
        console.error('Error adding data:', error);
        if (error.response && error.response.data && error.response.data.hunt_word) {
          alert("Search parameter with this hunt word already exists.");
        } else {
          alert("Error adding data. Please try again later.");
        }
      });
  };

  updateData = (index) => {
    const { data, name, hunt_word, message,usergroup } = this.state;
    const updatedData = [...data];
    updatedData[index] = { name, hunt_word, message, usergroup };
    this.setState({ data: updatedData, successMessage: 'Data updated successfully', errors: {} });

    this.setState({ data: updatedData });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleAdd = (e) => {
    e.preventDefault();
    const errors = this.validate();
    if (Object.keys(errors).length === 0) {
      this.postData();
    } else {
      this.setState({ errors });
    }
  };

  handleUpdate = () => {
    const { data, hunt_word } = this.state;
    const itemToUpdate = data.find(item => item.hunt_word === hunt_word);
  
    if (itemToUpdate) {
      const index = data.indexOf(itemToUpdate);
      this.updateData(index);
    } else {
      alert("Enter the values");
    }
  };

  handleSearch = () => {
    const { data, searchQuery } = this.state;
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hunt_word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mobile.includes(searchQuery)
    );
    this.setState({ filteredData });
  };

  handleInputChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  validate = () => {
    const { name, hunt_word, message, usergroup} = this.state;
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Name is required';
    } else if (name.length > 20) {
      errors.name = 'Name must be less than 20 characters';
    }

    if (!hunt_word.trim()) {
      errors.hunt_word = 'Hunt word is required';
    } else if (hunt_word.length > 50) {
      errors.hunt_word = 'Hunt word must be less than 50 characters';
    }

    if (!message.trim()) {
      errors.message = 'Message is required';
    } else if (message.length > 250) {
      errors.message = 'Message must be less than 250 characters';
    }

    if (!usergroup.trim()) {
      errors.usergroup = 'User Group is required';
    }

    return errors;
  };

  render() {
    const { errors, successMessage, data, filteredData } = this.state;
    const itemsToDisplay = filteredData.length > 0 ? filteredData : data;

    return (
      <>
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Search Parameter</strong>
              </CCardHeader>
              <CCardBody>
                <CForm onSubmit={this.handleSubmit}>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">Name</CFormLabel>
                    <CCol md={6}>
                      <CFormInput type="text" id="name" name="name" onChange={this.handleChange} />
                      {errors.name && <div className="text-danger">{errors.name}</div>}
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="hunt_word" className="col-sm-2 col-form-label">Hunt Word</CFormLabel>
                    <CCol md={6}>
                      <CFormInput type="text" id="hunt_word" name="hunt_word" onChange={this.handleChange} />
                      {errors.hunt_word && <div className="text-danger">{errors.hunt_word}</div>}
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="message" className="col-sm-2 col-form-label">Message</CFormLabel>
                    <CCol md={6}>
                      <CFormTextarea id="message" name="message" rows={3} onChange={this.handleChange} />
                      {errors.message && <div className="text-danger">{errors.message}</div>}
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormLabel htmlFor="user_group" className="col-form-label">User Group</CFormLabel>
                    </CCol>
                      <CCol md={6}>
                      <CFormSelect id="button" >
                        <option></option>
                        <option>group 1</option>
                        <option>group 2</option>
                      </CFormSelect>
                      {errors.usergroup && <div className="text-danger">{errors.usergroup}</div>}
                  </CCol>
                  </CRow>
                  <CRow className="justify-content-center">
                  <CCol xs={1}>
                    <div className='d-grid gap-2'>
                        <CButton color="primary" type="submit" onClick={this.handleAdd}>Add</CButton>
                    </div>
                  </CCol>
                  <CCol xs={1}>
                    <div className='d-grid gap-2'>
                        <CButton color="primary" type="button" onClick={this.handleUpdate}>Update</CButton>
                    </div>
                  </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
              <CCardBody>
                <CInputGroup className="flex-nowrap mt-3 col-sg-3">
                  <CInputGroupText id="addon-wrapping">
                    <CIcon icon={cilMagnifyingGlass} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="addon-wrapping"
                    value={this.state.searchQuery}
                    onChange={this.handleInputChange}
                  />
                  <CButton type="button" color="secondary" onClick={this.handleSearch} id="button-addon2">
                    Search
                  </CButton>
                  <CButton color="primary">
                    <CIcon icon={cilFilter} />
                  </CButton>
                </CInputGroup>
                <CTable striped hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Hunt Word</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                      <CTableHeaderCell scope="col">User Group</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {itemsToDisplay.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{item.name}</CTableDataCell>
                        <CTableDataCell>{item.hunt_word}</CTableDataCell>
                        <CTableDataCell>{item.message}</CTableDataCell>
                        <CTableDataCell>{item.usergroup}</CTableDataCell>
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
    );
  }
}

export default SearchParameter;