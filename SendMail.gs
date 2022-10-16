const templateTaskBody = (tasksendinfo) => {
  const partition = "*****************************************************************";
  const body = partition + "\n" + 
              "タイトル：" + tasksendinfo.title + "\n" + 
              "開始日：" + tasksendinfo.start + "\n" + 
              "締め切り：" + tasksendinfo.deadline + "\n" + 
              "URL:" + tasksendinfo.url + "\n" + 
              partition + "\n\n";
  return body;
}

function generatebodymail(tasks, taskmessage)
{
  // reduceとかで簡略化したい
  const generatetaskbody  = tasks.reduce((body,task) => {
    return body + templateTaskBody(task);
  },""); 

  const body = taskmessage + "\n" + 
               generatetaskbody + "\n";

  return body;
  
}

function remindmail(startbody,deadlinebody,doingtasksk)
{
  const subject = "タスク開始・期限のご案内"; // 件名
  const sender = "Motoo"; // 送信者
  const recipient = PropertiesService.getScriptProperties().getProperty("mail_address"); 
  const options = { name: 'タスク通知のGASアプリ' };

  const body = sender + "\n\n" + startbody + deadlinebody + doingtasksk + "以上です。";

  GmailApp.sendEmail(recipient, subject, body, options);
}