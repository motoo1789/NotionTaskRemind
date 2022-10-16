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
  let doingtasksk = [];
  for(let task of tasks)
  {
    // テンプレートのタスク or　完了済みタスクは省く
    if(varidateRedundantTask(task))
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

    if(isDoing(task))
    {
      
      const doingtodo = normalizeStartMailBody(task);
      doingtasksk.push(doingtodo);
      console.log(doingtodo)
      continue ;
    }
  }

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

  if(doingtasksk.length > 0)
  {
    console.log("実施中のタスクです");
    doingbody = generatebodymail(doingtasksk,"実施中のタスクです")
  }

  remindmail(startbody,deadlinebody,doingbody)
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