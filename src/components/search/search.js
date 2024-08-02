import { useState, useCallback } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";
import debounce from "lodash.debounce";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const fetchCities = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      const responseData = await response.json();

      return {
        options: responseData.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.country}`,
        })),
      };
    } catch (error) {
      console.error("Error fetching city data:", error);
      return {
        options: [],
      };
    }
  };

  const debouncedFetchCities = useCallback(
    debounce(async (inputValue, callback) => {
      const results = await fetchCities(inputValue);
      callback(results);
    }, 1000),
    []
  );

  const loadOptions = async (inputValue) => {
    return new Promise((resolve) => {
      debouncedFetchCities(inputValue, resolve);
    });
  };

  const handleOnChange = (selectedOption) => {
    setSearch(selectedOption);
    onSearchChange(selectedOption);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      loadOptions={loadOptions}
      onChange={handleOnChange}
    />
  );
};

export default Search;
