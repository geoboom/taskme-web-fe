import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import 'index.css';
import registerServiceWorker from 'registerServiceWorker';

import App from 'containers/App/App';

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route path="/" component={App} />
        <Route exact path="/404" render={() => <h1>404 not found</h1>} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root'),
);

registerServiceWorker();
