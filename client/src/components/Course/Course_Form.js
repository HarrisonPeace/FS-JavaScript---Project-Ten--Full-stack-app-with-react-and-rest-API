/**
 * Course form for both Create Course and Update Course
 */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Component Imports
import ErrorInline from "../Error/Error_Inline";
import { errorHandler } from "../Error/error_handler";
import Forbidden from "../Error/Forbidden";
import Loading from "../Loading";

const CourseForm = ({ context, course, isCreate }) => {
  //Create history reference
  let history = useHistory();

  // Create state
  const [error, setError] = useState({
    title: "Validation Error",
    message: [],
  }); //set errors to none
  const [title, setTitle] = useState(course.title || ""); //set if found or set to an empty string if not found {this prevents errors}
  const [description, setDescription] = useState(course.description || ""); //set if found or set to an empty string if not found {this prevents errors}
  
  const [estimatedTime, setEstimatedTime] = useState(
    course.estimatedTime || ""
  ); //set if found or set to an empty string if not found {this prevents errors}

  const [materialsNeeded, setMaterialsNeeded] = useState(
    course.materialsNeeded || ""
  ); //set if found or set to an empty string if not found {this prevents errors}

  const [loading, setLoading] = useState(false);

  //get authenticated user id or set to -1 {no user authenticated}
  let authUserId = context.authenticatedUser
    ? context.authenticatedUser.id
    : -1;

  //if user is trying to update course and user id does not match the user id of the course owner
  //return forbidden component
  if (!isCreate && course.User.id !== authUserId) {
    return <Forbidden />;
  }

  const ValidateForm = () => {
    let currentErrors = [];

    if (!/[a-zA-Z]/.test(title)) {
      //check title contains a letter
      currentErrors.push('Please provide a value for "Title"');
    }

    if (!/[a-zA-Z]/.test(description)) {
      //check description contains a letter
      currentErrors.push('Please provide a value for "Description"');
    }

    if (currentErrors.length === 0) {
      //if no errors
      setError({ title: "Validation Error", message: [] });
      return true;
    } else {
      setError({ title: "Validation Error", message: currentErrors });
      return false;
    }
  };

  //decide which api call to make dependent on creating a course or editing
  function APICall() {
    if (isCreate) {
      return context.actions.createCourse(
        title,
        description,
        estimatedTime,
        materialsNeeded
      );
    } else {
      return context.actions.updateCourse(
        course.id,
        title,
        description,
        estimatedTime,
        materialsNeeded
      );
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent form submitting
    let formValidated = ValidateForm(); //check title and description have content
    if (formValidated) {
      //if from is validated
      setLoading(true); //show loading overlay while awaiting api
      APICall()
        .then((user) => {
          history.push("/courses");
        }) //if success return user to courses screen
        .catch((error) => {
          //else show errors
          setLoading(false);
          const ServerErrors = errorHandler(error);
          setError(ServerErrors);
        });
    }
  };

  return (
    <>
      {loading ? <Loading /> : null /* show loading overlay */}
      <div className="wrap">
        <h2>{isCreate ? "Create Course" : "Update Course"}</h2>
        <p>{`By ${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}`}</p>
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label>
                Course Title
                <input
                  id="courseTitle"
                  name="courseTitle"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </label>
              <label>
                Course Description
                <textarea
                  id="courseDescription"
                  name="courseDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </label>
            </div>
            <div>
              <label>
                Estimated Time
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  value={estimatedTime}
                  onChange={(e) => setEstimatedTime(e.target.value)}
                ></input>
              </label>
              <label>
                Materials Needed
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  value={materialsNeeded}
                  onChange={(e) => setMaterialsNeeded(e.target.value)}
                ></textarea>
                <p style={{ fontSize: "16px" }}>
                  *Please write each material on a new line
                </p>
              </label>
            </div>
          </div>
          <p class="update-container">
            <button className="button" type="submit">
              {isCreate ? "Create Course" : "Update Course"}
            </button>
            <button
              className="button button-secondary"
              onClick={() =>
                history.push(isCreate ? "/" : `/course/${course.id}`)
              }
            >
              Cancel
            </button>
          </p>
        </form>
      </div>
      {
        error.message.length === 0 ? null : (
          <ErrorInline error={error} />
        ) /* Error container */
      }
    </>
  );
};

export default CourseForm;
