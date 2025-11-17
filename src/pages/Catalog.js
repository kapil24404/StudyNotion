// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchCourseCategories } from "../services/operations/courseDetailsAPI";
// import { getcatalogPageData } from "../services/operations/catalogPageData";
// import CourseSlider from "../components/core/catalog/CourseSlider";
// import Course_Card from "../components/core/catalog/Course_Card";

// const Catalog = () => {
//   const { catalogName } = useParams();
//   const [catelogPageData, setCatelogPageData] = useState(null);
//   const [categoryId, setCategoryId] = useState("");
//   const [active, setActive] = useState(1);

//   useEffect(() => {
//     const getCategories = async () => {
//       try {
//         const result = await fetchCourseCategories();

//         const category_id = result.filter(
//           (category) =>
//             category.name.split(" ").join("-").toLowerCase() === catalogName
//         )[0]._id;

//         setCategoryId(category_id);
//       } catch (error) {
//         console.log("Category api error: ", error);
//       }
//     };

//     getCategories();
//   }, [catalogName]);

//   useEffect(() => {
//     const getCategoryDetails = async () => {
//       try {
//         const res = await getcatalogPageData(categoryId);
//         setCatelogPageData(res);
//       } catch (error) {
//         console.log("Error: ", error);
//       }
//     };
//     if (categoryId) {
//       getCategoryDetails();
//     }
//   }, [categoryId]);

//   return (
//     <div className="w-full">
//       {/* section1 */}
//       <div className="w-full bg-richblack-700 pt-20">
//         <div className=" w-11/12 max-w-maxContent mx-auto py-10 flex flex-col gap-5">
//           <p className="text-sm text-richblack-300">
//             {`Home / Catalog / `}
//             <span className=" text-yellow-25">
//               {catelogPageData?.data?.selectedCategory.name}
//             </span>
//           </p>
//           <p className="text-3xl text-richblack-5">
//             {catelogPageData?.data?.selectedCategory.name}
//           </p>
//           <p className="max-w-[870px] text-richblack-200">
//             {catelogPageData?.data?.selectedCategory?.description}
//           </p>
//         </div>
//       </div>

//       {/* Selected Courses Section */}
//       <div className="w-11/12 max-w-maxContent mx-auto py-4">
//         <p className=" text-2xl text-richblack-5">Courses to get you started</p>
//         <div className="my-4 flex border-b border-b-richblack-600 text-sm">
//           <p
//             className={`${
//               active === 1
//                 ? "border-b border-b-yellow-25 text-yellow-25"
//                 : "text-richblack-50"
//             } cursor-pointer px-4 py-2`}
//             onClick={() => setActive(1)}
//           >
//             Most Popular
//           </p>
//           <p
//             className={`${
//               active === 2
//                 ? "border-b border-b-yellow-25 text-yellow-25"
//                 : "text-richblack-50"
//             } cursor-pointer px-4 py-2`}
//             onClick={() => setActive(2)}
//           >
//             New
//           </p>
//         </div>

//         <div className=" pt-8">
//           <CourseSlider
//             Courses={catelogPageData?.data?.selectedCategory?.courses}
//           ></CourseSlider>
//         </div>
//       </div>

//       <div className="w-11/12 max-w-maxContent mx-auto py-4">
//         <p className="text-2xl text-richblack-5">
//           Top courses in {catelogPageData?.data?.differentCategory.name}
//         </p>
//         <div className=" py-8">
//           <CourseSlider
//             Courses={catelogPageData?.data?.differentCategory?.courses}
//           ></CourseSlider>
//         </div>
//       </div>

//       <div className="w-11/12 max-w-maxContent mx-auto py-4">
//         <p className="text-2xl text-richblack-5">Frequently Bought</p>
//         <div className=" py-8">
//           <div className=" grid grid-cols-1 lg:grid-cols-2 gap-9">
//             {catelogPageData?.data?.mostSellingCourses
//               ?.slice(0, 4)
//               .map((courses, i) => (
//                 <Course_Card
//                   key={i}
//                   course={courses}
//                   Height={"h-[320px]"}
//                 ></Course_Card>
//               ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Catalog;




import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCourseCategories } from "../services/operations/courseDetailsAPI";
import { getcatalogPageData } from "../services/operations/catalogPageData";
import CourseSlider from "../components/core/catalog/CourseSlider";
import Course_Card from "../components/core/catalog/Course_Card";

const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [active, setActive] = useState(1);
  const [loading, setLoading] = useState(true);

  // ----------------------------------------------------------------
  // 1️⃣ Get categoryId from category name
  // ----------------------------------------------------------------
  useEffect(() => {
    const getCategories = async () => {
      try {
        const result = await fetchCourseCategories();

        const matchedCategory = result.find(
          (category) =>
            category.name.split(" ").join("-").toLowerCase() === catalogName
        );

        if (matchedCategory) {
          setCategoryId(matchedCategory._id);
        }
      } catch (error) {
        console.log("Category API error:", error);
      }
    };

    getCategories();
  }, [catalogName]);

  // ----------------------------------------------------------------
  // 2️⃣ Fetch Catalog Page Data using categoryId
  // ----------------------------------------------------------------
  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        setLoading(true);
        const res = await getcatalogPageData(categoryId);
        setCatalogPageData(res);
        setLoading(false);
      } catch (error) {
        console.log("Catalog page data error:", error);
        setLoading(false);
      }
    };

    if (categoryId) getCategoryDetails();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-richblack-200 text-xl">
        Loading...
      </div>
    );
  }

  if (!catalogPageData) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-richblack-200 text-xl">
        No data found
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Section 1 */}
      <div className="w-full bg-richblack-700 pt-20">
        <div className="w-11/12 max-w-maxContent mx-auto py-10 flex flex-col gap-5">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>

          <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>

          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Selected Courses */}
      <div className="w-11/12 max-w-maxContent mx-auto py-4">
        <p className="text-2xl text-richblack-5">Courses to Get You Started</p>

        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer px-4 py-2`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>

          <p
            className={`${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer px-4 py-2`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>

        <div className="pt-8">
          <CourseSlider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>

      {/* Top Courses Section */}
      <div className="w-11/12 max-w-maxContent mx-auto py-4">
        <p className="text-2xl text-richblack-5">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </p>

        <div className="py-8">
          <CourseSlider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* Frequently Bought */}
      <div className="w-11/12 max-w-maxContent mx-auto py-4">
        <p className="text-2xl text-richblack-5">Frequently Bought</p>

        <div className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-9">
          {catalogPageData?.data?.mostSellingCourses
            ?.slice(0, 4)
            .map((course, i) => (
              <Course_Card key={course._id || i} course={course} Height="h-[320px]" />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
