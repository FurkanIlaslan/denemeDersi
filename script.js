const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const row = document.querySelector(".row");
const form = document.querySelector("form");

const apiKey = '2833d555dee3517850f7e12386dc9f3f';

//! Hava durumu kategorileri ve renkleri
const weatherColors = {
  Clear: "#f1c40f", // Açık
  Clouds: "#3498db", // Bulutlu
  Rain: "#2ecc71", // Yağmurlu
  Snow: "#ecf0f1", // Karlı
  Mist: "#95a5a6", // Puslu
  Thunderstorm: "#8e44ad", // Fırtınalı
  Drizzle: "#d35400" // Çiseleyen
};

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let city = searchInput.value;

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

  fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data) {
      console.log(data)

      const cityName = data.city.name;
      const countryName = data.city.country;
      const forecasts = data.list.filter(function(forecast){
        return forecast.dt_txt.includes("12:00:00")
      });

      console.log(forecasts); // array döndüğünün kanıtı.

      row.innerHTML = "";  // Eski içeriği temizleyin yoksa her aramada bir önceki veriler kalır!

      forecasts.forEach(function(veri) {

        // ! İcon fotoğrafları için;
        const weatherIconUrl = `http://openweathermap.org/img/wn/${veri.weather[0].icon}.png`;

        // ! Tarihi formatlamak için;
        const date = new Date(veri.dt_txt);
        const formattedDate = date.toLocaleDateString('tr-TR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          weekday: 'long'
        });

        //! Havanın durumunun baş harfini büyük hale getirmek için;
        const weatherDescription = (veri.weather[0].description)[0].toUpperCase() + (veri.weather[0].description).slice(1);

        //! Hava durumuna göre arka plan rengi belirleme
        const weatherBackgroundColor = weatherColors[veri.weather[0].main];
        // console.log(weatherBackgroundColor);

        row.innerHTML += `
        <div class="col-4">
          <div class="card m-3" style="background-color: ${weatherBackgroundColor}">
            <img src="${weatherIconUrl}" class="card-img-top weather-icon" alt="">
            <div class="card-body">
              <h5 class="card-title custom-font">${cityName},${countryName}</h5>
              <h5 class="card-title">${formattedDate}</h5>
              <p class="card-text">${(veri.main.temp).toFixed(0)}°C</p>
              <p class="card-text">${weatherDescription}</p>
            </div>
          </div>
        </div>
        `;
      });
      searchInput.value = "";
    })
});


