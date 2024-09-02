import React, { useEffect, useRef, useState } from "react";
import Room from "../home/room/Room";
import { useGetRoomsQuery } from "../../redux/features/rooms/roomsApi";
import { debounce, list, select } from "radash";
import { TQueryType, TRoom } from "../../types";
import "../rooms/Rooms.css";
import Pagination from "../../components/ui/pagination/Pagination";

const Rooms = () => {
  //* constants
  const dataLimit = 6;
  const minRangeValue = 0;
  const maxPriceRangeValue = 500;
  const maxCapacityRangeValue = 30;

  //* states
  const [rooms, setRooms] = useState<TRoom[]>([]);
  const [minSliderValue, setMinSliderValue] = useState<number>(minRangeValue);
  const [maxPriceSliderValue, setMaxPriceSliderValue] =
    useState<number>(maxPriceRangeValue);
  const [maxCapacitySliderValue, setMaxCapacitySliderValue] = useState<number>(
    maxCapacityRangeValue
  );
  const [selectedFilter, setSelectedFilter] = useState<string>("Filter");
  const [selectedSort, setSelectedSort] = useState<string>("Sort by Price");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<TQueryType | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement | null>(null);

  //* hooks
  const { isLoading, data, error } = useGetRoomsQuery(query);
  const allRooms = data?.data as TRoom[];
  const totalPage = data?.meta.totalPage;

  //? DebouncedSetMinValue
  const debouncedUpdateMinValue = debounce({ delay: 50 }, (value: number) => {
    setMinSliderValue(value);
  });

  //? DebouncedSetMaxPriceValue
  const debouncedUpdateMaxPriceValue = debounce(
    { delay: 50 },
    (value: number) => {
      setMaxPriceSliderValue(value);
    }
  );

  //? DebouncedSetMaxCapacityValue
  const debouncedUpdateMaxCapacityValue = debounce(
    { delay: 50 },
    (value: number) => {
      setMaxCapacitySliderValue(value);
    }
  );

  //? Handle min range change
  const handleMinRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    debouncedUpdateMinValue(value);
  };

  //? Handle max price range change
  const handleMaxPriceRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value);
    debouncedUpdateMaxPriceValue(value);
  };

  //? Handle max price range change
  const handleMaxCapacityRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value);
    debouncedUpdateMaxCapacityValue(value);
  };

  //? Calculate min bubble position
  const calculateMinBubblePosition = () => {
    if (selectedFilter === "Price") {
      const percentage = (minSliderValue / maxPriceRangeValue) * 100;
      return `calc(${percentage}% + (${8 - percentage * 0.15}px))`;
    } else {
      const percentage = (minSliderValue / maxCapacityRangeValue) * 100;
      return `calc(${percentage}% + (${8 - percentage * 0.15}px))`;
    }
  };

  //? Calculate max price bubble position
  const calculateMaxPriceBubblePosition = () => {
    const percentage = (maxPriceSliderValue / maxPriceRangeValue) * 100;
    return `calc(${percentage}% + (${8 - percentage * 0.15}px))`;
  };

  //? Calculate max capacity bubble position
  const calculateMaxCapacityBubblePosition = () => {
    const percentage = (maxCapacitySliderValue / maxCapacityRangeValue) * 100;
    return `calc(${percentage}% + (${8 - percentage * 0.15}px))`;
  };

  //? DebouncedSetSearch
  const debouncedSetSearch = debounce({ delay: 800 }, (value: string) => {
    setSearch(value);
  });

  //? Handle search change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearch(event.target.value);
  };

  //? Handle sort change
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(event.target.value);
  };

  //? Handle filter change
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMinSliderValue(0);
    setSelectedFilter(event.target.value);
  };

  //? Handle reset filters
  const handleReset = () => {
    setSelectedSort("Sort by Price");
    setSelectedFilter("Filter");
    setMinSliderValue(0);
    setMaxPriceSliderValue(500);
    setMaxCapacitySliderValue(30);
    setSearch("");
    setPage(1);
    setRooms(allRooms);

    (inputRef.current as HTMLInputElement).value = "";
  };

  useEffect(() => {
    if (allRooms?.length) setRooms(allRooms);
  }, [allRooms]);

  useEffect(() => {
    const query: TQueryType = {
      limit: dataLimit,
      page: page,
      searchTerm: search,
      sort: selectedSort === "Sort by Price" ? "" : selectedSort,
    };

    setQuery((prev) => ({
      ...prev,
      ...query,
    }));
  }, [search, page, selectedSort]);

  useEffect(() => {
    let filterProducts = allRooms;

    if (selectedFilter === "Price") {
      filterProducts = select(
        filterProducts,
        (f) => f,
        (f) => f.pricePerSlot >= minSliderValue
      );
    }

    if (selectedFilter === "Capacity") {
      filterProducts = select(
        filterProducts,
        (f) => f,
        (f) => f.capacity >= minSliderValue
      );
    }

    if (maxPriceSliderValue) {
      filterProducts = select(
        filterProducts,
        (f) => f,
        (f) => f.pricePerSlot <= maxPriceSliderValue
      );
    }

    if (maxCapacitySliderValue) {
      filterProducts = select(
        filterProducts,
        (f) => f,
        (f) => f.capacity <= maxCapacitySliderValue
      );
    }

    setRooms(filterProducts);
  }, [
    minSliderValue,
    maxPriceSliderValue,
    maxCapacitySliderValue,
    allRooms,
    selectedFilter,
  ]);

  return (
    <>
      <div className="mt-16 mb-10 my-container flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-center ">
        <div className="join grow">
          <input
            name="search"
            ref={inputRef}
            className="input input-bordered border-[#D62828] rounded-l-3xl bg-transparent join-item w-full md:w-96 text-black"
            placeholder="search..."
            onChange={handleSearch}
          />
          <button className="btn join-item rounded-r-full bg-[#D62828] text-white border-none">
            Search
          </button>
        </div>

        <div className="flex gap-2 items-end text-black">
          <select
            className="select border-[#D62828] max-w-xs bg-transparent text-black w-36"
            value={selectedFilter}
            onChange={handleFilterChange}
          >
            <option disabled>Filter</option>
            <option value="Price">Price</option>
            <option value="Capacity">Capacity</option>
          </select>

          {selectedFilter !== "Filter" && (
            <>
              <p className="pb-1">min</p>
              <div className="slider-container">
                <input
                  type="range"
                  min={minRangeValue}
                  max={
                    selectedFilter === "Price"
                      ? maxPriceRangeValue
                      : maxCapacityRangeValue
                  }
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
              {selectedFilter === "Price" ? (
                <div className="slider-container">
                  <input
                    type="range"
                    min={minRangeValue}
                    max={maxPriceRangeValue}
                    value={maxPriceSliderValue}
                    onChange={handleMaxPriceRangeChange}
                    className="slider"
                  />
                  <div
                    className="bubble"
                    style={{
                      left: calculateMaxPriceBubblePosition(),
                    }}
                  >
                    {maxPriceSliderValue}
                  </div>
                </div>
              ) : (
                <div className="slider-container">
                  <input
                    type="range"
                    min={minRangeValue}
                    max={maxCapacityRangeValue}
                    value={maxCapacitySliderValue}
                    onChange={handleMaxCapacityRangeChange}
                    className="slider"
                  />
                  <div
                    className="bubble"
                    style={{
                      left: calculateMaxCapacityBubblePosition(),
                    }}
                  >
                    {maxCapacitySliderValue}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="inline-flex gap-4 md:gap-6 items-center">
          <select
            className="select border-[#D62828] max-w-xs bg-transparent text-black w-36"
            value={selectedSort}
            onChange={handleSortChange}
          >
            <option disabled>Sort by Price</option>
            <option value="-pricePerSlot">High</option>
            <option value="pricePerSlot">Low</option>
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
        {!error &&
          rooms &&
          rooms.map((room) => {
            return (
              <React.Fragment key={room._id}>
                <Room room={room} />
              </React.Fragment>
            );
          })}
      </section>
      <div className="text-center mb-6 md:mb-8">
        {!error &&
          list(1, totalPage).map((pageNumber) => (
            <Pagination
              key={pageNumber}
              index={pageNumber}
              page={page}
              setPage={setPage}
            />
          ))}
      </div>
    </>
  );
};

export default Rooms;
