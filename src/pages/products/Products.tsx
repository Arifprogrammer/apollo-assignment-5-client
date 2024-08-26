import React, { useEffect, useRef, useState } from "react";
import Product from "../home/product/Product";
import "../products/Products.css";
import { useGetProductsQuery } from "../../redux/features/products/productsApi";
import { getAllProducts } from "../../redux/features/products/productSlice";
import { useAppSelector } from "../../redux/hook";
import { debounce, select, sort } from "radash";
import { TProduct } from "../../types";

const Products = () => {
  //* constants
  const minRangeValue = 0;
  const maxRangeValue = 500;

  //* states
  const [products, setProducts] = useState<TProduct[]>([]);
  const [minSliderValue, setMinSliderValue] = useState<number>(minRangeValue);
  const [maxSliderValue, setMaxSliderValue] = useState<number>(maxRangeValue);
  const [selectedFilter, setSelectedFilter] = useState<string>("Filter");
  const [search, setSearch] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  //* hooks
  const { isLoading, refetch } = useGetProductsQuery(0);
  const { products: allProducts } = useAppSelector(getAllProducts);

  //? DebouncedSetMinValue
  const debouncedUpdateMinValue = debounce({ delay: 50 }, (value: number) => {
    setMinSliderValue(value);
  });

  //? DebouncedSetMaxValue
  const debouncedUpdateMaxValue = debounce({ delay: 50 }, (value: number) => {
    setMaxSliderValue(value);
  });

  //? Handle min range change
  const handleMinRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    debouncedUpdateMinValue(value);
  };

  //? Handle max range change
  const handleMaxRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    debouncedUpdateMaxValue(value);
  };

  //? Calculate max bubble position
  const calculateMinBubblePosition = () => {
    const percentage = (minSliderValue / maxRangeValue) * 100;
    return `calc(${percentage}% + (${8 - percentage * 0.15}px))`;
  };
  //? Calculate max bubble position
  const calculateMaxBubblePosition = () => {
    const percentage = (maxSliderValue / maxRangeValue) * 100;
    return `calc(${percentage}% + (${8 - percentage * 0.15}px))`;
  };

  //? DebouncedSetSearch
  const debouncedSetSearch = debounce({ delay: 200 }, (value: string) => {
    setSearch(value);
  });

  //? Handle search change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearch(event.target.value);
  };

  //? Handle filter change
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };

  //? Handle reset filters
  const handleReset = () => {
    setSelectedFilter("Filter");
    setMinSliderValue(0);
    setMaxSliderValue(500);
    setSearch("");
    setProducts(allProducts);

    (inputRef.current as HTMLInputElement).value = "";
  };

  //* effects
  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    allProducts.length && setProducts(allProducts);
  }, [allProducts]);

  useEffect(() => {
    let filterProducts: TProduct[];

    filterProducts = select(
      allProducts,
      (f) => f,
      (f) =>
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.brand.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedFilter === "High" || selectedFilter === "Low") {
      filterProducts = sort(
        filterProducts,
        (f) => f.price,
        selectedFilter === "High"
      );
    }

    if (minSliderValue || !minSliderValue) {
      filterProducts = select(
        filterProducts,
        (f) => f,
        (f) => f.price >= minSliderValue
      );
    }

    if (maxSliderValue) {
      filterProducts = select(
        filterProducts,
        (f) => f,
        (f) => f.price <= maxSliderValue
      );
    }

    setProducts(filterProducts);
  }, [minSliderValue, maxSliderValue, selectedFilter, search, allProducts]);

  return (
    <>
      <div className="mt-16 mb-10 my-container flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-center ">
        <div className="join grow">
          <input
            name="search"
            ref={inputRef}
            className="input input-bordered border-rose-500 rounded-l-3xl bg-transparent join-item w-full md:w-96 text-black"
            placeholder="search..."
            onChange={handleSearch}
          />
          <button className="btn join-item rounded-r-full bg-rose-500 text-white border-none">
            Search
          </button>
        </div>

        <div className="flex gap-2 items-end text-black">
          <p className="pb-1">min</p>
          <div className="slider-container">
            <input
              type="range"
              min={minRangeValue}
              max={maxRangeValue}
              value={minSliderValue}
              onChange={handleMinRangeChange}
              className="slider"
            />
            <div
              className="bubble"
              style={{
                left: calculateMinBubblePosition(),
              }}
            >
              {minSliderValue}
            </div>
          </div>
          <p className="pb-1">max</p>
          <div className="slider-container">
            <input
              type="range"
              min={minRangeValue}
              max={maxRangeValue}
              value={maxSliderValue}
              onChange={handleMaxRangeChange}
              className="slider"
            />
            <div
              className="bubble"
              style={{
                left: calculateMaxBubblePosition(),
              }}
            >
              {maxSliderValue}
            </div>
          </div>
        </div>

        <div className="inline-flex gap-4 md:gap-6 items-center">
          <select
            className="select border-rose-500 max-w-xs bg-transparent text-black w-32"
            value={selectedFilter}
            onChange={handleFilterChange}
          >
            <option disabled>Filter</option>
            <option value="High">High</option>
            <option value="Low">Low</option>
          </select>

          <div>
            <button
              className="btn bg-black border-none text-white"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="text-center">
          <span className="loading loading-bars loading-md"></span>
        </div>
      )}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 my-container">
        {products &&
          products.map((product) => {
            return (
              <React.Fragment key={product._id}>
                <Product product={product} />
              </React.Fragment>
            );
          })}
      </section>
    </>
  );
};

export default Products;
