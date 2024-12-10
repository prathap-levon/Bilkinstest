import React, { useState, useEffect, useCallback } from "react";
import { JobSearchComp } from "../../Components/JobComponents/JobSearchComp";
import { JobList } from "../../Components/JobComponents/JobLists";
import { useSearchParams } from "react-router-dom";
import { addJobs } from "../../features/jobPageSlice";
import Instance from "../../AxiosConfig";
import { useSelector, useDispatch } from 'react-redux';

export const JobPages = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [searchedJobs, setSearchedJobs] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [sortFlag, setSortFlag] = useState(false);
  const jobsData =  useSelector(state => state?.jobs?.jobs);
  const [loading, setLoading] = useState(true);

  const handleFilterChange = (fieldName, value) => {
    setSelectedFilters((prevOptions) => ({
      ...prevOptions,
      [fieldName]: value,
    }));
  };

  const handleRemoveFilter = () => {
    setSelectedFilters({});
    dispatch(addJobs(searchedJobs));
  };

  const totalAmount = (a, b, c, d) => {
    return (a ? a : 0) + (b ? b : 0) + (c ? c * 7 : 0) + (d ? d * 7 : 0);
  };

  const handleApplyFilter = () => {
    let filteredData = searchedJobs || [];
  const isFilterApplied = Object.keys(selectedFilters).some(
    (key) => selectedFilters[key] && selectedFilters[key].length !== 0
  );

  if (!isFilterApplied) {
    dispatch(addJobs(filteredData));
    return;
  }
    if (selectedFilters["jobCategory"] && selectedFilters["jobCategory"].length !== 0) {
      filteredData = filteredData?.filter((item) =>
        selectedFilters["jobCategory"]?.some(
          (type) => type?.value === item?.jobCategory
        )
      );
    }
    if (selectedFilters["shiftType"] && selectedFilters["shiftType"].length !== 0) {
      filteredData = filteredData?.filter((item) =>
        selectedFilters["shiftType"]?.some((type) => type?.value === item?.shiftType)
      );
    }
    if (selectedFilters["shiftHours"] && selectedFilters["shiftHours"].length !== 0) {
      filteredData = filteredData?.filter((item) =>
        selectedFilters["shiftHours"]?.some((type) => type?.value === item?.shiftHours)
      );
    }
    if (selectedFilters["jobPostedDate"]) {
      filteredData = filteredData?.filter((item) => {
        const jD = new Date(item?.jobPostedDate);
        const fD = new Date(selectedFilters["jobPostedDate"]);
        return (
          jD.getFullYear() === fD.getFullYear() &&
          jD.getMonth() === fD.getMonth() &&
          jD.getDate() === fD.getDate()
        );
      });
    }
    if (selectedFilters["payRate"] && selectedFilters["payRate"].length !== 0) {
      filteredData = filteredData?.filter(
        (item) =>
          totalAmount(
            item?.weeklyEarnings,
            item?.travelPerDiems,
            item?.mealsPay,
            item?.housingPay
          ) >= selectedFilters["payRate"]
      );
    }
    if (selectedFilters["jobType"] && selectedFilters["jobType"].length !== 0) {
      filteredData = filteredData?.filter((item) =>
        item?.jobType?.some((type) =>
          selectedFilters["jobType"].some((jt) => jt?.value === type)
        )
      );
    }
    if (selectedFilters["experience"] && selectedFilters["experience"].length !== 0) {
      const experienceMap = {
        "Entry Level": [0, 2],
        "Mid Level": [2, 7],
        Seniority: [7, Number.MAX_VALUE],
      };

      let minExp = Number.MAX_VALUE;
      let maxExp = Number.MIN_VALUE;

      for (let i = 0; i < selectedFilters["experience"].length; i++) {
        let obj = experienceMap[selectedFilters["experience"][i].value];
        minExp = Math.min((Number)(obj[0]), minExp);
        maxExp = Math.max((Number)(obj[1]), maxExp);
      }

      filteredData = filteredData?.filter(
        (item) => item?.experience >= minExp && item?.experience < maxExp
      );
    }
    filteredData = filteredData?.sort((a, b) => b.score - a.score);
    dispatch(addJobs(filteredData));
  };

  const handleSearch = async (
    jobtitle,
    locaton,
    longtude,
    lattude,
    radus,
    regonCategory
  ) => {
    try {
      try {
        const jobTitle = jobtitle || "";
        const location = locaton || "";
        const longitude = longtude || 0;
        const latitude = lattude || 0;
        const radius = radus || 5 * 1609.34;
        const regionCategory = regonCategory || "";

        const url = `/searchJob?jobtitle=${encodeURIComponent(
          jobTitle
        )}&location=${encodeURIComponent(
          location
        )}&longitude=${encodeURIComponent(
          longitude
        )}&latitude=${encodeURIComponent(
          latitude
        )}&radius=${radius}&regionCategory=${regionCategory}`;

        const response = await Instance.get(url);
        if (response.status === 200) {
          let jobs = response.data.jobs;
          jobs = jobs?.sort((a, b) => {
            if (!a.score || !b.score || a.score === b.score) {
              return new Date(b?.jobPostedDate) - new Date(a?.jobPostedDate);
            }
            return b.score - a.score;
          });
          setSearchedJobs(jobs);
          dispatch(addJobs(jobs));
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  function containsAlliedJobs(jobTitle) {
    // Create a regular expression to match "allied jobs" irrespective of spaces and case
    const regex = /a\s*l\s*l\s*i\s*e\s*d\s*j\s*o\s*b\s*s/i;
    return regex.test(jobTitle);
  }

  function containsNursingJobs(jobTitle) {
    // Create a regular expression to match "allied jobs" irrespective of spaces and case
    const regex = /n\s*u\s*r\s*s\s*i\s*n\s*g\s*j\s*o\s*b\s*s/i;
    return regex.test(jobTitle);
  }

  const fetchJobBySearchParam = async () => {
    try {
      const jobTitle = searchParams.get("jobtitle")?.trim() || "";
      const location = searchParams.get("location") || "";
      const longitude = searchParams.get("longitude") || 0;
      const latitude = searchParams.get("latitude") || 0;
      const radius = searchParams.get("radius") || 5;
      const regionCategory = searchParams.get("regionCategory") || "";

      const url = `/searchJob?jobtitle=${encodeURIComponent(jobTitle)}&location=${encodeURIComponent(location)}&longitude=${encodeURIComponent(longitude)}&latitude=${encodeURIComponent(latitude)}&radius=${radius}&regionCategory=${regionCategory}`;

      const response = await Instance.get(url);
      if (response.status === 200) {
        let jobs = response.data.jobs;
        jobs = jobs?.sort((a, b) => {
          if (!a.score || !b.score || a.score === b.score) {
            return new Date(b?.jobPostedDate) - new Date(a?.jobPostedDate);
          }
          return b.score - a.score;
        });

        if (containsAlliedJobs(jobTitle)) {
          let alliedJobs = jobs?.filter(
            (item) => item?.jobCategory === "Allied Jobs"
          );
          alliedJobs = alliedJobs?.sort((a, b) => {
            return new Date(b?.jobPostedDate) - new Date(a?.jobPostedDate);
          });
          dispatch(addJobs(alliedJobs));
        } else if (containsNursingJobs(jobTitle)) {
          let nursingJobs = jobs?.filter(
            (item) => item?.jobCategory === "Nursing Jobs"
          );
          nursingJobs = nursingJobs?.sort((a, b) => {
            return new Date(b?.jobPostedDate) - new Date(a?.jobPostedDate);
          });
          dispatch(addJobs(nursingJobs));
        } else {
          dispatch(addJobs(jobs));
        }
        setSearchedJobs(jobs);
      }
    } catch (error) {
      setLoading(false)
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const sortJobData = useCallback(() => {
    if (sortFlag) {
      setSortFlag(!sortFlag);
      const sortedData = [...jobsData].sort(
        (a, b) => new Date(a?.jobPostedDate) - new Date(b?.jobPostedDate)
      );
      dispatch(addJobs(sortedData));
    } else {
      setSortFlag(!sortFlag);
      const sortedData = [...jobsData].sort(
        (a, b) => new Date(b?.jobPostedDate) - new Date(a?.jobPostedDate)
      );
      dispatch(addJobs(sortedData));
    }
  });

  // In-case of Navigation from hero home page
  useEffect(() => {
    fetchJobBySearchParam();
  }, []);

  return (
    <div className="container">
      <JobSearchComp
        selectedFilters={selectedFilters}
        handleSearch={handleSearch}
        handleFilterChange={handleFilterChange}
        handleRemoveFilter={handleRemoveFilter}
        handleApplyFilter={handleApplyFilter}
      />
      <JobList jobsData={jobsData} sortJobData={sortJobData} loading={loading} />
    </div>
  );
};
