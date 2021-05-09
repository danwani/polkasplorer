import React from 'react';
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
    latestBlock: number;
    endPoint: string;
    events: Array<object>;
  }> {
  state = {
    loading: false,
    startBlock: 0,
    endBlock: 0,
    latestBlock: 0,
    endPoint: "rpc.polkadot.io",
    events: [{
      blockNumber: undefined,
      blockHash: undefined,
      events: [{
        eventName: undefined,
        eventArgs: []
      }],
    }],
  };

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({loading: true, events: []});
    console.log(`Querying for... ${this.state.startBlock} to ${this.state.endBlock} on ${this.state.endPoint}`);
    const wsProvider = new WsProvider(`wss://${this.state.endPoint}`);
    const api = await ApiPromise.create({provider: wsProvider});

    for (let currentBlock = this.state.endBlock; currentBlock >= this.state.startBlock; currentBlock--) {
      console.log(`Results from block: ${currentBlock}`);
      const queryHdr = await api.rpc.chain.getBlockHash(currentBlock);
      console.log(`Found header: ${queryHdr}`);
      const events = await api.query.system.events.at(queryHdr);
      const eventRecords = Array<object>();
      events.forEach((record) => {
        // Extract the phase, event and the event types
        const { event } = record;
        const types = event.typeDef;
        const eventArgs = Array<string>();
        event.data.forEach((data, index) => {
          eventArgs.push(`${types[index].type}: ${data.toString()}`)
        });
        eventRecords.push({eventName: `${event.section}:${event.method}`, eventArgs});
      });
      const eventRecord = {blockNumber: currentBlock, blockHash: queryHdr.toString(), events: eventRecords}
      console.log(JSON.stringify(eventRecord));
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
    this.setState({loading: true, events: []});
    const wsProvider = new WsProvider(`wss://${this.state.endPoint}`);
    const api = await ApiPromise.create({provider: wsProvider});
    const lastHeader = await api.rpc.chain.getHeader();
    console.log(`Chain is at block: #${lastHeader.number}`);
    this.setState({startBlock: Number(lastHeader.number.unwrap().subn(5))});
    this.setState({endBlock: Number(lastHeader.number.unwrap()), latestBlock: Number(lastHeader.number.unwrap())});
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
              <FormControl type="number" name="startBlock" value={this.state.startBlock} max={this.state.latestBlock-1} onChange={this.handleChange}
                           required/>
              <Form.Control.Feedback type="invalid">
                Please provide a valid start block
              </Form.Control.Feedback>
            </FormGroup>
            <FormGroup>
              <FormLabel>End block:</FormLabel>
              <InputGroup hasValidation>
                <FormControl type="number" name="endBlock" value={this.state.endBlock} min={this.state.startBlock+1} max={this.state.latestBlock} onChange={this.handleChange}
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
            {this.state.events.map(eventRecord => {
              return (
                <div className="details" key={eventRecord.blockNumber}>
                  <p className="block-number labels">Block Number</p>
                  <p className="block-hash labels">Block Hash</p>
                  <p className="block-number content">{eventRecord.blockNumber}</p>
                  <p className="block-hash content">{eventRecord.blockHash}</p>
                  <p className="event-name labels">Event Name</p>
                  <p className="event-args labels">Event Arguments</p>
                    {eventRecord.events.map(singleEvent => {
                      return (
                        <div className="block-events">
                          <p className="event-name content">{singleEvent.eventName}</p>
                            {singleEvent.eventArgs.map(arg => {
                              return (
                                <p className="event-args content">{arg}</p>
                              );
                            })}
                        </div>
                      );
                    })}
                </div>
              );
            })}
        </section>
      </div>
    );
  }
}

export default App;
