// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { HiOutlineCurrencyRupee } from "react-icons/hi";
// import {
//   addCourse,
//   editCourseDetails,
//   fetchCourseCategories,
// } from "../../../../../services/operations/courseDetailsAPI";
// import { useDispatch, useSelector } from "react-redux";
// import RequirmentsField from "./RequirmentsField";
// import { setCourse, setStep } from "../../../../../redux/slices/courseSlice";
// import UploadField from "./UploadField";
// import { COURSE_STATUS } from "../../../../../utils/constants";
// import ChipInput from "./ChipInput";
// import toast from "react-hot-toast";
// import { IoIosArrowForward } from "react-icons/io";

// const CourseInfirmationForm = () => {
//   const [loading, setLoading] = useState(false);
//   const [courseCategories, setCourseCategories] = useState([]);
//   const { course, editCourse } = useSelector((state) => state.course);
//   const { token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm();

//   const getCategories = async () => {
//     setLoading(true);
//     const categories = await fetchCourseCategories();
//     if (categories.length > 0) {
//       setCourseCategories(categories);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (editCourse) {
//       setValue("courseTitle", course.courseName);
//       setValue("courseShortDesc", course.courseDescription);
//       setValue("coursePrice", course.price);
//       setValue("courseTags", course.tag);
//       setValue("courseBenefits", course.whatYouWillLearn);
//       setValue("courseCategory", course.category);
//       setValue("courseRequirements", course.instructions);
//       setValue("courseImage", course.thumbnail);
//     }

//     getCategories();
//   }, []);

//   const isFormUpdated = () => {
//     const currentValues = getValues();
//     if (
//       currentValues.courseTitle !== course.courseName ||
//       currentValues.courseShortDesc !== course.courseDescription ||
//       currentValues.coursePrice !== course.price ||
//       currentValues.courseTags.toString() !== course.tag.toString() ||
//       currentValues.courseBenefits !== course.whatYouWillLearn ||
//       currentValues.courseCategory._id !== course.category._id ||
//       currentValues.courseRequirements.toString() !==
//         course.instructions.toString() ||
//       currentValues.courseImage !== course.thumbnail
//     ) {
//       return true;
//     }

//     return false;
//   };

//   const handelOnSubmit = async (data) => {
//     if (editCourse) {
//       if (isFormUpdated()) {
//         const currentValues = getValues();
//         const formData = new FormData();

//         formData.append("courseId", course._id);
//         if (currentValues.courseTitle !== course.courseName) {
//           formData.append("courseName", data.courseTitle);
//         }
//         if (currentValues.courseShortDesc !== course.courseDescription) {
//           formData.append("courseDescription", data.courseShortDesc);
//         }
//         if (currentValues.coursePrice !== course.price) {
//           formData.append("price", data.coursePrice);
//         }
//         if (currentValues.courseTags.toString() !== course.tag.toString()) {
//           formData.append("tag", JSON.stringify(data.courseTags));
//         }
//         if (currentValues.courseBenefits !== course.whatYouWillLearn) {
//           formData.append("whatYouWillLearn", data.courseBenefits);
//         }
//         if (currentValues.courseCategory._id !== course.category._id) {
//           formData.append("category", data.courseCategory);
//         }
//         if (
//           currentValues.courseRequirements.toString() !==
//           course.instructions.toString()
//         ) {
//           formData.append(
//             "instructions",
//             JSON.stringify(data.courseRequirements)
//           );
//         }
//         if (currentValues.courseImage !== course.thumbnail) {
//           formData.append("thumbnailImage", data.courseImage);
//         }

//         setLoading(true);
//         const result = await editCourseDetails(formData, token);
//         setLoading(false);

//         if (result) {
//           dispatch(setStep(2));
//           dispatch(setCourse(result));
//         }
//       } else {
//         toast.error("No Changes Made To The Form");
//       }

//       return;
//     }
//     console.log("Printing Data", data);
//     const formData = new FormData();
//     formData.append("courseName", data.courseTitle);
//     formData.append("courseDescription", data.courseShortDesc);
//     formData.append("price", data.coursePrice);
//     formData.append("tag", JSON.stringify(data.courseTags));
//     formData.append("whatYouWillLearn", data.courseBenefits);
//     formData.append("category", data.courseCategory);
//     formData.append("status", COURSE_STATUS.DRAFT);
//     formData.append("instructions", JSON.stringify(data.courseRequirements));
//     formData.append("thumbnailImage", data.courseImage);
//     console.log("Form Data: ", formData);

//     setLoading(true);
//     const result = await addCourse(formData, token);
//     if (result) {
//       dispatch(setStep(2));
//       dispatch(setCourse(result));
//     }
//     setLoading(false);
//   };

//   return (
//     <form
//       className="w-full p-4 bg-richblack-800 border border-richblack-700 rounded-md flex flex-col gap-6"
//       onSubmit={handleSubmit(handelOnSubmit)}
//     >
//       <label>
//         <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//           Course Title
//         </p>
//         <input
//           name="courseTitle"
//           placeholder="Enter Course Title"
//           {...register("courseTitle", { required: true })}
//           style={{
//             boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//           }}
//           className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
//         ></input>
//         {errors.courseTitle && (
//           <span className="-mt-1 text-[12px] text-yellow-100">
//             Course Title is Required
//           </span>
//         )}
//       </label>

//       <label>
//         <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//           Course Short Description
//         </p>
//         <textarea
//           name="courseShortDesc"
//           placeholder="Enter Course Description"
//           rows="3"
//           {...register("courseShortDesc", { required: true })}
//           style={{
//             boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//           }}
//           className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
//         ></textarea>
//         {errors.courseShortDesc && (
//           <span className="-mt-1 text-[12px] text-yellow-100">
//             Course Description is required
//           </span>
//         )}
//       </label>

//       <label className=" relative">
//         <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 flex items-center gap-3">
//           Course Price{" "}
//           <HiOutlineCurrencyRupee className=" text-2xl text-richblack-300 absolute top-[2.35rem] left-1"></HiOutlineCurrencyRupee>
//         </p>
//         <input
//           name="coursePrice"
//           placeholder="Enter Course Price"
//           {...register("coursePrice", { required: true })}
//           style={{
//             boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//           }}
//           className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pl-9 text-richblack-5"
//         ></input>
//         {errors.coursePrice && (
//           <span className="-mt-1 text-[12px] text-yellow-100">
//             Course Price is required
//           </span>
//         )}
//       </label>

