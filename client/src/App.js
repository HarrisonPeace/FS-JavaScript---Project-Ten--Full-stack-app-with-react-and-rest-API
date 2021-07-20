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
import Index from './components/Index'
import Sign_In from './components/Sign_In'
import Sign_Up from './components/Sign_Up'
import Sign_Out from './components/Sign_Out'
import Course_Create from './components/Course_Create'
import Course_Detail from './components/Course_Detail'
import Course_Update from './components/Course_Update'
import NotFound from './components/Not_Found';

const HeaderWithContext = withContext(Header);
const IndexWithContext = withContext(Index);
const SignInWithContext = withContext(Sign_In);
const SignUpWithContext = withContext(Sign_Up);
const SignOutWithContext = withContext(Sign_Out);
const CourseCreateWithContext = withContext(Course_Create);
const CourseDetailWithContext = withContext(Course_Detail);
const CourseUpdateWithContext = withContext(Course_Update);

function App() {
    return (
      <Router>
        <HeaderWithContext/>
        <Layout>
          <Switch>
            <Route exact path="/"> 
              <Redirect to="/courses" />
            </Route>
            <Route path="/courses" component={ IndexWithContext }></Route>
            <Route path="/sign-in" component={ SignInWithContext }></Route>
            <Route path="/sign-up" component={ SignUpWithContext }></Route>
            <Route path="/sign-out" component={ SignOutWithContext }></Route>
            <Route path="/course/create" component={ CourseCreateWithContext }></Route>
            <Route path="/course/:id" component={ CourseDetailWithContext }></Route>
            <Route path="/course/:id/update" component={ CourseUpdateWithContext }></Route>
            <Route path="/course/:id/delete" component={ CourseUpdateWithContext }></Route>
            <Route component={ NotFound }/>
          </Switch>
        </Layout>
      </Router>
    );
}
  
export default App;