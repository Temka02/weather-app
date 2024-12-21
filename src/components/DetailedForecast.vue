<template>
    <div class="main">
      <div class="dayWindows" v-if="detailedWeather && isDayNow()">
        <div class="card clearSky" v-if="detailedWeather && detailedWeather.clouds.all <= 10">
          <div class="header">
            <div v-if="detailedWeather" class="extraTempInfo">It's {{getCityTime()}}, {{ detailedWeather.name }}</div>
          </div>
          <div class="mainInfo">
            <div class="tempMain" v-if="detailedWeather && detailedWeather.main">
              <h1>{{ Math.round(detailedWeather.main.temp) }}°C</h1>
              <img v-if="detailedWeather && detailedWeather.weather && detailedWeather.weather[0]" :src="getIconUrl(detailedWeather.weather[0].icon)"/> 
            </div>
            <div class="otherInfo" v-if="detailedWeather && detailedWeather.main">
              <div v-if="detailedWeather && detailedWeather.weather && detailedWeather.weather[0]">{{ detailedWeather.weather[0].description.charAt(0).toUpperCase() + detailedWeather.weather[0].description.slice(1) }}</div>
              <div>Feels like {{ Math.round(detailedWeather.main.feels_like) }}°C</div>
            </div>
          </div>
          <div class="extraInfo">
            <div class="field" v-if="detailedWeather">
              <img src="../assets/windIcon1.png" alt="windIcon">
              <div>{{detailedWeather.wind.speed}}m/s</div>
            </div>
            <div class="field" v-if="detailedWeather">
              <img src="../assets/dropIcon2.png" alt="">
              <div>{{detailedWeather.main.humidity}}%</div>
            </div>
            <div class="field" v-if="detailedWeather">
              <img src="../assets/barometerIcon.png" alt="">
              <div>{{Math.round(parseInt(detailedWeather.main.pressure, 10)* 0.75006375541921)}}mmHg</div>
            </div>
          </div>
          <hr class="line">
          <div class="footer" v-if="this.forecastList && this.forecastList.length > 0">
            <button
              class="btn"
              @click="prevItem"
              :disabled="currentStart === 0">
              ←
            </button>
            <div class="hourlyForecast">
              <div 
                class="forecastCard" 
                v-for="(item, index) in visibleForecast" 
                :key="index">
                <div>{{ item.time.slice(11, 16) }}</div>
                <img :src="'https:' + item.condition.icon" alt="Weather Icon" />
                <div>{{ Math.round(item.temp_c) }}°C</div>
              </div>
            </div>
            <button 
              class="btn" 
              @click="nextItem" 
              :disabled="currentStart + itemsPerPage >= forecastList.length">
              →
            </button>
          </div>
        </div>
        <div class="card fewClouds" v-if="detailedWeather && detailedWeather.clouds.all > 10 && detailedWeather.clouds.all <= 35">
          <div class="header">
            <div v-if="detailedWeather" class="extraTempInfo">It's {{getCityTime()}}, {{ detailedWeather.name }}</div>
          </div>
          <div class="mainInfo">
            <div class="tempMain" v-if="detailedWeather && detailedWeather.main">
              <h1>{{ Math.round(detailedWeather.main.temp) }}°C</h1>
              <img v-if="detailedWeather && detailedWeather.weather && detailedWeather.weather[0]" :src="getIconUrl(detailedWeather.weather[0].icon)"/> 
            </div>
            <div class="otherInfo" v-if="detailedWeather && detailedWeather.main">
              <div v-if="detailedWeather && detailedWeather.weather && detailedWeather.weather[0]">{{ detailedWeather.weather[0].description.charAt(0).toUpperCase() + detailedWeather.weather[0].description.slice(1) }}</div>
              <div>Feels like {{ Math.round(detailedWeather.main.feels_like) }}°C</div>
            </div>
          </div>
          <div class="extraInfo">
            <div class="field" v-if="detailedWeather">
              <img src="../assets/windIcon1.png" alt="windIcon">
              <div>{{detailedWeather.wind.speed}}m/s</div>
            </div>
            <div class="field" v-if="detailedWeather">
              <img src="../assets/dropIcon2.png" alt="">
              <div>{{detailedWeather.main.humidity}}%</div>
            </div>
            <div class="field" v-if="detailedWeather">
              <img src="../assets/barometerIcon.png" alt="">
              <div>{{Math.round(parseInt(detailedWeather.main.pressure, 10)* 0.75006375541921)}}mmHg</div>
            </div>
          </div>
          <hr class="line">
          <div class="footer" v-if="this.forecastList && this.forecastList.length > 0">
            <button
              class="btn"
              @click="prevItem"
              :disabled="currentStart === 0">
              ←
            </button>
            <div class="hourlyForecast">
              <div 
                class="forecastCard" 
                v-for="(item, index) in visibleForecast" 
                :key="index">
                <div>{{ item.time.slice(11, 16) }}</div>
                <img :src="'https:' + item.condition.icon" alt="Weather Icon" />
                <div>{{ Math.round(item.temp_c) }}°C</div>
              </div>
            </div>
            <button 
              class="btn" 
              @click="nextItem" 
              :disabled="currentStart + itemsPerPage >= forecastList.length">
              →
            </button>
          </div>
        </div>
        <div class="card clouds" v-if="detailedWeather && detailedWeather.clouds.all > 35 && detailedWeather.clouds.all <= 70">
          <div class="header">
            <div v-if="detailedWeather" class="extraTempInfo">It's {{getCityTime()}}, {{ detailedWeather.name }}</div>
          </div>
          <div class="mainInfo">
            <div class="tempMain" v-if="detailedWeather && detailedWeather.main">
              <h1>{{ Math.round(detailedWeather.main.temp) }}°C</h1>
              <img v-if="detailedWeather && detailedWeather.weather && detailedWeather.weather[0]" :src="getIconUrl(detailedWeather.weather[0].icon)"/> 
            </div>
            <div class="otherInfo" v-if="detailedWeather && detailedWeather.main">
              <div v-if="detailedWeather && detailedWeather.weather && detailedWeather.weather[0]">{{ detailedWeather.weather[0].description.charAt(0).toUpperCase() + detailedWeather.weather[0].description.slice(1) }}</div>
              <div>Feels like {{ Math.round(detailedWeather.main.feels_like) }}°C</div>
            </div>
          </div>
          <div class="extraInfo">
            <div class="field" v-if="detailedWeather">
              <img src="../assets/windIcon1.png" alt="windIcon">
              <div>{{detailedWeather.wind.speed}}m/s</div>
            </div>
            <div class="field" v-if="detailedWeather">
              <img src="../assets/dropIcon2.png" alt="">
              <div>{{detailedWeather.main.humidity}}%</div>
            </div>
            <div class="field" v-if="detailedWeather">
              <img src="../assets/barometerIcon.png" alt="">
              <div>{{Math.round(parseInt(detailedWeather.main.pressure, 10)* 0.75006375541921)}}mmHg</div>
            </div>
          </div>
          <hr class="line">
          <div class="footer" v-if="this.forecastList && this.forecastList.length > 0">
            <button
              class="btn"
              @click="prevItem"
              :disabled="currentStart === 0">
              ←
            </button>
            <div class="hourlyForecast">
              <div 
                class="forecastCard" 
                v-for="(item, index) in visibleForecast" 
                :key="index">
                <div>{{ item.time.slice(11, 16) }}</div>
                <img :src="'https:' + item.condition.icon" alt="Weather Icon" />
                <div>{{ Math.round(item.temp_c) }}°C</div>
              </div>
            </div>
            <button 
              class="btn" 
              @click="nextItem" 
              :disabled="currentStart + itemsPerPage >= forecastList.length">
              →
            </button>
          </div>
        </div>
        <div class="card overcastClouds" v-if="detailedWeather && detailedWeather.clouds.all > 70">
          <div class="header">
            <div v-if="detailedWeather" class="extraTempInfo">It's {{getCityTime()}}, {{ detailedWeather.name }}</div>
          </div>
          <div class="mainInfo">
            <div class="tempMain" v-if="detailedWeather && detailedWeather.main">
              <h1>{{ Math.round(detailedWeather.main.temp) }}°C</h1>
              <img v-if="detailedWeather && detailedWeather.weather && detailedWeather.weather[0]" :src="getIconUrl(detailedWeather.weather[0].icon)"/> 
            </div>
            <div class="otherInfo" v-if="detailedWeather && detailedWeather.main">
              <div v-if="detailedWeather && detailedWeather.weather && detailedWeather.weather[0]">{{ detailedWeather.weather[0].description.charAt(0).toUpperCase() + detailedWeather.weather[0].description.slice(1) }}</div>
              <div>Feels like {{ Math.round(detailedWeather.main.feels_like) }}°C</div>
            </div>
          </div>
          <div class="extraInfo">
            <div class="field" v-if="detailedWeather">
              <img src="../assets/windIcon1.png" alt="windIcon">
              <div>{{detailedWeather.wind.speed}}m/s</div>
            </div>
            <div class="field" v-if="detailedWeather">
              <img src="../assets/dropIcon2.png" alt="">
              <div>{{detailedWeather.main.humidity}}%</div>
            </div>
            <div class="field" v-if="detailedWeather">
              <img src="../assets/barometerIcon.png" alt="">
              <div>{{Math.round(parseInt(detailedWeather.main.pressure, 10)* 0.75006375541921)}}mmHg</div>
            </div>
          </div>
          <hr class="line">
          <div class="footer" v-if="this.forecastList && this.forecastList.length > 0">
            <button
              class="btn"
              @click="prevItem"
              :disabled="currentStart === 0">
              ←
            </button>
            <div class="hourlyForecast">
              <div 
                class="forecastCard" 
                v-for="(item, index) in visibleForecast" 
                :key="index">
                <div>{{ item.time.slice(11, 16) }}</div>
                <img :src="'https:' + item.condition.icon" alt="Weather Icon" />
                <div>{{ Math.round(item.temp_c) }}°C</div>
              </div>
            </div>
            <button 
              class="btn" 
              @click="nextItem" 
              :disabled="currentStart + itemsPerPage >= forecastList.length">
              →
            </button>
          </div>
        </div>
      </div>
      <div class="nightWindows" v-else>
        <div class="card clearSky" v-if="detailedWeather && detailedWeather.clouds.all <= 18">
          <div class="header">
            <div v-if="detailedWeather" class="extraTempInfo">It's {{getCityTime()}}, {{ detailedWeather.name }}</div>
          </div>
          <div class="mainInfo">
            <div class="tempMain" v-if="detailedWeather && detailedWeather.main">
              <h1>{{ Math.round(detailedWeather.main.temp) }}°C</h1>
              <img v-if="detailedWeather && detailedWeather.weather && detailedWeather.weather[0]" :src="getIconUrl(detailedWeather.weather[0].icon)"/> 
            </div>
            <div class="otherInfo" v-if="detailedWeather && detailedWeather.main">
              <div v-if="detailedWeather && detailedWeather.weather && detailedWeather.weather[0]">{{ detailedWeather.weather[0].description.charAt(0).toUpperCase() + detailedWeather.weather[0].description.slice(1) }}</div>
              <div>Feels like {{ Math.round(detailedWeather.main.feels_like) }}°C</div>
            </div>
          </div>
          <div class="extraInfo">
            <div class="field" v-if="detailedWeather">
              <img src="../assets/windIcon1.png" alt="windIcon">
              <div>{{detailedWeather.wind.speed}}m/s</div>
            </div>
            <div class="field" v-if="detailedWeather">
              <img src="../assets/dropIcon2.png" alt="">
              <div>{{detailedWeather.main.humidity}}%</div>
            </div>
            <div class="field" v-if="detailedWeather">
              <img src="../assets/barometerIcon.png" alt="">
              <div>{{Math.round(parseInt(detailedWeather.main.pressure, 10)* 0.75006375541921)}}mmHg</div>
            </div>
          </div>
          <hr class="line">
          <div class="footer" v-if="this.forecastList && this.forecastList.length > 0">
            <button
              class="btn"
              @click="prevItem"
              :disabled="currentStart === 0">
              ←
            </button>
            <div class="hourlyForecast">
              <div 
                class="forecastCard" 
                v-for="(item, index) in visibleForecast" 
                :key="index">
                <div>{{ item.time.slice(11, 16) }}</div>
                <img :src="'https:' + item.condition.icon" alt="Weather Icon" />
                <div>{{ Math.round(item.temp_c) }}°C</div>
              </div>
            </div>
            <button 
              class="btn" 
              @click="nextItem" 
              :disabled="currentStart + itemsPerPage >= forecastList.length">
              →
            </button>
          </div>
        </div>
        <div class="card clouds" v-if="detailedWeather && detailedWeather.clouds.all > 18 && detailedWeather.clouds.all <= 65">
          <div class="header">
            <div v-if="detailedWeather" class="extraTempInfo">It's {{getCityTime()}}, {{ detailedWeather.name }}</div>
          </div>
          <div class="mainInfo">
            <div class="tempMain" v-if="detailedWeather && detailedWeather.main">
              <h1>{{ Math.round(detailedWeather.main.temp) }}°C</h1>
              <img v-if="detailedWeather && detailedWeather.weather && detailedWeather.weather[0]" :src="getIconUrl(detailedWeather.weather[0].icon)"/> 
            </div>
            <div class="otherInfo" v-if="detailedWeather && detailedWeather.main">
              <div v-if="detailedWeather && detailedWeather.weather && detailedWeather.weather[0]">{{ detailedWeather.weather[0].description.charAt(0).toUpperCase() + detailedWeather.weather[0].description.slice(1) }}</div>
              <div>Feels like {{ Math.round(detailedWeather.main.feels_like) }}°C</div>
            </div>
          </div>
          <div class="extraInfo">
            <div class="field" v-if="detailedWeather">
              <img src="../assets/windIcon1.png" alt="windIcon">
              <div>{{detailedWeather.wind.speed}}m/s</div>
            </div>
            <div class="field" v-if="detailedWeather">
              <img src="../assets/dropIcon2.png" alt="">
              <div>{{detailedWeather.main.humidity}}%</div>
            </div>
            <div class="field" v-if="detailedWeather">
              <img src="../assets/barometerIcon.png" alt="">
              <div>{{Math.round(parseInt(detailedWeather.main.pressure, 10)* 0.75006375541921)}}mmHg</div>
            </div>
          </div>
          <hr class="line">
          <div class="footer" v-if="this.forecastList && this.forecastList.length > 0">
            <button
              class="btn"
              @click="prevItem"
              :disabled="currentStart === 0">
              ←
            </button>
            <div class="hourlyForecast">
              <div 
                class="forecastCard" 
                v-for="(item, index) in visibleForecast" 
                :key="index">
                <div>{{ item.time.slice(11, 16) }}</div>
                <img :src="'https:' + item.condition.icon" alt="Weather Icon" />
                <div>{{ Math.round(item.temp_c) }}°C</div>
              </div>
            </div>
            <button 
              class="btn" 
              @click="nextItem" 
              :disabled="currentStart + itemsPerPage >= forecastList.length">
              →
            </button>
          </div>
        </div>
        <div class="card overcastClouds" v-if="detailedWeather && detailedWeather.clouds.all > 65">
          <div class="header">
            <div v-if="detailedWeather" class="extraTempInfo">It's {{getCityTime()}}, {{ detailedWeather.name }}</div>
          </div>
          <div class="mainInfo">
            <div class="tempMain" v-if="detailedWeather && detailedWeather.main">
              <h1>{{ Math.round(detailedWeather.main.temp) }}°C</h1>
              <img v-if="detailedWeather && detailedWeather.weather && detailedWeather.weather[0]" :src="getIconUrl(detailedWeather.weather[0].icon)"/> 
            </div>
            <div class="otherInfo" v-if="detailedWeather && detailedWeather.main">
              <div v-if="detailedWeather && detailedWeather.weather && detailedWeather.weather[0]">{{ detailedWeather.weather[0].description.charAt(0).toUpperCase() + detailedWeather.weather[0].description.slice(1) }}</div>
              <div>Feels like {{ Math.round(detailedWeather.main.feels_like) }}°C</div>
            </div>
          </div>
          <div class="extraInfo">
              <div class="field" v-if="detailedWeather">
                <img src="../assets/windIcon1.png" alt="windIcon">
                <div>{{detailedWeather.wind.speed}}m/s</div>
              </div>
              <div class="field" v-if="detailedWeather">
                <img src="../assets/dropIcon2.png" alt="">
                <div>{{detailedWeather.main.humidity}}%</div>
              </div>
              <div class="field" v-if="detailedWeather">
                <img src="../assets/barometerIcon.png" alt="">
                <div>{{Math.round(parseInt(detailedWeather.main.pressure, 10)* 0.75006375541921)}}mmHg</div>
              </div>
          </div>
          <hr class="line">
          <div class="footer" v-if="this.forecastList && this.forecastList.length > 0">
            <button
              class="btn"
              @click="prevItem"
              :disabled="currentStart === 0">
              ←
            </button>
            <div class="hourlyForecast">
              <div 
                class="forecastCard" 
                v-for="(item, index) in visibleForecast" 
                :key="index">
                <div>{{ item.time.slice(11, 16) }}</div>
                <img :src="'https:' + item.condition.icon" alt="Weather Icon" />
                <div>{{ Math.round(item.temp_c) }}°C</div>
              </div>
            </div>
            <button 
              class="btn" 
              @click="nextItem" 
              :disabled="currentStart + itemsPerPage >= forecastList.length">
              →
            </button>
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
      detailedWeather: null,
      lastRequestTime: 0,
      cache: {},
      rateLimit: 1000,
      temperatureYesterday: 0,
      forecastList: null,
      currentIndex: 0,
      itemsPerPage: 12,
    }
  },
  computed: {
    visibleForecast() {
      if(this.forecastList){
        console.log(this.forecastList.slice(this.currentIndex, this.currentIndex + this.itemsPerPage))
        return this.forecastList.slice(this.currentIndex, this.currentIndex + this.itemsPerPage)
        
      } 
      console.log('Wrong')
      return []

    }
  },
  mounted(){
      this.getDetailedWeatherInCity()
  },
  watch: {
    selectedCity(newCity) {
      if (newCity) {
        this.getDetailedWeatherInCity();
      }
    },
  },
  methods: {
    nextItem() {
      if (this.currentIndex + this.itemsPerPage < this.forecastList.length) {
        this.currentIndex += 1;
      }
    },
    prevItem() {
      if (this.currentIndex > 0) {
        this.currentIndex -= 1;
      }
    },
    isDayNow(){
      const now = new Date();
      const cityOffset = this.detailedWeather.timezone * 1000; 
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
      const cityTime = new Date(utcTime + cityOffset);
      const curTime = cityTime.getTime()
      if (curTime - ((this.detailedWeather.sys.sunset+this.detailedWeather.timezone) * 1000 - 10800000) || ((this.detailedWeather.sys.sunrise+this.detailedWeather.timezone)*1000 - 10800000 - curTime > 3600000)){
        console.log(false)
        return false
      }
      console.log(true)
      return true
    },
    getIconUrl(code) {
      return `https://openweathermap.org/img/wn/${code}.png`;
    },
    getCityTime() {
      const now = new Date();
      const cityOffset = this.detailedWeather.timezone * 1000; 
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
      const cityTime = new Date(utcTime + cityOffset);

      const hours = String(cityTime.getHours()).padStart(2, '0');
      const minutes = String(cityTime.getMinutes()).padStart(2, '0');

      return `${hours}:${minutes}`;
    },
    async getDetailedWeatherInCity(){
        try {
        const apiKey = '2f4252a9daaedcde609f511ba17fb410';
        const curCity = this.selectedCity || 'Moscow'; // Дефолтный город
        const cacheKey = curCity.toLowerCase();
        const currentTime = Date.now();

        if (this.cache[cacheKey] && currentTime - this.cache[cacheKey].timestamp < 10 * 60 * 1000) {
          console.log("Данные из кэша:");
          this.detailedWeather = this.cache[cacheKey].data;
          await this.getHourlyForecast(this.detailedWeather.coord.lat, this.detailedWeather.coord.lon)
          // await this.getYestTemperature(this.detailedWeather.coord.lat, this.detailedWeather.coord.lon);
          return;
        }

        // Ограничение частоты запросов
        if (this.lastRequestTime && currentTime - this.lastRequestTime < this.rateLimit) {
          console.log("Ожидание перед запросом...");
          await new Promise((resolve) => setTimeout(resolve, this.rateLimit));
        }
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${curCity}&appid=${apiKey}&units=metric`)
        const data = await res.json()
        if (res.status === 200 || res.status === 201){
            this.detailedWeather = data
            this.cache[cacheKey] = {
              data: data,
              timestamp: currentTime,
            };
            console.log(`Данные для ${curCity} успешно получены:`, this.detailedWeather);
            this.lastRequestTime = currentTime;
            await this.getHourlyForecast(this.detailedWeather.coord.lat, this.detailedWeather.coord.lon)
            // await this.getYestTemperature(this.detailedWeather.coord.lat, this.detailedWeather.coord.lon);
        } else{
            alert('Ошибка!')
        }
      } catch (error) {
          console.error(error)
      }
    
    },
    async getHourlyForecast(lat, lon){
      const apiKey = '92c3578cf6c94628af0105326242012';
      const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=3`);
      const data = await res.json()
      if (res.status === 200 || res.status === 201){
        this.forecastList = data.forecast.forecastday[0].hour
        console.log(this.forecastList)
        console.log("Success")
      } else{
          alert('Ошибка!')
      }
    },
  }
}