//      <label>
//   <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//     Course Category
//   </p>
//   <select
//     name="courseCategory"
//     defaultValue=""
//     {...register("courseCategory", { required: true })}
//     style={{
//       boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//     }}
//     className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
//   >
//     <option value="" disabled>
//       Choose a category
//     </option>

//     {/* Predefined Static Categories */}
//     <option value="web-dev">Web Development</option>
//     <option value="data-science">Data Science</option>
//     <option value="ai-ml">Artificial Intelligence & Machine Learning</option>
//     <option value="cyber-security">Cyber Security</option>
//     <option value="cloud-computing">Cloud Computing</option>
//     <option value="mobile-apps">Mobile App Development</option>
//     <option value="ui-ux">UI/UX Design</option>
//     <option value="digital-marketing">Digital Marketing</option>
// <option value="digital-marketing">Java</option>
//     {/* Dynamic Categories (from API) */}
//     {!loading &&
//       courseCategories.map((category, i) => (
//         <option key={i} value={category?._id}>
//           {category?.name}
//         </option>
//       ))}
//   </select>
// </label>


//       <ChipInput
//         label="Tags"
//         name="courseTags"
//         placeHolder="Enter Tags"
//         register={register}
//         errors={errors}
//         setValue={setValue}
//         getValues={getValues}
//       ></ChipInput>

//       {/* Component for uploading and showing prwview of media */}
//       <UploadField
//         name="courseImage"
//         label="Course Thumbnail"
//         register={register}
//         setValue={setValue}
//         errors={errors}
//         editData={editCourse ? course?.thumbnail : null}
//       ></UploadField>

//       <label>
//         <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//           Course Benefits
//         </p>
//         <textarea
//           name="courseBenefits"
//           placeholder="Enter Course Description"
//           rows="3"
//           {...register("courseBenefits", { required: true })}
//           style={{
//             boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//           }}
//           className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
//         ></textarea>
//         {errors.courseBenefits && (
//           <span className="-mt-1 text-[12px] text-yellow-100">
//             Course Benefits are required
//           </span>
//         )}
//       </label>

//       <RequirmentsField
//         name="courseRequirements"
//         label="Requirements/Instructions"
//         register={register}
//         errors={errors}
//         setValue={setValue}
//         getValues={getValues}
//       ></RequirmentsField>

//       <div className="flex items-center gap-4 justify-end">
//         {editCourse && (
//           <button
//             type="button"
//             onClick={() => dispatch(setStep(2))}
//             className="px-6 py-3 rounded-md bg-richblack-200 text-richblack-800 font-semibold hover:scale-95 transition-all duration-200"
//           >
//             Continue Without Saving
//           </button>
//         )}

//         <button
//           type="submit"
//           className="px-6 py-3 hover:scale-95 transition-all duration-200 bg-yellow-50 text-black rounded-md font-semibold"
//         >
//           {!editCourse ? (
//             <p className="flex items-center gap-2">
//               Next<IoIosArrowForward></IoIosArrowForward>
//             </p>
//           ) : (
//             "Save Changes"
//           )}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default CourseInfirmationForm;



// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { HiOutlineCurrencyRupee } from "react-icons/hi";
// import {
//   addCourse,
//   editCourseDetails,
//   fetchCourseCategories,
// } from "../../../../../services/operations/courseDetailsAPI";
// import { useDispatch, useSelector } from "react-redux";
// import RequirmentsField from "./RequirmentsField";
// import { setCourse, setStep } from "../../../../../redux/slices/courseSlice";
// import UploadField from "./UploadField";
// import { COURSE_STATUS } from "../../../../../utils/constants";
// import ChipInput from "./ChipInput";
// import toast from "react-hot-toast";
// import { IoIosArrowForward } from "react-icons/io";

// const CourseInfirmationForm = () => {
//   const [loading, setLoading] = useState(false);
//   const [courseCategories, setCourseCategories] = useState([]);
//   const { course, editCourse } = useSelector((state) => state.course);
//   const { token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm();

//   // Fetch categories from API
//   const getCategories = async () => {
//     setLoading(true);
//     const categories = await fetchCourseCategories();
//     if (categories.length > 0) {
//       setCourseCategories(categories);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (editCourse) {
//       setValue("courseTitle", course.courseName);
//       setValue("courseShortDesc", course.courseDescription);
//       setValue("coursePrice", course.price);
//       setValue("courseTags", course.tag);
//       setValue("courseBenefits", course.whatYouWillLearn);
//       setValue("courseCategory", course.category);
//       setValue("courseRequirements", course.instructions);
//       setValue("courseImage", course.thumbnail);
//     }

//     getCategories();
//   }, []);

//   // Check if form values have changed
//   const isFormUpdated = () => {
//     const currentValues = getValues();
//     return (
//       currentValues.courseTitle !== course.courseName ||
//       currentValues.courseShortDesc !== course.courseDescription ||
//       currentValues.coursePrice !== course.price ||
//       currentValues.courseTags.toString() !== course.tag.toString() ||
//       currentValues.courseBenefits !== course.whatYouWillLearn ||
//       (currentValues.courseCategory._id || currentValues.courseCategory) !==
//         (course.category._id || course.category) ||
//       currentValues.courseRequirements.toString() !==
//         course.instructions.toString() ||
//       currentValues.courseImage !== course.thumbnail
//     );
//   };

//   const handelOnSubmit = async (data) => {
//     const formData = new FormData();

//     if (editCourse) {
//       if (!isFormUpdated()) {
//         toast.error("No Changes Made To The Form");
//         return;
//       }

//       const currentValues = getValues();
//       formData.append("courseId", course._id);

//       if (currentValues.courseTitle !== course.courseName) {
//         formData.append("courseName", data.courseTitle);
//       }
//       if (currentValues.courseShortDesc !== course.courseDescription) {
//         formData.append("courseDescription", data.courseShortDesc);
//       }
//       if (currentValues.coursePrice !== course.price) {
//         formData.append("price", data.coursePrice);
//       }
//       if (currentValues.courseTags.toString() !== course.tag.toString()) {
//         data.courseTags.forEach((tag) => formData.append("tag", tag));
//       }
//       if (currentValues.courseBenefits !== course.whatYouWillLearn) {
//         formData.append("whatYouWillLearn", data.courseBenefits);
//       }
//       if (
//         (currentValues.courseCategory._id || currentValues.courseCategory) !==
//         (course.category._id || course.category)
//       ) {
//         formData.append(
//           "category",
//           data.courseCategory._id || data.courseCategory
//         );
//       }
//       if (
//         currentValues.courseRequirements.toString() !==
//         course.instructions.toString()
//       ) {
//         data.courseRequirements.forEach((req) =>
//           formData.append("instructions", req)
//         );
//       }
//       if (currentValues.courseImage !== course.thumbnail) {
//         formData.append("thumbnailImage", data.courseImage);
//       }

