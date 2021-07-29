import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

import Error from '../Error/Error_Inline';

import { errorHandler } from '../Error/error_handler';

const CourseForm = ({ context, course, isCreate }) => {

  let history = useHistory();

  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState(course.title || "");
  const [description, setDescription] = useState(course.description || "");
  const [estimatedTime, setEstimatedTime] = useState(course.estimatedTime || "");
  const [materialsNeeded, setMaterialsNeeded] = useState(course.materialsNeeded || "");

  const ValidateForm = () => {
    let currentErrors = []

    if (!/[a-zA-Z]/.test(title)) {
      currentErrors.push('Please provide a value for "Title"')
    }

    if (!/[a-zA-Z]/.test(description)) {
      currentErrors.push('Please provide a value for "Description"')
    }

    if (currentErrors.length === 0) {
      setErrors([])
      return true
    } else {
      setErrors(currentErrors)
      return false
    }
  }

  function APICall() {
    if(isCreate) {
       return context.actions.createCourse(title, description, estimatedTime, materialsNeeded)
    } else {
      return context.actions.updateCourse(course.id, title, description, estimatedTime, materialsNeeded)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent form submitting if there is an error
    let formValidated = ValidateForm();
    if (formValidated) { //check if error with any component
      APICall()
      .then(user => {history.push('/courses')})
      .catch(error => {
        const ServerErrors = errorHandler(error)
        setErrors([ServerErrors])
      })
    }
  };

  return (
    <div className="wrap">
      <h2>{isCreate ? 'Create Course' : 'Update Course'}</h2>
      { errors.length === 0 ? null : <Error errors={errors}/> }
      <p>{`By ${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}`}</p>
      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          <div>
            <label>Course Title
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
              ></input>
            </label>
            <label>Course Description
              <textarea
                id="courseDescription"
                name="courseDescription"
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
              ></textarea>
            </label>
          </div>
          <div>
            <label>Estimated Time
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={estimatedTime} 
                onChange={(e) => setEstimatedTime(e.target.value)} 
              ></input>
            </label>
            <label>Materials Needed
              <textarea 
                id="materialsNeeded" 
                name="materialsNeeded"
                value={materialsNeeded} 
                onChange={(e) => setMaterialsNeeded(e.target.value)} 
              ></textarea>
              <p style={{ fontSize: '16px' }}>*Please write each material on a new line</p>
            </label>
          </div>
        </div>
        <button className="button" type="submit">{isCreate ? 'Create Course' : 'Update Course'}</button>
        <button className="button button-secondary" onClick={() => history.push(isCreate ? '/' : `/course/${course.id}`)}>Cancel</button>
      </form>
    </div>
  );
};

export default CourseForm;
