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
  const wikidatabaseId = PropertiesService.getScriptProperties().getProperty("notion_databaseID");
  const notion_token = PropertiesService.getScriptProperties().getProperty("notion_token");
  const result = getRemindTaskfromNotion(wikidatabaseId, notion_token);
  const tasks = result["results"]

  let startlimittasks = [];
  let deadlinetasks = [];
  for(let task of tasks)
  {
    if(varidateTitle(task))
    {
      console.log("テンプレートのタスクカードです");
      continue ;
    }

    if(compareStartDate(task))
    {
      let startbody = normalizeStartMailBody(task);
      startlimittasks.push(startbody);
    }
    if(compareDedlineDate(task))
    {
      let deadlinebody = normalizeStartMailBody(task);
      deadlinetasks.push(deadlinebody);
    }
  }

  let startbody = "";
  let deadlinebody = "";
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

  remindmail(startbody,deadlinebody)
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