import React from "react";
import {
    BrowserRouter,
    Link,
    Route,
    Switch,
} from 'react-router-dom';

function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };
    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }
    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };
}

const About = asyncComponent(() =>
    System.import('./components/About').then(module => module.default)
)
const Home = asyncComponent(() =>
    System.import('./components/Home').then(module => module.default)
)
const Users = asyncComponent(() =>
    System.import('./components/Users').then(module => module.default)
)

/**
 * Router takes in the browserHitsory and all the routes we
 * created in './routes/'. This is the highest level component
 * of our application.
 * learn more: https://github.com/ReactTraining/react-router/blob/master/docs/API.md#router
 */
// const Root = () => <BrowserRouter routes={routes} />;
// const Root = () => <h1>Hello, world!</h1>;
const Root = () => (
  <BrowserRouter>
    <div>
      <Link to="/about">About</Link>
      <Link to="/users">Users</Link>
      <Link to="/">Home</Link>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/users" component={Users} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Root;
