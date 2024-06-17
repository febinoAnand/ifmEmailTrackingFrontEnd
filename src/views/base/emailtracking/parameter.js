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
      parameters: [],
      filteredParameters: [],
      group_details: [],
      formData: {
        id: '',
        alias: '',
        field: '',
        color:'',
        datatype: '',
        groups: [],
        group_details: [],
      },
      searchQuery: '',
      visibleUpdate: false,
      visibleAdd: false,
      groups: [],
    };
  }

  componentDidMount() {
    this.fetchParameters();
    this.fetchGroups();
  }

  fetchGroups = () => {
    axios.get(BaseURL + "app/groups/")
      .then(response => {
        this.setState({ groups: response.data });
      })
      .catch(error => {
        console.error('Error fetching groups:', error);
      });
  };

  fetchParameters = () => {
    axios.get(BaseURL + "emailtracking/parameter/")
      .then(response => {
        const reversedData = response.data.reverse();
        this.setState({ parameters: reversedData, filteredParameters: reversedData });
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
    const { id, alias, field, datatype , groups } = parameter;

    this.setState({
        formData: {
            id: id,
            alias: alias,
            field: field,
            datatype: datatype,
            groups: groups,
        },
        visibleUpdate: true,
    });

    console.log(groups);
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

  handleMultiSelect = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    this.setState({
        formData: {
            ...this.state.formData,
            groups: selectedOptions
        }
    });
};

  render() {
    const { filteredParameters, formData, searchQuery, visibleUpdate, visibleAdd, groups } = this.state;

    return (
      <>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Fields</strong>
              </CCardHeader>
              <CCardBody>
                <CCol md={4}>
                  <CInputGroup className="flex-nowrap mt-3 mb-4">
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
                  </CInputGroup>
                </CCol>
                <CInputGroup className="flex-nowrap mt-3 mb-4">
                <CTooltip content="Create new parameter">
                  <CButton type="button" color="primary" onClick={this.toggleAddModal}>
                    Create
                  </CButton>
                </CTooltip>
                </CInputGroup>
                <CTable striped hover>
                  <CTableHead>
                    <CTableRow color="dark">
                      <CTableHeaderCell scope="col">Sl.No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Alias</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Field</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Data Type</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Groups</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {filteredParameters.map((parameter, index) => (
                      <CTableRow key={parameter.id}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{parameter.alias}</CTableDataCell>
                        <CTableDataCell>
                          <span style={{
                            display: 'inline-block',
                            padding: '5px 10px',
                            borderRadius: '12px',
                            backgroundColor: parameter.color,
                            color: 'white',
                            fontWeight: 'bold'
                          }}>
                            {parameter.field}
                          </span>
                        </CTableDataCell>
                        <CTableDataCell>{parameter.datatype}</CTableDataCell>
                        <CTableDataCell>
                        {parameter.group_details && parameter.group_details.length > 0 && parameter.group_details[0].user_list.map(user => user.username).join(', ')}
                      </CTableDataCell>
                        <CTableDataCell>
                          <div className="d-flex gap-2">
                            <CTooltip content="Edit">
                              <CButton  style={{ fontSize: '10px', padding: '6px 10px' }}  onClick={() => this.getRowData(parameter)}>
                                <CIcon icon={cilPen} />
                              </CButton>
                            </CTooltip>
                            <CTooltip content="Delete">
                              <CButton  style={{ fontSize: '10px', padding: '6px 10px' }} onClick={(e) => { e.stopPropagation(); this.handleDelete(parameter.id) }}><CIcon icon={cilTrash} /></CButton>
                            </CTooltip>
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
          size="lg"
          visible={visibleAdd}
          backdrop="static" 
          keyboard={false}
          onClose={this.toggleAddModal}
          aria-labelledby="AddModalLabel"
        >
          <CModalHeader>
            <strong>Add Parameter</strong>
          </CModalHeader>
          <CModalBody>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ flex: 1, marginLeft: '20px', justifyContent: 'center' }}>
                <CForm>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="alias" className="col-sm-2 col-form-label"><strong>Alias:</strong></CFormLabel>
                    <CCol md={10}>
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
                    <CFormLabel htmlFor="field" className="col-sm-2 col-form-label"><strong>Field:</strong></CFormLabel>
                    <CCol md={10}>
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
                    <CFormLabel htmlFor="datatype" className="col-sm-2 col-form-label"><strong>Data Type:</strong></CFormLabel>
                    <CCol md={10}>
                      <CFormSelect
                        id="datatype"
                        name="datatype"
                        value={formData.datatype}
                        onChange={this.handleInputChange}
                      >
                        <option value="">Select Type</option>
                        <option value="character">Character</option>
                        <option value="number">Number</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="name" className="col-sm-2 col-form-label"><strong>Groups:</strong></CFormLabel>
                    <CCol md={10}>
                    <CFormSelect
                        id="groups"
                        name="groups"
                        multiple
                        value={formData.groups}
                        onChange={this.handleMultiSelect}
                    >
                        {groups.map(group => (
                        <option key={group.id} value={group.id}>
                            {group.name}
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
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black' }}>
                <div style={{ width: '200px', height: '200px',fontSize:12, backgroundColor: 'lightgray', borderRadius: '10px', textAlign: 'center' }}>
                  <p> 
                    <br /> * Alias is selected for giving an unique name.
                    <br /> * In the Fields the needed parameter is given.
                    <br /> * In the types in which formate the data can be readed is given.
                    <br /> * the user required  groups where the data can be send is selected in groups.
                  </p>
                </div>
              </div>
            </div>
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
            <strong>Update Parameter</strong>
          </CModalHeader>
          <CModalBody>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ flex: 1, marginLeft: '20px', justifyContent: 'center' }}>
            <CForm>
              <CRow className="mb-3">
                <CFormLabel htmlFor="alias" className="col-sm-2 col-form-label"><strong>Alias:</strong></CFormLabel>
                <CCol md={10}>
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
                <CFormLabel htmlFor="field" className="col-sm-2 col-form-label"><strong>Field:</strong></CFormLabel>
                <CCol md={10}>
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
                <CFormLabel htmlFor="datatype" className="col-sm-2 col-form-label"><strong>Data Type:</strong></CFormLabel>
                <CCol md={10}>
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
              <CRow className="mb-3">
                <CFormLabel htmlFor="groups" className="col-sm-2 col-form-label"><strong>Groups:</strong></CFormLabel>
                <CCol md={10}>
                <CFormSelect
                    id="groups"
                    name="groups"
                    multiple
                    value={formData.groups}
                    onChange={this.handleMultiSelect}
                >
                    {groups.map(group => (
                        <option key={group.id} value={group.id}>
                            {group.name}
                        </option>
                    ))}
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
            </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black' }}>
                <div style={{ width: '200px', height: '200px',fontSize:12, backgroundColor: 'lightgray', borderRadius: '10px', textAlign: 'center' }}>
                  <p> 
                    <br /> * Alias is selected for giving an unique name.
                    <br /> * In the Fields the needed parameter is given.
                    <br /> * In the types in which formate the data can be readed is given.
                    <br /> * the user required  groups where the data can be send is selected in groups.
                  </p>
                </div>
              </div>
            </div>
          </CModalBody>
        </CModal>
      </>
    );
  }
}

export default Parameter;