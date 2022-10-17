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
  const notiontaskgmail = new NotionTaskGmail();
  notiontaskgmail.exe();
}

const sendtask = (startlimittasks,deadlinetasks,doingtasks) => {
  let startbody = "";
  let deadlinebody = "";
  let doingbody = "";

  if(startlimittasks.length > 0 )
  {
    startbody = generatebodymail(startlimittasks,"明日開始のタスクがあります")
  }

  if(deadlinetasks.length > 0)
  {
    deadlinebody = generatebodymail(deadlinetasks,"明日締め切りのタスクがあります")
  }

  if(doingtasks.length > 0)
  {
    doingbody = generatebodymail(doingtasks,"実施中のタスクです")
  }

  remindmail(startbody,deadlinebody,doingbody)
}

const deleteDoneTask = (varidationtargetDoneTasks) => {
  
  const deletetasks = varidationtargetDoneTasks.filter(varidatetargettask => varidateLowPriority(varidatetargettask) == true || 
                                                                             varidatedeletedete (varidatetargettask) == true);
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