import { RequestCategory } from "@/types/RequiredCategory";
import React from "react";
import useSWR from "swr";

interface SelectCtegoryProps {
  id?: string;
  name?: string;
  handleCategoryChange: (id: string, name: string) => void;
}

const fetcher = (url: string): Promise<{ response: RequestCategory }> => {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch media in SelectMedia component");
    }
    return response.json();
  });
};

const SelectCategory = ({
  id,
  name,
  handleCategoryChange,
}: SelectCtegoryProps) => {
  const url = "/api/category";
  const { data, error, isLoading } = useSWR(url, fetcher);

  if (error) {
    return <div>Error: this request is faild</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const categoryList: RequestCategory | undefined = data?.response;

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Category</h1>
      {id && name && (
        <div className="my-4" key={id}>
          <div className="p-2 bg-gray-200 border-l-2 border-blue-500">
            <p className="text-gray-700 text-lg font-semibold">
              Current Category: {name}
            </p>
          </div>
        </div>
      )}
      <div className="flex">
        {categoryList?.category.map((category) => (
          <div key={category.id} className="m-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                handleCategoryChange(category.id, category.name);
              }}
            >
              {category.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SelectCategory;
