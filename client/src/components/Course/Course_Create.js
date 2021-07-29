import React from "react";
import withContext from '../Context/Context';
import CourseForm from './Course_Form'

const CourseFormWithContext = withContext(CourseForm);

const CreateCourse = ({ context }) => {

  return (
    <CourseFormWithContext course={{}} isCreate={true}/>
  );
};

export default CreateCourse;
