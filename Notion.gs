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
  tmp.exe();

  // const tasks = getTasks();
  // if(tasks == "プログラム終了")
  // {
  //   console.log("実行はここで終了です");
  //   return "プログラム終了";
  // }
  

  // let startlimittasks = new Array();
  // let deadlinetasks = new Array();
  // let doingtasks = new Array();
  // let donetasks = new Array();
  
  // // TODO map →　何かに名前変える
  // let map = new Map();
  // map.set("done",new Array());

  // map.set("startdate",new Array());
  // map.set("deadlinedate",new Array());
  // map.set("doing",new Array());
  // map.set("title",new Array());
  // map.set("none",new Array());

  // let donceclass = new StatusDone();
  // let startclass = new StartDate();
  // let deadlineclass = new DedlineDate();
  // let doingclass = new StatusDoing();
  // let titleclass = new TitleClass();
  // donceclass.setnext(startclass);
  // startclass.setnext(deadlineclass);
  // deadlineclass.setnext(doingclass);
  // doingclass.setnext(titleclass);

  // for(let task of tasks)
  // {

  //   // // 完了済みタスクは省く or テンプレートのタスク
  //   // // HACK: CoRみたいな感じの方がよいかも
  //   console.log("各配列の確認")
  //   // console.log("doing" + map.get("doing"))
  //   // console.log("done" + map.get("done"))
  //   // console.log("none" + map.get("none"))
  //   // console.log("title" + map.get("title"))
  //   // console.log("startdate" + map.get("startdate"))
  //   // console.log("deadlinedate" + map.get("deadlinedate"))



  //   console.log("doing" + doingtasks)
  //   console.log("doingの型:" + Array.isArray(doingtasks))
  //   console.log("done" + donetasks)
  //   console.log("startdate" + startlimittasks)
  //   console.log("deadlinedate" + deadlinetasks)
    

  //   //let tmp = map.get(donceclass.varidate(task))
  //   console.log("taskの型：");
  //   console.log(task);
   
  
  //   donceclass.varidate(task,this)
    

    // if(varidateStatusDone(task))
    // {
    //   donetasks.push(task);
    //   continue ;
    // }

    // if(varidateTitle(task))
    // {
    //   continue ;
    // }
    
    // if(compareStartDate(task))
    // {
    //   const startbody = normalizeStartMailBody(task);
    //   startlimittasks.push(startbody);
    // }
    // if(compareDedlineDate(task))
    // {
    //   const deadlinebody = normalizeStartMailBody(task);
    //   deadlinetasks.push(deadlinebody);
    //   continue ;
    // }
    // if(varidateStatusDoing(task))
    // {
    //   const doingtodo = normalizeStartMailBody(task);
    //   doingtasks.push(doingtodo);
    //   continue ;
    // }
  // }

  // タスクの通知
  //sendtask(startlimittasks,deadlinetasks,doingtasks);

  // 完了済みのタスクはある程度たったら消しておく
  // 対象
  // ・優先度が低いもの
  // ・タスク完了から30日たっているもの
  //deleteDoneTask(donetasks)

}
const tmp = {
  exe(){
    const tasks = getTasks();
    if(tasks == "プログラム終了")
    {
      console.log("実行はここで終了です");
      return "プログラム終了";
    }
    

    let startlimittasks = new Array();
    let deadlinetasks = new Array();
    let doingtasks = new Array();
    let donetasks = new Array();

    console.log(this)
    
    // TODO map →　何かに名前変える
    let map = new Map();
    map.set("done",new Array());

    map.set("startdate",new Array());
    map.set("deadlinedate",new Array());
    map.set("doing",new Array());
    map.set("title",new Array());
    map.set("none",new Array());

    let donceclass = new StatusDone();
    let startclass = new StartDate();
    let deadlineclass = new DedlineDate();
    let doingclass = new StatusDoing();
    let titleclass = new TitleClass();
    donceclass.setnext(startclass);
    startclass.setnext(deadlineclass);
    deadlineclass.setnext(doingclass);
    doingclass.setnext(titleclass);

    for(let task of tasks)
    {

      // // 完了済みタスクは省く or テンプレートのタスク
      // // HACK: CoRみたいな感じの方がよいかも
      console.log("各配列の確認")
      // console.log("doing" + map.get("doing"))
      // console.log("done" + map.get("done"))
      // console.log("none" + map.get("none"))
      // console.log("title" + map.get("title"))
      // console.log("startdate" + map.get("startdate"))
      // console.log("deadlinedate" + map.get("deadlinedate"))



      console.log("doing" + doingtasks)
      console.log("doingの型:" + Array.isArray(doingtasks))
      console.log("done" + donetasks)
      console.log("startdate" + startlimittasks)
      console.log("deadlinedate" + deadlinetasks)
      

      //let tmp = map.get(donceclass.varidate(task))
      console.log("taskの型：");
      console.log(task);
    
    
      donceclass.varidate(task,this)
      

      // if(varidateStatusDone(task))
      // {
      //   donetasks.push(task);
      //   continue ;
      // }

      // if(varidateTitle(task))
      // {
      //   continue ;
      // }
      
      // if(compareStartDate(task))
      // {
      //   const startbody = normalizeStartMailBody(task);
      //   startlimittasks.push(startbody);
      // }
      // if(compareDedlineDate(task))
      // {
      //   const deadlinebody = normalizeStartMailBody(task);
      //   deadlinetasks.push(deadlinebody);
      //   continue ;
      // }
      // if(varidateStatusDoing(task))
      // {
      //   const doingtodo = normalizeStartMailBody(task);
      //   doingtasks.push(doingtodo);
      //   continue ;
      // }
    }

    // タスクの通知
    sendtask(startlimittasks,deadlinetasks,doingtasks);

    // 完了済みのタスクはある程度たったら消しておく
    // 対象
    // ・優先度が低いもの
    // ・タスク完了から30日たっているもの
    deleteDoneTask(donetasks)
  }
}

const sendtask = (startlimittasks,deadlinetasks,doingtasks) => {
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

  if(doingtasks.length > 0)
  {
    console.log("実施中のタスクです");
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