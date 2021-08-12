import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import 'moment/locale/zh-tw';
import { MdDateRange } from 'react-icons/md';
import moment from 'moment';

function DatePicker({ handleDateSelect, selectedDate, placeholder }) {
  const today = new Date();
  const afterDisabledDate = moment('20221231').utc()._d;

  const handleDayChange = (day) => {
    const date = moment(day).format('YYYYMMDD');
    handleDateSelect(date);
  };

  return (
    <div className='flex-center'>
      <MdDateRange style={{ padding: '5px' }} />
      <DayPickerInput
        value={selectedDate}
        onDayChange={handleDayChange}
        formatDate={formatDate}
        parseDate={parseDate}
        format='L'
        placeholder={placeholder}
        dayPickerProps={{
          disabledDays: { before: today, after: afterDisabledDate },
          locale: 'zh-tw',
          localeUtils: MomentLocaleUtils,
        }}
      />
    </div>
  );
}

export default DatePicker;