</script>

<style scoped>

.main {
  /* background-color: #fff; */
  /* background-color: #F5F5F5; */
  background-color: #efefef;
  /* background: linear-gradient(to left, #fff9dc, #daf1ff); */
  font-family: 'Nunito', sans-serif;
  width: 100%;
  height: 83vh;
  padding-top: 17vh;
  overflow-y: auto;
}
.mainWindow{
    width: 80%;
    height: 60vh;
    margin: 0px auto;
    border-radius: 13px;
    background-color: #fff;
    padding: 20px 20px 10px 20px;
}
.dayWindows .clearSky{
  color:#fff;
  width: 60%;
  height: 54vh;
  margin: 0px auto;
  border-radius: 13px;
  padding: 40px 20px 10px 20px;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('../assets/dayClearSky.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;    
}
.dayWindows .fewClouds{
  color:#fff;
  width: 60%;
  height: 54vh;
  margin: 0px auto;
  border-radius: 13px;
  padding: 40px 20px 10px 20px;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('../assets/dayFewClouds.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;    
}
.dayWindows .clouds{
  color:#fff;
  width: 60%;
  height: 54vh;
  margin: 0px auto;
  border-radius: 13px;
  padding: 40px 20px 10px 20px;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('../assets/dayClouds.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;    
}
.dayWindows .overcastClouds{
  color:#fff;
  width: 60%;
  height: 54vh;
  margin: 0px auto;
  border-radius: 13px;
  padding: 40px 20px 10px 20px;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('../assets/dayOvercastClouds.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;    
}

.nightWindows .clearSky{
  color:#fff;
  width: 60%;
  height: 54vh;
  margin: 0px auto;
  border-radius: 13px;
  padding: 40px 20px 10px 20px;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('../assets/nightClearSky.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
}

.nightWindows .clouds{
  color:#fff;
  width: 80%;
  height: 59vh;
  margin: 0px auto;
  border-radius: 13px;
  padding: 40px 20px 10px 20px;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('../assets/nightClouds.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
}

.nightWindows .overcastClouds{
  color:#fff;
  width: 60%;
  height: 54vh;
  margin: 0px auto;
  border-radius: 13px;
  padding: 40px 20px 10px 20px;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('../assets/nightOvercastClouds.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
}


.card{
  width: 87% !important;
  height: 70vh !important;
  display: flex;
  flex-direction: column;  
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}
.header{
  margin-top: 10px;
  font-size: 20px;
  text-align: left;
  width: 100%;
}

.mainInfo{
  display: flex;
  margin: 27px 30px 0px 30px;
  width: 100%;
}
.mainInfo .tempMain{
  display: flex;
}

.mainInfo .tempMain h1{
  margin: 10px 0px 0px 0px;
  font-size: 48px;
}

.mainInfo .tempMain img{
  margin-top: 10px;
  height: 65px;
  width: 65px;
}
.otherInfo{
  margin-top: 23px;
  font-size: 15px;
}
.extraInfo{
  flex-grow: 1;
  text-align: left;
  display: flex;
  gap: 25px;
  width: 100%;
  justify-content: left;
  margin: 0px 0px 30px 0px
}
.field{
  font-size: 17px;
  display: flex;
  gap: 5px;
}
.field img{
  margin-top: 3px;
  height: 17px;
  width: 20px;
}
.line{
  margin: 0px;
  border: 0;
  background-color: rgb(222, 222, 222);
  height: 1px;
  width: 100%;
}
.footer{
  height: 31%;
  width: 100%;
  /* background-color: #ffffff21; */
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

.hourlyForecast {
  display: flex;
  gap: 10px;
  overflow: hidden;
  width: 100%;
}

.forecastCard {
  width: 10%;
  text-align: center;
  margin: 0 5px;
  font-size: 11.5px;
}
.forecastCard img{
  height: 41px;
  width: 41px;
}
.btn {
  margin: 0px 10px;
  width: 33px;
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s; 
  font-size: 18px;
  color: #5b5b5b;
}

.btn:hover {
  background-color: rgba(255, 255, 255, 0.7);
}

.btn:disabled {
  background-color: rgba(255, 255, 255, 0.3);
  cursor: not-allowed;
}
@media (min-width: 1200px) {
  .header{
    font-size: 27px;
    font-weight: 700;
  }
  .otherInfo div{
    font-size: 18px;
  }
  .card{
    height: 57vh;
  }
  .forecastCard {
    font-size: 17px !important;
    font-weight: 700;
  }
}
@media (max-width: 600px) {
  .extraTempInfo{
    font-size: 17px !important;
  }
  .extraInfo{
    gap: 15px;
  }
  .extraInfo .field{
    font-size: 14px !important;
    gap: 3px;
  }
  .extraInfo .field img{
    height: 14px;
    width: 17px;
  }
}

@media (max-width: 480px) {
  .card{
    height: 48vh !important;
  }
  .tempMain h1{
    font-size: 40px !important;
  }
  .tempMain img{
    height: 57px !important;
    width: 57px !important;
  }
  .otherInfo div{
    font-size: 13px !important; 
  }
  .extraTempInfo{
    font-size: 14.5px !important;
  }
  .extraInfo{
    gap: 10px;
  }
  .extraInfo .field{
    font-size: 11.5px !important;
    gap: 2px;
  }
  .extraInfo .field img{
    height: 12px;
    width: 15px;
  }
}

</style>