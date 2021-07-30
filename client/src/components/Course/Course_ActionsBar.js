import React from "react";
import { Link } from "react-router-dom";

const CourseActionsBar = ({ courseId, courseUserId, authUserId }) => {
  return (
    <>
      <div className="actions--bar">
        <div className="wrap">
          <Link className="button button-secondary" to={`/courses`}>Return to List</Link>
          {
            courseUserId === authUserId ?
            <>
              <Link className="button" to={`/course/${courseId}/update`}>Update Course</Link>
              <Link className="button"  to={`/course/${courseId}/delete`}>Delete Course</Link>
            </>
            :
            null
          }
        </div>
      </div>
    </>
  );
};

export default CourseActionsBar;