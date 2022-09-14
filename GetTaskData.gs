const getTommorrow = () => {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  const tommorrowDate = new Date(date);
  return Utilities.formatDate( tommorrowDate, 'Asia/Tokyo', 'yyyy-MM-dd');
}

const getStartDate = (task) => {
  const getTaskDateString = task["properties"]["開始日"]["date"]["start"];
  const taskStartDate = new Date(getTaskDateString)
  return Utilities.formatDate( taskStartDate, 'Asia/Tokyo', 'yyyy-MM-dd');  
}

const getDeadlineDate = (task) => {
  const getTaskDateString = task["properties"]["締め切り"]["date"]["start"];
  const startTaskDate = new Date(getTaskDateString)
  return Utilities.formatDate( startTaskDate, 'Asia/Tokyo', 'yyyy-MM-dd');
}

const getTaskTitle = (task) => {
  return title = task["properties"]["Name"]["title"][0]["text"]["content"]
}

const getTaskURL = (task) => {
  return getTaskDateString = task["url"];
}