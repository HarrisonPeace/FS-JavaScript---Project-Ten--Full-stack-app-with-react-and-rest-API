import React from "react";
import withContext from '../Context/Context';
import CourseForm from './Course_Form'

const CourseFormWithContext = withContext(CourseForm);

const CourseUpdate = ({ course }) => {
    return (
        <CourseFormWithContext course={course} isCreate={false}/>
    );
}

export default CourseUpdate;