//       setLoading(true);
//       const result = await editCourseDetails(formData, token);
//       setLoading(false);

//       if (result) {
//         dispatch(setStep(2));
//         dispatch(setCourse(result));
//       }
//       return;
//     }

//     // CREATE NEW COURSE
//     formData.append("courseName", data.courseTitle);
//     formData.append("courseDescription", data.courseShortDesc);
//     formData.append("price", data.coursePrice);
//     data.courseTags.forEach((tag) => formData.append("tag", tag));
//     formData.append("whatYouWillLearn", data.courseBenefits);
//     formData.append("category", data.courseCategory._id || data.courseCategory);
//     data.courseRequirements.forEach((req) =>
//       formData.append("instructions", req)
//     );
//     formData.append("thumbnailImage", data.courseImage);
//     formData.append("status", COURSE_STATUS.DRAFT);

//     setLoading(true);
//     const result = await addCourse(formData, token);
//     setLoading(false);

//     if (result) {
//       dispatch(setStep(2));
//       dispatch(setCourse(result));
//     }
//   };

//   return (
//     <form
//       className="w-full p-4 bg-richblack-800 border border-richblack-700 rounded-md flex flex-col gap-6"
//       onSubmit={handleSubmit(handelOnSubmit)}
//     >
//       {/* Course Title */}
//       <label>
//         <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//           Course Title
//         </p>
//         <input
//           name="courseTitle"
//           placeholder="Enter Course Title"
//           {...register("courseTitle", { required: true })}
//           className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
//         />
//         {errors.courseTitle && (
//           <span className="-mt-1 text-[12px] text-yellow-100">
//             Course Title is Required
//           </span>
//         )}
//       </label>

//       {/* Short Description */}
//       <label>
//         <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//           Course Short Description
//         </p>
//         <textarea
//           name="courseShortDesc"
//           placeholder="Enter Course Description"
//           rows="3"
//           {...register("courseShortDesc", { required: true })}
//           className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
//         />
//         {errors.courseShortDesc && (
//           <span className="-mt-1 text-[12px] text-yellow-100">
//             Course Description is required
//           </span>
//         )}
//       </label>

//       {/* Price */}
//       <label className=" relative">
//         <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 flex items-center gap-3">
//           Course Price
//           <HiOutlineCurrencyRupee className=" text-2xl text-richblack-300 absolute top-[2.35rem] left-1" />
//         </p>
//         <input
//           name="coursePrice"
//           placeholder="Enter Course Price"
//           {...register("coursePrice", { required: true })}
//           className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pl-9 text-richblack-5"
//         />
//         {errors.coursePrice && (
//           <span className="-mt-1 text-[12px] text-yellow-100">
//             Course Price is required
//           </span>
//         )}
//       </label>

//       {/* Category */}
// <label>
//   <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//     Course Category
//   </p>
//   <select
//     name="courseCategory"
//     defaultValue=""
//     {...register("courseCategory", { required: true })}
//     className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
//   >
//     <option value="" disabled>
//       Choose a category
//     </option>

//     {/* Predefined Categories */}
//     <option value="web-dev">Web Development</option>
//     <option value="data-science">Data Science</option>
//     <option value="ai-ml">Artificial Intelligence & Machine Learning</option>
//     <option value="cyber-security">Cyber Security</option>
//     <option value="cloud-computing">Cloud Computing</option>
//     <option value="mobile-apps">Mobile App Development</option>
//     <option value="ui-ux">UI/UX Design</option>
//     <option value="digital-marketing">Digital Marketing</option>
//     <option value="java">Java Programming</option>
//     <option value="python">Python Programming</option>
//     <option value="blockchain">Blockchain Development</option>
//     <option value="devops">DevOps</option>
//     <option value="game-dev">Game Development</option>
//     <option value="embedded-systems">Embedded Systems</option>
//     <option value="cloud-architecture">Cloud Architecture</option>

//     {/* Dynamic Categories from API */}
//     {!loading &&
//       courseCategories.map((category) => (
//         <option key={category._id} value={category._id}>
//           {category.name}
//         </option>
//       ))}
//   </select>
// </label>



//       {/* Tags */}
//       <ChipInput
//         label="Tags"
//         name="courseTags"
//         placeHolder="Enter Tags"
//         register={register}
//         errors={errors}
//         setValue={setValue}
//         getValues={getValues}
//       />

//       {/* Thumbnail */}
//       <UploadField
//         name="courseImage"
//         label="Course Thumbnail"
//         register={register}
//         setValue={setValue}
//         errors={errors}
//         editData={editCourse ? course?.thumbnail : null}
//       />

//       {/* Benefits */}
//       <label>
//         <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//           Course Benefits
//         </p>
//         <textarea
//           name="courseBenefits"
//           placeholder="Enter Course Description"
//           rows="3"
//           {...register("courseBenefits", { required: true })}
//           className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
//         />
//         {errors.courseBenefits && (
//           <span className="-mt-1 text-[12px] text-yellow-100">
//             Course Benefits are required
//           </span>
//         )}
//       </label>

//       {/* Requirements/Instructions */}
//       <RequirmentsField
//         name="courseRequirements"
//         label="Requirements/Instructions"
//         register={register}
//         errors={errors}
//         setValue={setValue}
//         getValues={getValues}
//       />

//       {/* Submit Buttons */}
//       <div className="flex items-center gap-4 justify-end">
//         {editCourse && (
//           <button
//             type="button"
//             onClick={() => dispatch(setStep(2))}
//             className="px-6 py-3 rounded-md bg-richblack-200 text-richblack-800 font-semibold hover:scale-95 transition-all duration-200"
//           >
//             Continue Without Saving
//           </button>
//         )}

