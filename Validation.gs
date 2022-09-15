const varidateTitle = (task) => {
  // テンプレートのタスクの場合はundefinedではない
  const title = task["properties"]["Name"]["title"][0]["text"]["content"]
  return title.match(/^テンプレート*/) == undefined ? false : true;
}

const varidateStartDate = (task) => {
  return task["properties"]["開始日"]["date"]["start"] ? true : false;
}

const varidateStatus = (task) => {
  return task["properties"]["Status"]["select"]["name"] == "Done" ? true : false;
}