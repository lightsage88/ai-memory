import { useState } from "react";
import useCourseStore from "../../Store/courseStore";

export const CourseForm = () => {
  const courses = useCourseStore((state) => state.courses);
  const addCourse = useCourseStore((state) => state.addCourse);
  const [courseTitle, setCourseTitle] = useState("");
  const handleCourseSubmit = () => {
    if (!courseTitle) return alert("add course title");
    addCourse({
      id: Math.ceil(Math.random() * 100000),
      title: courseTitle,
    });
  };
  console.log('courses from zustand store', courses);
  return (
    <div className="course-form-div">
      <input
        value={courseTitle}
        className="form-input"
        onChange={(e) => {
          setCourseTitle(e.target.value);
        }}
      />
      <button
        className="form-submit-btn"
        onClick={() => {
          handleCourseSubmit();
        }}
      >
        Add Course
      </button>
    </div>
  );
};

export default CourseForm;
