import React, { useEffect } from "react";

import moment from "moment-timezone";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Card from "./components/Card.js";
import "./Weather.scss";
import { fetchCurrentWeatherData, fetchPastWeatherData, fetchAirPollutionData } from "./reducers";
import Button from "./components/Button.js";
import DropDownBar from "./components/DropDownBar.js";

export function Weather() {
  const secondCountry = "HongKong";
  var now = moment.utc();
  const [firstCountry, setFirstCountry] = useState("Brisbane");
  const [selectedFirstTimezone, setSelectedFirstTimezone] = useState({});
  const [timezoneDiff, setTimezoneDiff] = useState(
    (moment.tz.zone(secondCountry).offset(now) -
      moment.tz.zone("Australia/Brisbane").offset(now)) /
      60
  );
  const firstCountryImg =
    "https://cdn.britannica.com/78/6078-004-77AF7322/Flag-Australia.jpg";
  const secondCountryImg =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Flag_of_Hong_Kong.svg/1280px-Flag_of_Hong_Kong.svg.png";

  const dispatch = useDispatch();

  const data = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(
      fetchCurrentWeatherData({
        firstCountry: firstCountry,
        secondCountry: secondCountry,
      })
    );
    dispatch(
      fetchPastWeatherData({
        firstCountry: firstCountry,
        secondCountry: secondCountry,
      })
    );
    
    dispatch(
      fetchAirPollutionData({
        firstCountry: firstCountry,
        secondCountry: secondCountry,
      })
    )
  }, []);

  const onClick = () => {
    setFirstCountry(selectedFirstTimezone.label.split(" ")[1]);

    now = moment.utc();
    var first_tz_offset = moment.tz
      .zone(selectedFirstTimezone.value)
      .offset(now);
    var second_tz_offset = moment.tz.zone(secondCountry).offset(now);

    setTimezoneDiff((second_tz_offset - first_tz_offset) / 60);
    dispatch(
      fetchCurrentWeatherData({
        firstCountry: selectedFirstTimezone.label.split(" ")[1],
        secondCountry: secondCountry,
      })
    );
    dispatch(
      fetchPastWeatherData({
        firstCountry: selectedFirstTimezone.label.split(" ")[1],
        secondCountry: secondCountry,
      })
    );
  };
  return (
    <>
      <div>
        <p className="time">Time Zone Difference: {timezoneDiff} Hours</p>
        <div className="select-wrapper">
          <DropDownBar
            selectedFirstTimezone={selectedFirstTimezone}
            setSelectedFirstTimezone={setSelectedFirstTimezone}
          />
          <Button onClick={onClick} text="Refresh" />
        </div>
        <div className="wrapper">
          <Card
            img={firstCountryImg}
            data={data.firstCountry ? data.firstCountry : ""}
            country={firstCountry}
            status={data.status}
          />
          <Card
            img={secondCountryImg}
            data={data.secondCountry ? data.secondCountry : ""}
            country={secondCountry}
            status={data.status}
          />
        </div>
      </div>
    </>
  );
}