//         <button
//           type="submit"
//           className="px-6 py-3 hover:scale-95 transition-all duration-200 bg-yellow-50 text-black rounded-md font-semibold"
//         >
//           {!editCourse ? (
//             <p className="flex items-center gap-2">
//               Next<IoIosArrowForward />
//             </p>
//           ) : (
//             "Save Changes"
//           )}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default CourseInfirmationForm;







//Postman check




// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { HiOutlineCurrencyRupee } from "react-icons/hi";
// import {
//   addCourse,
//   editCourseDetails,
//   fetchCourseCategories,
// } from "../../../../../services/operations/courseDetailsAPI";
// import { useDispatch, useSelector } from "react-redux";
// import RequirmentsField from "./RequirmentsField";
// import { setCourse, setStep } from "../../../../../redux/slices/courseSlice";
// import UploadField from "./UploadField";
// import { COURSE_STATUS } from "../../../../../utils/constants";
// import ChipInput from "./ChipInput";
// import toast from "react-hot-toast";
// import { IoIosArrowForward } from "react-icons/io";

// const CourseInformationForm = () => {
//   const [loading, setLoading] = useState(false);
//   const [courseCategories, setCourseCategories] = useState([]);

//   const { course, editCourse } = useSelector((state) => state.course);
//   const { token } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm();

//   // -----------------------------
//   // Fetch Categories from Backend
//   // -----------------------------
//   const getCategories = async () => {
//     setLoading(true);
//     const categories = await fetchCourseCategories();
//     if (categories.length > 0) {
//       setCourseCategories(categories);
//     }
//     setLoading(false);
//   };

//   // -----------------------------
//   // Prefill form when editing
//   // -----------------------------
//   useEffect(() => {
//     getCategories();

//     if (editCourse) {
//       setValue("courseTitle", course.courseName);
//       setValue("courseShortDesc", course.courseDescription);
//       setValue("coursePrice", course.price);
//       setValue("courseTags", course.tag);
//       setValue("courseBenefits", course.whatYouWillLearn);
//       setValue("courseCategory", course.category?._id || course.category);
//       setValue("courseRequirements", course.instructions);
//       setValue("courseImage", course.thumbnail);
//     }
//   }, []);

//   // -----------------------------
//   // Check if form is updated
//   // -----------------------------
//   const isFormUpdated = () => {
//     const currentValues = getValues();
//     return (
//       currentValues.courseTitle !== course.courseName ||
//       currentValues.courseShortDesc !== course.courseDescription ||
//       currentValues.coursePrice !== course.price ||
//       currentValues.courseTags.toString() !== course.tag.toString() ||
//       currentValues.courseBenefits !== course.whatYouWillLearn ||
//       currentValues.courseCategory !==
//         (course.category?._id || course.category) ||
//       currentValues.courseRequirements.toString() !==
//         course.instructions.toString() ||
//       currentValues.courseImage !== course.thumbnail
//     );
//   };

//   // -----------------------------
//   // Submit Handler
//   // -----------------------------
//   const handleOnSubmit = async (data) => {
//     const formData = new FormData();

//     // -------------------- EDIT COURSE --------------------
//     if (editCourse) {
//       if (!isFormUpdated()) {
//         toast.error("No Changes Made To The Form");
//         return;
//       }

//       formData.append("courseId", course._id);

//       const current = getValues();

//       if (current.courseTitle !== course.courseName)
//         formData.append("courseName", data.courseTitle);

//       if (current.courseShortDesc !== course.courseDescription)
//         formData.append("courseDescription", data.courseShortDesc);

//       if (current.coursePrice !== course.price)
//         formData.append("price", data.coursePrice);

//       if (current.courseTags.toString() !== course.tag.toString()) {
//         data.courseTags.forEach((tag) => formData.append("tag", tag));
//       }

//       if (current.courseBenefits !== course.whatYouWillLearn)
//         formData.append("whatYouWillLearn", data.courseBenefits);

//       if (
//         current.courseCategory !== (course.category?._id || course.category)
//       ) {
//         formData.append("category", data.courseCategory);
//       }

//       if (
//         current.courseRequirements.toString() !==
//         course.instructions.toString()
//       ) {
//         data.courseRequirements.forEach((req) =>
//           formData.append("instructions", req)
//         );
//       }

//       if (current.courseImage !== course.thumbnail) {
//         // formData.append("thumbnailImage", data.courseImage);
//        formData.append("thumbnailImage", data.thumbnailImage);
 
//       }

//       setLoading(true);
//       const result = await editCourseDetails(formData, token);
//       setLoading(false);

//       if (result) {
//         dispatch(setStep(2));
//         dispatch(setCourse(result));
//       }

//       return;
//     }

//     // -------------------- CREATE COURSE --------------------
//     formData.append("courseName", data.courseTitle);
//     formData.append("courseDescription", data.courseShortDesc);
//     formData.append("price", data.coursePrice);

//     data.courseTags.forEach((tag) => formData.append("tag", tag));

//     formData.append("whatYouWillLearn", data.courseBenefits);
//     formData.append("category", data.courseCategory);

//     data.courseRequirements.forEach((req) =>
//       formData.append("instructions", req)
//     );

//     formData.append("thumbnailImage", data.courseImage);
//     formData.append("status", COURSE_STATUS.DRAFT);

//     setLoading(true);
//     const result = await addCourse(formData, token);
//     setLoading(false);

//     if (result) {
//       dispatch(setStep(2));
//       dispatch(setCourse(result));
//     }
//   };

//   return (
//     <form
//       className="w-full p-4 bg-richblack-800 border border-richblack-700 rounded-md flex flex-col gap-6"
//       onSubmit={handleSubmit(handleOnSubmit)}
//     >
//       {/* ------------------- TITLE ------------------- */}
//       <label>
//         <p className="mb-1 text-[0.875rem] text-richblack-5">Course Title</p>
//         <input
//           {...register("courseTitle", { required: true })}
//           placeholder="Enter Course Title"
//           className="w-full bg-richblack-700 rounded p-[12px] text-richblack-5"
//         />
//         {errors.courseTitle && (
//           <span className="text-yellow-100 text-xs">Course Title is required</span>
//         )}
//       </label>

//       {/* ------------------- DESCRIPTION ------------------- */}
//       <label>
//         <p className="mb-1 text-[0.875rem] text-richblack-5">
//           Course Short Description
//         </p>
//         <textarea
//           {...register("courseShortDesc", { required: true })}
//           rows="3"
//           placeholder="Enter Course Description"
//           className="w-full bg-richblack-700 rounded p-[12px] text-richblack-5"
//         />
//         {errors.courseShortDesc && (
//           <span className="text-yellow-100 text-xs">
//             Description is required
//           </span>
//         )}
//       </label>

