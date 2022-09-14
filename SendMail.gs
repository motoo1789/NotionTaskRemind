const generateTaskBody = (tasksendinfo) => {
  const partition = "***************";
  const body = partition + "\n" + 
              "タイトル：" + tasksendinfo.title + "\n" + 
              "開始日：" + tasksendinfo.start + "\n" + 
              "締め切り：" + tasksendinfo.deadline + "\n" + 
              "URL:" + tasksendinfo.url + "\n" + 
              partition + "\n\n";
  return body;
}

function send_startmail(tasks)
{
  console.log("bodyの作成")
  const subject = "タスク開始のご案内"; // 件名
  const sender = "Motoo" // 送信者
  const recipient = "2218012@stu.nit.ac.jp"
  const options = { name: 'タスク通知のGASアプリ' };

  // reduceとかで簡略化したい
  // const sendtaskinfo2 = tasks.reduce((body,task) => {
  //   return body + generateTaskBody(task);
  // });
  // console.log(sendtaskinfo2);
  
  let taskinfo = "";
  tasks.forEach(function(task)
  {
    taskinfo += generateTaskBody(task);
  })
    
  const body = sender + "\n" +
              "明日はタスクの開始日です" + "\n\n" + 
              taskinfo + 
              "以上です\n";

  console.log(body);

  GmailApp.sendEmail(recipient, subject, body, options);
}

