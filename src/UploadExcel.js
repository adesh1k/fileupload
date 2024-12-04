import React, { Component } from 'react';
import * as XLSX from 'xlsx';
import { make_cols } from './MakeColumns.js';
import './App.css';

class UploadExcel extends Component {

  state = {}
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: [],
      isEmpty: true, isLoading: false, error: '', success: '',
    }

    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  
  }
  

  handleChange(e) {
    console.log('handle on change')
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  };

  async handleFile() {
    try {

      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;


      reader.onload = async (e) => {
        console.log('reader on load even');
        /* Parse data */
        const bstr = e.target.result;
        const wb = await XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws);
        /* Update state */


        this.setState({ data: data, cols: make_cols(ws['!ref']), isEmpty: false });

        console.log('this.state)', this.state);

        this.fileupload(data);



      };
         debugger;
      if (rABS) {
        reader.readAsBinaryString(this.state.file);
      } else {
        reader.readAsArrayBuffer(this.state.file);
      };
    } catch (e) {
      console.log("Empty!");
    }
  }
  async fileupload(data) {

    try {
      const temp = data.map((element) => ({
        name: element.name,
        email: element.email,
        phone: String(element.phone),
      }));

      const api = "http://localhost:5297/api/User";
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(temp),
      });
      if (response.ok) {
        
        this.setState({ error: '', success: 'File uploaded successfully!' });
      } else {
        this.setState({ error: 'File upload failed', success: '',data:[] });

      }

    } catch (error) {

    } finally {

    }
  }
  


  render() {
    return (

      <div className='user-form'>
        <div className='heading'>
          {this.state.isLoading}
          {this.state.error && <p class='error-msg'>Error: {this.state.error}</p>}
          {this.state.success && <p class='success-msg'>Sucess: {this.state.success}</p>}
          <p>User Details Upload Excel</p>
        </div>

        <div className="mb-3">

          <br />
          <input type="file" className="form-control" id="file" accept=".xlsx" onChange={this.handleChange} />
          <br /><br />
          <button onClick={this.handleFile}>Upload</button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
             
            </tr>
          </thead>
          <tbody>
            {this.state.data?.map((item, i) => {
              return (
                <tr key={i + 1}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                 
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
    )
  }
}

export default UploadExcel;