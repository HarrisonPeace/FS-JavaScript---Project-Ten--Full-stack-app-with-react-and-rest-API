import React from "react";
import { Link } from "react-router-dom";

const CourseActionsBar = ({ courseId, courseUserId, authUserId }) => {
  return (
    <>
      <div className="actions--bar">
        <div className="wrap">
          <Link className="button button-secondary" to={`/`}>
            Return to List
          </Link>
          {courseUserId === authUserId ? ( //only show update and delete buttons if authenticated user id matches course owner id
            <>
              <Link className="button" to={`/course/${courseId}/update`}>
                Update Course
              </Link>
              <Link className="button" to={`/course/${courseId}/delete`}>
                Delete Course
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CourseActionsBar;