//       {/* ------------------- PRICE ------------------- */}
//       <label className="relative">
//         <p className="mb-1 text-[0.875rem] text-richblack-5">Course Price</p>
//         <HiOutlineCurrencyRupee className="absolute left-2 top-[2.6rem] text-richblack-300 text-xl" />
//         <input
//           {...register("coursePrice", { required: true })}
//           placeholder="Enter Course Price"
//           className="w-full bg-richblack-700 rounded p-[12px] pl-8 text-richblack-5"
//         />
//       </label>

//       {/* ------------------- CATEGORY ------------------- */}
//       <label>
//         <p className="text-[0.875rem] mb-1 text-richblack-5">
//           Course Category
//         </p>

//         <select
//           {...register("courseCategory", { required: true })}
//           className="w-full bg-richblack-700 rounded p-[12px] text-richblack-5"
//           defaultValue=""
//         >
//           <option value="" disabled>
//             Choose category
//           </option>

//           {!loading &&
//             courseCategories.map((cat) => (
//               <option key={cat._id} value={cat._id}>
//                 {cat.name}
//               </option>
//             ))}
//         </select>

//         {errors.courseCategory && (
//           <span className="text-yellow-100 text-xs">
//             Course Category is required
//           </span>
//         )}
//       </label>

//       {/* ------------------- TAGS ------------------- */}
//       <ChipInput
//         label="Tags"
//         name="courseTags"
//         placeHolder="Enter Tags"
//         register={register}
//         errors={errors}
//         setValue={setValue}
//         getValues={getValues}
//       />

//       {/* ------------------- THUMBNAIL ------------------- */}
//       <UploadField
//         name="thumbnailImage"
//         label="Course Thumbnail"
//         register={register}
//         setValue={setValue}
//         errors={errors}
//         editData={editCourse ? course?.thumbnail : null}
//       />

//       {/* ------------------- BENEFITS ------------------- */}
//       <label>
//         <p className="text-[0.875rem] mb-1 text-richblack-5">
//           What you will learn
//         </p>
//         <textarea
//           {...register("courseBenefits", { required: true })}
//           rows="3"
//           placeholder="Enter Benefits"
//           className="w-full bg-richblack-700 rounded p-[12px] text-richblack-5"
//         />
//       </label>

//       {/* ------------------- REQUIREMENTS ------------------- */}
//       <RequirmentsField
//         name="courseRequirements"
//         label="Requirements / Instructions"
//         register={register}
//         errors={errors}
//         setValue={setValue}
//         getValues={getValues}
//       />

//       {/* ------------------- BUTTONS ------------------- */}
//       <div className="flex justify-end gap-4">
//         {editCourse && (
//           <button
//             type="button"
//             onClick={() => dispatch(setStep(2))}
//             className="bg-richblack-200 text-richblack-800 px-6 py-3 rounded-md font-semibold"
//           >
//             Continue Without Saving
//           </button>
//         )}

//         <button
//           type="submit"
//           className="bg-yellow-50 px-6 py-3 rounded-md font-semibold hover:scale-95 transition-all"
//         >
//           {!editCourse ? (
//             <p className="flex items-center gap-2">
//               Next <IoIosArrowForward />
//             </p>
//           ) : (
//             "Save Changes"
//           )}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default CourseInformationForm;





// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { HiOutlineCurrencyRupee } from "react-icons/hi";
// import {
//   addCourse,
//   editCourseDetails,
//   fetchCourseCategories,
// } from "../../../../../services/operations/courseDetailsAPI";
// import { useDispatch, useSelector } from "react-redux";
// import RequirmentsField from "./RequirmentsField";
// import { setCourse, setStep } from "../../../../../redux/slices/courseSlice";
// import UploadField from "./UploadField";
// import { COURSE_STATUS } from "../../../../../utils/constants";
// import ChipInput from "./ChipInput";
// import toast from "react-hot-toast";
// import { IoIosArrowForward } from "react-icons/io";

// const CourseInformationForm = () => {
//   const [loading, setLoading] = useState(false);
//   const [courseCategories, setCourseCategories] = useState([]);

//   const { course, editCourse } = useSelector((state) => state.course);
//   const { token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm();

//   // -----------------------------
//   // Fetch Categories
//   // -----------------------------
//   const getCategories = async () => {
//     setLoading(true);
//     const categories = await fetchCourseCategories();
//     if (categories.length > 0) setCourseCategories(categories);
//     setLoading(false);
//   };

//   // -----------------------------
//   // Prefill values in edit mode
//   // -----------------------------
//   useEffect(() => {
//     getCategories();

//     if (editCourse) {
//       setValue("courseTitle", course.courseName);
//       setValue("courseShortDesc", course.courseDescription);
//       setValue("coursePrice", course.price);
//       setValue("courseTags", course.tag);
//       setValue("courseBenefits", course.whatYouWillLearn);
//       setValue("courseCategory", course.category?._id);
//       setValue("courseRequirements", course.instructions);
//       setValue("thumbnailImage", null);
//     }
//   }, []);

//   // -----------------------------
//   // Submit Handler
//   // -----------------------------
//   const handleOnSubmit = async (data) => {
//     const formData = new FormData();

//     // EDIT MODE
//     if (editCourse) {
//       formData.append("courseId", course._id);

//       if (data.courseTitle !== course.courseName)
//         formData.append("courseName", data.courseTitle);

//       if (data.courseShortDesc !== course.courseDescription)
//         formData.append("courseDescription", data.courseShortDesc);

//       if (data.coursePrice !== course.price)
//         formData.append("price", data.coursePrice);

//       if (JSON.stringify(data.courseTags) !== JSON.stringify(course.tag))
//         formData.append("tag", JSON.stringify(data.courseTags));

//       if (data.courseBenefits !== course.whatYouWillLearn)
//         formData.append("whatYouWillLearn", data.courseBenefits);

//       if (data.courseCategory !== course.category?._id)
//         formData.append("category", data.courseCategory);

//       if (
//         JSON.stringify(data.courseRequirements) !==
//         JSON.stringify(course.instructions)
//       )
//         formData.append(
//           "instructions",
//           JSON.stringify(data.courseRequirements)
//         );

