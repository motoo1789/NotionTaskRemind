changetaskStatustoDoing = (task) => {
  const ENDPOINT_CHANGE_STATUS_PAGE = "https://api.notion.com/v1/pages/";
  const url = ENDPOINT_CHANGE_STATUS_PAGE + getTaskId(task);
  const NOTION_TOKEN = PropertiesService.getScriptProperties().getProperty("notion_token");

  const payload = {
    properties: {
      Status:{ 
        id: '%5EOE%40',
        type: 'select',
        select: { 
          name: 'Doing', 
        } 
      }
    }
  }
  const options = {
    method : "PATCH",
    headers: notionHeader(NOTION_TOKEN),
    payload : JSON.stringify(payload),
  }

  UrlFetchApp.fetch(url,options)
}