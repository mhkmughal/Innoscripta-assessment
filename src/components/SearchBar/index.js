import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import DateField from "../DateField";
import InputField from "../InputField";

const SearchBar = ({ articles, favorites, setArticles }) => {
  const [query, setQuery] = useState("");
  const [dateError, setDateError] = useState("");
  const [selectedNav, setSelectedNav] = useState("feed");

  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);

  const [originalData] = useState(articles);
  const [filteredData, setFilteredData] = useState(articles);

  const [dateRange, setDateRange] = useState({ fromDate: "", toDate: "" });
  const [selectedFilters, setSelectedFilters] = useState({
    source: "",
    category: "",
  });

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(originalData.map((article) => article.category)),
    ];
    setCategories(uniqueCategories);

    const uniqueSources = [
      ...new Set(originalData.map((article) => article.source)),
    ];
    setSources(uniqueSources);
  }, [originalData]);

  useEffect(() => {
    if (originalData?.length > 0) {
      let filteredArticles = filteredData;

      // Apply query filter
      if (query) {
        const queryLower = query.toLowerCase();
        filteredArticles = filteredArticles?.filter(
          (article) =>
            article?.title?.toLowerCase()?.includes(queryLower) ||
            article?.description?.toLowerCase()?.includes(queryLower)
        );
      }

      // Apply category filter
      if (selectedFilters.category) {
        filteredArticles = filteredArticles?.filter(
          (article) => article.category === selectedFilters.category
        );
      }

      // Apply source filter
      if (selectedFilters.source) {
        filteredArticles = filteredArticles?.filter(
          (article) => article?.source === selectedFilters?.source
        );
      }

      // Apply date filter
      if (dateRange?.fromDate || dateRange?.toDate) {
        const { fromDate, toDate } = dateRange;
        if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
          setDateError("From date cannot be later than To date.");
          return;
        }
        setDateError(""); // Clear error if dates are valid

        filteredArticles = filteredArticles?.filter((article) => {
          const articleDate = new Date(article?.date);
          return (
            (!fromDate || articleDate >= new Date(fromDate)) &&
            (!toDate || articleDate <= new Date(toDate))
          );
        });
      }

      setArticles(filteredArticles);
    }
  }, [query, dateRange, selectedFilters, originalData]);

  const onReset = (e) => {
    e.preventDefault();

    setQuery("");
    setDateError("");
    setDateRange({ fromDate: "", toDate: "" });
    setSelectedFilters({ source: "", category: "" });
  };

  const handleNavigation = (type) => {
    if (selectedNav === type) return;
    setSelectedNav(type);

    if (type === "feed") {
      setArticles(originalData);
      setFilteredData(originalData);
    } else {
      const favoriteList = favorites[type] || [];
      const filteredArticles = originalData?.filter((article) =>
        favoriteList?.includes(article[type])
      );

      setArticles(filteredArticles);
      setFilteredData(filteredArticles);
    }
  };

  return (
    <div className="my-4 px-20 xs:px-10">
      <p
        onClick={onReset}
        className="text-right cursor-pointer font-semibold text-[#315376]"
      >
        Clear Filters
      </p>
      <div className="flex custom:flex-col xs:flex-col justify-between gap-4">
        <div className="xs:grid xs:grid-cols-1 xs:space-x-0 xs:gap-3 space-x-8">
          {["feed", "author", "category", "source"].map((type, index) => (
            <a
              key={index}
              onClick={() => handleNavigation(type)}
              className={`font-semibold text-gray-600 underline cursor-pointer ${
                selectedNav === type
                  ? "selected"
                  : "hover:text-gray-900 hover:text-lg"
              }`}
            >
              {type === "feed"
                ? "Feed"
                : `Favorite ${
                    type === "category"
                      ? "Categorie"
                      : type.charAt(0).toUpperCase() + type.slice(1)
                  }s`}
            </a>
          ))}
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
        <div>
          <DateField
            value={dateRange.fromDate}
            label="From Date"
            placeholder="From date"
            onChange={(e) =>
              setDateRange({ ...dateRange, fromDate: e.target.value })
            }
          />
          {dateError && <p className="text-red-500">{dateError}</p>}
        </div>

        <DateField
          value={dateRange.toDate}
          label="To Date"
          placeholder="To date"
          onChange={(e) =>
            setDateRange({ ...dateRange, toDate: e.target.value })
          }
        />

        <Dropdown
          label="Category"
          name="Categories"
          options={categories}
          value={selectedFilters.category}
          onValueChange={(e) =>
            setSelectedFilters({ ...selectedFilters, category: e.target.value })
          }
        />
        <Dropdown
          label="Sources"
          name="Sources"
          options={sources}
          value={selectedFilters.source}
          onValueChange={(e) =>
            setSelectedFilters({ ...selectedFilters, source: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default SearchBar;
