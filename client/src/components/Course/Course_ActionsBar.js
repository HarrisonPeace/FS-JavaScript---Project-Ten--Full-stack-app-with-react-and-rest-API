import React from "react";
import { Link } from "react-router-dom";

const CourseActionsBar = ({ id }) => {
  return (
    <>
      <div className="actions--bar">
        <div className="wrap">
          <Link className="button" to={`/course/${id}/update`}>Update Course</Link>
          <Link className="button"  to={`/course/${id}/delete`}>Delete Course</Link>
          <Link className="button button-secondary" to={`/courses`}>Return to List</Link>
        </div>
      </div>
    </>
  );
};

export default CourseActionsBar;