import React from 'react';
import logo from './logo.png';
import './App.css';
import {Form, FormGroup, FormLabel, FormControl, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component<
    {},
    {
        startBlock: string;
        endBlock: string;
        endPoint: string;
    }
    > {
    state = {
        startBlock: "",
        endBlock: "",
        endPoint: "wss://rpc.polkadot.io"
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
        <img src={logo} className="App-logo" alt="logo" />
        <h2>
          Polkasplorer!
        </h2>
      </header>
      <section className="block-details">
          <p>Please enter the block details you'd like to query</p>
          <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                  <FormLabel>
                      Start block:
                  </FormLabel>
                  <FormControl type="number" name="startBlock" value={this.state.startBlock} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                  <FormLabel>
                      End block:
                  </FormLabel>
                  <FormControl type="number" name="endBlock" value={this.state.endBlock} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                  <FormLabel>
                      Endpoint:
                  </FormLabel>
                  <FormControl type="text" name="endPoint" value={this.state.endPoint} onChange={this.handleChange} />
              </FormGroup>
              <Button variant="primary" type="submit">
                  Submit
              </Button>
          </Form>
      </section>
        <script src="https://unpkg.com/react/umd/react.production.min.js"></script>

        <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>

        <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"></script>

        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
            integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
            crossOrigin="anonymous"
        />
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
