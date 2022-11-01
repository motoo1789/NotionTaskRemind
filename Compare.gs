function compareStartDate(task)
{
  // 明日の日付の取得
  const today = new dayjs.dayjs(getToday());
  const tommorrow = today.add(1, 'day');
  // タスクから開始日の取得
  const startTaskDate = getStartDate(task);
  
  if(tommorrow.isAfter(startTaskDate))
  {
    return false;
  }
  return tommorrow.diff(startTaskDate,"day") == 0 ? true : false;
}

function compareDedlineDate(task)
{
  // 明日の日付の取得
  const today = new dayjs.dayjs(getToday());
  const tommorrow = today.add(1, 'day')

  // タスクから締め切りの取得
  const deadlineTaskDate = getDeadlineDate(task);
  if(tommorrow.isAfter(deadlineTaskDate))
  {
    return false;
  }
  return tommorrow.diff(deadlineTaskDate,"day") == 0 ? true : false;
}
