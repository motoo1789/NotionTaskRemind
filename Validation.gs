const varidateTitle = (task) => {
  // テンプレートのタスクの場合はあるとういことなのでundefinedではない
  const title = task["properties"]["Name"]["title"][0]["text"]["content"]
  return title.match(/^テンプレート*/) == undefined ? false : true;
}

const varidateStartDate = (task) => {
  // テンプレートのタスクの場合はあるとういことなのでundefinedではない
  return task["properties"]["開始日"]["date"]["start"] ? true : false;
}
