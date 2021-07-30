import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

import CourseDetail from './Course_Detail'
import ErrorInline from '../Error/Error_Inline';
import { errorHandler } from '../Error/error_Handler';
import Forbidden from '../Error/Forbidden'
import Loading from '../Loading'

const DeleteCourse = ({ course, context }) => {

  let history = useHistory();
  let { id } = course;
  const [error, setError] = useState({title: 'Error', message:[]});
  const [loading, setLoading] = useState(false);

  let authUserId = context.authenticatedUser ?  context.authenticatedUser.id : -1;
  if(course.User.id !== authUserId) {
    return <Forbidden />
  }
  
  function handleDelete(id) {
    setLoading(true)
    context.actions.deleteCourse(id)
    .then(() => history.push('/courses'))
    .catch(error => {
      setLoading(false)
      const ServerErrors = errorHandler(error)
      setError(ServerErrors)
    })
  }

  return (
    <>
    {
      loading ? <Loading/> : null
    }
      <div className="wrap">
        <h2>Are you sure you want to delete this course?</h2>
        <p className="delete-container">
          <button className="button" type="button" onClick={() => handleDelete(id)} >Delete</button>
          <button className="button button-secondary" type="button" onClick={() =>history.push(`/course/${id}`)} >Cancel</button>
        </p>
      </div>
      { error.message.length === 0 ? null : <ErrorInline error={error}/> }
      <CourseDetail course={course}/>
    </>
  );
};

export default DeleteCourse;