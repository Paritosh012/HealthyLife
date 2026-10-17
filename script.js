let menuBtn = document.getElementById("menuBtn");
let navLinks = document.getElementById("navLinks");

if (menuBtn) {
  menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("show");
  });
}

function makeList(arr) {
  let html = "<ul>";
  for (let i = 0; i < arr.length; i++) {
    html += "<li>" + arr[i] + "</li>";
  }
  return html + "</ul>";
}
 
function formatTime(mins) {
  if (mins < 0) mins = mins + 1440;

  let h = Math.floor(mins / 60);
  let m = mins % 60;
  let ampm = h >= 12 ? "PM" : "AM";

  if (h > 12) h = h - 12;
  if (h == 0) h = 12;
  if (m < 10) m = "0" + m;

  return h + ":" + m + " " + ampm;
}


let quizForm = document.getElementById("quizForm");
let quizResult = document.getElementById("quizResult");

if (quizForm) {
  quizForm.addEventListener("submit", function (e) {
    e.preventDefault(); 

    let sleep = document.getElementById("sleepHrs").value;
    let wake = document.getElementById("wake").value;
    let exercise = document.getElementById("exercise").value;
    let sun = document.getElementById("sun").value;
    let phone = document.getElementById("phone").value;

    if (!sleep || !wake || !exercise || !sun || !phone) {
      quizResult.innerHTML = "<p class='err'>Please answer all the questions</p>";
      return;
    }

    let good = [];
    let bad = [];

    if (sleep == "7-9") {
      good.push("You sleep 7-9 hours, which is what most adults need.");
    } else if (sleep == "less") {
      bad.push("Adults need at least 7 hours of sleep. Try sleeping 15 min earlier.");
    } else {
      bad.push("If you sleep more than 9 hours and still feel tired, check with a doctor.");
    }

    if (wake == "same") good.push("Fixed wake up time keeps your body clock on track.");
    else bad.push("Try waking up at the same time every day, weekends too.");

    if (exercise == "4+") {
      good.push("4+ days of exercise a week - you're on track for 150 minutes.");
    } else if (exercise == "2-3") {
      bad.push("Almost there, one more day of 30 min exercise would help.");
    } else {
      bad.push("Start with a 10 minute walk daily.");
    }

    if (sun == "more") good.push("Daylight during the day helps you sleep better at night.");
    else bad.push("Try to get 15 minutes of sunlight in the morning.");

    if (phone == "rarely") good.push("No phone before bed helps you fall asleep faster.");
    else bad.push("Phone screen at night can keep you awake. Keep it away for the last 30 min.");

    let out = "";
    if (good.length > 0) {
      out += "<h3 class='ok'>Doing well</h3>" + makeList(good);
    }
    if (bad.length > 0) {
      out += "<h3 class='warn'>Can improve</h3>" + makeList(bad);
    }
    out += "<p class='muted'>This is not a diagnosis. Check the <a href='guides.html'>guides</a> for more.</p>";

    quizResult.innerHTML = out;
  });

  quizForm.addEventListener("reset", function () {
    quizResult.innerHTML = "<p class='muted'>Fill all the questions and click Check.</p>";
  });
}


let bedForm = document.getElementById("bedForm");

if (bedForm) {
  bedForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let time = document.getElementById("wakeTime").value;
    let result = document.getElementById("bedResult");

    if (time == "") {
      result.innerHTML = "<p class='err'>Enter wake up time</p>";
      return;
    }

    let parts = time.split(":");
    let wakeMins = parseInt(parts[0]) * 60 + parseInt(parts[1]);

    let bed1 = wakeMins - 15 - 6 * 90;
    let bed2 = wakeMins - 15 - 5 * 90;

    result.innerHTML = `
      <p>To wake up at <strong>${formatTime(wakeMins)}</strong> you should sleep at</p>
      <p class="big">${formatTime(bed1)}</p>
      <p>9 hours sleep (6 cycles)</p>
      <p class="big">${formatTime(bed2)}</p>
      <p>7.5 hours sleep (5 cycles)</p>
      <p class="muted">Adults need at least 7 hours.</p>
    `;
  });
}


