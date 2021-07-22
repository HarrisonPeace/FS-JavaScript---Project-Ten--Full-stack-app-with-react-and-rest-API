import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const Index =  ({ context }) => {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    context.actions.getCourses()
    .then(data => setCourses(data.data.courses))
  }, [context]);

  return (
    <div className="wrap main--grid">
      {
        courses.map(course =>
          <a key={course.id} className="course--module course--link" href={`/course/${course.id}`}>
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
          </a>)
      }
      <Link className="course--module course--add--module" to={"/course-create"}>
        <span className="course--add--title">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 13 13"
            className="add"
          >
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>
          New Course
        </span>
      </Link>
    </div>
  );
}

export default Index;
