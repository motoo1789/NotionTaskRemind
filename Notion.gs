const notionHeader = token => ({
  'Authorization': 'Bearer ' + token,
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28'
})

const getRemindTask = (dbID,notiontoken) => {

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

  const result = getRemindTask(wikidatabaseId, notion_token);

  const tasks = result["results"]

  let startlimittasks = [];
  for(let task of tasks)
  {
    if(varidateTitle(task))
    {
      console.log("テンプレートのタスクカードです");
      continue ;
    }
    if(varidateStartDate(task))
    {
      if(compareDate(task))
      {
        let body = normalizeStartMailBody(task);
        console.log(body);
        startlimittasks.push(body);
      }
    }
  }

  if(startlimittasks.length > 0)
  {
    console.log("明日はタスクの開始日");
    console.log(startlimittasks);
    send_startmail(startlimittasks)
  }
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