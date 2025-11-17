// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   courseSectionData: [],
//   courseEntireData: [],
//   completedLectures: [],
//   totalNoOfLectures: 0,
// };

// const viewCourseSlice = createSlice({
//   name: "viewCourse",
//   initialState,
//   reducers: {
//     setCourseSectionData: (state, action) => {
//       state.courseSectionData = action.payload;
//     },
//     setCourseEntireData: (state, action) => {
//       state.courseEntireData = action.payload;
//     },
//     setTotalNoOfLectures: (state, action) => {
//       state.totalNoOfLectures = action.payload;
//     },
//     setCompletedLectures: (state, action) => {
//       state.completedLectures = action.payload;
//     },
//     updateCompletedLectures: (state, action) => {
//       state.completedLectures = [...state.completedLectures, action.payload];
//     },
//   },
// });

// export const {
//   setCourseSectionData,
//   setCourseEntireData,
//   setTotalNoOfLectures,
//   setCompletedLectures,
//   updateCompletedLectures,
// } = viewCourseSlice.actions;

// export default viewCourseSlice.reducer;

//test

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseSectionData: [],
  courseEntireData: [],
  completedLectures: [],
  totalNoOfLectures: 0,
};

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload;
    },

    setCourseEntireData: (state, action) => {
      state.courseEntireData = action.payload;
    },

    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload;
    },

    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload || [];
    },

    // -----------------------------------
    // ADD or REMOVE completed lecture
    // -----------------------------------
    updateCompletedLectures: (state, action) => {
      const lectureId = action.payload;

      // if ALREADY completed → REMOVE (unchecked)
      if (state.completedLectures.includes(lectureId)) {
        state.completedLectures = state.completedLectures.filter(
          (id) => id !== lectureId
        );
      }
      // if NOT completed → ADD
      else {
        state.completedLectures.push(lectureId);
      }
    },
  },
});

export const {
  setCourseSectionData,
  setCourseEntireData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;
