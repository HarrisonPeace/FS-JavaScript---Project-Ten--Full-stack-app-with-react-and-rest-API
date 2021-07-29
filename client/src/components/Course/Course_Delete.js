import React from "react";
import { useHistory, Redirect } from 'react-router-dom';

import CourseDetail from './Course_Detail'

const DeleteCourse = ({ course, context }) => {

  let history = useHistory();
  let { id } = course;

  return (
    <>
      <div className="not-found">
        <h2>Are you sure you want to delete this course?</h2>
        <p>
          <button type="button" onClick={()=> {context.actions.deleteCourse(id); history.push('/courses')}} >Click here to delete</button>
          <button type="button" onClick={()=> {<Redirect to="/courses" />}} >Cancel</button>
        </p>
      </div>
      <CourseDetail course={course}/>
    </>
  );
};

export default DeleteCourse;