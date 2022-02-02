import React, { Component } from "react";
import Axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    file: null,
    fileImage: "",
    rslt: "",
  };

  saveFile(input) {
    let file = input.target.files[0];
    this.setState({ file: file });
    var reader = new FileReader();
    reader.onload = function (e) {
      this.setState({ fileImage: e.target.result });
    }.bind(this);

    
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);
    Axios.post("http://localhost:3002/read-picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((resp) => {
      this.setState({
        rslt: resp.data,
      });
    }).catch(err=>{
      this.setState({
        rslt: "Error occured! can't get Result from backend",
      });
    });
  }

  render() {
    return (
      <div className="App">
        <nav>Amazigh Detection</nav>
        <div className="contentPage">
          <input
            hidden
            onChange={(e) => {
              this.saveFile(e);
            }}
            accept="image/png, image/jpeg"
            type="file"
            id="idInputFile"
          />
          {this.state.file == null ? (
            <div
              onClick={() => {
                document.getElementById("idInputFile").click();
              }}
              className="uploadImageBox"
            >
              <img alt="..." src="/upload.png" />
              <p>Upload Image</p>
            </div>
          ) : (
            <div className="showRslt">
              <img alt="..." id="idImageShowing" src={this.state.fileImage} />
              <div className="rslt">
                <p>Result : </p>
                <div className="detailRslt">{this.state.rslt}</div>
              </div>
              <button
                onClick={() => {
                  document.location.reload();
                }}
                className="btnReload"
              >
                Repeat
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
