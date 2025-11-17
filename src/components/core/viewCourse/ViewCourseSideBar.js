// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { IoIosArrowBack } from "react-icons/io";
// import { BsChevronDown } from "react-icons/bs";

// const ViewCourseSideBar = ({ setReviewModal }) => {
//   const [activeStatus, setActiveStatus] = useState("");
//   const [videoBarActive, setVideoBarActive] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { sectionId, subSectionId } = useParams();

//   const {
//     courseSectionData,
//     courseEntireData,
//     completedLectures,
//     totalNoOfLectures,
//   } = useSelector((state) => state.viewCourse);

//   useEffect(() => {
//     const setActiveFlag = () => {
//       if (!courseSectionData.length) {
//         return;
//       }

//       const currentSectionIndex = courseSectionData.findIndex(
//         (data) => data._id === sectionId
//       );

//       const currentSubSectionIndex = courseSectionData?.[
//         currentSectionIndex
//       ]?.subSection.findIndex((data) => data._id === subSectionId);

//       const activeSubSectionId =
//         courseSectionData[currentSectionIndex]?.subSection[
//           currentSubSectionIndex
//         ]?._id;

//       setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
//       setVideoBarActive(activeSubSectionId);
//     };

//     setActiveFlag();
//   }, [courseSectionData, courseEntireData, location.pathname]);

//   return (
//     <div className="w-full lg:w-[350px] border-r border-richblack-700 h-auto lg:h-[calc(100vh-3.5rem)] bg-richblack-800">
//       <div className=" mx-5 border-b border-richblack-600 py-3">
//         <div className="flex flex-wrap gap-2 justify-between w-full items-center mt-3">
//           <div
//             className="flex items-center gap-1 text-sm text-richblack-25 cursor-pointer"
//             onClick={() => navigate("/dashboard/enrolled-courses")}
//           >
//             <IoIosArrowBack className="texy-lg"></IoIosArrowBack>
//             <p>Back To Courses</p>
//           </div>
//           <button
//             className="bg-yellow-50 rounded-md py-2 px-3 font-semibold"
//             onClick={() => setReviewModal(true)}
//           >
//             Add Review
//           </button>
//         </div>
//         <div className="flex flex-col mt-4">
//           <p className=" text-lg text-richblack-25">
//             {courseEntireData?.courseName}
//           </p>
//           <p className="text-sm font-semibold text-richblack-500">
//             {completedLectures.length} / {totalNoOfLectures}
//           </p>
//         </div>
//       </div>

//       <div className="h-[calc(100vh-12.5rem)] overflow-y-auto">
//         {courseSectionData?.map((section, i) => (
//           <div
//             key={i}
//             className="mt-2 cursor-pointer text-sm"
//             onClick={() => setActiveStatus(section._id)}
//           >
//             <div className="flex items-center w-full justify-between bg-richblack-600 px-5 py-4">
//               <div className="w-[70%] font-semibold text-richblack-5">
//                 {section?.sectionName}
//               </div>

//               <span
//                 className={`${
//                   activeStatus === section?._id ? "rotate-0" : "rotate-180"
//                 } transition-all duration-500`}
//               >
//                 <BsChevronDown className=" text-richblack-25"></BsChevronDown>
//               </span>
//             </div>

//             {activeStatus === section?._id && (
//               <div className="transition-[height] duration-500 ease-in-out">
//                 {section.subSection.map((topic, i) => (
//                   <div
//                     key={i}
//                     className={`${
//                       videoBarActive === topic._id
//                         ? "bg-yellow-200 font-semibold text-richblack-800"
//                         : "hover:bg-richblack-900"
//                     } flex gap-3 px-5 py-2 text-richblack-100`}
//                     onClick={() => {
//                       navigate(
//                         `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
//                       );
//                       setVideoBarActive(topic?._id);
//                     }}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={completedLectures.includes(topic._id)}
//                       onChange={() => {}}
//                     ></input>

//                     {topic.title}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ViewCourseSideBar;


//test
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { IoIosArrowBack } from "react-icons/io";
// import { BsChevronDown } from "react-icons/bs";

// const ViewCourseSideBar = ({ setReviewModal }) => {
//   const [activeStatus, setActiveStatus] = useState("");
//   const [videoBarActive, setVideoBarActive] = useState("");

