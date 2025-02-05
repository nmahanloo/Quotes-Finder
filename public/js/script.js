//alert("Script file successfully accessed!");
let authorLinks = document.querySelectorAll("a");
for (authorLink of authorLinks) {
  authorLink.addEventListener("click", getAuthorInfo);
}

function getAuthorInfo() {
  alert(this.id);
}

function dateFixer(date) {
  let str  = String(date);
  let year = "";
  let month = "";
  let theMonth = "";
  let day = "";
  let i = 0;
  for (i = 0; i < str.length; i++) {
    if (str[i] == "-") {
      year = str.substring(0, i);
      for (let j = i+1; j < str.length; j++) {
        if (str[j] == "-") {
          month = str.substring(i+1, j);
          day = str.substring(j+1, j+3); 
          break;
        }
      }
      break;
    }
  }
  if (month == "01"){
    theMonth = "Jan.";
  }
  else if (month == "02"){
    theMonth = "Feb.";
  }
  else if (month == "03"){
    theMonth = "Mar.";
  }
  else if (month == "04"){
    theMonth = "Apr.";
  }
  else if (month == "05"){
    theMonth = "May";
  }
  else if (month == "06"){
    theMonth = "Jun.";
  }
  else if (month == "07"){
    theMonth = "Jul.";
  }
  else if (month == "08"){
    theMonth = "Aug.";
  }
  else if (month == "09"){
    theMonth = "Sep.";
  }
  else if (month == "10"){
    theMonth = "Oct.";
  }
  else if (month == "11"){
    theMonth = "Nov.";
  }
  else if (month == "12"){
    theMonth = "Dec.";
  }
  if (day[0] == '0') {
    day = day.substring(1, 2);
  }
  str = theMonth + " " + day + ", " + year;
  return str;
}

async function getAuthorInfo() {
  var myModal = new bootstrap.Modal(document.getElementById('authorModal'));
  myModal.show();
  let url = `api/author/${this.id}`;
  let response = await fetch(url);
  let data = await response.json();
  //console.log(data);
  let authorInfo = document.querySelector("#authorInfo");
  authorInfo.innerHTML = `<div id="author-name" style="text-align: center;"><h1> ${data[0].firstName}
                              ${data[0].lastName} </h1></div><br>`;
  authorInfo.innerHTML += `<div style="text-align: center;"><img src="${data[0].portrait}" style="width: 200px; height: auto;"></div><br>`;
  authorInfo.innerHTML += `<h4>${data[0].profession}</h4>`;
  let sex = data[0].sex;
  if (sex == 'M')
  {
    authorInfo.innerHTML += `<img id="gender" src="/img/male.png">`;
    authorInfo.innerHTML += `<h5>Male</h5>`;
  }
  else if (sex == 'F') {
    authorInfo.innerHTML += `<img id="gender" src="/img/female.png">`;
    authorInfo.innerHTML += `<h5>Female</h5>`;
  }
  authorInfo.innerHTML += `<h5>Born in ${data[0].country}</h5>`;
  let dob = data[0].dob;
  let dod = data[0].dod;
  let birth = dateFixer(dob);
  let death = dateFixer(dod);
  authorInfo.innerHTML += `<h5>Lived from ${birth} to ${death}</h5><br>`;
  authorInfo.innerHTML += `<p id="bio">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${data[0].biography}</p>`;
}