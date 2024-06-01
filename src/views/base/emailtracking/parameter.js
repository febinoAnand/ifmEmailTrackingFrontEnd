import React from 'react';
import axios from 'axios';
import { cilTrash, cilMagnifyingGlass, cilPen } from '@coreui/icons';
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
  CModal,
  CModalHeader,
  CModalBody,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import BaseURL from 'src/assets/contants/BaseURL';

class Parameter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parameters: [],
      filteredParameters: [],
      formData: {
        id: '',
        alias: '',
        field: '',
        datatype: '',
      },
      searchQuery: '',
      visibleUpdate: false,
      visibleAdd: false,
    };
  }

  componentDidMount() {
    this.fetchParameters();
  }

  fetchParameters = () => {
    axios.get(BaseURL + "emailtracking/parameter/")
      .then(response => {
        this.setState({ parameters: response.data.reverse(), filteredParameters: response.data.reverse() });
      })
      .catch(error => {
        console.error('Error fetching parameters:', error);
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
    axios.post(BaseURL + "emailtracking/parameter/", formData)
      .then(response => {
        console.log('Parameter added successfully:', response.data);
        this.setState({ formData: { id: '', alias: '', field: '', datatype: '' } });
        this.fetchParameters();
        this.toggleAddModal();
      })
      .catch(error => {
        console.error('Error adding parameter:', error);
      });
  };

  handleUpdate = () => {
    const { formData } = this.state;
    const { id } = formData;

    axios.put(`${BaseURL}emailtracking/parameter/${id}/`, formData)
      .then(response => {
        console.log('Parameter updated successfully:', response.data);
        this.setState({
          formData: {
            id: '',
            alias: '',
            field: '',
            datatype: ''
          }
        });
        this.fetchParameters();
        this.toggleUpdateModal();
      })
      .catch(error => {
        console.error('Error updating parameter:', error);
      });
  };

  getRowData = (parameter) => {
    const { id, alias, field, datatype } = parameter;
    this.setState({
      formData: {
        id: id,
        alias: alias,
        field: field,
        datatype: datatype,
      },
      visibleUpdate: true,
    });
  };

  handleDelete = (id) => {
    axios.delete(`${BaseURL}emailtracking/parameter/${id}/`)
      .then(response => {
        console.log('Parameter deleted successfully');
        this.setState(prevState => ({
          parameters: prevState.parameters.filter(parameter => parameter.id !== id),
          filteredParameters: prevState.filteredParameters.filter(parameter => parameter.id !== id),
        }));
      })
      .catch(error => {
        console.error('Error deleting parameter:', error);
      });
  };

  handleSearch = () => {
    const { parameters, searchQuery } = this.state;
    const filteredParameters = parameters.filter(parameter =>
      parameter.alias.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parameter.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parameter.datatype.toLowerCase().includes(searchQuery.toLowerCase())
    );
    this.setState({ filteredParameters });
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
    }));
  };

  render() {
    const { filteredParameters, formData, searchQuery, visibleUpdate, visibleAdd } = this.state;

    return (
      <>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Parameters</strong>
              </CCardHeader>
              <CCardBody>
                <CCol md={4}>
                  <CInputGroup className="flex-nowrap mt-3 col-sg-3">
                    <CInputGroupText id="addon-wrapping"><CIcon icon={cilMagnifyingGlass} /></CInputGroupText>
                    <CFormInput
                      placeholder="Search by Alias, Field, or Data Type"
                      aria-label="Search"
                      aria-describedby="addon-wrapping"
                      value={searchQuery}
                      onChange={this.handleSearchInputChange}
                    />
                    <CButton type="button" color="secondary" onClick={this.handleSearch}>
                      Search
                    </CButton>
                    <CButton type="button" color="primary"  onClick={this.toggleAddModal}>
                      Add
                    </CButton>
                  </CInputGroup>
                </CCol>
                <CTable striped hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Alias</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Field</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Data Type</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {filteredParameters.map((parameter, index) => (
                      <CTableRow key={parameter.id} onClick={() => this.getRowData(parameter)}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{parameter.alias}</CTableDataCell>
                        <CTableDataCell>{parameter.field}</CTableDataCell>
                        <CTableDataCell>{parameter.datatype}</CTableDataCell>
                        <CTableDataCell>
                          <div className="d-flex gap-2">
                            <CButton>
                              <CIcon onClick={this.toggleUpdateModal} icon={cilPen} />
                            </CButton>
                            <CButton onClick={(e) => { e.stopPropagation(); this.handleDelete(parameter.id) }}><CIcon icon={cilTrash} /></CButton>
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

        <CModal
          visible={visibleAdd}
          onClose={this.toggleAddModal}
          aria-labelledby="AddModalLabel"
        >
          <CModalHeader>
            <strong>Add Parameter</strong>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <CRow className="mb-3">
                <CFormLabel htmlFor="alias" className="col-sm-2 col-form-label">Alias</CFormLabel>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="alias"
                    name="alias"
                    value={formData.alias}
                    onChange={this.handleInputChange}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="field" className="col-sm-2 col-form-label">Field</CFormLabel>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="field"
                    name="field"
                    value={formData.field}
                    onChange={this.handleInputChange}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="datatype" className="col-sm-2 col-form-label">Data Type</CFormLabel>
                <CCol md={6}>
                  <CFormSelect
                    id="datatype"
                    name="datatype"
                    value={formData.datatype}
                    onChange={this.handleInputChange}
                  >
                    <option value="">Select Data Type</option>
                    <option value="character">Character</option>
                    <option value="number">Number</option>
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
          visible={visibleUpdate}
          onClose={this.toggleUpdateModal}
          aria-labelledby="UpdateModalLabel"
        >
          <CModalHeader>
            <strong>Update Parameter</strong>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <CRow className="mb-3">
                <CFormLabel htmlFor="alias" className="col-sm-2 col-form-label">Alias</CFormLabel>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="alias"
                    name="alias"
                    value={formData.alias}
                    onChange={this.handleInputChange}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="field" className="col-sm-2 col-form-label">Field</CFormLabel>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="field"
                    name="field"
                    value={formData.field}
                    onChange={this.handleInputChange}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="datatype" className="col-sm-2 col-form-label">Data Type</CFormLabel>
                <CCol md={6}>
                  <CFormSelect
                    id="datatype"
                    name="datatype"
                    value={formData.datatype}
                    onChange={this.handleInputChange}
                  >
                    <option value="">Select Data Type</option>
                    <option value="character">Character</option>
                    <option value="number">Number</option>
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="justify-content-center">
                <CCol xs={1}>
                  <div className='d-grid gap-2'>
                    <CButton color="primary" type="submit" onClick={this.handleUpdate}>Save</CButton>
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