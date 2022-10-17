const getTasks = () => {
  const wikidatabaseId = PropertiesService.getScriptProperties().getProperty("notion_databaseID");
  const notion_token = PropertiesService.getScriptProperties().getProperty("notion_token");
  try {
    const result = getRemindTaskfromNotion(wikidatabaseId, notion_token);
    return result["results"];
  }
  catch(e){
    console.log("タスクが取得できませんでした");
    console.log("エラー内容：" + e.message);
    return "プログラム終了";
  }
}
const getToday = () => {
  let date = new Date();
  date.setDate(date.getDate());
  const tommorrowDate = new Date(date);
  return Utilities.formatDate( tommorrowDate, 'Asia/Tokyo', 'yyyy-MM-dd');
}

const getTommorrow = () => {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  const tommorrowDate = new Date(date);
  return Utilities.formatDate( tommorrowDate, 'Asia/Tokyo', 'yyyy-MM-dd');
}

const getStartDate = (task) => {

  try {
    const getTaskDateString = task["properties"]["開始日"]["date"]["start"];
    const taskStartDate = new Date(getTaskDateString)
    return Utilities.formatDate( taskStartDate, 'Asia/Tokyo', 'yyyy-MM-dd');  
  }
  catch(e){
    console.log("タスクの開始日が記入されてないです getStartDate");
    console.log("エラー内容：" + e.message);
    return "タスクの開始日が記入されてない"
  }
}

const getDeadlineDate = (task) => {

  try {
    const getTaskDateString = task["properties"]["締め切り"]["date"]["start"];
    const taskDeadlineDate = new Date(getTaskDateString)
    return Utilities.formatDate( taskDeadlineDate, 'Asia/Tokyo', 'yyyy-MM-dd');
  }
  catch(e){
    console.log("タスクの締め切りが記入されてない");
    console.log("エラー内容：" + e.message);
    return "タスクの締め切りが記入されてない"
  }
}

const getTaskTitle = (task) => {
  try{
    return title = task["properties"]["Name"]["title"][0]["text"]["content"]
  }
  catch(e){
    console.log("タスクのタイトルが記入されていないです");
    console.log("エラー内容：" + e.message);
    return "タスク名未記入"
  }
}

const getTaskURL = (task) => {
  return getTaskDateString = task["url"];
}
