const React = require('react');
var io = require('socket.io-client');
const ReactEmoji = require('react-emoji');
const ENDPOINT = 'https://seahorses-racing-server.herokuapp.com';
const axios = require('axios');

let socket;

export default class WaitingRoom extends React.Component {
  constructor(props) {
    super(props);

    const query = this.props.location.state;
    if (!query) {
      this.props.history.push('/');
    }
    if (query.name === '' || query.coderoom === '') {
      this.props.history.push('/');
    }
    this.state = {
      listJoin: [],
      name: query.name,
      coderoom: query.coderoom,
      checkJoin: query.checkJoin,
      checkCreate: query.checkCreate
    };

    this.handleSubmit = this.handleSubmit.bind(this);

    socket = io(ENDPOINT);
  }

  async componentWillMount() {
    const PATH = ENDPOINT + '/checkHost';
    await axios.get(PATH, {
      params: {
        coderoom: this.state.coderoom
      }
    })
      .then((respone) => {
        if (respone.data.host) {
          socket.emit('create', {
            name: this.state.name,
            coderoom: this.state.coderoom
          }, (error) => {
            alert(error.message);
            if (error.error === true) {
              this.props.history.push('/');
            }
          });
        } else {
          this.setState({
            checkJoin: true,
            checkCreate: false
          });
          socket.emit('join', {
            name: this.state.name,
            coderoom: this.state.coderoom
          }, (error) => {
            alert(error.message);
            if (error.error === true) {
              this.props.history.push('/');
            }
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  componentDidMount() {
    socket.on('responeJoin', (room) => {
      this.setState({
        listJoin: [...room.room]
      });
    });
  }

  componentDidUpdate() {
    socket.on('responeJoin', (room) => {
      this.setState({
        listJoin: [...room.room]
      });
    });

    socket.on('start', () => {
      let id = 0;
      for (id = 0; id < this.state.listJoin.length; id++) {
        if (this.state.listJoin[id] === this.state.name){
          break;
        }
      }
      const query = ({
        name: this.state.name,
        id: id
      });
      this.props.history.push('/game-play', query);
    });
  }

  handleSubmit() {
    const query = ({
      name: this.state.name,
      id: 0
    });
    socket.emit('start', ({name: this.state.name, coderoom: this.state.coderoom}));
    this.props.history.push('/game-play', query);
  }

  render() {
    if (this.state.checkCreate === true) {
      return (
        <div>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous" />
          <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossOrigin="anonymous"></script>
          <div className='mainContainer'>
            <ul className="list-group edt-table">
      <li className="list-group-item active" style={{ fontWeight: 'bold' }}>LIST MEMBERS ARE WAITING. CODE ROOM: {this.state.coderoom}</li>
              {(this.state.listJoin || []).map((name, i) =>
                <li className="list-group-item edt-hover" key={i}>
                  Player {i} : {ReactEmoji.emojify(name)}
                </li>
              )}
            </ul>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: '20px' }}
              onClick={this.handleSubmit}
            >
              Let's start
          </button>
          </div>
        </div>
      );
    }
    else {
      return (
        <div>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous" />
          <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossOrigin="anonymous"></script>
          <div className='mainContainer'>
            <ul className="list-group edt-table">
              <li className="list-group-item active" style={{ fontWeight: 'bold' }}>LIST MEMBERS ARE WAITING. CODE ROOM: {this.state.coderoom}</li>
              {(this.state.listJoin || []).map((name, i) =>
                <li className="list-group-item edt-hover" key={i}>
                  Player {i} : {ReactEmoji.emojify(name)}
                </li>
              )}
            </ul>
          </div>
        </div>
      );
    }
  }
}