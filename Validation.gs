//　バリデーションを正しく使えてるのvaridateRedundantTaskだけでは

const varidateRedundantTask = (task) => {
  if(varidateTitle(task))
  {
    console.log("テンプレートのタスクカードです");
    return true;
  }
  if(varidateStatus(task))
  {
    console.log("完了済みのタスクです")
    return true; 
  }
}

const varidateTitle = (task) => {
  // テンプレートのタスクの場合はundefinedではない
  try {
    const title = task["properties"]["Name"]["title"][0]["text"]["content"]
    return title.match(/^テンプレート*/) == undefined ? false : true;
  }
  catch(e){
    console.log("タイトル参照できない")
    console.log("エラー内容：" + e.message);
    return false;
  }
}

const varidateStartDate = (task) => {
  try{
    return task["properties"]["開始日"]["date"]["start"] ? true : false;
  }
  catch(e){
    console.log("開始日参照できない")
    console.log("エラー内容：" + e.message);
    return false;
  }
}

const varidateDeadlineDate = (task) => {
  try{
    return task["properties"]["締め切り"]["date"]["start"] ? true : false;
  }
  catch(e){
    console.log("終了日参照できない")
    console.log("エラー内容：" + e.message);
    return false;
  }
}

const varidateStatus = (task) => {
  try{
    return task["properties"]["Status"]["select"]["name"] == "Done" ? true : false;
  }
  catch(e){
    console.log("タスクのステータス参照できない")
    console.log("エラー内容：" + e.message);
    return false;
  }
  
}