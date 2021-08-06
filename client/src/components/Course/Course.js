import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Route, Switch, useRouteMatch } from "react-router-dom";

// Component Imports
import Loading from "../Loading";
import CourseActionsBar from "./Course_ActionsBar";
import CourseDetail from "./Course_Detail";
import CourseUpdate from "./Course_Update";
import CourseDelete from "./Course_Delete";
import withContext from "../Context/Context";
import PrivateRoute from "../../PrivateRoute";
import {errorHandler, ErrorInline , NotFound} from "../Error/Error"

// Add context to delete page
const CourseDeleteWithContext = withContext(CourseDelete);

const CourseDetails = ({ context }) => {
  //get authenticated user id or set to -1 {no user authenticated}
  let authUserId = context.authenticatedUser
    ? context.authenticatedUser.id
    : -1;

  //get current url to use in router
  let { path } = useRouteMatch();

  //get course id from url
  const { id } = useParams();

  // Create state
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true); //show loading screen until api responds
  const [error, setError] = useState({ title: "Error", message: [] }); //set errors to none

  useEffect(() => {
    context.actions
      .getCourse(id) //on mount search for course
      .then((response) => {
        //if found show details
        setCourse(response.data.course);
      })
      .catch((error) => {
        //else show error screen
        const ServerErrors = errorHandler(error);
        setError(ServerErrors);
      })
      .finally((response) => setLoading(false)); //finally remove loading screen
  }, [context, id]);

  if (loading) {
    return <Loading />; //if loading show loading component
  } else if (error.message.length > 0) {
    return <ErrorInline error={error} />; //if errors show errors component
  } else {
    return (
      <>
        <CourseActionsBar
          courseId={id}
          courseUserId={course.User.id}
          authUserId={authUserId}
        />
        <Switch> {/* pass course data into all course related routes */}

          <Route exact path={path}> <CourseDetail course={course} /> </Route>

          <PrivateRoute path={`${path}/update`}> <CourseUpdate course={course} /> </PrivateRoute>

          <PrivateRoute path={`${path}/delete`}> <CourseDeleteWithContext course={course} /> </PrivateRoute>

          <Route component={NotFound} />

        </Switch>
      </>
    );
  }
};

export default CourseDetails;
