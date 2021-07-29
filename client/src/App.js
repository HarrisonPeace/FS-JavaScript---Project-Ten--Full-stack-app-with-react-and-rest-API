import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// Component Imports
import withContext from './components/Context/Context';
import Header from './components/Header'
import Layout from "./components/Layout";
import Error from './components/Error/Error'
import Index from './components/Index'
import Sign_In from './components/Sign_In'
import Sign_Up from './components/Sign_Up'
import Sign_Out from './components/Sign_Out'
import Course_Create from './components/Course/Course_Create'
import Course from './components/Course/Course'
import NotFound from './components/Not_Found';
import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header);
const ErrorWithContext = withContext(Error);
const IndexWithContext = withContext(Index);
const SignInWithContext = withContext(Sign_In);
const SignUpWithContext = withContext(Sign_Up);
const SignOutWithContext = withContext(Sign_Out);
const CourseCreateWithContext = withContext(Course_Create);
const CourseWithContext = withContext(Course);

function App({ context }) {
    return (
      <Router>
        <HeaderWithContext/>
        <Layout>
            <Switch>
              <Route exact path="/"><Redirect to="/courses" /></Route>
              <Route path="/error"><ErrorWithContext error={true} /></Route>
              <Route path="/server-status" ><ErrorWithContext error={false} /></Route>
              <Route path="/courses" ><IndexWithContext /></Route>
              <Route path="/sign-in" ><SignInWithContext /></Route>
              <Route path="/sign-up" ><SignUpWithContext /></Route>
              <PrivateRoute path="/sign-out" ><SignOutWithContext /></PrivateRoute>
              <PrivateRoute path="/course/create" ><CourseCreateWithContext /></PrivateRoute>
              <Route path="/course/:id" ><CourseWithContext /></Route>
              <Route ><NotFound/></Route>
            </Switch>
        </Layout>
      </Router>
    );
}
  
export default App;