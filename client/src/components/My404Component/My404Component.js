const React = require('react');
require('./My404Component.css');

export default class My404Component extends React.Component {
  render() {
    return (
      <div class="container-fluid h-100">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <div class="row h-100 align-items-center">
          <div class="col-sm-12">
            <div class="card shadow w-50 mx-auto">
              <div class="card-body text-center">
                <h1 class="card-title">Ooops!</h1>
                <h2 class="text-danger">404 Not Found</h2>
                <p class="card-text">
                  Sorry, an error has occured. Requested page not found.
                </p>
                <div>
                  <a style={{marginRight: "2%"}}  class="btn btn-primary" href="/" role="button">
                    <i class="fa fa-home" aria-hidden="true"></i>
                    Home
                  </a>
                  <a class="btn btn-success" href="/" role="button">
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"></script>
      </div>
    );
  }
}