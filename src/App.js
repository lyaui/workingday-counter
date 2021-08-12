import { useState, useEffect } from 'react';
import DatePicker from './components/DatePicker';
import moment from 'moment';
import RemainingDaysPanel from './components/RemainingDaysPanel';
import HolidayDetails from './components/HolidayDetails';
import HomeImg from './assets/img/index.png';
import datesData from './data/dates.json';

function App() {
  const [randomSentence, setRandomSentence] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [rangeDates, setRangeDates] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const sentences = [
      '當一天和尚撞一天鐘，能撈則撈能混則混。',
      '我領的不是薪水，是精神賠償金。',
      '工作時別跟我談夢想，我的夢想就是不工作！',
      '一週中總有七天不想上班。',
      '真懷念小時候，哭完就睡，現在哭完還是要上班。',
    ];
    const randomIdx = Math.floor(Math.random() * sentences.length);
    setRandomSentence(sentences[randomIdx]);
  }, [randomSentence]);

  useEffect(() => {
    if (!selectedStartDate || !selectedEndDate) return;
    const startDate = moment(selectedStartDate).utc().unix();
    const endDate = moment(selectedEndDate).utc().unix();
    if (endDate < startDate) return setErrorMessage('不得小於開始日期');
    setErrorMessage('');

    const startIdx = datesData.findIndex((item) => item.date === +selectedStartDate);
    const endIdx = datesData.findIndex((item) => item.date === +selectedEndDate);

    setRangeDates(datesData.slice(startIdx + 1, endIdx + 1));
  }, [selectedStartDate, selectedEndDate]);

  const handleStartDateSelect = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateSelect = (date) => {
    setSelectedEndDate(date);
  };

  const clearDates = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setRangeDates([]);
  };

  return (
    <div className='App'>
      <h1 className='text-center'>離職日倒數計時器</h1>
      <div className='text-center'>
        <p>
          <i>「{randomSentence}</i>」
        </p>
      </div>
      <div className='date-picker__container flex-center'>
        <DatePicker
          handleDateSelect={handleStartDateSelect}
          selectedDate={selectedStartDate}
          placeholder='請選擇開始日期'
        />
        <span style={{ marginLeft: '10px' }}>~</span>
        <DatePicker
          handleDateSelect={handleEndDateSelect}
          selectedDate={selectedEndDate}
          placeholder='請選擇結束日期'
        />
      </div>
      {errorMessage && <p className='text-warning text-center'>{errorMessage}</p>}
      {!errorMessage && <RemainingDaysPanel rangeDates={rangeDates} />}
      <button onClick={clearDates}>清除日期</button>
      <HolidayDetails rangeDates={rangeDates} />
      {!rangeDates.filter((item) => item.remark).length && <img src={HomeImg} alt='' />}
    </div>
  );
}

export default App;
