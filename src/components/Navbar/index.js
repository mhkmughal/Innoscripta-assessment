import React from "react";
import SearchBar from "../SearchBar";

export default function Navbar({ articles, handleSearch }) {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md pb-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-4">
          <img alt="logo" src="/logo.png" className="w-36 cursor-pointer" />

          <nav className="space-x-8">
            <a
              href="#home"
              className="font-semibold text-gray-600 hover:text-gray-900 underline"
            >
              Feed
            </a>
            <a
              href="#about"
              className="font-semibold text-gray-600 hover:text-gray-900 underline"
            >
              Favorite Authors
            </a>
            <a
              href="#services"
              className="font-semibold text-gray-600 hover:text-gray-900 underline"
            >
              Favorite Categories
            </a>
            <a
              href="#contact"
              className="font-semibold text-gray-600 hover:text-gray-900 underline"
            >
              Favorite Sources
            </a>
          </nav>
        </div>

        <hr className="mb-2" />
        <SearchBar articles={articles} onSearch={handleSearch} />
      </div>
    </header>
  );
}
