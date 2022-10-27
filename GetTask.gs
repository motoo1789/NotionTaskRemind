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
    const getTaskDateString = task["properties"]["開始と期限"]["date"]["start"];
    const taskstartindex = getTaskDateString.indexOf(".")
    const slicestartstr = getTaskDateString.slice(0,taskstartindex)

    const taskStartDate = new Date(slicestartstr)
    return Utilities.formatDate( taskStartDate, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm');  
  }
  catch(e){
    console.log("タスクの開始日が記入されてないです getStartDate");
    console.log("エラー内容：" + e.message);
    return "タスクの開始日が記入されてない"
  }
}

const getDeadlineDate = (task) => {

  try {
    const taskenddate = task["properties"]["開始と期限"]["date"]["end"]
    const taskendindex= taskenddate.indexOf(".")
    const sliceendstr = taskenddate.slice(0,taskendindex)

    const taskDeadlineDate = new Date(sliceendstr)
    console.log("ハバ卒：" + taskDeadlineDate)
    return Utilities.formatDate( taskDeadlineDate, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm');
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

const getTaskId = (task) => {
  return task["id"];
}
