import { SearchCategory } from "./SearchCategory.jsx";
import { useState } from "react";
import { SearchTag } from "./SearchTag.jsx";
import { Divider } from "antd";
import { SelectedElement } from "./SelectedElement.jsx";

export const CategoryTagSelection = ({
  selectedCategory,
  setSelectedCategory,
  selectedTag,
  setSelectedTag,
}) => {
  return (
    <>
      <div className={"flex justify-center gap-10 mb-10"}>
        <div>
          <SearchCategory
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <div>
          <SearchTag
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
          />
        </div>
      </div>
      <SelectedElement
        selected={selectedCategory}
        type={"Thể loại"}
        color={"blue"}
      />
      <SelectedElement selected={selectedTag} type={"Tag"} color={"amber"} />
    </>
  );
};
