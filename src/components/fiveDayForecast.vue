<template>
    <div class="main">
        <div v-if="fiveDayForecastList" class="cardForecast">
            <div class="header">
                <div class="date">
                    <div class="dateNum">{{ fiveDayForecastList[0].date.slice(8) }}</div>
                    <div class="month">{{getMonth(fiveDayForecastList[0].date.slice(5,7))}}</div>
                </div>
                <div class="titles">
                    <div class="pressureTitle">Pressure, <br>mmHh</div>
                    <div class="humidityTitle">Humidity</div>
                    <div class="windTitle">Wind, m/s</div>
                    <div class="feelsLikeTempTitle">Feels like</div>
                </div>
            </div>
            <hr class="line">
            <div class="mainInfo">
                <div class="dayInfo">
                    <div class="span morningSpan">
                        <div class="temp">
                            Morning
                            <div class="tempNum">{{ fiveDayForecastList[0].hour[7].temp_c }}°C</div>
                        </div>
                        <div class="cloudsAndPrec">
                            <img :src="'https:' + fiveDayForecastList[0].hour[7].condition.icon" alt="Weather Icon" />
                            <div>{{ getWeather(0, 7) }}</div>
                        </div>
                        <div class="stats">
                            <div class="pressure">{{Math.round(parseInt(fiveDayForecastList[0].hour[7].pressure_mb, 10)* 0.75006375541921)}}</div>
                            <div class="humidity">{{fiveDayForecastList[0].hour[7].humidity}}%</div>
                            <div class="wind">{{Math.round(fiveDayForecastList[0].hour[7].wind_kph * 1000 / 3600,10)}}</div>
                            <div class="feelsLikeTemp">{{fiveDayForecastList[0].hour[7].feelslike_c}}°C</div>
                        </div>
                    </div>
                    <div class="span afternoonSpan">
                        <div class="temp">
                            Afternoon
                            <div class="tempNum">{{ fiveDayForecastList[0].hour[13].temp_c }}°C</div>
                        </div>
                        <div class="cloudsAndPrec">
                            <img :src="'https:' + fiveDayForecastList[0].hour[13].condition.icon" alt="Weather Icon" />
                            <div>{{ getWeather(0, 13) }}</div>
                        </div>
                        <div class="stats">
                            <div class="pressure">{{Math.round(parseInt(fiveDayForecastList[0].hour[13].pressure_mb, 10)* 0.75006375541921)}}</div>
                            <div class="humidity">{{fiveDayForecastList[0].hour[13].humidity}}%</div>
                            <div class="wind">{{Math.round(fiveDayForecastList[0].hour[13].wind_kph * 1000 / 3600,10)}}</div>
                            <div class="feelsLikeTemp">{{fiveDayForecastList[0].hour[13].feelslike_c}}°C</div>
                        </div>
                    </div>
                    <div class="span eveningSpan">
                        <div class="temp">
                            Evening
                            <div class="tempNum">{{ fiveDayForecastList[0].hour[18].temp_c }}°C</div>
                        </div>
                        <div class="cloudsAndPrec">
                            <img :src="'https:' + fiveDayForecastList[0].hour[18].condition.icon" alt="Weather Icon" />
                            <div>{{ getWeather(0, 18) }}</div>
                        </div>
                        <div class="stats">
                            <div class="pressure">{{Math.round(parseInt(fiveDayForecastList[0].hour[18].pressure_mb, 10)* 0.75006375541921)}}</div>
                            <div class="humidity">{{fiveDayForecastList[0].hour[18].humidity}}%</div>
                            <div class="wind">{{Math.round(fiveDayForecastList[0].hour[18].wind_kph * 1000 / 3600,10)}}</div>
                            <div class="feelsLikeTemp">{{fiveDayForecastList[0].hour[18].feelslike_c}}°C</div>
                        </div>
                    </div>
                    <div class="span nightSpan">
                        <div class="temp">
                            Night
                            <div class="tempNum">{{ fiveDayForecastList[0].hour[23].temp_c }}°C</div>
                        </div>
                        <div class="cloudsAndPrec">
                            <img :src="'https:' + fiveDayForecastList[0].hour[23].condition.icon" alt="Weather Icon" />
                            <div>{{ getWeather(0, 23) }}</div>
                        </div>
                        <div class="stats">
                            <div class="pressure">{{Math.round(parseInt(fiveDayForecastList[0].hour[23].pressure_mb, 10)* 0.75006375541921)}}</div>
                            <div class="humidity">{{fiveDayForecastList[0].hour[23].humidity}}%</div>
                            <div class="wind">{{Math.round(fiveDayForecastList[0].hour[23].wind_kph * 1000 / 3600,10)}}</div>
                            <div class="feelsLikeTemp">{{fiveDayForecastList[0].hour[23].feelslike_c}}°C</div>
                        </div>
                    </div>
                </div>
                <div class="verticalLine"></div>
                <div class="extraInfo">
                    <div class="sunrise">
                        <img src="" alt="">
                        <div class="sunriseNum">{{ fiveDayForecastList[0].astro.sunrise }}</div></div>
                    <div class="sunset">
                        <img src="../assets/sunriseIcon.png" alt="">
                        <div class="sunsetNum">{{ fiveDayForecastList[0].astro.sunset }}</div></div>
                    <div class="moonPhase">
                        <img src="../assets/sunsetIcon.png" alt="">
                        <div class="moonPhaseTitle">{{ fiveDayForecastList[0].astro.moon_phase }}</div>
                    </div>
                </div>
            </div>
            <hr class="line">
            <div class="footer">
                <div class="uvIndex">
                    <div>UV-index:</div>
                    <div class="uvIndexNum">{{ fiveDayForecastList[0].day.uv }}</div>
                </div>
                <div class="visibility">
                    <div>Visibility:</div>
                    <div class="VisibilityNum">{{ fiveDayForecastList[0].day.avgvis_km }}km</div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'fiveDayForecast',
    data() {
        return {
            cache: {},
            info: null,
            lat: null,
            lon: null,
            fiveDayForecastList: null
        };
    },
    mounted(){
        this.getLatAndLon()
    },
    methods: {
        getMonth(index){
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            return months[index-1]
        },
        async getLatAndLon(){
            try {
            const apiKey = '2f4252a9daaedcde609f511ba17fb410';
            const curCity = this.selectedCity || 'Moscow'; // Дефолтный город
            const cacheKey = curCity.toLowerCase();
            const currentTime = Date.now();

            if (this.cache[cacheKey] && currentTime - this.cache[cacheKey].timestamp < 10 * 60 * 1000) {
                console.log("Данные из кэша:");
                this.info = this.cache[cacheKey].data;
                await this.getFiveDayForecast(this.lat, this.lon);
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
                this.info = data
                this.cache[cacheKey] = {
                data: data,
                timestamp: currentTime,
                };
                console.log(`Данные для ${curCity} успешно получены:`, this.info);
                this.lat = this.info.coord.lat
                this.lon = this.info.coord.lon
                this.lastRequestTime = currentTime;
                await this.getFiveDayForecast(this.lat, this.lon);
            } else{
                alert('Ошибка!')
            }
        } catch (error) {
            console.error(error)
        }
        
        },
        async getFiveDayForecast(lat, lon) {
            const apiKey = '92c3578cf6c94628af0105326242012';
            const cacheKey = `${lat},${lon}`;
            const now = Date.now();

            if (this.cache[cacheKey] && now - this.cache[cacheKey].timestamp < 60000) {
                console.log("Данные из кэша:");
                this.fiveDayForecastList = this.cache[cacheKey].data;
                return;
            }
            try {
                const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=5`);
                const data = await res.json();

                if (res.status === 200 || res.status === 201) {
                    this.cache[cacheKey] = {
                        data: data.forecast.forecastday,
                        timestamp: now,
                    };

                    this.fiveDayForecastList = data.forecast.forecastday;
                    console.log(this.fiveDayForecastList);
                    console.log("Success");
                } else {
                    alert('Ошибка!');
                }
            } catch (error) {
                console.error('Ошибка запроса:', error);
                alert('Ошибка!');
            }
        },
        getWeather(day, hour){
            if(this.fiveDayForecastList[day].hour[hour].cloud > 70){
                if(this.fiveDayForecastList[day].hour[hour].will_it_rain == 1 && this.fiveDayForecastList[day].hour[hour].will_it_snow == 1){
                    return "Sleet"
                }
                if(this.fiveDayForecastList[day].hour[hour].will_it_rain == 1){
                    return "Rain"
                }
                if(this.fiveDayForecastList[day].hour[hour].will_it_snow == 1){
                    return "Snow"
                }
                return "Сloudy"
            }
            if(this.fiveDayForecastList[day].hour[hour].cloud<=70 && this.fiveDayForecastList[day].hour[hour].cloud > 35){
                if(this.fiveDayForecastList[day].hour[hour].will_it_rain == 1 && this.fiveDayForecastList[day].hour[hour].will_it_snow == 1){
                    return "Sleet"
                }
                if(this.fiveDayForecastList[day].hour[hour].will_it_rain == 1){
                    return "Rain"
                }
                if(this.fiveDayForecastList[day].hour[hour].will_it_snow == 1){
                    return "Snow"
                }
                return "Partly cloudy"
            }
            if(this.fiveDayForecastList[day].hour[hour].cloud<=35 && this.fiveDayForecastList[day].hour[hour].cloud > 15){
                if(this.fiveDayForecastList[day].hour[hour].will_it_rain == 1 && this.fiveDayForecastList[day].hour[hour].will_it_snow == 1){
                    return "Sleet"
                }
                if(this.fiveDayForecastList[day].hour[hour].will_it_rain == 1){
                    return "Rain"
                }
                if(this.fiveDayForecastList[day].hour[hour].will_it_snow == 1){
                    return "Snow"
                }
                return "Few clouds"
            }
            return "Clear sky"
        }
    },
}
</script>

<style scoped>
.main {
  /* background-color: #fff; */
  background-color: #F5F5F5;
  /* background: linear-gradient(to left, #fff9dc, #daf1ff); */
  font-family: 'Nunito', sans-serif;
  width: 100%;
  height: 81vh;
  padding-top: 19vh;
  overflow-x: hidden;
  overflow-y: auto;
}
.cardForecast{
    width: 83%;
    height: 55vh;
    margin: 0px auto;
    border-radius: 13px;
    background-color: #ffffff;
    padding: 20px 20px 10px 20px;
}
.line{
  margin: 0px;
  border: 0;
  background-color: rgb(210, 210, 210);
  height: 1px;
  width: 100%;
}
.header{
    display: flex;
}
.header .date{
    display: flex;
    margin: 0px 15.5% 0px 10px
}
.header .date .dateNum{
    font-size: 55px;
    font-weight: 500;
}
.header .date .month{
    font-size: 25px;
    font-weight: 500;
    margin-top: 31px;
    margin-left: 10px;
}
.header .titles{
    margin-top: 20px;
    display: flex;
    gap: 46px;
    text-align: center;
}
.header .titles div{
    font-size: 16px;
    color: rgb(104, 104, 104);
    width: 17%
}
.mainInfo{
    display: flex;
    /* gap: 40px; */
    margin-bottom: 3px;
}
.mainInfo .dayInfo{
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
}
.mainInfo .dayInfo .span{
    display: flex;
    height: 21%;
}
.mainInfo .dayInfo .span .temp{
    margin: 15px 50px 0px 45px;
    width: 20%;
    font-size: 13px;
    color: rgb(104, 104, 104);
}
.mainInfo .dayInfo .span .temp .tempNum{
    font-size: 15px !important;
    font-weight: 600;
    color: black !important;
}
.mainInfo .dayInfo .span .cloudsAndPrec{
    display: flex;
    width: 40%;
    margin: 15px 15px 0px 0px;
}
.mainInfo .dayInfo .span .cloudsAndPrec div{
    margin-top: 9px;
    margin-left: 10px;
}
.mainInfo .dayInfo .span .cloudsAndPrec img{
    width: 39px;
    height: 39px;
}
.mainInfo .dayInfo .span .stats{
    display: flex;
    gap: 90px;
    width: 100%;
    margin-top: 25px;
    text-align: center;
}
.extraInfo{
    width: 19vw;
}
.extraInfo div{
    display: flex;
}
.extraInfo img{
    height: 20px;
    width: 20px;
}
.verticalLine{
  width: 1px;
  background-color: #aeaeae;
  align-self: stretch;
  margin: 14px 10px 14px 0px
}
.footer{
    margin-left: 46px;
    margin-top: 12px;
    display: flex;
    gap: 35px;
}
.footer .uvIndex{
    color: gray;
    gap: 10px; 
    display: flex;
}
.footer .uvIndex .uvIndexNum{
    color: #000 !important;
}
.footer .visibility{
    color: gray;
    display: flex;
    gap: 10px;    
}     
.footer .visibility .VisibilityNum{
    color: #000 !important;
} 
@media (min-width: 1200px){
    .header .date{
    display: flex;
    margin: 0px 16.5% 0px 10px
    }
}
@media (min-width: 1300px){
    .header .date{
        display: flex;
        margin: 0px 18.5% 0px 10px
    }
}
@media (min-width: 1400px){
    .header .date{
        display: flex;
        margin: 0px 20.5% 0px 10px
    } 

}  

</style>