//       // NEW THUMBNAIL
//       if (data.thumbnailImage && typeof data.thumbnailImage !== "string") {
//         formData.append("thumbnailImage", data.thumbnailImage);
//       }

//       setLoading(true);
//       const result = await editCourseDetails(formData, token);
//       setLoading(false);

//       if (result) {
//         dispatch(setCourse(result));
//         dispatch(setStep(2));
//       }
//       return;
//     }

//     // CREATE NEW COURSE
//     formData.append("courseName", data.courseTitle);
//     formData.append("courseDescription", data.courseShortDesc);
//     formData.append("price", data.coursePrice);

//     // IMPORTANT FIX
//     formData.append("tag", JSON.stringify(data.courseTags));
//     formData.append("instructions", JSON.stringify(data.courseRequirements));

//     formData.append("whatYouWillLearn", data.courseBenefits);
//     formData.append("category", data.courseCategory);

//     formData.append("thumbnailImage", data.thumbnailImage);
//     formData.append("status", COURSE_STATUS.DRAFT);

//     setLoading(true);
//     const result = await addCourse(formData, token);
//     setLoading(false);

//     if (result) {
//       dispatch(setCourse(result));
//       dispatch(setStep(2));
//     }
//   };

//   return (
//     <form
//       className="w-full p-4 bg-richblack-800 border border-richblack-700 rounded-md flex flex-col gap-6"
//       onSubmit={handleSubmit(handleOnSubmit)}
//     >
//       {/* TITLE */}
//       <label>
//         <p className="mb-1 text-[0.875rem] text-richblack-5">Course Title</p>
//         <input
//           {...register("courseTitle", { required: true })}
//           className="w-full bg-richblack-700 rounded p-[12px] text-richblack-5"
//           placeholder="Enter Course Title"
//         />
//       </label>

//       {/* DESCRIPTION */}
//       <label>
//         <p className="mb-1 text-[0.875rem] text-richblack-5">Short Description</p>
//         <textarea
//           {...register("courseShortDesc", { required: true })}
//           rows="3"
//           className="w-full bg-richblack-700 rounded p-[12px] text-richblack-5"
//         />
//       </label>

//       {/* PRICE */}
//       <label className="relative">
//         <p className="mb-1 text-[0.875rem] text-richblack-5">Course Price</p>
//         <HiOutlineCurrencyRupee className="absolute left-2 top-[2.6rem] text-richblack-300 text-xl" />
//         <input
//           {...register("coursePrice", { required: true })}
//           className="w-full bg-richblack-700 rounded p-[12px] pl-8 text-richblack-5"
//         />
//       </label>

//       {/* CATEGORY */}
//       <label>
//         <p className="text-[0.875rem] text-richblack-5 mb-1">Category</p>
//         <select
//           {...register("courseCategory", { required: true })}
//           className="w-full bg-richblack-700 rounded p-[12px] text-richblack-5"
//         >
//           <option value="" disabled>
//             Choose Category
//           </option>
//           {!loading &&
//             courseCategories.map((cat) => (
//               <option key={cat._id} value={cat._id}>
//                 {cat.name}
//               </option>
//             ))}
//         </select>
//       </label>

//       {/* TAGS */}
//       <ChipInput
//         label="Tags"
//         name="courseTags"
//         register={register}
//         setValue={setValue}
//         getValues={getValues}
//         errors={errors}
//       />

//       {/* THUMBNAIL */}
//       <UploadField
//         name="thumbnailImage"
//         label="Course Thumbnail"
//         register={register}
//         setValue={setValue}
//         errors={errors}
//         editData={editCourse ? course.thumbnail : null}
//       />

//       {/* BENEFITS */}
//       <label>
//         <p className="text-[0.875rem] mb-1 text-richblack-5">
//           What You Will Learn
//         </p>
//         <textarea
//           {...register("courseBenefits", { required: true })}
//           rows="3"
//           className="w-full bg-richblack-700 rounded p-[12px] text-richblack-5"
//           placeholder="Enter benefits"
//         />
//       </label>

//       {/* REQUIREMENTS */}
//       <RequirmentsField
//         name="courseRequirements"
//         register={register}
//         setValue={setValue}
//         getValues={getValues}
//         errors={errors}
//         label="Requirements / Instructions"
//       />

//       {/* BUTTONS */}
//       <div className="flex justify-end gap-4">
//         {editCourse && (
//           <button
//             type="button"
//             onClick={() => dispatch(setStep(2))}
//             className="bg-richblack-200 text-richblack-800 px-6 py-3 rounded-md font-semibold"
//           >
//             Continue Without Saving
//           </button>
//         )}
//         <button className="bg-yellow-50 px-6 py-3 rounded-md font-semibold hover:scale-95 transition-all">
//           {!editCourse ? (
//             <p className="flex items-center gap-2">
//               Next <IoIosArrowForward />
//             </p>
//           ) : (
//             "Save Changes"
//           )}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default CourseInformationForm;



// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { HiOutlineCurrencyRupee } from "react-icons/hi";
// import {
//   addCourse,
//   editCourseDetails,
//   fetchCourseCategories,
// } from "../../../../../services/operations/courseDetailsAPI";
// import { useDispatch, useSelector } from "react-redux";
// import RequirmentsField from "./RequirmentsField";
// import { setCourse, setStep } from "../../../../../redux/slices/courseSlice";
// import UploadField from "./UploadField";
// import { COURSE_STATUS } from "../../../../../utils/constants";
// import ChipInput from "./ChipInput";
// import { IoIosArrowForward } from "react-icons/io";

// const CourseInformationForm = () => {
//   const [loading, setLoading] = useState(false);
//   const [courseCategories, setCourseCategories] = useState([]);

//   const { course, editCourse } = useSelector((state) => state.course);
//   const { token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm();

//   // -----------------------------
//   // Fetch Categories
//   // -----------------------------
//   const getCategories = async () => {
//     setLoading(true);
//     const categories = await fetchCourseCategories();
//     if (categories.length > 0) setCourseCategories(categories);
//     setLoading(false);
//   };

//   // -----------------------------
//   // Prefill values in edit mode
//   // -----------------------------
//   useEffect(() => {
//     getCategories();

//     if (editCourse && course) {
//       setValue("courseTitle", course.courseName);
//       setValue("courseShortDesc", course.courseDescription);
//       setValue("coursePrice", course.price);
//       setValue("courseTags", course.tag);
//       setValue("courseBenefits", course.whatYouWillLearn);
//       setValue("courseCategory", course.category?._id);

