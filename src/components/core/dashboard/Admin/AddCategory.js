import React from "react";
import AddcategoryForm from "./AddcategoryForm";

const AddCategory = () => {
  return (
    <div className="w-full pl-0 lg:pl-[222px]">
      <div className="w-11/12 max-w-[800px] flex flex-col items-start mx-auto mt-12 mb-24">
        <h1 className="text-4xl font-semibold mb-4">Add Course Categories</h1>
        <AddcategoryForm></AddcategoryForm>
      </div>
    </div>
  );
};

export default AddCategory;
