import React from "react";

const CourseDetails = ({ course }) => {
  if (course.length === 0) throw Error('Course Not Found');
  return (
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{course.title}</h4>
                <p>{`By ${course.User.firstName} ${course.User.lastName}`}</p>
                <div style={{ marginLeft: 0 }}>
                  {
                    course.description.split('\n').map((paragraph, i) => {
                      if(paragraph) return <p key={`des${i}`}>{paragraph}</p>
                      else return null
                    })
                  }
                </div>
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                {
                  course.estimatedTime ? <p>{course.estimatedTime}</p> : <p>N/A</p>
                }
  
                <h3 className="course--detail--title">Materials Needed</h3>
                {
                  course.materialsNeeded ? 
                    <ul className="course--detail--list">
                      {
                        course.materialsNeeded.split('\n').map((material, i) => {
                          if(material) return <li key={`mat${i}`}>{material}</li>
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
    );
}

export default CourseDetails;
