import React from 'react';
import logo from './logo.png';
import './App.css';
import {Button, Form, FormControl, FormGroup, FormLabel, InputGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component<{},
  {
    startBlock: string;
    endBlock: string;
    endPoint: string;
  }> {
  state = {
    startBlock: "",
    endBlock: "",
    endPoint: "rpc.polkadot.io"
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    alert(`Querying for... ${this.state.startBlock} to ${this.state.endBlock} on ${this.state.endPoint}`);
    e.preventDefault();
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    switch (e.currentTarget.name) {
      case 'startBlock':
        this.setState({startBlock: e.currentTarget.value});
        break;
      case 'endBlock':
        this.setState({endBlock: e.currentTarget.value});
        break;
      case 'endPoint':
        this.setState({endPoint: e.currentTarget.value});
        break;
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>
            Polkasplorer!
          </h2>
        </header>
        <section className="block-details">
          <p>Please enter the block details you'd like to query</p>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <FormLabel>Start block:</FormLabel>
              <InputGroup hasValidation>
                <FormControl type="number" name="startBlock" value={this.state.startBlock} onChange={this.handleChange}
                             required/>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid start block
                </Form.Control.Feedback>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <FormLabel>End block:</FormLabel>
              <InputGroup hasValidation>
                <FormControl type="number" name="endBlock" value={this.state.endBlock} onChange={this.handleChange}
                             required/>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid end block
                </Form.Control.Feedback>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <FormLabel>Endpoint:</FormLabel>
              <InputGroup hasValidation>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">wss://</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl type="text" name="endPoint" value={this.state.endPoint} onChange={this.handleChange}
                             aria-describedby="inputGroupPrepend"/>
              </InputGroup>
            </FormGroup>
            <Button variant="primary" type="submit">
              Scan
            </Button>
          </Form>
        </section>
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <h2>
//           Polkasplorer
//         </h2>
//         {/*<a*/}
//         {/*  className="App-link"*/}
//         {/*  href="https://reactjs.org"*/}
//         {/*  target="_blank"*/}
//         {/*  rel="noopener noreferrer"*/}
//         {/*>*/}
//         {/*  Learn React*/}
//         {/*</a>*/}
//       </header>
//       <section className="">
//
//       </section>
//     </div>
//   );
// }
//
export default App;
