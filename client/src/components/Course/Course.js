import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';

import Loading from '../Loading'
import CourseActionsBar from './Course_ActionsBar'
import CourseDetail from './Course_Detail'
import CourseUpdate from './Course_Update'
import CourseDelete from './Course_Delete'
import withContext from '../Context/Context';
import NotFound from '../Error/Not_Found';
import Error from '../Error/Error_Inline';
import { errorHandler } from '../Error/error_Handler';

const CourseDeleteWithContext = withContext(CourseDelete);

const CourseDetails = ({ context, isCreate }) => {

  let authUserId = context.authenticatedUser ?  context.authenticatedUser.id : -1;

  let { path } = useRouteMatch();
  const { id } = useParams();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({title: 'Error', message:[]});

    useEffect(() => {
      context.actions.getCourse(id)
      .then(response => {
        setCourse(response.data.course)
      })
      .catch(error => {
        const ServerErrors = errorHandler(error)
        setError(ServerErrors)
      })
      .finally(response => setLoading(false));
    }, [context, id]);

    if (loading) {
      return (<Loading />)
    } else if (error.message.length > 0) {
      return (<Error error={error}/>) 
    } else {
      return (
        <>
          <CourseActionsBar courseId={id} courseUserId={course.User.id} authUserId={authUserId}/>
          <Switch>
            <Route exact path={path}><CourseDetail course={course}/></Route>
            <Route path={`${path}/update`}><CourseUpdate course={course} /></Route>
            <Route path={`${path}/delete`}><CourseDeleteWithContext course={course} /></Route>
            <Route component={ NotFound }/>
          </Switch>
      </>
      );
    }
};

export default CourseDetails;
