//cookie setting
let key,value;
document.getElementById('form').addEventListener('submit',(e) => {
    e.preventDefault()
    key = document.getElementById('exp').value
    value = document.getElementById('amount').value
    if (value == ""){
        alert('Enter Amount')
    }
    else{
        if ( key == "debit" ){
            checkCookie ("debit", value);
        }
  
        else if ( key == "credit" ){
            checkCookie ("credit", value);
        }
  
        else if ( key == "savings" ){
            checkCookie ("savings", value);
        }

        else {
            return "";
        }
    }

    // to update the chart
    console.log("cookies present = "+ document.cookie)
    window.location.reload();
})

// setting a new cookie function
function setCookie(key, value, time){
     let d = new Date();
     d.setTime(d.getTime() + (time*24*60*60*1000));
     let expires = "expires=" + d.toGMTString();
     document.cookie = key + "=" + value + ";" + expires + ";path=/";
     console.log("in set cookie the cookie set is " + document.cookie)
}

// accessing a perticular cookie by its key 
function getCookie(key){
     let name = key + "=";
     let decodedCookie = decodeURIComponent(document.cookie); 
     let ca = decodedCookie.split(';')
     for(let i = 0; i < ca.length; i++){            //searching the cookie with perticular key word
          let char = ca[i];
          while (char.charAt(0) == ' ') {           
              char = char.substring(1);
          }
          if (char.indexOf(name) == 0) {
            console.log("in getcookie value of" + key +"="+ char.substring(name.length, char.length));
              return char.substring(name.length, char.length);
          }
      }
      console.log("in get cookie value of "+key+"is null")
      return "";
}

//checking if a cookie with same name created or not
function checkCookie(key,value) {
     let originalvalue = getCookie(key);
     console.log("in checkookie original value of "+key+"="+ originalvalue)

     if (originalvalue != "") {
         setCookie(key , Number(originalvalue) + Number(value), 356);       //if cookie with key present, adding the new value to the old one
     }
     else {
       //if not present, then new cookie being created
        setCookie(key, value, 365);
     }
     console.log("in check cookie"+ document.cookie)
}

//chart entry
const data1={'debit' : Number(getCookie("debit")), 'credit' : Number(getCookie("credit")), 'savings' : Number(getCookie("savings"))};
const ctx = document.getElementById('myChart');

const myChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: Object.keys(data1),
    datasets: [{
      label: 'amount',
      data: Object.values(data1),      
    }]
  },
  options: {
    backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 164, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 164, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1,
    responsive: true,
  }
});
