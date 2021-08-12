function RemainDaysItem({ label, days }) {
  return (
    <div className='day-container'>
      <span>{label}</span>
      <div className='day-box flex-center'>{days}</div>
    </div>
  );
}

export default RemainDaysItem;
