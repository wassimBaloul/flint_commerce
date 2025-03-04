import React, { useEffect, useState } from 'react';
import SearchFilter from "../../components/customers/SearchFilter";
import { SortOptions } from "../../config/config.js";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, RadarIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilteredProducts } from '@/store/customer-slice/products';
import Customer_ProductCard from '../../components/customers/Customer_ProductCard';
import { useSearchParams } from 'react-router-dom';
import Paginator from '@/components/utility/Paginator';
import Loader from '@/components/utility/Loader';

function generateSearchQuery(filter) {
  const searchResult = [];
  for (const [key, value] of Object.entries(filter)) {
    if (Array.isArray(value) && value.length > 0) {
      searchResult.push(`${key}=${encodeURIComponent(value.join(","))}`);
    }
  }
  return searchResult.join("&");
}

function Catalog() {
  const dispatch = useDispatch();
  const { isLoading, products, pageCount } = useSelector((state) => state.customerProduct);
  const token = localStorage.getItem("flint_token") || "Invalid";
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("latest");
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const searchCategory = searchParams.get("Category");

  function handleFilter(filterType, filterOption) {
    let filterChoice = { ...filter };

    if (!filterChoice[filterType]) {
      filterChoice[filterType] = [filterOption];
    } else {
      const index = filterChoice[filterType].indexOf(filterOption);
      if (index === -1) {
        filterChoice[filterType].push(filterOption);
      } else {
        filterChoice[filterType].splice(index, 1);
      }
    }

    setCurrentPage(1);
    setFilter(filterChoice);
    sessionStorage.setItem("filter", JSON.stringify(filterChoice));
  }

  function handleSort(value) {
    setCurrentPage(1);
    setSort(value);
  }

  useEffect(() => {
    if (filter !== null && sort !== null) {
      dispatch(fetchFilteredProducts({ token, filter, sort, currentPage }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [dispatch, filter, sort, currentPage]);

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      setSearchParams(new URLSearchParams(generateSearchQuery(filter)));
    }
  }, [filter]);

  useEffect(() => {
    setFilter(JSON.parse(sessionStorage.getItem("filter")) || {});
  }, [searchCategory]);

  if (isLoading) {
    return <Loader message="Loading products, just a moment..." />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
      <SearchFilter filter={filter} handleFilter={handleFilter} />

      <div className="bg-white w-full rounded-lg shadow-md p-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">All Products</h2>
          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {SortOptions.map((item) => (
                    <DropdownMenuRadioItem key={item.id} value={item.id}>
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <div className="grid gap-4 p-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product, index) => (
              <div key={index} className="w-full">
                <Customer_ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 text-center p-10">
            <RadarIcon className="w-16 h-16 text-gray-500" />
            <h2 className="text-2xl font-semibold text-gray-700">No Products Available</h2>
            <p className="text-gray-500 max-w-lg">
              It looks like there are no products in this category. Check back later or explore other categories.
            </p>
            <Button variant="default" className="mt-4">Browse Categories</Button>
          </div>
        )}

        {/* Pagination */}
        {pageCount !== 0 && <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} pageCount={pageCount} />}
      </div>
    </div>
  );
}

export default Catalog;