import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import DateField from "../DateField";
import InputField from "../InputField";

const SearchBar = ({ articles, favorites, setArticles, onSearch }) => {
  const [query, setQuery] = useState("");
  const [toDate, setToDate] = useState("");
  const [source, setSource] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [category, setCategory] = useState("");
  const [originalData, setOriginalData] = useState();
  const [selectedNav, setSelectedNav] = useState("feed");
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setOriginalData(articles);
  }, []);

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

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ query, fromDate, toDate, selectedCategory, selectedSource });
  };

  const onReset = (e) => {
    e.preventDefault();

    setQuery("");
    setToDate("");
    setFromDate("");
    setSelectedSource("");
    setSelectedCategory("");

    onSearch();
  };

  const handleNavigation = (type) => {
    setSelectedNav(type);
    switch (type) {
      case "feed":
        setArticles(originalData);
        break;
      default:
        const _favorites = favorites[type];
        const dataTemp = originalData?.filter((data) => {
          const separated = String(data[type]).split(",");
          return _favorites?.some((fav) => separated.includes(fav));
        });

        setArticles(dataTemp);
        break;
    }
  };

  return (
    <div className="my-4 px-20">
      <p
        onClick={onReset}
        className="text-right cursor-pointer font-semibold text-[#315376]"
      >
        Clear Filters
      </p>
      <div className="flex justify-between gap-4">
        <div className="space-x-8">
          <a
            onClick={() => handleNavigation("feed")}
            className={`font-semibold text-gray-600 underline cursor-pointer ${
              selectedNav === "feed"
                ? "selected"
                : "hover:text-gray-900 hover:text-lg"
            }`}
          >
            Feed
          </a>
          <a
            onClick={() => handleNavigation("author")}
            className={`font-semibold text-gray-600 underline cursor-pointer ${
              selectedNav === "author"
                ? "selected"
                : "hover:text-gray-900 hover:text-lg"
            }`}
          >
            Favorite Authors
          </a>
          <a
            onClick={() => handleNavigation("category")}
            className={`font-semibold text-gray-600 underline cursor-pointer ${
              selectedNav === "category"
                ? "selected"
                : "hover:text-gray-900 hover:text-lg"
            }`}
          >
            Favorite Categories
          </a>
          <a
            onClick={() => handleNavigation("source")}
            className={`font-semibold text-gray-600 underline cursor-pointer ${
              selectedNav === "source"
                ? "selected"
                : "hover:text-gray-900 hover:text-lg"
            }`}
          >
            Favorite Sources
          </a>
        </div>

        <InputField
          type="text"
          name="search"
          value={query}
          label="Search Articles"
          placeholder="Search articles..."
          onInputChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

        <Dropdown
          label="Category"
          name="category"
          options={category}
          value={selectedCategory}
          onValueChange={(e) => setSelectedCategory([e.target.value])}
        />
        <Dropdown
          label="Sources"
          name="sources"
          options={source}
          value={selectedSource}
          onValueChange={(e) => setSelectedSource([e.target.value])}
        />
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={handleSearch}
          className="rounded-lg bg-blue-600 px-8 py-1.5 font-medium text-white outline-none hover:opacity-80 focus:ring"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
