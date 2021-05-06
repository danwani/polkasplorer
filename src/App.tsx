import React, { useEffect, useState } from 'react';
import logo from './logo.png';
import './App.css';
import {Button, Form, FormControl, FormGroup, FormLabel, InputGroup, Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApiPromise, WsProvider } from '@polkadot/api';

class App extends React.Component<{},
  {
    loading: boolean;
    startBlock: number;
    endBlock: number;
    endPoint: string;
    events: Array<object>;
  }> {
  state = {
    loading: false,
    startBlock: 0,
    endBlock: 0,
    endPoint: "rpc.polkadot.io",
    events: [{
      blockNumber: undefined
    }],
  };

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({loading: true});
    console.log(`Querying for... ${this.state.startBlock} to ${this.state.endBlock} on ${this.state.endPoint}`);
    const wsProvider = new WsProvider(`wss://${this.state.endPoint}`);
    const api = await ApiPromise.create({provider: wsProvider});

    // Retrieve the current block header
    const startHdr = await api.rpc.chain.getBlockHash(this.state.startBlock);
    const endHdr = await api.rpc.chain.getBlockHash(this.state.endBlock);
    // https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/explorer/query/0x38f3f6a3b13715cdfd95421859401bb41985d53a664e845d71f3240774a6ab41
    const testHdr = await api.rpc.chain.getBlockHash(4816370);
    const testHdrEnd = await api.rpc.chain.getBlockHash(4816373);

    // retrieve the range of events
    // const changes = await api.query.system.events.range([this.state.startBlock, this.state.endBlock]);
    // const changes = await api.query.system.events.range([this.state.startBlock, this.state.endBlock]);


    let startBlock = 4816370;
    for (let currentBlock = 4816373; currentBlock > startBlock; currentBlock--) {
      console.log(`results from block: ${currentBlock}`);
      const queryHdr = await api.rpc.chain.getBlockHash(currentBlock);
      console.log(`results from header: ${queryHdr}`);
      const events = await api.query.system.events.at(queryHdr);
      const eventRecords = Array<object>();
      events.forEach((record) => {
        // Extract the phase, event and the event types
        const { event, phase } = record;
        const types = event.typeDef;

        // Show what we are busy with
        console.log(`\t${event.section}:${event.method}:: (phase=${phase.toString()})`);
        console.log(`\t\t${event.meta.documentation.toString()}`);

        // Loop through each of the parameters, displaying the type and data
        const eventArgs = Array<string>();
        event.data.forEach((data, index) => {
          console.log(`\t\t\t${types[index].type}: ${data.toString()}`);
          eventArgs.push(`${types[index].type}: ${data.toString()}`)
        });
        eventRecords.push({eventName: `${event.section}:${event.method}`, eventArgs});
      });
      const eventRecord = {blockNumber: currentBlock, events: eventRecords}
      this.setState({events: [...this.state.events, eventRecord]});
    }

    this.setState({loading: false});
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    switch (e.currentTarget.name) {
      case 'startBlock':
        this.setState({startBlock: Number(e.currentTarget.value)});
        break;
      case 'endBlock':
        this.setState({endBlock: Number(e.currentTarget.value)});
        break;
      case 'endPoint':
        this.setState({endPoint: e.currentTarget.value});
        break;
    }
  };

  componentDidMount = async () => {
    this.setState({loading: true});
    const wsProvider = new WsProvider(`wss://${this.state.endPoint}`);
    const api = await ApiPromise.create({provider: wsProvider});
    const lastHeader = await api.rpc.chain.getHeader();
    console.log(`Chain is at block: #${lastHeader.number}`);
    this.setState({startBlock: Number(lastHeader.number.unwrap().subn(5))});
    this.setState({endBlock: Number(lastHeader.number.unwrap())});
    this.setState({loading: false});
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
        <section className="block-query">
          <p>Please enter the block details you'd like to query</p>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <FormLabel>Start block:</FormLabel>
              <FormControl type="number" name="startBlock" value={this.state.startBlock} max={this.state.endBlock-1} onChange={this.handleChange}
                           required/>
              <Form.Control.Feedback type="invalid">
                Please provide a valid start block
              </Form.Control.Feedback>
            </FormGroup>
            <FormGroup>
              <FormLabel>End block:</FormLabel>
              <InputGroup hasValidation>
                <FormControl type="number" name="endBlock" value={this.state.endBlock} max={this.state.endBlock} onChange={this.handleChange}
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
            { !this.state.loading ? <Button variant="primary" type="submit">Scan</Button> :
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                &nbsp;&nbsp;Loading...
              </Button> }
          </Form>
        </section>

        <section className="block-details">
          <div className="details">
            {this.state.events.map((eventRecord, index) => {
              return <p>{eventRecord.blockNumber}</p>
            })}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