let waterForm = document.getElementById("waterForm");

if (waterForm) {
  waterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let gender = document.getElementById("gender").value;
    let mins = Number(document.getElementById("exMins").value);
    let result = document.getElementById("waterResult");

    if (gender == "") {
      result.innerHTML = "<p class='err'>Select gender</p>";
      return;
    }

    let litres = gender == "man" ? 3.0 : 2.2;
    litres += (mins / 60) * 0.6;
    let glasses = Math.round(litres * 4);

    result.innerHTML =
      "<p>You should drink around</p>" +
      "<p class='big'>" + litres.toFixed(1) + " L</p>" +
      "<p>That's about " + glasses + " glasses (250ml each)</p>" +
      "<p class='muted'>Drink more in hot weather. Heart/kidney patients should follow their doctor's advice.</p>";
  });
}


let bmiForm = document.getElementById("bmiForm");

if (bmiForm) {
  bmiForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let height = Number(document.getElementById("height").value);
    let weight = Number(document.getElementById("weight").value);
    let result = document.getElementById("bmiResult");

    if (height < 100 || height > 250) {
      result.innerHTML = "<p class='err'>Enter height between 100 and 250 cm</p>";
      return;
    }
    if (weight < 25 || weight > 300) {
      result.innerHTML = "<p class='err'>Enter weight between 25 and 300 kg</p>";
      return;
    }

    let m = height / 100;
    let bmi = weight / (m * m);
    let type;

    if (bmi < 18.5) type = "Underweight";
    else if (bmi < 25) type = "Normal";
    else if (bmi < 30) type = "Overweight";
    else type = "Obese";

    let min = (18.5 * m * m).toFixed(1);
    let max = (24.9 * m * m).toFixed(1);

    result.innerHTML = `
      <p>Your BMI</p>
      <p class="big">${bmi.toFixed(1)}</p>
      <p><strong>${type}</strong></p>
      <p>Normal weight for your height: ${min} - ${max} kg</p>
      <p class="muted">For Indians/South Asians risk starts going up from BMI 23.</p>
    `;
  });
}


let weekForm = document.getElementById("weekForm");

if (weekForm) {
  weekForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let total = 0;

    for (let i = 1; i <= 7; i++) {
      let val = document.getElementById("day" + i).value;
      if (val != "") total += Number(val);
    }

    let percent = (total / 150) * 100;
    if (percent > 100) percent = 100;

    let msg;
    if (total >= 150) {
      msg = "Great, you hit the 150 minute target!";
    } else if (total == 0) {
      msg = "Start small, even a 10 minute daily walk is good.";
    } else {
      msg = (150 - total) + " more minutes to reach 150.";
    }

    document.getElementById("weekResult").innerHTML =
      "<p>Total this week</p>" +
      "<p class='big'>" + total + " min</p>" +
      "<div class='progressbar'><div class='fill' style='width:" + percent + "%'></div></div>" +
      "<p>" + msg + "</p>";
  });
}


let contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let topic = document.getElementById("topic").value;
    let message = document.getElementById("message").value.trim();

    let nameErr = document.getElementById("nameErr");
    let emailErr = document.getElementById("emailErr");
    let topicErr = document.getElementById("topicErr");
    let msgErr = document.getElementById("msgErr");

    nameErr.innerText = "";
    emailErr.innerText = "";
    topicErr.innerText = "";
    msgErr.innerText = "";

    let valid = true;

    if (name == "") {
      nameErr.innerText = "Name is required";
      valid = false;
    }
    if (email == "" || !email.includes("@") || !email.includes(".")) {
      emailErr.innerText = "Enter a valid email";
      valid = false;
    }
    if (topic == "") {
      topicErr.innerText = "Select a subject";
      valid = false;
    }
    if (message.length < 10) {
      msgErr.innerText = "Message should be at least 10 characters";
      valid = false;
    }

    if (valid) {
      document.getElementById("thanksName").innerText = name;
      contactForm.style.display = "none";
      document.getElementById("thanks").style.display = "block";
    }
  });
}
