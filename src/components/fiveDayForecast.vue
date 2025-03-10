<template>
    <div class="main" v-if="fiveDayForecastList">
        <div class="cardForecast" 
            v-for="(item, index) in fiveDayForecastList" 
            :key="index">
            <div class="header">
                <div class="date">
                    <div class="dateNum">{{ item.date.slice(8) }}</div>
                    <div class="month">{{getMonth(item.date.slice(5,7))}}</div>
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
                            <div class="tempNum">{{ item.hour[7].temp_c }}°C</div>
                        </div>
                        <div class="cloudsAndPrec">
                            <img :src="'https:' + item.hour[7].condition.icon" alt="Weather Icon" />
                            <div>{{ getWeather(index, 7) }}</div>
                        </div>
                        <div class="stats">
                            <div class="pressure">{{Math.round(parseInt(item.hour[7].pressure_mb, 10)* 0.75006375541921)}}</div>
                            <div class="humidity">{{item.hour[7].humidity}}%</div>
                            <div class="wind">{{Math.round(item.hour[7].wind_kph * 1000 / 3600,10)}}</div>
                            <div class="feelsLikeTemp">{{item.hour[7].feelslike_c}}°C</div>
                        </div>
                    </div>
                    <div class="span afternoonSpan">
                        <div class="temp">
                            Afternoon
                            <div class="tempNum">{{ item.hour[13].temp_c }}°C</div>
                        </div>
                        <div class="cloudsAndPrec">
                            <img :src="'https:' + item.hour[13].condition.icon" alt="Weather Icon" />
                            <div>{{ getWeather(index, 13) }}</div>
                        </div>
                        <div class="stats">
                            <div class="pressure">{{Math.round(parseInt(item.hour[13].pressure_mb, 10)* 0.75006375541921)}}</div>
                            <div class="humidity">{{item.hour[13].humidity}}%</div>
                            <div class="wind">{{Math.round(item.hour[13].wind_kph * 1000 / 3600,10)}}</div>
                            <div class="feelsLikeTemp">{{item.hour[13].feelslike_c}}°C</div>
                        </div>
                    </div>
                    <div class="span eveningSpan">
                        <div class="temp">
                            Evening
                            <div class="tempNum">{{ item.hour[18].temp_c }}°C</div>
                        </div>
                        <div class="cloudsAndPrec">
                            <img :src="'https:' + item.hour[18].condition.icon" alt="Weather Icon" />
                            <div>{{ getWeather(index, 18) }}</div>
                        </div>
                        <div class="stats">
                            <div class="pressure">{{Math.round(parseInt(item.hour[18].pressure_mb, 10)* 0.75006375541921)}}</div>
                            <div class="humidity">{{item.hour[18].humidity}}%</div>
                            <div class="wind">{{Math.round(item.hour[18].wind_kph * 1000 / 3600,10)}}</div>
                            <div class="feelsLikeTemp">{{item.hour[18].feelslike_c}}°C</div>
                        </div>
                    </div>
                    <div class="span nightSpan">
                        <div class="temp">
                            Night
                            <div class="tempNum">{{ item.hour[23].temp_c }}°C</div>
                        </div>
                        <div class="cloudsAndPrec">
                            <img :src="'https:' + item.hour[23].condition.icon" alt="Weather Icon" />
                            <div>{{ getWeather(index, 23) }}</div>
                        </div>
                        <div class="stats">
                            <div class="pressure">{{Math.round(parseInt(item.hour[23].pressure_mb, 10)* 0.75006375541921)}}</div>
                            <div class="humidity">{{item.hour[23].humidity}}%</div>
                            <div class="wind">{{Math.round(item.hour[23].wind_kph * 1000 / 3600,10)}}</div>
                            <div class="feelsLikeTemp">{{item.hour[23].feelslike_c}}°C</div>
                        </div>
                    </div>
                </div>
                <div class="verticalLine"></div>
                <div class="extraInfo">
                    <div class="sunrise">
                        <img src="../assets/sunsetIcon.png" alt="">
                        <div class="sunriseNum">{{ item.astro.sunrise }}</div></div>
                    <div class="sunset">
                        <img src="../assets/sunriseIcon.png" alt="">
                        <div class="sunsetNum">{{ item.astro.sunset }}</div></div>
                    <div class="moonPhase">
                        <img src="../assets/moon-phases.png" alt="">
                        <div class="moonPhaseTitle">{{ item.astro.moon_phase }}</div>
                    </div>
                </div>
            </div>
            <hr class="line">
            <div class="footer">
                <div class="uvIndex">
                    <div>UV-index:</div>
                    <div class="uvIndexNum">{{ item.day.uv }}</div>
                </div>
                <div class="visibility">
                    <div>Visibility:</div>
                    <div class="VisibilityNum">{{ item.day.avgvis_km }}km</div>
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
        getPrecipitationType(day, hour) {
            const weather = this.fiveDayForecastList[day].hour[hour];
            if (weather.will_it_rain && weather.will_it_snow) {
                return "Sleet";
            }
            if (weather.will_it_rain) {
                return "Rain";
            }
            if (weather.will_it_snow) {
                return "Snow";
            }
            return null;
        },
        getWeather(day, hour) {
            const weather = this.fiveDayForecastList[day].hour[hour];
            const precipitation = this.getPrecipitationType(day, hour);

            if (weather.cloud > 70) {
                return precipitation || "Cloudy";
            }
            if (weather.cloud <= 70 && weather.cloud > 35) {
                return precipitation || "Partly cloudy";
            }
            if (weather.cloud <= 35 && weather.cloud > 15) {
                return precipitation || "Few clouds";
            }
            return "Clear sky";
        }
        
        //     if(this.fiveDayForecastList[day].hour[hour].cloud > 70){
        //         if(this.fiveDayForecastList[day].hour[hour].will_it_rain == 1 && this.fiveDayForecastList[day].hour[hour].will_it_snow == 1){
        //             return "Sleet"
        //         }
        //         if(this.fiveDayForecastList[day].hour[hour].will_it_rain == 1){
        //             return "Rain"
        //         }
        //         if(this.fiveDayForecastList[day].hour[hour].will_it_snow == 1){
        //             return "Snow"
        //         }
        //         return "Сloudy"
        //     }
        //     if(this.fiveDayForecastList[day].hour[hour].cloud<=70 && this.fiveDayForecastList[day].hour[hour].cloud > 35){
        //         if(this.fiveDayForecastList[day].hour[hour].will_it_rain == 1 && this.fiveDayForecastList[day].hour[hour].will_it_snow == 1){
        //             return "Sleet"
        //         }
        //         if(this.fiveDayForecastList[day].hour[hour].will_it_rain == 1){
        //             return "Rain"
        //         }
        //         if(this.fiveDayForecastList[day].hour[hour].will_it_snow == 1){
        //             return "Snow"
        //         }
        //         return "Partly cloudy"
        //     }
        //     if(this.fiveDayForecastList[day].hour[hour].cloud<=35 && this.fiveDayForecastList[day].hour[hour].cloud > 15){
        //         if(this.fiveDayForecastList[day].hour[hour].will_it_rain == 1 && this.fiveDayForecastList[day].hour[hour].will_it_snow == 1){
        //             return "Sleet"
        //         }
        //         if(this.fiveDayForecastList[day].hour[hour].will_it_rain == 1){
        //             return "Rain"
        //         }
        //         if(this.fiveDayForecastList[day].hour[hour].will_it_snow == 1){
        //             return "Snow"
        //         }
        //         return "Few clouds"
        //     }
        //     return "Clear sky"
        // }
    },
}
</script>

