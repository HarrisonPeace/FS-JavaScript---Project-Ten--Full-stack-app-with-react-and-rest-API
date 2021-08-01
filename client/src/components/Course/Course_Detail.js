import React from "react";

const CourseDetails = ({ course }) => {
  return (
    <div className="wrap">
      <form>
        <div className="main--flex">
          <div>
            <h3 className="course--detail--title">Course</h3>
            <h4 className="course--name">{course.title}</h4>
            <p>{`By ${course.User.firstName} ${course.User.lastName}`}</p>
            <div style={{ marginLeft: 0 }}>
              {
                /* map over course description format text and return as HTML */
                course.description.split("\n").map((paragraph, i) => {
                  if (paragraph) return <p key={`des${i}`}>{paragraph}</p>;
                  else return null;
                })
              }
            </div>
          </div>
          <div>
            <h3 className="course--detail--title">Estimated Time</h3>
            {
              /* show estimated time or N/A */
              course.estimatedTime ? <p>{course.estimatedTime}</p> : <p>N/A</p>
            }

            <h3 className="course--detail--title">Materials Needed</h3>
            {
              /* show materials needed or N/A */
              course.materialsNeeded ? (
                <ul className="course--detail--list">
                  {
                    /* map over materials format text and return as HTML */
                    course.materialsNeeded.split("\n").map((material, i) => {
                      if (material) return <li key={`mat${i}`}>{material}</li>;
                      else return null;
                    })
                  }
                </ul>
              ) : (
                <p>N/A</p>
              )
            }
          </div>
        </div>
      </form>
    </div>
  );
};

export default CourseDetails;
