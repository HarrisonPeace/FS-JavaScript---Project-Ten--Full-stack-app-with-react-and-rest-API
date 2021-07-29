import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import Loading from './Loading'

const Index =  ({ context }) => {

  let history = useHistory();

  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    context.actions.getCourses()
    .then(data => { setCourses(data.data.courses); setLoading(false); })
    .catch(error => history.push('/error'))
  }, [context, history]);

  if (loading) {
    return (<Loading/>)
  } else {
    return (
      <div className="wrap main--grid">
        { courses ? 
          courses.map(course =>
            <a key={course.id} className="course--module course--link" href={`/course/${course.id}`}>
              <h2 className="course--label">Course</h2>
              <h3 className="course--title">{course.title}</h3>
            </a>)
          : null
        }
        <Link className="course--module course--add--module" to={"/course/create"}>
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
}

export default Index;