<style scoped>
.main {
  /* background-color: #fff; */
  background-color: #efefef;
  /* background: linear-gradient(to left, #fff9dc, #daf1ff); */
  font-family: 'Nunito', sans-serif;
  width: 100%;
  height: 83vh;
  padding-top: 17vh;
  overflow-x: hidden;
  overflow-y: auto;
}
.cardForecast{
    width: 83%;
    height: 47.5vh;
    margin: 0px auto 35px auto;
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
    margin: 0px 13% 0px 10px
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
    width: 37vw;
    margin-top: 20px;
    display: flex;
    gap: 46px;
    text-align: center;
}
.header .titles div{
    font-size: 16px;
    color: rgb(104, 104, 104);
    width: 8.5vw
}
.mainInfo{
    display: flex;
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
    width: 8%;
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
    width: 18%;
    margin: 15px 3% 0px 0px;
}
.mainInfo .dayInfo .span .cloudsAndPrec div{
    display: flex;
    height: 39px;
    justify-content: center;
    align-items: center;
}
.mainInfo .dayInfo .span .cloudsAndPrec img{
    width: 39px;
    height: 39px;
}
.mainInfo .dayInfo .span .stats{
    display: flex;
    gap: 17.8%;
    width: 37vw;
    margin-top: 25px;
    text-align: center;
}
.mainInfo .dayInfo .span .stats div{
    width: 11%;
}
.extraInfo{
    width: 19vw;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 5%;
}
.extraInfo div{
    display: flex;
    justify-content: start;
    align-items: center;
}
.extraInfo div div{
    font-size: 18px;
    font-weight: 500;
}
.extraInfo img{
    height: 27px;
    width: 27px;
    margin-right: 10px;
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
@media (min-width: 1300px){
    .header .date{
        margin: 0px 15% 0px 10px !important;
    }
    .header .titles{
        gap: 16% !important;
    }
}
@media (min-width: 1200px){
    .header .date{
        margin: 0px 13% 0px 10px;
    }
    .header .titles{
        gap: 15% !important;
    }
}
@media (max-width: 1300px){
    .cardForecast{
        height: 53vh !important;
    }
}
@media (max-width: 1200px){
    .cardForecast{
        height: 53vh !important;
    }
    .header .titles{
        width: 40vw;
        gap: 7%;
    }
    .header .date {
        display: flex;
        margin: 0px 9% 0px 10px;
    }
    .mainInfo .dayInfo .span .stats {
        gap: 18%;
        font-size: 14.5px;
        width: 37vw;
    }
    .mainInfo .dayInfo .span .temp{
        margin: 15px 10px 0px 15px;
        width: 14%;
        font-size: 13px;
        color: rgb(104, 104, 104);
    }
    .mainInfo .dayInfo .span .cloudsAndPrec{
        display: flex;
        width: 19%;
        margin: 15px 25px 0px 0px;
    }
    .mainInfo .dayInfo .span .cloudsAndPrec img {
        width: 33px;
        height: 33px;
    }
    .mainInfo .dayInfo .span .cloudsAndPrec div{
        font-size: 14px;
        height: 33px;
    }
    .extraInfo div div {
        font-size: 16px;
        font-weight: 500;
    }
}
@media (max-width: 1100px) {
    .header .date {
        margin: 0px 8% 0px 10px;
    }
}
@media (max-width: 1000px){
    .cardForecast {
        height: 50vh !important;
    }
    .header .titles{
        gap: 7%;
    }
    .header .date .dateNum{
        font-size: 50px;
        font-weight: 500;
    }
    .header .date .month {
        font-size: 21px;
        font-weight: 500;
        margin-top: 28px;
        margin-left: 5px;
    }
    .header .date {
        margin: 0px 5% 0px 10px !important;
    }
    .header .titles div{
        font-size: 14px;
        width: 19%;
    }
    .mainInfo .dayInfo .span .temp{
        width: 12%;
    }
    .mainInfo .dayInfo .span .cloudsAndPrec{
        display: flex;
        width: 17%;
        margin: 15px 5.5% 0px 0px;
    }
    .extraInfo div img{
        height: 24px;
        width: 24px;
    }
    .extraInfo div div {
        font-size: 14px;
        font-weight: 500;
    }
    .mainInfo .dayInfo .span .stats{
        gap: 17%;
    }
    .mainInfo .dayInfo .span .temp .tempNum{
        font-size: 13.6px !important;
    }
    .mainInfo .dayInfo .span .temp {
        font-size: 11.7px;
        width: 9%;
    } 
    
    .mainInfo .dayInfo .span .stats div{
        font-size: 13px;
    }
}
@media (max-width: 890px){
    .cardForecast {
        height: 48vh !important;
    }
    .header .date {
        margin: 0px 7vw 0px 10px !important;
    }
    .mainInfo .dayInfo .span .temp .tempNum{
        font-size: 13px !important;
    }
    .mainInfo .dayInfo .span .temp {
        font-size: 11px;
        width: 9%;
    }
    .mainInfo .dayInfo .span .cloudsAndPrec div{
        font-size: 12px;
        font-weight: 700;
    }
    .header .date .dateNum {
        font-size: 45px;
    }
    .header .date .month {
        font-size: 18px;
        font-weight: 500;
        margin-top: 28px;
    }
    .mainInfo .dayInfo .span .cloudsAndPrec {
        margin: 15px 5.5vw 0px 0px;
    }
    .extraInfo div div {
        font-size: 12px;
    }
}
@media (max-width: 800px){
    .header .date {
        margin: 0px 5vw 0px 10px !important;
    }
}
@media (max-width: 710px){
    .header .date .dateNum {
        font-size: 38px;
    }
    .header .date .month {
        font-size: 16px;
        font-weight: 500;
        margin-top: 23px;
    }
    .header .date {
        margin: 0px 4vw 0px 10px !important;
    }
}
@media (max-width: 600px){
    .mainInfo .dayInfo .span .stats{
        gap: 17%;
    }
    .mainInfo .dayInfo .span .cloudsAndPrec{
        margin: 15px 6.5vw 0px 0px;
    }
    .mainInfo .dayInfo .span .stats div {
        font-size: 11.3px;
    }
}
</style>