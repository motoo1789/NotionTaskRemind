function myFunction()
{

}

class TitleClass {
  constructor() {
    this.next = null;
  }

  setnext(fn)
  {
    this.next = fn
  }

  varidate(task,title)
  {
    if(varidateTitle(task))
    {
      return "title";
    }
    else if(this.next) 
    {
      this.next.varidate(task,title)
    }
    else 
    {
      console.log("titleが最後の場合はTitleClassでおわり")
      return "none";
    }
  }
}

class StatusDone {
  constructor() {
    this.next = null;
  }

  setnext(fn)
  {
    this.next = fn
  }

  varidate(task,done)
  {
    if(varidateStatusDone(task))
    {  
      done.donetasks.push(task);
      return "done";
    }
    else if(this.next)
    {
      this.next.varidate(task,done)
    }
    else 
    {
      return "none";
    }
  }
}

class StartDate {
  constructor() {
    this.next = null;
  }

  setnext(fn)
  {
    this.next = fn
  }

  varidate(task,startlimit)
  {
    if(compareStartDate(task))
    {
      startlimit.startlimittasks.push(task);
      return "startdate";
    }
    else if(this.next) 
    {
      this.next.varidate(task,startlimit)
    }
    else 
    {
      return "none";
    }
  }
}

class DedlineDate {
  constructor() {
    this.next = null;
  }

  setnext(fn)
  {
    this.next = fn
  }

  varidate(task,deadline)
  {
    if(compareDedlineDate(task))
    {
      deadline.deadlinetasks.push(task);
      return "deadlinedate" 
    }
    else if(this.next) 
    {
      this.next.varidate(task,deadline)
    }
    else 
    {
      return "none";
    }
  }
}

class StatusDoing {
  constructor() {
    this.next = null;
  }

  setnext(fn)
  {
    this.next = fn
  }

  varidate(task,doing)
  {
    if(varidateStatusDoing(task))
    {
      const doingtodo = normalizeStartMailBody(task);
      doing.doingtasks.push(doingtodo);
      return "doing";
    }
    else if(this.next) 
    {
      this.next.varidate(task,doing)
    }
    else 
    {
      return "none";
    }
  }
}