<template>
  <div class="main">
    <div class="windows">
      <div class="mainWindow">
            <div class="weatherHeader">
              <div class="icon"><img v-if="weather && weather.weather && weather.weather[0]" :src="getIconUrl(weather.weather[0].icon)"/></div>
              <!-- <div class="icon">💨</div> -->
              <div class="title">Weather</div>
              <router-link to="/details" class="linkStyle">
                <div class="subtitle">Detailed forecast →</div>
              </router-link>
            </div>
            <div class="weatherInfo">
              <div class="temperature">
                <!-- <span class="tempMain">22°</span>
                <span class="tempSecondary">11°</span> -->
                <span class="tempMain" v-if="weather && weather.main">{{ Math.round(weather.main.temp) }}°</span>
                <span class="tempSecondary" v-if="weather && weather.main">{{ Math.round(weather.main.feels_like) }}°</span>
              </div>
            </div>
            <div class="weatherStats">
              <div class="statPr">
                <div class="label">Pressure</div>
                <div class="value" v-if="weather && weather.main">{{ Math.round(parseInt(weather.main.pressure, 10)* 0.75006375541921) }}</div>
              </div>
              <div class="statVi">
                <div class="label">Visibility</div>
                <div class="value" v-if="weather && weather.visibility">{{ (weather.visibility / 1000).toFixed(1) }}km</div>
              </div>
              <div class="statSL">
                <div class="label">Humidity</div>
                <div class="value" v-if="weather && weather.main">{{ weather.main.humidity }}%</div>
              </div>
            </div>
      </div>
      <div class="extraWindows">
        <div class="windWindow">
          <div class="weatherHeader">
            <!-- <div class="icon">💨</div> -->
            <div class="icon" v-if="this.wind">{{ getWindIcon(this.wind.speed) }}</div>
            <div class="title">Wind</div>
          </div>
          <div class="weatherStats">
            <div class="statWS">
              <div class="label">Speed</div>
              <!-- <div class="value">m/s</div> -->
              <div class="value" v-if="this.wind" >{{ Math.round(this.wind.speed) }} m/s</div>
            </div>
            <div class="statDi">
              <div class="label">Direction</div>
              <!-- <div class="value">N</div> -->
              <div class="value" v-if="this.wind">{{ this.getWindDirection(wind.deg)}}</div>
            </div>
          </div>
        </div>
        <div class="infoWindow">
          <div v-if="activeTab === 'precipation'" class="tab-content">
            <div class="precipationHeader">Upcoming precipitation:</div>
            <div class="precipation">
              <div class="column">
                <div class="timeOfDay" v-if="precipation">{{ this.precipation.list[0].dt_txt.slice(11, 16) }}</div>
                <div class="imgI"><img class="imgInfo" v-if="precipation && precipation.list && precipation.list[0]" :src="getIconUrl(precipation.list[0].weather[0].icon)"/></div>
                <div class="valueP" v-if="precipation">{{ this.precipation.list[0].pop * 100 }}%</div>
                <!-- <img src="../assets/precipitation.png" alt=""> -->
              </div>
              <div class="line"></div>
              <div class="column">
                <div class="timeOfDay" v-if="precipation">{{ this.precipation.list[2].dt_txt.slice(11, 16) }}</div>
                <div class="imgI"><img class="imgInfo" v-if="precipation && precipation.list && precipation.list[0]" :src="getIconUrl(precipation.list[2].weather[0].icon)"/></div>
                <div class="valueP" v-if="precipation">{{ this.precipation.list[2].pop * 100 }}%</div>
                <!-- <img src="../assets/precipitation.png" alt=""> -->
              </div>
              <div class="line"></div>
              <div class="column">
                <div class="timeOfDay" v-if="precipation">{{ this.precipation.list[4].dt_txt.slice(11, 16) }}</div>
                <div class="imgI"><img class="imgInfo" v-if="precipation && precipation.list && precipation.list[0]" :src="getIconUrl(precipation.list[4].weather[0].icon)"/></div>
                <div class="valueP" v-if="precipation">{{ this.precipation.list[4].pop * 100 }}%</div>
                <!-- <img src="../assets/precipitation.png" alt=""> -->
              </div>
              <div class="line"></div>
              <div class="column">
                <div class="timeOfDay" v-if="precipation">{{ this.precipation.list[6].dt_txt.slice(11, 16) }}</div>
                <div class="imgI"><img class="imgInfo" v-if="precipation && precipation.list && precipation.list[0]" :src="getIconUrl(precipation.list[6].weather[0].icon)"/></div>
                <div class="valueP" v-if="precipation">{{ this.precipation.list[6].pop * 100 }}%</div>
                <!-- <img src="../assets/precipitation.png" alt=""> -->
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'sun'" class="tab-content">
            <img src="../assets/sun_and_moon.png" alt="" class="icon">
            <div class="progress-window">
              <div class="header" v-if="weather">
                {{ getCityTime() }}
              </div>
              <div class="progress-bar" v-if="weather">
                <div class="progress" :style="{ width: getProgress + '%' }"></div>
              </div>
              <div class="times">
                <div v-if="weather && weather.sys">Sunrise: {{ formatTime(weather.sys.sunrise)}} </div>
                <div v-if="weather && weather.sys">Sunset: {{ formatTime(weather.sys.sunset)}}</div>
              </div>
            </div>
          </div>
          <div class="tabs">
            <button :class="{ active: activeTab === 'precipation' }" @click="activeTab = 'precipation'"><img src="../assets/precipitation.png" alt=""></button>
            <button :class="{ active: activeTab === 'sun' }" @click="activeTab = 'sun'"><img src="../assets/sun-moon.png" alt=""></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  props: {
    selectedCity: {
      type: String,
      required: true,
    },
  },
  data(){
    return{
      isDataLoaded: false,
      progress: 100,
      curCity: "",
      weather: null,
      wind: null,
      precipation: null,
      lastRequestTime: 0,
      cache: {},
      rateLimit: 1000,
      activeTab: "sun",
      lat: null,
      lon: null
    }
  },
  mounted(){
    // const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
    if( this.selectedCity == "Moscow"){
      this.getWeatherInMoscow()
    } else{
      this.getWeatherInCity()
    }
  },
  computed: {
    getProgress() {
      const now = new Date();
      const timeNow = new Date(now.getTime()+this.weather.timezone*1000-10800000);
      const currentTimeMs = timeNow.getHours() * 3600000 + timeNow.getMinutes() * 60000;
      if(!this.isDataLoaded){
        console.log("error")
        return 0
      }
      const sunriseMs = this.timeToMs(this.weather.sys.sunrise+this.weather.timezone-10800);
      const sunsetMs = this.timeToMs(this.weather.sys.sunset+this.weather.timezone-10800);
      if (currentTimeMs <= sunriseMs) return 0;
      if (currentTimeMs >= sunsetMs) return 100;
      const totalDayTime = sunsetMs - sunriseMs;
      const timeSinceSunrise = currentTimeMs - sunriseMs;
      return Math.round((timeSinceSunrise / totalDayTime) * 100);
    },
  },
  watch: {
    selectedCity(newCity) {
      if (newCity) {
        this.getWeatherInCity();
      }
    },
  },
  methods: {
    getCityTime() {
      const now = new Date();
      const cityOffset = this.weather.timezone * 1000; 
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
      const cityTime = new Date(utcTime + cityOffset);

      const hours = String(cityTime.getHours()).padStart(2, '0');
      const minutes = String(cityTime.getMinutes()).padStart(2, '0');
      const day = cityTime.getDay();
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      return `${days[day]}, ${hours}:${minutes}`;
    },
    timeToMs(time) {
      if (typeof time === "number") {
        const date = new Date(time * 1000);
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        time = `${hours}:${minutes}`;

      }
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 3600000 + minutes * 60000;
    },
    async getWeatherInMoscow() {
      try {
        const apiKey = '2f4252a9daaedcde609f511ba17fb410';
        const cacheKey = "Moscow";
        const currentTime = Date.now();

        if (this.cache[cacheKey] && currentTime - this.cache[cacheKey].timestamp < 10 * 60 * 1000) {
          console.log("Данные из кэша:");
          this.weather = this.cache[cacheKey].data;
          this.wind = this.cache[cacheKey].data.wind;
          this.lat = weatherData.coord.lat;
          this.lon = weatherData.coord.lon;
          this.isDataLoaded = true;
          await this.getСlosestPrecipitation(this.lat, this.lon);
          return;
        }

        if (currentTime - this.lastRequestTime < this.rateLimit) {
          console.log("Ожидание перед запросом...");
          await new Promise((resolve) =>
            setTimeout(resolve, this.rateLimit)
          );
        }

        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=${apiKey}&units=metric`);
        const weatherData = await weatherRes.json();

        if (weatherRes.status === 200 || weatherRes.status === 201) {
          this.weather = weatherData;
          this.wind = weatherData.wind;
          this.lat = weatherData.coord.lat;
          this.lon = weatherData.coord.lon;
          this.isDataLoaded = true;
          this.cache[cacheKey] = {
            data: weatherData,
            timestamp: currentTime,
          };
          console.log("Данные о погоде успешно получены:");
          console.log(this.weather)
          this.lastRequestTime = currentTime;

          await this.getСlosestPrecipitation(this.lat, this.lon);
        } else {
          alert('Ошибка!');
        }
      } 
      catch (error) {
        console.error(error);
      }
    },
    async getWeatherInCity(){
      try {
        const apiKey = '2f4252a9daaedcde609f511ba17fb410';
        const newCity = this.selectedCity || 'Moscow'; // Дефолтный город
        const cacheKey = newCity.toLowerCase();
        const currentTime = Date.now();

        if (this.cache[cacheKey] && currentTime - this.cache[cacheKey].timestamp < 10 * 60 * 1000) {
          console.log("Данные из кэша:");
          this.weather = this.cache[cacheKey].data;
          this.wind = this.cache[cacheKey].data.wind;
          this.lat = data.coord.lat;
          this.lon = data.coord.lon;
          await this.getСlosestPrecipitation(this.lat, this.lon);
          return;
        }

        // Ограничение частоты запросов
        if (this.lastRequestTime && currentTime - this.lastRequestTime < this.rateLimit) {
          console.log("Ожидание перед запросом...");
          await new Promise((resolve) => setTimeout(resolve, this.rateLimit));
        }
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`)
        const data = await res.json()
        if (res.status === 200 || res.status === 201){
            this.weather = data
            this.wind = data.wind
            this.lat = data.coord.lat;
            this.lon = data.coord.lon;
            this.isDataLoaded = true
            this.cache[cacheKey] = {
              data: data,
              timestamp: currentTime,
            };
            console.log(`Данные для ${newCity} успешно получены:`, this.weather);
            this.lastRequestTime = currentTime;
            await this.getСlosestPrecipitation(this.lat, this.lon);
        } else{
            alert('Ошибка!')
        }
      } catch (error) {
          console.error(error)
      }
    },
    // async getDailyPrecipitation(lat, lon) {
    //   try {
    //     const curLat = lat;
    //     const curLon = lon;
    //     const apiKey = '2f4252a9daaedcde609f511ba17fb410';
    //     const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${curLat}&lon=${curLon}&appid=${apiKey}&units=metric`;
    //     // const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${curLat}&lon=${curLon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;
    //     const response = await fetch(url);
    //     if (!response.ok) {
    //       // Статус ответа не в пределах 200-299
    //       const errorDetails = await response.text();
    //       throw new Error(`Ошибка запроса. Статус: ${response.status}. ${errorDetails}`);
    //     }
    //     const data = await response.json();
    //     if (!data.daily || !data.daily[0] || data.daily[0].pop === undefined) {
    //       throw new Error('Не удалось получить данные о вероятности осадков.');
    //     }
    //     if (response.status === 200 || response.status === 201) {
    //       this.dailyPrecipitation = data;
    //       console.log(`Вероятность осадков сегодня: ${this.dailyPrecipitation}%`);
    //     } else {
    //       console.error("Ошибка получения вероятности осадков.");
    //     }
    //   } catch (error) {
    //     if (error.message.includes("Ошибка запроса")) {
    //       // Ошибка с запросом, например, неверный API-ключ или лимит запросов
    //       console.error("Проблема с запросом: ", error.message);
    //       alert("Произошла ошибка с запросом. Пожалуйста, проверьте API-ключ или повторите попытку позже.");
    //     } else if (error.message.includes("Не удалось получить данные")) {
    //       // Проблемы с получением данных
    //       console.error("Данные о вероятности осадков не найдены: ", error.message);
    //       alert("Не удалось получить данные о вероятности осадков. Пожалуйста, проверьте координаты.");
    //     } else {
    //       // Другие непредвиденные ошибки
    //       console.error("Произошла непредвиденная ошибка: ", error);
    //       alert("Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже.");
    //     }
    //   }
    // },
    async getСlosestPrecipitation(lat, lon) {
      const apiKey = '2f4252a9daaedcde609f511ba17fb410';
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(`Ошибка запроса. Статус: ${response.status}. ${errorDetails}`);
        }

        const data = await response.json();
        console.log(data)
        this.precipation = data
      } catch (error) {
        if (error.message.includes('Ошибка запроса')) {
          console.error('Проблема с запросом:', error.message);
          alert('Произошла ошибка с запросом. Пожалуйста, проверьте API-ключ или повторите попытку позже.');
        } else if (error.message.includes('Не удалось получить данные')) {
          console.error('Данные о вероятности осадков не найдены:', error.message);
          alert('Не удалось получить данные о вероятности осадков. Пожалуйста, проверьте координаты.');
        } else {
          console.error('Произошла непредвиденная ошибка:', error);
          alert('Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже.');
        }
      }
    }, 
    getIconUrl(code) {
      return `https://openweathermap.org/img/wn/${code}.png`;
    },
    getWindDirection(deg) {
      const directions = ["North", "Northeast", "East", "Southeast", "South", "Southwest", "West", "Northwest"];
      return directions[Math.round(deg / 45) % 8];
    },
    getWindIcon(windSpeed) {
      if (windSpeed < 1) {
          return "🍃";
      } else if (windSpeed < 5) {
          return "🪁";
      } else if (windSpeed < 10) {
          return "💨";
      } else if (windSpeed < 15) {
          return "🌪️";
      } else {
          return "🌀";
      }
    },
    formatTime(time) {
      const date = new Date((time + this.weather.timezone - 10800) * 1000);
      return date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  }
} 
//https://api.openweathermap.org/data/2.5/weather?q=London&appid=530a346f6711fc2b66943649afb7baf3&units=metric
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Nunito:wght@200;300;400;600;700;800;900&display=swap');
.main{
  font-family: 'Nunito', sans-serif;
  width: 100%;
  height: 81vh;
  padding-top: 19vh;
  overflow-y: auto;
  background-color: #F5F5F5;
}

