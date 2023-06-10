const balance = document.getElementById('balance');
const show_credit = document.getElementById('show_credit');
const show_debit = document.getElementById('show_debit');
const list = document.getElementById('list');

setCookie("balance", Number(getCookie("credit")) - Number(getCookie("debit")), 356);
show_credit.innerHTML = "Rs. " + getCookie("credit");
show_debit.innerHTML = "Rs. " + getCookie("debit");
balance.innerHTML = "Rs. " + getCookie("balance");
addTransactionDOM();
document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const key = document.getElementById("exp").value;
  const value = document.getElementById("amount").value;
  const text = document.getElementById("text").value.trim();

  if (value == "") { alert('Enter Amount'); }
  else {
    if (getCookie("no_of_transactions") == '') {
      setCookie("no_of_transactions", 1, 365);
    }

    if (key == "debit") {
      checkCookie("debit", value);
      setCookie(getCookie("no_of_transactions"), text + " " + " "+" -"+ value, 365);
    }
    else if (key == "credit") {
      checkCookie("credit", value);
      setCookie(getCookie("no_of_transactions"), text + " " +" "+ " +" + value, 365);
    }
    else { return ""; }
    setCookie("no_of_transactions", Number(getCookie("no_of_transactions")) + 1,365);
  }
  setCookie("balance", Number(getCookie("credit")) - Number(getCookie("debit")), 356);
  myChart.data.datasets.data === Object.values({ 'debit': Number(getCookie("debit")), 'credit': Number(getCookie("credit")) });
  myChart.update();
  console.log("cookies present = " + document.cookie); 
  window.location.reload();  
})

// Add transactions to DOM list
function addTransactionDOM() {
  console.log("In add transactions");
  
  for (let i = Number(getCookie('no_of_transactions')) -1; i >0; i--) 
  {
    const item = document.createElement('li');
    transaction_detail = getCookie(i);
    item.innerText = transaction_detail;
    list.appendChild(item);
  }
  show_credit.innerHTML = "Rs. " + getCookie("credit");
  show_debit.innerHTML = "Rs. " + getCookie("debit");
  balance.innerHTML = "Rs. " + getCookie("balance");
}

//checking if a cookie with same name created or not
function checkCookie(key, value) {
  let originalvalue = getCookie(key);
  console.log("in checkcookie original value of " + key + "=" + originalvalue);

  if (originalvalue != "") {
    setCookie(key, Number(originalvalue) + Number(value), 356);       //if cookie with key present, adding the new value to the old one
  }
  else {
    //if not present, then new cookie being created
    setCookie(key, value, 365);
  }
  console.log("in check cookie" + document.cookie)
}
//sets or updates a cookie
function setCookie(key, value, time) {
  let d = new Date();
  d.setTime(d.getTime() + (time * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toGMTString();
  document.cookie = key + "=" + value + ";" + expires + ";path=/";
  console.log("in set cookie the cookie set is " + document.cookie);
}
// accessing a particular cookie by its key 
function getCookie(key) {
  let name = key + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {            //searching the cookie with particular key word
    let char = ca[i];
    while (char.charAt(0) == ' ') {
      char = char.substring(1);
    }
    if (char.indexOf(name) == 0) {
      console.log("in getCookie value of" + key + "=" + char.substring(name.length, char.length));
      return char.substring(name.length, char.length);
    }
  }
  console.log("in get cookie value of " + key + "is null")
  return "";
}

//chart entry
const data1 = { 'debit': Number(getCookie("debit")), 'credit': Number(getCookie("credit")) };
const ctx = document.getElementById('myChart');

const myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: Object.keys(data1),
    datasets: [{
      label: 'amount',
      data: Object.values(data1),
    }]
  },
  options: {
    backgroundColor: [
      '#c9302a',
      '#33a81e',],
    borderColor: [
      '#91150c',
      '#126908',],
    borderWidth: 1,
    responsive: true,
  }
});
