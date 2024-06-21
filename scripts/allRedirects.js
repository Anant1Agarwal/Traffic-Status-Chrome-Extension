
// Define addedRequestId at the appropriate scope
let addedRequestId = [];

// Event Listener on Button
document.getElementById("button1").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    const tabId = activeTab.id.toString() + "2";
    let tabledata = document.getElementById("tbody");
    tabledata.innerHTML = "";
    chrome.storage.local.get(tabId, function (result) {
      const details = result[tabId];
      console.log("details acquired are:", details[0]);

      if (details && Array.isArray(details)) {
        details.forEach((detail) => {
          addEventList(detail);
        });
      }
    });
  });
});

// Function to add event list
function addEventList(details) {
  addedRequestId.push(details.requestIdEnhanced);

  let tabledata = document.getElementById("tbody");

  let content =
    "<th class='mobile-header'>URL</th>" +
    `<td>${details.url}</td>` +
    "<th class='mobile-header'>Method</th>" +
    `<td>${details.method}</td>` +
    "<th class='mobile-header'>Status</th>" +
    `<td>${
      details.statusCode
        ? details.statusCode
        : details.error
        ? "STRING_ERROR"
        : "N/A"
    }</td>` +
    "<th class='mobile-header'>Time</th>" +
    `<td>${
      details.timeStamp ? getReadableDate(details.timeStamp) : "N/A"
    }</td>`;

  let newdata = document.createElement("tr");
  newdata.innerHTML = content;

  tabledata.append(newdata);
  var statusCode2 = "" + details.statusCode;
  if (statusCode2[0] == 1) {
    newdata.style.background = "#ebdd5e)";
  } else if (statusCode2[0] == 2) {
    newdata.style.background = "hsl(96, 81%, 65%)";
  } else if (statusCode2[0] == 3) {
    newdata.style.background = "#60d2ee";
  } else if (statusCode2[0] == 4) {
    newdata.style.background = "hsl(0, 79%, 61%)";
  } else if (statusCode2[0] == 5) {
    newdata.style.background = "#ffaa64";
  } else {
    newdata.style.background = "#ffc0c0";
  }
}

// Function to get a readable date
function getReadableDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString(); // Modify this to your desired date format
}
