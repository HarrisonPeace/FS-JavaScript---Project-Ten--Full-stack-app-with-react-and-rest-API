import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from './Loading'

const CourseDetails = ({ context }) => {

  const { id } = useParams();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    context.actions.getCourse(id)
    .then(data => {
      setCourse(data.data.course)
      setLoading(false)
      console.log(course)
    })
  }, [context, id]);

  if (loading) {
    return (<Loading/>)
  } else {
    return (
      <>
        <div className="actions--bar">
          <div className="wrap">
            <Link className="button" to={`/course/${id}/update`}>Update Course</Link>
            <Link className="button"  to={`/course/${id}/delete`}>Delete Course</Link>
            <Link className="button button-secondary" to={`/`}>Return to List</Link>
          </div>
        </div>
  
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{course.title}</h4>
                <p>{`By ${course.User.firstName} ${course.User.lastName}`}</p>
                <p>{
                  course.description.split('\n').map(paragraph => {
                    if(paragraph) return <p>{paragraph}</p>
                    else return null
                  })
                  }</p>
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                {
                  course.estimatedTime ? <p>course.estimatedTime</p> : <p>N/A</p>
                }
  
                <h3 className="course--detail--title">Materials Needed</h3>
                {
                  course.materialsNeeded ? 
                    <ul className="course--detail--list">
                      {
                        course.materialsNeeded.replace('\n', '').split('* ').map(material => {
                          if(material) return <li>{material}</li>
                          else return null
                        })
                      }
                    </ul>
                    : <p>N/A</p>
                }
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
};

export default CourseDetails;