//       // FIX: Convert array → objects for RequirmentsField
//       setValue(
//         "courseRequirements",
//         course.instructions?.map((item) => ({ requirement: item })) || []
//       );

//       setValue("thumbnailImage", null);
//     }
//   }, []);

//   // -----------------------------
//   // Submit Handler
//   // -----------------------------
//   const handleOnSubmit = async (data) => {
//     const formData = new FormData();

//     // ---------------------------------------------
//     // EDIT MODE
//     // ---------------------------------------------
//     if (editCourse) {
//       formData.append("courseId", course._id);

//       if (data.courseTitle !== course.courseName)
//         formData.append("courseName", data.courseTitle);

//       if (data.courseShortDesc !== course.courseDescription)
//         formData.append("courseDescription", data.courseShortDesc);

//       if (data.coursePrice !== course.price)
//         formData.append("price", data.coursePrice);

//       if (JSON.stringify(data.courseTags) !== JSON.stringify(course.tag))
//         formData.append("tag", JSON.stringify(data.courseTags));

//       if (data.courseBenefits !== course.whatYouWillLearn)
//         formData.append("whatYouWillLearn", data.courseBenefits);

//       if (data.courseCategory !== course.category?._id)
//         formData.append("category", data.courseCategory);

//       // FIX: Requirements conversion
//       const newReqs = data.courseRequirements.map((item) => item.requirement);

//       if (JSON.stringify(newReqs) !== JSON.stringify(course.instructions)) {
//         formData.append("instructions", JSON.stringify(newReqs));
//       }

//       // FIX: Only update thumbnail if new file selected
//       if (data.thumbnailImage && typeof data.thumbnailImage !== "string") {
//         formData.append("thumbnailImage", data.thumbnailImage);
//       }

//       setLoading(true);
//       const result = await editCourseDetails(formData, token);
//       setLoading(false);

//       if (result) {
//         dispatch(setCourse(result));
//         dispatch(setStep(2)); // GO TO COURSE BUILDER
//       }
//       return;
//     }

//     // ---------------------------------------------
//     // CREATE NEW COURSE
//     // ---------------------------------------------
//     formData.append("courseName", data.courseTitle);
//     formData.append("courseDescription", data.courseShortDesc);
//     formData.append("price", data.coursePrice);

//     formData.append("tag", JSON.stringify(data.courseTags));

//     const reqs = data.courseRequirements.map((r) => r.requirement);
//     formData.append("instructions", JSON.stringify(reqs));

//     formData.append("whatYouWillLearn", data.courseBenefits);
//     formData.append("category", data.courseCategory);

//     formData.append("thumbnailImage", data.thumbnailImage);    
//     formData.append("status", COURSE_STATUS.DRAFT);

//     setLoading(true);
//     const result = await addCourse(formData, token);
//     setLoading(false);

//     if (result) {
//       dispatch(setCourse(result));
//       dispatch(setStep(2));
//     }
//   };

//   return (
//     <form
//       className="w-full p-4 bg-richblack-800 border border-richblack-700 rounded-md flex flex-col gap-6"
//       onSubmit={handleSubmit(handleOnSubmit)}
//     >
//       {/* TITLE */}
//       <label>
//         <p className="mb-1 text-[0.875rem] text-richblack-5">Course Title</p>
//         <input
//           {...register("courseTitle", { required: true })}
//           className="w-full bg-richblack-700 rounded p-[12px] text-richblack-5"
//           placeholder="Enter Course Title"
//         />
//       </label>

//       {/* DESCRIPTION */}
//       <label>
//         <p className="mb-1 text-[0.875rem] text-richblack-5">Short Description</p>
//         <textarea
//           {...register("courseShortDesc", { required: true })}
//           rows="3"
//           className="w-full bg-richblack-700 rounded p-[12px] text-richblack-5"
//         />
//       </label>

//       {/* PRICE */}
//       <label className="relative">
//         <p className="mb-1 text-[0.875rem] text-richblack-5">Course Price</p>
//         <HiOutlineCurrencyRupee className="absolute left-2 top-[2.6rem] text-richblack-300 text-xl" />
//         <input
//           {...register("coursePrice", { required: true })}
//           className="w-full bg-richblack-700 rounded p-[12px] pl-8 text-richblack-5"
//         />
//       </label>

//       {/* CATEGORY */}
//       <label>
//         <p className="text-[0.875rem] text-richblack-5 mb-1">Category</p>
//         <select
//           {...register("courseCategory", { required: true })}
//           className="w-full bg-richblack-700 rounded p-[12px] text-richblack-5"
//         >
//           <option value="" disabled>
//             Choose Category
//           </option>
//           {!loading &&
//             courseCategories.map((cat) => (
//               <option key={cat._id} value={cat._id}>
//                 {cat.name}
//               </option>
//             ))}
//         </select>
//       </label>

//       {/* TAGS */}
//       <ChipInput
//         label="Tags"
//         name="courseTags"
//         register={register}
//         setValue={setValue}
//         getValues={getValues}
//         errors={errors}
//       />

//       {/* THUMBNAIL */}
//       <UploadField
//         name="thumbnailImage"
//         label="Course Thumbnail"
//         register={register}
//         setValue={setValue}
//         errors={errors}
//         editData={editCourse ? course.thumbnail : null}
//       />

//       {/* BENEFITS */}
//       <label>
//         <p className="text-[0.875rem] mb-1 text-richblack-5">
//           What You Will Learn
//         </p>
//         <textarea
//           {...register("courseBenefits", { required: true })}
//           rows="3"
//           className="w-full bg-richblack-700 rounded p-[12px] text-richblack-5"
//           placeholder="Enter benefits"
//         />
//       </label>

//       {/* REQUIREMENTS */}
//       <RequirmentsField
//         name="courseRequirements"
//         register={register}
//         setValue={setValue}
//         getValues={getValues}
//         errors={errors}
//         label="Requirements / Instructions"
//       />

//       {/* BUTTONS */}
//       <div className="flex justify-end gap-4">
//         {editCourse && (
//           <button
//             type="button"
//             onClick={() => dispatch(setStep(2))}
//             className="bg-richblack-200 text-richblack-800 px-6 py-3 rounded-md font-semibold"
//           >
//             Continue Without Saving
//           </button>
//         )}

