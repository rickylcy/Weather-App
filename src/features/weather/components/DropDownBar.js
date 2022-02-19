import TimezoneSelect, { allTimezones } from 'react-timezone-select';

const DropDownBar = ({ selectedFirstTimezone, setSelectedFirstTimezone}) => {
    return (
        <div className="timezoneBox">
        Select A City in Australia:
      <TimezoneSelect
        value={selectedFirstTimezone}
        onChange={setSelectedFirstTimezone}
        timezones={{
          'Australia/Brisbane': 'Brisbane',
          "Australia/Sydney": "Sydney",
          "Australia/Melbourne": "Melbourne",
          "Australia/Adelaide" : "Adelaide",
          "Australia/Canberra": "Canberra",
          "Australia/Perth": "Perth",
        }}  
      />
      </div>
    )
  }

  export default DropDownBar