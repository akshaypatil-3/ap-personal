import React, {useContext, useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FilterOptionContext } from "../FilterOptionContext";

import ".././advancefilters.scss";

import {FilterDateTimeType, FilterDateType} from "./types";

const range = (start: number, end: number) =>
  Array.from(Array(end - start + 1).keys()).map((x) => x + start);
const hourSlotsData = range(0, 12);
const minuteSlotsData = range(0, 59);

const meridianSlotsData = ["AM", "PM"];

const timeSlotsRangeData = [
  { start: "9:00", end: "9:45", startM: "9:00 AM", endM: "9:45 AM" },
  { start: "10:00", end: "10:45", startM: "10:00 AM", endM: "10:45 AM" },
  { start: "11:00", end: "11:45", startM: "11:00 AM", endM: "11:45 AM" },
  { start: "12:00", end: "12:45", startM: "12:00 PM", endM: "12:45 PM" },
  { start: "13:00", end: "13:45", startM: "1:00 PM", endM: "1:45 PM" },
  { start: "14:00", end: "14:45", startM: "2:00 PM", endM: "2:45 PM" },
];

const DateTimeFilter = (): JSX.Element => {
  const {
    columnData,
    handleApplyFilter,
    handleClearFilter,
    appliedFilterData,
  } = useContext(FilterOptionContext);

  const [filterValue, setFilterValue] = useState<FilterDateTimeType>(
    appliedFilterData &&
    columnData.fieldName &&
    appliedFilterData[columnData.fieldName]
      ? appliedFilterData[columnData.fieldName]?.value
      : {
        startDate: new Date(),
        endDate: new Date(),
        startTime: "9:00 AM",
        endTime: "9:00 PM",
      }
  );

  const [fromDate, setFromDate] = useState<Date | null>(new Date());
  const [toDate, setToDate] = useState<Date | null>(new Date());

  const [selectedFromHour, setSelectedFromHour] = useState<any>();
  const [selectedFromMinute, setSelectedFromMinute] = useState<any>();
  const [selectedFromMeridian, setSelectedFromMeridian] = useState<any>("AM");

  const [selectedToHour, setSelectedToHour] = useState<any>();
  const [selectedToMinute, setSelectedToMinute] = useState<any>();
  const [selectedToMeridian, setSelectedToMeridian] = useState<any>("AM");

  useEffect(() => {
    setFromDate(filterValue.startDate);
    setToDate(filterValue.endDate);

    const sT: string[] = filterValue.startTime.split(" ");
    const eT: string[] = filterValue.endTime.split(" ");
    const sTHM: string[] = sT[0].split(":");
    const eTHM: string[] = eT[0].split(":");
    setSelectedFromHour(sTHM[0]);
    setSelectedFromMinute(sTHM[1]);
    setSelectedFromMeridian(sT[1]);
    setSelectedToHour(eTHM[0]);
    setSelectedToMinute(eTHM[1]);
    setSelectedToMeridian(eT[1]);
  }, [filterValue]);

  let fromHourOptions = hourSlotsData.map((data: any) => {
    return (
      <option className="dropdown-items" value={data} key={`from${data}`}>
        {data}
      </option>
    );
  });

  let fromMinuteOptions = minuteSlotsData.map((data: any) => {
    return (
      <option className="dropdown-items" value={data} key={`from${data}`}>
        {data}
      </option>
    );
  });

  let fromMeridianOptions = meridianSlotsData.map((data: any) => {
    return (
      <option className="dropdown-items" value={data} key={`from${data}`}>
        {data}
      </option>
    );
  });

  let toHourOptions = hourSlotsData.map((data: any) => {
    if (
      (fromDate !== undefined &&
        toDate !== undefined &&
        fromDate?.toString() === toDate?.toString() &&
        selectedFromHour !== undefined &&
        parseInt(selectedFromHour) <= parseInt(data)) ||
        fromDate?.toString() !== toDate?.toString() ||
        (selectedFromMeridian !== undefined && selectedFromMeridian == "AM")
    ) {
      return (
        <option className="dropdown-items" value={data} key={`to${data}`}>
          {data}
        </option>
      );
    }
  });

  let toMinuteOptions = minuteSlotsData.map((data: any) => {
    if (
      (fromDate !== undefined &&
        toDate !== undefined &&
        fromDate?.toString() === toDate?.toString() &&
        selectedFromMinute !== undefined &&
        parseInt(selectedFromMinute) < parseInt(data)) ||
      fromDate?.toString() !== toDate?.toString() ||
      (selectedToHour !== undefined &&
        parseInt(selectedFromHour) < parseInt(selectedToHour)) ||
      (selectedFromMeridian !== undefined && selectedFromMeridian == "AM")
    ) {
      return (
        <option className="dropdown-items" value={data} key={`to${data}`}>
          {data}
        </option>
      );
    }
  });

  let toMeridianOptions = meridianSlotsData.map((data: any) => {
    if (
      fromDate !== undefined &&
      toDate !== undefined &&
      fromDate?.toString() === toDate?.toString() &&
      selectedFromMeridian !== undefined &&
      selectedFromMeridian == "PM" &&
      selectedFromMeridian == data
    ) {
      return (
        <option className="dropdown-items" value={data} key={`to${data}`}>
          {data}
        </option>
      );
    } else if (
      (fromDate !== undefined &&
        toDate !== undefined &&
        fromDate?.toString() === toDate?.toString() &&
        selectedFromMeridian !== undefined &&
        selectedFromMeridian == "AM") ||
      fromDate?.toString() !== toDate?.toString()
    ) {
      return (
        <option className="dropdown-items" value={data} key={`to${data}`}>
          {data}
        </option>
      );
    }
  });

  const setFromToDate = (type: string) => {
    const today = new Date();

    if (type === "today") {
      setFromDate(today);
      setToDate(today);
    } else if (type === "tomorrow") {
      let tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      setFromDate(tomorrow);
      setToDate(tomorrow);
    } else if (type === "thisWeek") {
      let first = today.getDate() - today.getDay(); // First day is the day of the month - the day of the week
      let last = first + 6; // last day is the first day + 6

      let fromDate = new Date(today.setDate(first));
      let toDate = new Date(today.setDate(last));

      setFromDate(fromDate);
      setToDate(toDate);
    }
  };

  const handleSelectTimeSlotClick = (data: {
    start: string;
    end: string;
    startM: string;
    endM: string;
  }) => {
    const sT: string[] = data.startM.split(" ");
    const eT: string[] = data.endM.split(" ");
    const sTHM: string[] = sT[0].split(":");
    const eTHM: string[] = eT[0].split(":");
    setSelectedFromHour(sTHM[0]);
    setSelectedFromMinute(sTHM[1]);
    setSelectedFromMeridian(sT[1]);
    setSelectedToHour(eTHM[0]);
    setSelectedToMinute(eTHM[1]);
    setSelectedToMeridian(eT[1]);
  };

  const handleFilter = () => {
    const fd: FilterDateTimeType = {
      startTime: `${selectedFromHour}:${selectedFromMinute} ${selectedFromMeridian}`,
      endTime: `${selectedToHour}:${selectedToMinute} ${selectedToMeridian}`,
      startDate: fromDate || new Date(),
      endDate: toDate || new Date(),
    };
    const data: { [key: string]: any } = {};
    data[columnData.fieldName as keyof object] = {
      type: "DATE_TIME",
      label: columnData.headerName,
      value: fd,
    };
    handleApplyFilter(data);
  };

  const handleSelectTimeSlotSelect = () => {};

  const setFromHour = (fromHour: string) => {
    setSelectedFromHour(fromHour);

    if (
      fromDate !== undefined &&
      toDate !== undefined &&
      fromDate?.toString() === toDate?.toString() &&
      selectedToHour == undefined
    ) {
      setSelectedToHour(fromHour);
    }
  };

  const setFromMinute = (fromMinute: string) => {
    setSelectedFromMinute(fromMinute);

    if (
      fromDate !== undefined &&
      toDate !== undefined &&
      fromDate?.toString() === toDate?.toString() &&
      selectedToMinute == undefined
    ) {
      setSelectedToMinute(parseInt(fromMinute) + 1);
    }
  };

  const setFromMeridian = (fromMeridian: string) => {
    setSelectedFromMeridian(fromMeridian);

    if (
      fromDate !== undefined &&
      toDate !== undefined &&
      fromDate?.toString() === toDate?.toString()
    ) {
      setSelectedToMeridian(fromMeridian);
    }
  };

  return (
    <div className="filterOptionDropdown dateTimeFilter">
      <div className="optionContainer">
        <div
          className="clearWrapper"
          onClick={() => {
            handleClearFilter(columnData.fieldName);
          }}
        >
          <div className="clear">Clear</div>
        </div>
        <div className="filtersWrapper">
          <div className="filterTitle">Show Orders for</div>

          <div className="dateWrapper">
            <div className="dateButtonsWrapper">
              <button
                type="button"
                className="btn btnDateOption"
                onClick={() => setFromToDate && setFromToDate("today")}
              >
                Today
              </button>
              <button
                type="button"
                className="btn btnDateOption"
                onClick={() => setFromToDate && setFromToDate("tomorrow")}
              >
                Tomorrow
              </button>
              <button
                type="button"
                className="btn btnDateOption"
                onClick={() => setFromToDate && setFromToDate("thisWeek")}
              >
                This Week
              </button>
            </div>

            <div className="dateRangeWrapper">
              <div className="dateRangeInputBox">
                <label className="label" htmlFor="fromDate">
                  From
                </label>
                <DatePicker
                  selected={fromDate}
                  onChange={(date) => setFromDate(date)}
                  selectsStart
                  startDate={fromDate}
                  endDate={toDate}
                  dateFormat="MMM dd, yyyy"
                  className="dateRangeInput"
                />
              </div>
              <div className="dateRangeInputBox">
                <label className="label" htmlFor="toDate">
                  To
                </label>
                <DatePicker
                  selected={toDate}
                  onChange={(date) => setToDate(date)}
                  selectsEnd
                  startDate={fromDate}
                  endDate={toDate}
                  minDate={fromDate}
                  dateFormat="MMM dd, yyyy"
                  className="dateRangeInput"
                />
              </div>
            </div>
          </div>

          <div className="timeWrapper">
            <div className="filterTitle">Delivery Time Slot</div>

            <div className="slotButtonsWrapper">
              {timeSlotsRangeData.map((tsr) => {
                return (
                  <button
                    key={`${tsr.start}${tsr.end}`}
                    type="button"
                    onClick={() => handleSelectTimeSlotClick(tsr)}
                    className={`btn btnTimeSlot ${tsr.start}`}
                  >
                    {tsr.start} - {tsr.end}
                  </button>
                );
              })}
            </div>

            <div className="timeRangeWrapper">
              <div className="timeRangeInputBox">
                <label className="label" htmlFor="fromTime">
                  From
                </label>
                <div className="timeRangeGroup">
                  <select
                    value={selectedFromHour}
                    name="dropdown"
                    className="timeRangeDropdown hourDropdown"
                    onChange={(event) => {
                      setFromHour(event.target.value);
                    }}
                  >
                    {fromHourOptions}
                  </select>

                  <select
                    value={selectedFromMinute}
                    name="dropdown"
                    className="timeRangeDropdown minDropdown"
                    onChange={(event) => {
                      setFromMinute(event.target.value);
                    }}
                  >
                    {fromMinuteOptions}
                  </select>

                  <select
                    value={selectedFromMeridian}
                    name="dropdown"
                    className="meridianDropdown"
                    onChange={(event) => {
                      setFromMeridian(event.target.value);
                    }}
                  >
                    {fromMeridianOptions}
                  </select>
                </div>
              </div>

              <div className="timeRangeInputBox">
                <label className="label" htmlFor="toTime">
                  To
                </label>
                <div className="timeRangeGroup">
                  <select
                    value={selectedToHour}
                    name="dropdown"
                    className="timeRangeDropdown hourDropdown"
                    onChange={(event) => {
                      setSelectedToHour(event.target.value);
                    }}
                  >
                    {toHourOptions}
                  </select>

                  <select
                    value={selectedToMinute}
                    name="dropdown"
                    className="timeRangeDropdown minDropdown"
                    onChange={(event) => {
                      setSelectedToMinute(event.target.value);
                    }}
                  >
                    {toMinuteOptions}
                  </select>

                  <select
                    value={selectedToMeridian}
                    name="dropdown"
                    className="meridianDropdown"
                    onChange={(event) => {
                      setSelectedToMeridian(event.target.value);
                    }}
                  >
                    {toMeridianOptions}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="actionContainer">
        <div
          className="applyAction"
          onClick={() => {
            handleFilter();
          }}
        >
          Apply Filter
        </div>
      </div>
    </div>
  );
};

export default DateTimeFilter;
