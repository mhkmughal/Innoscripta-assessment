import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import DateField from "../DateField";
import InputField from "../InputField";

const SearchBar = ({ articles, onSearch }) => {
  const [query, setQuery] = useState("");
  const [toDate, setToDate] = useState("");
  const [source, setSource] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ query, fromDate, toDate, category, source });
  };

  const onReset = (e) => {
    e.preventDefault();

    setQuery("");
    setToDate("");
    setSource("");
    setFromDate("");
    setCategory("");
  };

  useEffect(() => {
    const categoriesTemp = articles.reduce((acc, cur) => {
      if (!acc.includes(cur.category)) {
        return [...acc, cur.category];
      }
      return acc;
    }, []);
    setCategory(categoriesTemp);

    const sourcesTemp = articles.reduce((acc, cur) => {
      if (!acc.includes(cur.source)) {
        return [...acc, cur.source];
      }
      return acc;
    }, []);
    setSource(sourcesTemp);
  }, [articles]);

  return (
    <>
      <p
        onClick={onReset}
        className="text-right cursor-pointer font-semibold text-[#315376]"
      >
        Clear Filters
      </p>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <InputField
          type="text"
          name="search"
          value={query}
          label="Search Articles"
          placeholder="Search articles..."
          onInputChange={(e) => setQuery(e.target.value)}
        />
        <DateField
          value={fromDate}
          label="From Date"
          placeholder="From date"
          onChange={(e) => setFromDate(e.target.value)}
        />
        <DateField
          value={toDate}
          label="To Date"
          placeholder="To date"
          onChange={(e) => setToDate(e.target.value)}
        />

        <Dropdown label="Category" name="category" options={category} />
        <Dropdown label="Sources" name="sources" options={source} />
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={handleSearch}
          class="rounded-lg bg-blue-600 px-8 py-1.5 font-medium text-white outline-none hover:opacity-80 focus:ring"
        >
          Apply
        </button>
      </div>
    </>
  );
};

export default SearchBar;
