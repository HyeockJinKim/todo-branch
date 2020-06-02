import React, {useState} from 'react';

function Timer() {
  const datetime_to_string = (d: Date) => {
    if (d === null || d === undefined)
      return '';
    const _date = new Date(d);
    return <div style={{marginTop: "3rem"}}>
      <h2 style={{fontSize: "24px", margin: ".1rem auto", fontWeight: "bold"}}>{_date.getFullYear() + '년 ' + (_date.getMonth() + 1) + '월 ' + _date.getDate() + '일'}</h2>
      <span style={{fontSize: "17px"}}>{_date.getHours() + '시 ' + _date.getMinutes() + '분'}</span>
    </div>;
  }

  const [time, setTime] = useState(new Date());
  setTimeout(() => setTime(new Date()), 60000 - time.getSeconds()*1000);
  return (
    <div className="Timer">
      {datetime_to_string(time)}
    </div>
  );
}

export default Timer;