//   const navigate = useNavigate();
//   const location = useLocation();
//   const { sectionId, subSectionId } = useParams();

//   const {
//     courseSectionData = [],
//     courseEntireData = {},
//     completedLectures = [],
//     totalNoOfLectures = 0,
//   } = useSelector((state) => state.viewCourse);

//   // -----------------------------
//   // Set Active Section + Subsection
//   // -----------------------------
//   useEffect(() => {
//     if (!courseSectionData.length) return;

//     const currentSectionIndex = courseSectionData.findIndex(
//       (sec) => sec?._id === sectionId
//     );
//     if (currentSectionIndex === -1) return;

//     const currentSection = courseSectionData[currentSectionIndex];

//     const currentSubIndex = currentSection?.subSection?.findIndex(
//       (sub) => sub?._id === subSectionId
//     );

//     const activeSub =
//       currentSection?.subSection?.[currentSubIndex]?._id || "";

//     setActiveStatus(currentSection?._id);
//     setVideoBarActive(activeSub);
//   }, [courseSectionData, location.pathname]);

//   return (
//     <div className="w-full lg:w-[350px] border-r border-richblack-700 bg-richblack-800">

//       {/* HEADER */}
//       <div className="mx-5 border-b border-richblack-600 py-3">
//         <div className="flex justify-between items-center mt-3">
//           <div
//             className="flex items-center gap-1 text-sm text-richblack-25 cursor-pointer"
//             onClick={() => navigate("/dashboard/enrolled-courses")}
//           >
//             <IoIosArrowBack />
//             <p>Back To Courses</p>
//           </div>

//           <button
//             className="bg-yellow-50 rounded-md py-2 px-3 font-semibold"
//             onClick={() => setReviewModal(true)}
//           >
//             Add Review
//           </button>
//         </div>

//         <div className="flex flex-col mt-4">
//           <p className="text-lg text-richblack-25">
//             {courseEntireData?.courseName || "Course"}
//           </p>
//           <p className="text-sm font-semibold text-richblack-500">
//             {completedLectures.length} / {totalNoOfLectures} Lectures
//           </p>
//         </div>
//       </div>

//       {/* SIDEBAR CONTENT */}
//       <div className="h-[calc(100vh-12.5rem)] overflow-y-auto">

//         {courseSectionData.length === 0 && (
//           <p className="text-richblack-300 text-sm px-5 mt-5">
//             No sections available.
//           </p>
//         )}

//         {courseSectionData.map((section, secIndex) => (
//           <div key={section?._id || secIndex} className="mt-2">

//             {/* SECTION HEADER */}
//             <div
//               className="flex items-center justify-between bg-richblack-600 px-5 py-4 cursor-pointer"
//               onClick={() => setActiveStatus(section?._id)}
//             >
//               <p className="text-richblack-5 font-semibold w-[70%]">
//                 {section?.sectionName || "Untitled Section"}
//               </p>

//               <span
//                 className={`transition-all duration-500 ${
//                   activeStatus === section?._id ? "rotate-0" : "rotate-180"
//                 }`}
//               >
//                 <BsChevronDown className="text-richblack-25" />
//               </span>
//             </div>

//             {/* SUBSECTIONS */}
//             {activeStatus === section?._id && (
//               <div>
//                 {(section?.subSection?.length || 0) === 0 && (
//                   <p className="text-[13px] text-richblack-400 px-5 py-2">
//                     No lectures in this section.
//                   </p>
//                 )}

//                 {section?.subSection?.map((topic, subIndex) => (
//                   <div
//                     key={topic?._id || subIndex}
//                     className={`flex items-center gap-3 px-5 py-2 cursor-pointer 
//                       ${
//                         videoBarActive === topic?._id
//                           ? "bg-yellow-200 text-richblack-800 font-semibold"
//                           : "hover:bg-richblack-900 text-richblack-100"
//                       }
//                     `}
//                     onClick={() => {
//                       navigate(
//                         `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
//                       );
//                       setVideoBarActive(topic?._id);
//                     }}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={completedLectures.includes(topic?._id)}
//                       onChange={() => {}}
//                     />

//                     <span>{topic?.title || "Untitled Lecture"}</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ViewCourseSideBar;



//test2


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../redux/slices/viewCourseSlice";



