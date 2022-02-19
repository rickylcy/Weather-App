import "../Weather.scss";
import Status from "./Status.js";

const Card = ({data, img, country, status}) => {
    return (
<div className="card">
      <div className="card__body">
      <img src={img} className="card__image" />
        <h2 className="card__title">{country}</h2>
        <p className="card__description">
        Current Weather: {data.currentWeather}<br />
        Current Temperature: {data.currentTemperature} °C
        <Status status={status[0]}/>
        <br />
        Last hour Weather:<br />
        Last hour Temperature:
      <Status status={status[1]}/>
      <br />
        Air Pollution Index: {data.aqi}
      <Status status={status[2]}/>
        </p>
      </div>
    </div>
  )}

export default Card