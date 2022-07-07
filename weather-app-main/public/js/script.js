const input = document.querySelector("input");
const form = document.querySelector("form");
const msgOne = document.querySelector("#msg-1");
const msgTwo = document.querySelector("#msg-2");
const container = document.querySelector(".weather");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  container.style.display = "block";
  msgOne.textContent = "Loading...";
  msgTwo.textContent = "";
  const locationInput = input.value;
  console.log(locationInput);

  fetch(`/weather?place=${locationInput}`)
    .then((response) => {
      // console.log(respose);
      return response.json();
    })
    .then((data) => {
      if (data.error) msgOne.textContent = data.error;
      else {
        msgOne.textContent = data.place;
        msgTwo.textContent = `${data.description}. The temperature is ${data.temp.temp}°C but feels like ${data.temp.feels_like}°C.`;
      }
    });
});