const ViewCourseSideBar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const dispatch = useDispatch();

  const {
    courseSectionData = [],
    courseEntireData = {},
    completedLectures = [],
    totalNoOfLectures = 0,
  } = useSelector((state) => state.viewCourse);

  // -----------------------------
  // Set Active Section + Subsection
  // -----------------------------
  useEffect(() => {
    if (!courseSectionData.length) return;

    const currentSectionIndex = courseSectionData.findIndex(
      (sec) => sec?._id === sectionId
    );
    if (currentSectionIndex === -1) return;

    const currentSection = courseSectionData[currentSectionIndex];

    const currentSubIndex = currentSection?.subSection?.findIndex(
      (sub) => sub?._id === subSectionId
    );

    const activeSub =
      currentSection?.subSection?.[currentSubIndex]?._id || "";

    setActiveStatus(currentSection?._id);
    setVideoBarActive(activeSub);
  }, [courseSectionData, location.pathname]);

  // -----------------------------
  // CHECKBOX HANDLER
  // -----------------------------
  const handleCheck = async (topicId) => {
    try {
      const res = await markLectureAsComplete({
        courseId: courseEntireData?._id,
        subSectionId: topicId,
      });

      if (res) {
        // update store
        dispatch(updateCompletedLectures(topicId));
      }
    } catch (error) {
      console.log("ERROR updating progress:", error);
    }
  };

  return (
    <div className="w-full lg:w-[350px] border-r border-richblack-700 bg-richblack-800">

      {/* HEADER */}
      <div className="mx-5 border-b border-richblack-600 py-3">
        <div className="flex justify-between items-center mt-3">
          <div
            className="flex items-center gap-1 text-sm text-richblack-25 cursor-pointer"
            onClick={() => navigate("/dashboard/enrolled-courses")}
          >
            <IoIosArrowBack />
            <p>Back To Courses</p>
          </div>

          {/* FIXED review button */}
          <button
            className="bg-yellow-50 rounded-md py-2 px-3 font-semibold"
            onClick={() => setReviewModal(true)}
          >
            Add Review
          </button>
        </div>

        <div className="flex flex-col mt-4">
          <p className="text-lg text-richblack-25">
            {courseEntireData?.courseName || "Course"}
          </p>
          <p className="text-sm font-semibold text-richblack-500">
            {completedLectures.length} / {totalNoOfLectures} Lectures
          </p>
        </div>
      </div>

      {/* SIDEBAR CONTENT */}
      <div className="h-[calc(100vh-12.5rem)] overflow-y-auto">

        {courseSectionData.length === 0 && (
          <p className="text-richblack-300 text-sm px-5 mt-5">
            No sections available.
          </p>
        )}

        {courseSectionData.map((section, secIndex) => (
          <div key={section?._id || secIndex} className="mt-2">

            {/* SECTION HEADER */}
            <div
              className="flex items-center justify-between bg-richblack-600 px-5 py-4 cursor-pointer"
              onClick={() => setActiveStatus(section?._id)}
            >
              <p className="text-richblack-5 font-semibold w-[70%]">
                {section?.sectionName || "Untitled Section"}
              </p>

              <span
                className={`transition-all duration-500 ${
                  activeStatus === section?._id ? "rotate-0" : "rotate-180"
                }`}
              >
                <BsChevronDown className="text-richblack-25" />
              </span>
            </div>

            {/* SUBSECTIONS */}
            {activeStatus === section?._id && (
              <div>
                {(section?.subSection?.length || 0) === 0 && (
                  <p className="text-[13px] text-richblack-400 px-5 py-2">
                    No lectures in this section.
                  </p>
                )}

                {section?.subSection?.map((topic, subIndex) => (
                  <div
                    key={topic?._id || subIndex}
                    className={`flex items-center gap-3 px-5 py-2 cursor-pointer 
                      ${
                        videoBarActive === topic?._id
                          ? "bg-yellow-200 text-richblack-800 font-semibold"
                          : "hover:bg-richblack-900 text-richblack-100"
                      }
                    `}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                      );
                      setVideoBarActive(topic?._id);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic?._id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleCheck(topic?._id);
                      }}
                    />

                    <span>{topic?.title || "Untitled Lecture"}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCourseSideBar;
