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
import NotFound from '../Not_Found';

const CourseDeleteWithContext = withContext(CourseDelete);

const CourseDetails = ({ context, isCreate }) => {

  let { path } = useRouteMatch();
  const { id } = useParams();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      context.actions.getCourse(id)
      .then(response => {
        setCourse(response.data.course)
      })
      .finally(response => setLoading(false));
    }, [context, id]);

    if (loading) {
      return (<Loading />)
    } else {
      return (
        <>
          <CourseActionsBar id={id} />
          <Switch>
            <Route exact path={path}><CourseDetail course={course}/></Route>
            <Route path={`${path}/update`}><CourseUpdate course={course}/></Route>
            <Route path={`${path}/delete`}><CourseDeleteWithContext course={course}/></Route>
            <Route component={ NotFound }/>
          </Switch>
      </>
      );
    }
};

export default CourseDetails;
