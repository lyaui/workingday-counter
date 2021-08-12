function HolidayDetails({ rangeDates }) {
  return (
    <ul className='holiday-list'>
      {rangeDates.map(
        (date) =>
          date.remark && (
            <li className={date.isHoliday === 0 && 'text-warning'}>
              {date.date} - {date.remark}
            </li>
          ),
      )}
    </ul>
  );
}

export default HolidayDetails;