.main .windows{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 40px;
  width: 90%;
  margin: 0px auto;
  max-width: 1700px;
  overflow-x: hidden;
  margin-bottom: 40px;
}

.mainWindow{
  display: flex;
  flex-direction: column;
  padding: 20px 20px 10px 20px;
  color: #333;
  text-align: center;
  height: 60vh;
  max-height: 60vh;
  width: 50%;
  border-radius: 20px;
  background-image: url('../assets/main.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.mainWindow .weatherHeader .icon{
  max-height: 40px;
}

.mainWindow .weatherHeader .icon img{
  width: 45px;
  height: 45px;
}

.extraWindows{
  display: flex;
  flex-direction: column;
  gap: 35px;
  width: 30%; 
}

.windWindow{
  display: flex;
  flex-direction: column;
  font-family: 'Nunito', sans-serif;
  text-align: center;
  font-size: 19px;
  font-weight: 800;
  color: #f5f5f5;
  min-height: 25vh;
  height: 30vh;
  max-height: 58vh;
  border-radius: 20px;
  background-image: url('../assets/wind1.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.windWindow .weatherHeader .icon{
  height: 30px;
  font-size: 25px;
  margin: 0px auto;
}
.windWindow .weatherHeader .title{
  height: 40px;
  font-size: 30px;
  margin-bottom: auto;
}

.windWindow .weatherHeader{
  flex-grow: 1;
  height: 75px;
  margin-top: 30px;
  margin-bottom: auto;
}

.windWindow .weatherStats{
  font-size: 14px;
  color: #535353;
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 10px;
  gap: 10px;
}

.windWindow .weatherStats .statWS {
  font-weight: 700;
  background: #f3f4f6;
  border-radius: 13px;
  padding: 10px;
  width: 30%;
  text-align: center;
}

.windWindow .weatherStats .statDi {
  font-weight: 700;
  /* height: 32px; */
  background-color: #f3f4f6;
  border-radius: 13px;
  padding: 10px;
  width: 30%;
  text-align: center;
}

.infoWindow{
  display: flex;
  flex-direction: column;
  min-height: 25vh;
  height: 30vh;
  max-height: 58vh;
  border-radius: 20px;
  background-color: #c3e9d572;;
  /* background-image: url('../assets/humidity.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */
}

.linkStyle{
    text-decoration:none;
}
@media (max-width: 900px) {
  .main{
    padding-top: 16vh;
    height: auto
  }
  .main .windows .mainWindow .weatherHeader {
    margin-top: 20px;
    margin-bottom: auto;
  }

  .mainWindow {
    flex: 1 1 100%;
    height: 50vh;
  }
  
  .main .windows{
    max-width: 500px;
    gap: 35px;
  }
  .extraWindows {
    flex: 1 1 100%;
  }
  .extraWindows .windWindow{
    height: 50vh;
  }
  .windWindow{
    padding: 20px 20px 10px 20px;
    
  }
  .windWindow .weatherHeader{
    height: 65px;
    margin-top: 95px;
    margin-bottom: auto;
  }
  .windWindow .weatherHeader .icon{
    font-size: 30px;
    margin-bottom: 10px;
  }
  .windWindow .weatherStats{
    margin-bottom: 0px;
  }
  .extraWindows .infoWindow{
    height: 50vh;
    padding: 20px 20px 10px 20px !important;
  }
  .precipationHeader{
    margin: 20px 0px !important;
    font-size: 30px !important;
  }
  .infoWindow .tab-content .icon{
    height: 45px !important; 
    width: 45px !important;
    margin: 20px auto !important;
  }

  .infoWindow .tab-content .progress-window{
    margin: 7px 15px
  }

  .infoWindow .tab-content .progress-window .header{
    font-size: 30px;
    margin: 30px 0px;
  }

  .times{
    font-size: 17px !important;
  }

  .tab-content .precipation{
    margin-top: 15px !important;
  }

  .tab-content .precipation .column{
    font-weight: 700 !important;
    margin: 0px 7px !important;
  }

  .tab-content .precipation .column div{
    font-size: 21px !important;
    margin: 5px 0px;
  }
  .tab-content .precipation .column img{
    height: 40px;
    width: 40px;
  }
}

@media (max-width: 720px) {
  .main{
    padding-top: 15vh;
  }
  .main .windows .mainWindow .weatherHeader {
    margin-top: 0px;
    margin-bottom: auto;
  }
  .main .windows .mainWindow .weatherInfo .tempMain {
    font-size: 34px;
    font-weight: 700;
    color: #3a3a3a;
  }

  .main .windows .mainWindow .weatherInfo .tempSecondary {
    font-size: 18px;
    color: #3a3a3a;
  }
  .main .windows .mainWindow .weatherHeader .icon{
    margin-top: 0px;
  }
  
  .main .windows{
    max-width: 400px;
    gap: 35px;
  }
  .mainWindow {
    height: 40vh;
  }
  .extraWindows .windWindow {
    height: 40vh;
  }
  .extraWindows .windWindow .weatherHeader{
    margin-top: 45px;
  }
  
  .extraWindows .infoWindow{
    height: 40vh;
  }
  .main .windows .mainWindow .weatherStats .statPr{
    font-size: 15px;
  }
  .main .windows .mainWindow .weatherStats .statVi{
    font-size: 15px;
  }
  .main .windows .mainWindow .weatherStats .statSL{
    font-size: 15px;
  }
  .precipationHeader{
    margin: 0px 0px 18px 0px!important;
    font-size: 27px !important;
  }
  .infoWindow .tab-content .icon{
    height: 40px !important; 
    width: 40px !important;
    margin: 15px auto !important;
  }

  .infoWindow .tab-content .progress-window{
    margin: 0px 15px
  }

  .infoWindow .tab-content .progress-window .header{
    font-size: 27px;
    margin: 20px 0px;
  }
  .times{
    font-size: 15px !important;
  }

  .tab-content .precipation{
    margin-top: 0px !important;
    margin-bottom: 0px !important;
  }

  .tab-content .precipation .column{
    font-weight: 700 !important;
    margin: 0px 3px !important;
  }

  .tab-content .precipation .column div{
    font-size: 17.5px !important;
    margin: 0px;
  }
}

@media (max-width: 520px) {
  .main{
    padding-top: 14vh; 
  }
  .main .windows .mainWindow .weatherHeader {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .main .windows .mainWindow .weatherInfo{
    margin-bottom: 5px;
  }
  .mainWindow .weatherInfo .cloud span{
    font-size: 13px;
  }
  .main .windows .mainWindow .weatherInfo .tempMain {
    font-size: 27px;
    font-weight: 700;
    color: #3a3a3a;
  }
  .main .windows .mainWindow .weatherInfo .tempSecondary {
    font-size: 18px;
    color: #3a3a3a;
  }
  .main .windows .mainWindow .weatherHeader {
    margin-top: 0px;
    margin-bottom: auto;
  }
  .main .windows .mainWindow .weatherHeader .icon{
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .main .windows .mainWindow .weatherHeader .title{
    font-size: 27px;
  }
  .main .windows .mainWindow .weatherHeader .subtitle{
    font-size: 17px;
  }
  .main .windows .mainWindow .weatherStats .statPr{
    padding: 6px;
    font-size: 13px;
  }
  .main .windows .mainWindow .weatherStats .statVi{
    padding: 6px;
    font-size: 13px;
  }
  .main .windows .mainWindow .weatherStats .statSL{
    padding: 6px;
    font-size: 13px;
  }

  .main .windows{
    max-width: 350px;
    gap: 35px;
  }
  .mainWindow {
    height: 30vh;
  }
  .extraWindows .windWindow {
    height: 30vh;
  }
  .extraWindows .windWindow .weatherHeader{
    margin-top: 30px;
  }
  .extraWindows .windWindow .weatherHeader .title{
    font-size: 27px;
  }
  .extraWindows .windWindow .weatherHeader .icon{
    margin-bottom: 5px;
    font-size: 27px;
  }

  .extraWindows .windWindow .weatherStats .statWS{
    font-weight: 600;
    font-size: 13px;
  }

  .extraWindows .windWindow .weatherStats .statDi{
    font-weight: 600;
    font-size: 13px;
  }

  .extraWindows .infoWindow{
    height: 30vh;
  }
  .precipationHeader{
    margin: 0px 0px 7px 0px!important;
    font-size: 24px !important;
  }
  .infoWindow .tab-content{
    margin-top: 0px !important;
  }

  .infoWindow .tab-content .icon{
    height: 33px !important; 
    width: 33px !important;
    margin: 10px auto !important;
  }

  .infoWindow .tab-content .progress-window{
    margin: 0px 15px !important;
  }

  .infoWindow .tab-content .progress-window .header{
    font-size: 24px !important;
    margin: 10px 0px !important;
  }

  .times{
    font-size: 14px !important;
  }

  .tab-content .precipation{
    margin-top: 8px !important;
  }

  .tab-content .precipation .column{
    font-weight: 600 !important;
    margin: 0px 3px !important;
    padding: 4px 0px !important;
  }

  .tab-content .precipation .column div{
    font-size: 15.3px !important;
    margin: 2px 0px !important;
  }

}

@media (max-width: 450px) {
  .main .windows .mainWindow .weatherHeader {
    margin-top: 0px;
    margin-bottom: auto;
  }
  .main .windows .mainWindow .weatherInfo {
    margin-bottom: 0px;
  }
  .main .windows .mainWindow .weatherInfo .tempMain {
    font-size: 23px;
    font-weight: 700;
    color: #3a3a3a;
  }
  .main .windows .mainWindow .weatherInfo .tempSecondary {
    font-size: 16px;
    color: #3a3a3a;
  }
  .main .windows .mainWindow .weatherHeader .icon{
    font-size: 28px;
    margin-bottom: 0px;
  }
  .main .windows .mainWindow .weatherHeader .title{
    font-size: 24px;
  }
  .main .windows .mainWindow .weatherHeader .subtitle{
    font-size: 15px;
  }
  .main .windows .mainWindow .weatherStats{
    margin-top: 0px;
  }
  .main{
    padding-top: 13vh;
  }
  .main .windows{
    max-width: 300px;
    gap: 35px;
  }
  .mainWindow {
    height: 27vh;
  }
  .extraWindows .windWindow {
    height: 27vh;
  }
  .extraWindows .windWindow .weatherStats{
    margin-top: 17px;
  }
  .extraWindows .windWindow .weatherHeader{
    margin-top: 20px;
  }
  .extraWindows .windWindow .weatherHeader .title{
    font-size: 24px;
  }
  .extraWindows .windWindow .weatherHeader .icon{
    margin-bottom: 0px;
    font-size: 24px;
  }
  .extraWindows .infoWindow{
    height: 27vh;
  }
  .precipationHeader{
    margin: 0px 0px 7px 0px!important;
    font-size: 22px !important;
  }
  .infoWindow .tab-content .icon{
    height: 25px !important; 
    width: 25px !important;
    margin: 0px auto !important;
  }

  .infoWindow .tab-content .progress-window{
    margin: 0px 15px !important;
  }

  .infoWindow .tab-content .progress-window .header{
    font-size: 20px !important;
    margin: 15px 0px !important;
  }

  .tabs{
    margin-bottom: 0px !important;
  }

  .times{
    font-size: 12px !important;
  }

  .tabs button{
    border-radius: 7px !important;
    margin: 3px !important;
    padding: 5px !important;
  }

  .tabs button img{
    height: 17px !important;
    width: 17px !important;
  }

  .tab-content .precipation{
    margin-top: 5px !important;
  }

  .tab-content .precipation .column{
    font-weight: 500 !important;
    margin: 0px 2px !important;
  }

  .tab-content .precipation .column div{
    font-size: 13.3px !important;
    margin: 2px 0px !important;
  }

}


@media (max-width: 380px) {
  .main{
    padding-top: 11vh;
  }
  .main .windows .mainWindow .weatherHeader {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .main .windows .mainWindow .weatherInfo {
    margin-bottom: 0px;
  }
  .main .windows .mainWindow .weatherInfo .tempMain {
    font-size: 20px;
    font-weight: 700;
    color: #3a3a3a;
  }
  .main .windows .mainWindow .weatherInfo .tempSecondary {
    font-size: 14px;
    color: #3a3a3a;
  }
  .main .windows .mainWindow .weatherHeader .icon{
    font-size: 25px;
    margin-bottom: 0px;
  }
  .main .windows .mainWindow .weatherHeader .title{
    font-size: 22px;
  }
  .main .windows .mainWindow .weatherHeader .subtitle{
    font-size: 14px;
  }
  .main .windows .mainWindow .weatherStats .statPr{
    font-size: 11px;
  }
  .main .windows .mainWindow .weatherStats .statVi{
    font-size: 11px;
  }
  .main .windows .mainWindow .weatherStats .statSL{
    font-size: 11px;
  }
  .main .windows{
    max-width: 260px;
    gap: 35px;
  }
  .mainWindow {
    height: 24vh;
  }
  .extraWindows .windWindow {
    height: 24vh;
  }
  .extraWindows .windWindow .weatherHeader{
    margin-top: 30px;
  }
  .extraWindows .windWindow .weatherHeader .title{
    font-size: 22px;
  }
  .extraWindows .windWindow .weatherHeader .icon{
    margin-bottom: 5px;
    font-size: 22px;
  }

  .extraWindows .windWindow .weatherStats .statWS{
    font-weight: 600;
    font-size: 11px;
  }

  .extraWindows .windWindow .weatherStats .statDi{
    font-weight: 600;
    font-size: 11px;
  }
  .extraWindows .windWindow .weatherHeader{
    margin-top: 20px;
  }
  .extraWindows .infoWindow{
    height: 24vh;
  }
  .precipationHeader{
    margin: 0px 0px 5px 0px!important;
    font-size: 19px !important;
  }
  .infoWindow .tab-content .icon{
    height: 25px !important; 
    width: 25px !important;
    margin: 6px auto !important;
  }

  .infoWindow .tab-content .progress-window{
    margin: 0px 15px !important;
  }

  .infoWindow .tab-content .progress-window .header{
    font-size: 20px !important;
    margin: 15px 0px !important;
  }

  .tabs{
    margin-bottom: 0px !important;
  }

  .times{
    font-size: 10px !important;
  }

  .tabs button{
    margin: 2px !important;
    padding: 4px !important;
  }

  .tabs button img{
    height: 15px !important;
    width: 15px !important;
  }

  .tab-content .precipation{
    margin-top: 3px !important;
  }

  .tab-content .precipation .column{
    font-weight: 500 !important;
    margin: 0px 3px !important;
  }

  .tab-content .precipation .column div{
    font-size: 11px !important;
    margin: 2px 0px !important;
  }
  .tab-content .precipation .column .imgI img{
    height: 32px;
    width: 32px;
  }
}

.mainWindow .weatherHeader {
  margin-top: 40px;
  margin-bottom: auto;
}

.mainWindow .weatherHeader .icon {
  margin-top: 20px;
  font-size: 46px;
  margin-bottom: 10px;
}

.mainWindow .weatherHeader .title {
  font-size: 30px;
  font-weight: 800;
  color: #3a3a3a;
}

.mainWindow .weatherHeader .subtitle {
  font-size: 20px;
  font-weight: 600;
  color: #3e3e3e;
}

/* Информация о погоде */
.mainWindow .weatherInfo {
  margin-bottom: 20px;
  flex-grow: 1;
}

.mainWindow .weatherInfo .temperature {
  max-height: 60px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 10px;
}

.mainWindow .weatherInfo .tempMain {
  font-size: 48px;
  font-weight: 700;
  color: #3a3a3a;
}

.mainWindow .weatherInfo .tempSecondary {
  font-size: 20px;
  color: #3a3a3a;
}

.mainWindow .weatherInfo .condition {
  font-size: 16px;
  color: #6b7280;
  margin-top: 10px;
}

/* Статистика погоды */
.mainWindow .weatherStats {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  gap: 10px;
  margin-bottom: 10px;
}

.mainWindow .weatherStats .statPr {
  background: #212d45;
  color: #fff;
  border-radius: 13px;
  padding: 10px;
  width: 30%;
  text-align: center;
}
.mainWindow .weatherStats .statVi {
  background: #76e14f;
  border-radius: 13px;
  padding: 10px;
  width: 30%;
  text-align: center;
}
.mainWindow .weatherStats .statSL {
  background: #f3f4f6;
  border-radius: 13px;
  padding: 10px;
  width: 30%;
  text-align: center;
}
.tabs{
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
}
.precipationHeader{
  text-align: center;
  width: 100%;
  margin: 5px 0px;
  font-weight: 700;
  font-size: 18px
}
.tab-content{
  flex-grow: 1;
  /* background-color: #ffffffd6; */
  margin-top: 5px;
  border-radius: 10px
}
.tab-content .precipation{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.tab-content .precipation .column{
  flex: 1;
  text-align: center;
  color: #333;
  /* border-right: 2px solid #ddd; */
  border-radius: 5px;
  margin: 0px 5px;
  /* background-color: #e0ede0; */
  /* background-color: #e3eed6; */
  /* background-color: #eeeacb; */
  /* background: linear-gradient(rgba(139, 70, 69, 0.2), rgba(139, 70, 69, 0.2)); */
  font-family: 'Nunito', sans-serif;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 0px;
}

.tab-content .precipation .line{
  width: 1px;
  background-color: #aeaeae;
  align-self: stretch;
}

.tab-content .precipation > .column {
  flex: 1;
}

.tab-content .precipation > .line {
  flex-grow: 0;
}

.tab-content .precipation .column .timeOfDay{
  margin-top: 5px;
  margin-bottom: 3px;
}

.tab-content .precipation .column .valueP{
  margin-top: 0px;
}

.tab-content .precipation .column img{
  height: 35px;
  width: 35px;
}

.tabs{
  margin-bottom: 5px;
}

.tabs button{
  cursor: pointer;
  background-color: #d3e0c6;
  /* background-color: #ffcbc3ec; */
  border: 0;
  border-radius: 12px;
  margin: 5px;
  padding: 7px
}
.tabs .active{
  background-color: #96c1bb;
  /* background-color: #e58785a8; */
}
.tabs button img{
  width: 20px;
  height: 20px;
}

.sun-moon{
  display: flex;
  justify-content: space-around;
  background: linear-gradient(to bottom left, #002244, #87CEFA);
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  width: 80%;
  height: 60%;
  font-family: 'Nunito', sans-serif;
  margin: 0 auto;
}

.sunTime{
  text-align: center;
  display: flex;
  justify-content: space-around;
  margin: 25px 0px;
}

.progress-window {
  font-family: 'Nunito', sans-serif;
  text-align: center;
  margin: 0px 10px;
}
.header {
  font-family: 'Nunito', sans-serif;
  font-size: 21px;
  margin-bottom: 15px;
  font-weight: 700;
}
.progress-bar {
  background-color: #ddd;
  height: 10px;
  border-radius: 5px;
  overflow: hidden;
}
.progress {
  background-color: #f39c12;
  /* background-color: #12f368; */
  height: 100%;
  transition: width 0.5s ease;
}
.times {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 14px;
  font-weight: 600;
  color: #555;
}
.infoWindow .tab-content .icon{
  height: 30px;
  width:30px;
  margin: 15px auto 0px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
