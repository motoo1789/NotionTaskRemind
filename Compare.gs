function compareStartDate(task)
{
  // 明日の日付の取得
  const tommorrow = getTommorrow();
  // タスクから開始日の取得
  const startTaskDate = getStartDate(task);
  return tommorrow == startTaskDate ? true : false;
}

function compareDedlineDate(task)
{
  // 明日の日付の取得
  const tommorrow = getTommorrow();
  // タスクから締め切りの取得
  const deadlineTaskDate = getDeadlineDate(task);
  return tommorrow == deadlineTaskDate ? true : false;
}
