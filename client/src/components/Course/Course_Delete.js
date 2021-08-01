import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import CourseDetail from "./Course_Detail";
import ErrorInline from "../Error/Error_Inline";
import { errorHandler } from "../Error/error_handler";
import Forbidden from "../Error/Forbidden";
import Loading from "../Loading";

const DeleteCourse = ({ course, context }) => {
  //Create history reference
  let history = useHistory();

  //get course id from url
  let { id } = course;

  //create state
  const [error, setError] = useState({ title: "Error", message: [] }); //set errors to none
  const [loading, setLoading] = useState(false); //set loading false

  //get authenticated user id or set to -1 {no user authenticated}
  let authUserId = context.authenticatedUser
    ? context.authenticatedUser.id
    : -1;

  //if user is trying to delete course and user id does not match the user id of the course owner
  //return forbidden component
  if (course.User.id !== authUserId) {
    return <Forbidden />;
  }

  function handleDelete(id) {
    setLoading(true); //show loading overlay while awaiting api
    context.actions
      .deleteCourse(id) //await delete course
      .then(() => history.push("/courses")) //if success return user to courses page
      .catch((error) => {
        //if error show errors
        setLoading(false); //remove loading overlay
        const ServerErrors = errorHandler(error); //pass error to error handler
        setError(ServerErrors); //set error state to show errors
      });
  }

  return (
    <>
      {
        loading ? (
          <Loading />
        ) : null /* show loading screen while awaiting api */
      }
      <div className="wrap">
        <h2>Are you sure you want to delete this course?</h2>
        <p className="delete-container">
          <button
            className="button"
            type="button"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => history.push(`/course/${id}`)}
          >
            Cancel
          </button>
        </p>
      </div>
      {
        error.message.length === 0 ? null : (
          <ErrorInline error={error} />
        ) /* Error container*/
      }
      <CourseDetail course={course} />
    </>
  );
};

export default DeleteCourse;
