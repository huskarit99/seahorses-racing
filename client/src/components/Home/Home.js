const React = require('react');
const axios = require('axios');
const ufo = require("../../images/ufo.png");

const ENDPOINT = 'https://seahorses-racing-server.herokuapp.com';
export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      coderoom: '',
      checkJoin: false,
      checkCreate: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeCoderoom = this.handleChangeCoderoom.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);
  }

  handleChangeCoderoom(event) {
    this.setState({
      coderoom: event.target.value
    });
  }

  handleChangeName(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleChangeCheckJoin(event) {
    this.setState({
      checkJoin: true,
      checkCreate: false
    });
  }

  handleChangeCheckCreate(event) {
    this.setState({
      checkJoin: false,
      checkCreate: true
    });
  }

  async handleGenerate(event) {
    event.preventDefault();
    const PATH = ENDPOINT + '/getCodeRoom';
    await axios.get(PATH)
      .then((respone) => {
        this.setState({
          coderoom: respone.data.coderoom
        });
      })
      .catch((error) => {
        alert(error);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name !== '' ||
      this.state.coderoom !== '') {
      const query = ({
        name: this.state.name,
        coderoom: this.state.coderoom,
        checkJoin: this.state.checkJoin,
        checkCreate: this.state.checkCreate
      });
      this.props.history.push('/waitingroom', query);
    }
    else {
      alert("Your name and coderoom are required !!!");
    }
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <img src={ufo} alt="" className="logoImage" />
          <h1 className="name">Seahorses Racing</h1>
        </div>
        <form>
          <div className="gameInputContainer">
            <input
              type="text"
              name=""
              id=""
              onChange={this.handleChangeName}
              className="gameInput"
              placeholder="Username"
            />
          </div>
          <div className="gameInputContainer">
            <input
              type="text"
              name=""
              id=""
              value={this.state.coderoom}
              onChange={this.handleChangeCoderoom}
              className="gameInput"
              placeholder="Room ID"
            />
          </div>
          <input
            type="submit"
            value="START"
            onClick={this.handleSubmit}
            className="gameButton horizontalCenter"
            style={{ marginTop: "1rem" }}
          />
          <input
            type="submit"
            value="GET ID"
            onClick={this.handleGenerate}
            className="gameButton horizontalCenter"
            style={{ marginTop: "1rem" }}
          />
        </form>
      </div>
    );
  }
}