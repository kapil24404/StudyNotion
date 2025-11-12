import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createCategory } from "../../../../services/operations/courseDetailsAPI";
import { useSelector } from "react-redux";

const AddcategoryForm = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmitHandler = async (data) => {
    const formData = new FormData();
    formData.append("name", data.categoryName);
    formData.append("description", data.categoryDesc);

    setLoading(true);
    const res = await createCategory(formData, token);

    setLoading(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        categoryName: "",
        categoryDesc: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form
      className="w-full sm:w-[500px] flex flex-col gap-4 mt-10"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <label>
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Category Name
        </p>
        <input
          type="text"
          name="categoryName"
          placeholder="Enter Category Name"
          {...register("categoryName", { required: true })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        ></input>
        {errors.categoryName && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Category name is required
          </span>
        )}
      </label>

      <label>
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Category Description
        </p>
        <textarea
          name="categoryDesc"
          rows="3"
          placeholder="Enter Lecture Description"
          {...register("categoryDesc", { required: true })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
        ></textarea>
        {errors.categoryDesc && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Category description is required
          </span>
        )}
      </label>
      <div className="flex justify-end">
        <button
          disabled={loading}
          type="submit"
          className="py-3 px-4 rounded-md bg-yellow-50 text-richblack-900 font-semibold"
        >
          {loading ? "Loading..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default AddcategoryForm;