//         <button className="bg-yellow-50 px-6 py-3 rounded-md font-semibold hover:scale-95 transition-all">
//           {!editCourse ? (
//             <p className="flex items-center gap-2">
//               Next <IoIosArrowForward />
//             </p>
//           ) : (
//             "Save Changes"
//           )}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default CourseInformationForm;



//test buttom
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import {
  addCourse,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";
import { useDispatch, useSelector } from "react-redux";
import RequirmentsField from "./RequirmentsField";
import { setCourse, setStep } from "../../../../../redux/slices/courseSlice";
import UploadField from "./UploadField";
import { COURSE_STATUS } from "../../../../../utils/constants";
import ChipInput from "./ChipInput";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";


const CourseInformationForm = () => {
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  const { course, editCourse } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  // -----------------------------
  // Fetch Categories
  // -----------------------------
  const getCategories = async () => {
    const categories = await fetchCourseCategories();
    setCourseCategories(categories);
  };

  // -----------------------------
  // PREFILL EDIT MODE
  // -----------------------------
  useEffect(() => {
    getCategories();

    if (editCourse && course) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category?._id);

      // Requirements are now STRINGS
      setValue("courseRequirements", course.instructions || []);

      // Thumbnail is NOT required in edit
      setValue("thumbnailImage", null);
    }
  }, []);

  // -----------------------------
  // SUBMIT HANDLER
  // -----------------------------
  const handleOnSubmit = async (data) => {
    const formData = new FormData();

    // ----------------------------------
    // EDIT MODE
    // ----------------------------------
    if (editCourse) {
      formData.append("courseId", course._id);

      // Only append fields that changed
      if (data.courseTitle !== course.courseName)
        formData.append("courseName", data.courseTitle);

      if (data.courseShortDesc !== course.courseDescription)
        formData.append("courseDescription", data.courseShortDesc);

      if (data.coursePrice !== course.price)
        formData.append("price", data.coursePrice);

      if (JSON.stringify(data.courseTags) !== JSON.stringify(course.tag))
        formData.append("tag", JSON.stringify(data.courseTags));

      if (data.courseBenefits !== course.whatYouWillLearn)
        formData.append("whatYouWillLearn", data.courseBenefits);

      if (data.courseCategory !== course.category?._id)
        formData.append("category", data.courseCategory);

      // FIX: Requirements (already array of strings)
      const newReqs = data.courseRequirements;
      if (JSON.stringify(newReqs) !== JSON.stringify(course.instructions)) {
        formData.append("instructions", JSON.stringify(newReqs));
      }

      // FIX: Thumbnail only update if new file selected
      if (data.thumbnailImage && typeof data.thumbnailImage !== "string") {
        formData.append("thumbnailImage", data.thumbnailImage);
      }

      setLoading(true);
      const result = await editCourseDetails(formData, token);
      setLoading(false);

      if (result) {
        dispatch(setCourse(result));
        //dispatch(setStep(2)); // GO TO COURSE BUILDER
        navigate("/dashboard/my-courses"); 
      }
      return;
    }

    // ----------------------------------
    // CREATE MODE
    // ----------------------------------
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);

    formData.append("tag", JSON.stringify(data.courseTags));

    formData.append(
      "instructions",
      JSON.stringify(data.courseRequirements)
    );

    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);

    formData.append("thumbnailImage", data.thumbnailImage);
    formData.append("status", COURSE_STATUS.DRAFT);

    setLoading(true);
    const result = await addCourse(formData, token);
    setLoading(false);

    if (result) {
      dispatch(setCourse(result));
      dispatch(setStep(2));
    }
  };

  return (
    <form
      className="w-full p-4 bg-richblack-800 border border-richblack-700 rounded-md flex flex-col gap-6"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      {/* TITLE */}
      <label>
        <p className="mb-1 text-[0.875rem] text-richblack-5">Course Title</p>
        <input
          {...register("courseTitle", { required: true })}
          className="w-full bg-richblack-700 rounded p-[12px] text-richblack-5"
          placeholder="Enter Course Title"
        />
      </label>

      {/* DESCRIPTION */}
      <label>
        <p className="mb-1 text-[0.875rem] text-richblack-5">Short Description</p>
        <textarea
          {...register("courseShortDesc", { required: true })}
          rows="3"
          className="w-full bg-richblack-700 rounded p-[12px] text-richblack-5"
        />
      </label>

      {/* PRICE */}
      <label className="relative">
        <p className="mb-1 text-[0.875rem] text-richblack-5">Course Price</p>
        <HiOutlineCurrencyRupee className="absolute left-2 top-[2.6rem] text-richblack-300 text-xl" />
        <input
          {...register("coursePrice", { required: true })}
          className="w-full bg-richblack-700 rounded p-[12px] pl-8 text-richblack-5"
        />
      </label>

      {/* CATEGORY */}
      <label>
        <p className="text-[0.875rem] text-richblack-5 mb-1">Category</p>
        <select
          {...register("courseCategory", { required: true })}
          className="w-full bg-richblack-700 rounded p-[12px] text-richblack-5"
        >
          <option value="" disabled>Select Category</option>

          {courseCategories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>

      {/* TAGS */}
      <ChipInput
        label="Tags"
        name="courseTags"
        register={register}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
      />

      {/* THUMBNAIL */}
      <UploadField
        name="thumbnailImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        // NOT REQUIRED IN EDIT MODE
        editData={editCourse ? course.thumbnail : null}
      />

      {/* BENEFITS */}
      <label>
        <p className="text-[0.875rem] mb-1 text-richblack-5">
          What You Will Learn
        </p>
        <textarea
          {...register("courseBenefits", { required: true })}
          rows="3"
          className="w-full bg-richblack-700 rounded p-[12px] text-richblack-5"
          placeholder="Enter benefits"
        />
      </label>

      {/* REQUIREMENTS */}
      <RequirmentsField
        name="courseRequirements"
        register={register}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
        label="Requirements / Instructions"
      />

      {/* BUTTONS */}
      <div className="flex justify-end gap-4">
        {editCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            className="bg-richblack-200 text-richblack-800 px-6 py-3 rounded-md font-semibold"
          >
            Continue Without Saving
          </button>
        )}

        <button className="bg-yellow-50 px-6 py-3 rounded-md font-semibold hover:scale-95 transition-all">
          {!editCourse ? (
            <p className="flex items-center gap-2">
              Next <IoIosArrowForward />
            </p>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
};

export default CourseInformationForm;
