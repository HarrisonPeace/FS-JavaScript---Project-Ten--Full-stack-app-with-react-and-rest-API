import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

// Component Imports
import withContext from "./components/Context/Context";
import Header from "./components/Header";
import Courses from "./components/Courses";
import Sign_In from "./components/Sign_In";
import Sign_Up from "./components/Sign_Up";
import Sign_Out from "./components/Sign_Out";
import Course_Create from "./components/Course/Course_Create";
import Course from "./components/Course/Course";
import PrivateRoute from "./PrivateRoute";
import { ErrorBoundary, ErrorUnhandled, NotFound, ForbiddenWithContext } from "./components/Error/Error";

// Add context to components
const HeaderWithContext = withContext(Header);
const ErrorUnhandledWithContext = withContext(ErrorUnhandled);
const CoursesWithContext = withContext(Courses);
const SignInWithContext = withContext(Sign_In);
const SignUpWithContext = withContext(Sign_Up);
const SignOutWithContext = withContext(Sign_Out);
const CourseCreateWithContext = withContext(Course_Create);
const CourseWithContext = withContext(Course);

function App() {
  return (
    <Router>
      <HeaderWithContext />
      <ErrorBoundary> {/* Catch react errors */}
        <Switch>

          <Route exact path="/"> <CoursesWithContext /> </Route>

          <Route path="/sign-in"> <SignInWithContext /> </Route>

          <Route path="/sign-up"> <SignUpWithContext /> </Route>

          <PrivateRoute path="/sign-out"> <SignOutWithContext /> </PrivateRoute>

          <PrivateRoute path="/course/create"> <CourseCreateWithContext /> </PrivateRoute>

          <Route path="/course/:id"> <CourseWithContext /> </Route>

          <Route path="/error"> <ErrorUnhandledWithContext /> </Route>

          <Route path="/forbidden"> <ForbiddenWithContext /> </Route>

          <Route path="/not-found"> <NotFound /> </Route>

          <Route> <NotFound /> </Route>

        </Switch>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
