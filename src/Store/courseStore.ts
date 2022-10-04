import create from 'zustand';
//persist stores data in localstorage of browser
import {devtools, persist} from 'zustand/middleware';

//set is used simply to change the state of any variable
const courseStore = (set: any) => ({
    courses: [],
    //actions - manipulators
    addCourse: (course: any) => {
        set((state: any) => ({
            courses: [course, ...state.courses]
        }))
    },
    removeCourse: (courseId: string| number) => {
        set((state: any) => ({
            courses: state.courses.filter((el: any) => el.id !== courseId)
        }))
    },
    toggleCourseStatus: (courseId: string | number) => {
        set((state: any) => ({
            courses: state.courses.map((el: any) => el.id === courseId ? {
                ...el.status, completed: !el.completed
            } : el)
        }))
    }
});

const useCourseStore = create(courseStore);

export default useCourseStore;