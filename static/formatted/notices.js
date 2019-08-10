/* jshint esversion: 6 */

var request = new XMLHttpRequest();


function loadNotices(date) {

  request.open('GET', 'https://chs-notices.herokuapp.com/notices?key=epic&date=' + date + '&' + new Date().getTime(), true);

  request.onload = function() {
    // Begin accessing JSON data here
    let data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      displayTable(data);
    }
    else {
      console.log('error');
    }

  };

  request.send();
}

window.addEventListener('Load', getSearch());


function getSearch() {
  let search = window.location.search;
  let dateInput = search.slice(6);
  document.dateForm.date.value = dateInput;
  loadNotices(dateInput);
}


function displayTable(json) {
  document.getElementById('status-date').innerHTML = json.Date;

  let meetingsJSON = json["Meetings/Practices"];
  for (let x in meetingsJSON) {
    formatMeetingsHTML(meetingsJSON[x], x);
  }

  let noticesJSON = json.Notices;
  for (let x in noticesJSON) {
    formatNoticesHTML(noticesJSON[x], x);
  }

  let table = document.getElementById("table");
  table.style.opacity = "100";
  table.style.transform = "translateY(0)";
}


function formatMeetingsHTML(json, name) {

  let title = document.createTextNode(name);
  let category = document.createTextNode(json.Category);
  let location = document.createTextNode(json.Location);
  let message = document.createTextNode(json.Message);
  let staff = document.createTextNode(json.Staff);
  let time = document.createTextNode(json.Time);


  let currRow = document.createElement("div");
  currRow.className = "table-row";


  let left = document.createElement("div");
  left.className = "table-content-left";

  let leftText = document.createElement("div");
  leftText.className = "table-content-left-text";

  leftText.appendChild(category);
  left.appendChild(leftText);
  currRow.appendChild(left);


  let right = document.createElement("div");
  right.className = "table-content-right";

  let rightGrid = document.createElement("div");
  rightGrid.className = "table-content-right-top-grid";

  let rightHeading = document.createElement("div");
  rightHeading.className = "table-content-right-heading";

  rightHeading.appendChild(title);
  rightGrid.appendChild(rightHeading);


  let rightLocation = document.createElement("div");
  rightLocation.className = "table-content-right-location table-content-right-small";

  rightLocation.appendChild(location);
  rightGrid.appendChild(rightLocation);


  let rightTime = document.createElement("div");
  rightTime.className = "table-content-right-time table-content-right-small";

  rightTime.appendChild(time);
  rightGrid.appendChild(rightTime);


  let rightStaff = document.createElement("div");
  rightStaff.className = "table-content-right-staff table-content-right-small";

  rightStaff.appendChild(staff);
  rightGrid.appendChild(rightStaff);

  right.appendChild(rightGrid);


  let rightBottom = document.createElement("div");
  rightBottom.className = "table-content-right-bottom";

  rightBottom.appendChild(message);
  right.appendChild(rightBottom);


  currRow.appendChild(right);


  let meetingsSection = document.getElementById("meetingsSection");
  meetingsSection.appendChild(currRow);

}

/*
========== REFERENCE HTML SNIPPET - MEETINGS/PRACTICES ===========

<div class="table-row">
  <div class="table-content-left">
    <div class="table-content-left-text">
      All
    </div>
  </div>
  <div class="table-content-right">
    <div class="table-content-right-top-grid">
      <div class="table-content-right-heading">CHS Writing group</div>
      <div class="table-content-right-location table-content-right-small">M6</div>
      <div class="table-content-right-time table-content-right-small">Thu 31 May 12.25</div>
      <div class="table-content-right-staff table-content-right-small">DWA</div>
    </div>
    <div class="table-content-right-bottom">Many thanks to all of you who have entered and paid!! If you have yet to sign your team and team name up with Mrs. Beer, please come to the meeting to do so. I need a list of all teams, team names and team members :)</div>
  </div>
</div>

*/



function formatNoticesHTML(json, name) {

  let title = document.createTextNode(name);
  let category = document.createTextNode(json.Category);
  let message = document.createTextNode(json.Message);
  let staff = document.createTextNode(json.Staff);


  let currRow = document.createElement("div");
  currRow.className = "table-row";


  let left = document.createElement("div");
  left.className = "table-content-left";

  let leftText = document.createElement("div");
  leftText.className = "table-content-left-text";

  leftText.appendChild(category);
  left.appendChild(leftText);
  currRow.appendChild(left);


  let right = document.createElement("div");
  right.className = "table-content-right";

  let rightGrid = document.createElement("div");
  rightGrid.className = "table-content-right-top-grid";

  let rightHeading = document.createElement("div");
  rightHeading.className = "table-content-right-heading";

  rightHeading.appendChild(title);
  rightGrid.appendChild(rightHeading);


  let rightLocation = document.createElement("div");
  rightLocation.className = "table-content-right-location table-content-right-small";

  rightGrid.appendChild(rightLocation);


  let rightTime = document.createElement("div");
  rightTime.className = "table-content-right-time table-content-right-small";

  rightGrid.appendChild(rightTime);


  let rightStaff = document.createElement("div");
  rightStaff.className = "table-content-right-staff table-content-right-small";

  rightStaff.appendChild(staff);
  rightGrid.appendChild(rightStaff);

  right.appendChild(rightGrid);


  let rightBottom = document.createElement("div");
  rightBottom.className = "table-content-right-bottom";

  rightBottom.appendChild(message);
  right.appendChild(rightBottom);


  currRow.appendChild(right);


  let noticesSection = document.getElementById("noticesSection");
  noticesSection.appendChild(currRow);


}

/*
========== REFERENCE HTML SNIPPET - NOTICES ===========

<div class="table-row">
  <div class="table-content-left">
    <div class="table-content-left-text">
      All
    </div>
  </div>
  <div class="table-content-right">
    <div class="table-content-right-top-grid">
      <div class="table-content-right-heading">CHS Writing group</div>
      <div class="table-content-right-staff table-content-right-small">DWA</div>
    </div>
    <div class="table-content-right-bottom">Many thanks to all of you who have entered and paid!! If you have yet to sign your team and team name up with Mrs. Beer, please come to the meeting to do so. I need a list of all teams, team names and team members :)</div>
  </div>
</div>

*/
