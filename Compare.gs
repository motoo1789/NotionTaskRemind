function compareDate(task)
{
  // 明日の日付の取得
  const tommorrow = getTommorrow();
  // タスクから開始日の取得
  const startTaskDate = getStartDate(task);
  console.log(tommorrow);
  console.log(startTaskDate);
  return tommorrow == startTaskDate ? true : false;
}