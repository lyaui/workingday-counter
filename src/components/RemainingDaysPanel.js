import { memo } from 'react';
import RemainDaysItem from './RemainDaysItem';

const RemainingDaysPanel = ({ rangeDates }) => {
  const data = [
    { label: '離職倒數', days: rangeDates.length },
    { label: '剩餘工作日', days: rangeDates.filter((date) => date.isHoliday === 0).length },
    { label: '假日', days: rangeDates.filter((date) => date.isHoliday === 2).length },
  ];
  return (
    <div className='flex-center' style={{ marginTop: '32px' }}>
      {data.map(({ label, days }) => (
        <RemainDaysItem label={label} days={days} key={label} />
      ))}
    </div>
  );
};

export default memo(RemainingDaysPanel);
