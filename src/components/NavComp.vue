<template>
    <div class="header">
        <div class="nav">
            <router-link to="/" class="linkStyle"><div class="mainLink"><h1>Main page</h1></div></router-link>
            <router-link to="/fiveDayForecast" class="linkStyle"><div class="linkToFind"><h1>Next 5 days</h1></div></router-link>
            <!-- <div class="mainLink"><h1>Главная</h1></div> -->
            <!-- <div class="linkToFind"><h1>Прогноз на 5 дней</h1></div> -->
        </div>
        <div class="rightPart">
            <div class="curCity">
                <select id="city-selector" @change="updateCity" v-model="this.selectedCity">
                    <option v-for="city in cities" :key="city" :value="city">
                        {{ city }}
                    </option>
                </select>
            </div>
            <div class="logo">
                <img src="../assets/weatherLogo.svg" alt="" class="logoIMG">
            </div>
        </div>
        
    </div>   
</template>

<script>
    export default {
        name: 'NavComp',
        data() {
            return {
            cities: ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Kazan", "Nizhny Novgorod", "Chelyabinsk", "Samara", "Omsk", "Rostov-on-Don", "Ufa", "Krasnoyarsk", "Voronezh", "Perm", "Volgograd", "Cheboksary", "Khabarovsk"],
            selectedCity: "Moscow"
            };
        },
        methods: {
            updateCity(){
                this.selectedCity = document.getElementById("city-selector").value;
                console.log(`Выбран город: ${this.selectedCity}`);
                this.$emit("city-changed", this.selectedCity);
            }
        }
    }
    

    
</script>



<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Roboto+Slab:wght@100..900&display=swap'); */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Nunito:wght@200;300;400;600;700;800;900&display=swap');

.header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* background-color: #f6f6f6c3; */
    /* background-color: #fdfbfb; */
    background-color: #fff;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    min-height: 5vh;
    height: 10vh;
    max-height: 10vh;
}
.header .nav{
    margin-left: 30px;
    display: flex;
    flex-direction: space-between;
    justify-content: center;
    text-align: left;
    gap: 15px;
}
.header .nav .linkStyle{
    text-decoration:none;
}
#city-selector {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    font-family: 'Nunito', sans-serif;
    font-weight: 900;
    text-align: center;
    background-color: #e2e2e2;
    border: 0px;
    border-radius: 10px;
    padding: 7px 9px;
    font-size: 17px;
    font-weight: 800;
    color: #313131;
    /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
    cursor: pointer;
    outline: none;
    backdrop-filter: blur(8px);
}

#city-selector option {
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    font-size: 15px;
    background: rgba(255, 172, 172, 0.048);
    color: #313131;
    padding: 5px;
    border-radius: 50px;
}

.header .rightPart {
    display: flex;
    align-items: center;
    margin-right: 15px;
    gap: 10px;
}

.header .mainLink h1{
    color: #253b27;
    /* background: linear-gradient(to left, #f6d100, #f57b8f, #9a5ed1); */
    /* -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; */
    text-align: center;
    margin: 10px;
    font-size: 31px;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
}

.header .linkToFind h1{
    color: #253b27;
    /* background: linear-gradient(to right, #f6d100, #f57b8f, #9a5ed1); */
    /* -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; */
    text-align: center;
    margin: 10px;
    font-size: 31px;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
}

.logoIMG{
    width: 50px;
    height: auto;
}

@media (max-width: 1000px) {
    .header{
        padding: 9px;
        height: 8vh;
    }
    .header .nav{
        margin-left: 18px;
        gap: 10px;
    }
    .header div h1{
        font-size: 28px!important;
        margin: 5px !important;
    }
    .logoIMG{
        width: 45px;
    }
}

@media (max-width: 600px) {
    .header{
        padding: 8px;
        height: 8vh;
    }
    .header .nav{
        margin-left: 20px;
    }
    .header div h1{
        font-size: 23px !important;
        margin: 2px !important;
    }
    .logoIMG{
        width: 43px;
    }
}

@media (max-width: 510px) {
    .header{
        padding: 6px;
        height: 7vh;
    }
    .header .nav{
        margin-left: 10px;
    }
    .header div h1{
        font-size: 18.5px !important;
        font-weight: 800 !important;
        margin: 2px !important;
    }
    .header .rightPart .curCity #city-selector{
        font-size: 13px;
        padding: 6px 5px;
    }
    .header .rightPart .curCity #city-selector option{
        font-size: 13px;
    }
    .logoIMG{
        width: 36px;
    }
}
@media (max-width: 425px) {
    .header{
        padding: 4px;
        height: 6vh;
    }
    .header .nav{
        margin-left: 8px;
    }
    .header .rightPart .curCity #city-selector{
        font-size: 11px;
        padding: 5px 3px;
    }
    .header .rightPart .curCity #city-selector option{
        font-size: 11px;
    }
    .header div h1{
        font-size: 17px !important;
        margin: 2px !important;
    }
    .logoIMG{
        width: 28px;
    }
}

@media (max-width: 380px) {
    .header{
        padding: 3px;
    }
    .header .nav{
        margin-left: 4px;
    }
    .header div h1{
        font-size: 15px !important;
        margin: 1px !important;
    }
    .logoIMG{
        width: 21px;
    }
}
@media (max-width: 340px) {
    .header{
        padding: 3px;
    }
    .header .nav{
        margin-left: 4px;
        gap: 6px;
    }
    .header div h1{
        font-size: 13px !important;
        margin: 2px !important;
    }
    .logoIMG{
        width: 21px;
    }
}
@media (max-width: 305px) {
    .header{
        padding: 3px;
    }
    .header .nav{
        margin-left: 4px;
        gap: 3px;
    }
    .header div h1{
        font-size: 12px !important;
        margin: 0px;
    }
    .logoIMG{
        width: 21px;
    }
}
/* @media (hover: hover){
    .header .nav .linkStyle div h1:hover{
        transform: scale(1.001);
        transition: all 750ms ease;

        background: linear-gradient(to right, #f6d100, #f57b8f, #9a5ed1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
} */
</style>