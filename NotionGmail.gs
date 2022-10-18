function myFunction() {
  
}

class NotionTaskGmail {
  constructor() {
    this.startlimittasks = new Array();
    this.deadlinetasks = new Array();
    this.doingtasks = new Array();
    this.donetasks = new Array();
  }

  exe(){
    const tasks = getTasks();
    if(tasks == "プログラム終了")
    {
      console.log("実行はここで終了です");
      return "プログラム終了";
    }
        
    // TODO map →　何かに名前変える
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
      donceclass.varidate(task,this)
    }

    // タスクの通知
    sendtask(this.startlimittasks,this.deadlinetasks,this.doingtasks);

    // 完了済みのタスクはある程度たったら消しておく
    // 対象
    // ・優先度が低いもの
    // ・タスク完了から30日たっているもの
    deleteDoneTask(this.donetasks)
  }
}