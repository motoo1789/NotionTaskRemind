const notionHeader = token => ({
  'Authorization': 'Bearer ' + token,
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28'
})

const getRemindTaskfromNotion = (dbID,notiontoken) => {

  const endPoint = "https://api.notion.com/v1/databases/" + dbID + "/query";
  
  const options = {
    method: 'post',
    headers: notionHeader(notiontoken),
  }
  const response = UrlFetchApp.fetch(endPoint,options);

  return JSON.parse(response.getContentText())
}

function notionremindgmail()
{
  const tasks = getTasks();
  if(tasks == "プログラム終了")
  {
    console.log("実行はここで終了です");
    return ;
  }
    

  let startlimittasks = [];
  let deadlinetasks = [];
  let doingtasksks = [];
  let donetasks = [];
  for(let task of tasks)
  {

    // 完了済みタスクは省く or テンプレートのタスク
    // HACK: CoRみたいな感じの方がよいかも
    if(varidateStatusDone(task))
    {
      donetasks.push(task);
      continue ;
    }

    if(varidateTitle(task))
    {
      continue ;
    }
    
    if(compareStartDate(task))
    {
      const startbody = normalizeStartMailBody(task);
      startlimittasks.push(startbody);
    }
    if(compareDedlineDate(task))
    {
      const deadlinebody = normalizeStartMailBody(task);
      deadlinetasks.push(deadlinebody);
      continue ;
    }
    if(varidateStatusDoing(task))
    {
      
      const doingtodo = normalizeStartMailBody(task);
      doingtasksks.push(doingtodo);
      continue ;
    }
  }

  // タスクの通知
  sendtask(startlimittasks,deadlinetasks,doingtasksks);

  // 完了済みのタスクはある程度たったら消しておく
  // 対象
  // ・優先度が低いもの
  // ・タスク完了から30日たっているもの
  deleteDoneTask(donetasks)

}

const sendtask = (startlimittasks,deadlinetasks,doingtasksks) => {
  let startbody = "";
  let deadlinebody = "";
  let doingbody = "";
  if(startlimittasks.length > 0 )
  {
    console.log("明日はタスクの開始日です");
    startbody = generatebodymail(startlimittasks,"明日開始のタスクがあります")
  }

  if(deadlinetasks.length > 0)
  {
    console.log("明日はタスクの締め切り日です")
    deadlinebody = generatebodymail(deadlinetasks,"明日締め切りのタスクがあります")
  }

  if(doingtasksks.length > 0)
  {
    console.log("実施中のタスクです");
    doingbody = generatebodymail(doingtasksks,"実施中のタスクです")
  }

  remindmail(startbody,deadlinebody,doingbody)
}

const deleteDoneTask = (varidationtargetDoneTasks) => {
  
  const deletetasks = varidationtargetDoneTasks.filter(varidatetargettask => varidateLowPriority(varidatetargettask) == true || 
                                                                            varidatedeletedete(varidatetargettask) == true);
  
  deletetasks.map(deletetargettask => deleteAPI(deletetargettask));
                                                                
}

const deleteAPI = (task) => {
  const ENDPOINT_DELETE_PAGE = "https://api.notion.com/v1/pages/"
  const url = ENDPOINT_DELETE_PAGE + task["id"];
  const NOTION_TOKEN = PropertiesService.getScriptProperties().getProperty("notion_token");

  const payload = {
    "archived" : true
  }
  const options = {
    method : "PATCH",
    headers: notionHeader(NOTION_TOKEN),
    payload : JSON.stringify(payload),
  }

  UrlFetchApp.fetch(url,options)
}

const normalizeStartMailBody = (task) => {
  const title = getTaskTitle(task);
  const start = getStartDate(task);
  const deadline = getDeadlineDate(task);
  const url = getTaskURL(task);

  const body = {
      "title" : title,
      "start" : start,
      "deadline" : deadline,
      "url" : url
  }
  return body;
} 