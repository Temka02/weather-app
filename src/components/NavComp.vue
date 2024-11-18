<template>
    <div class="header">
        <div class="nav">
            <router-link to="/" class="linkStyle"><div class="mainLink"><h1>Главная</h1></div></router-link>
            <router-link to="/" class="linkStyle"><div class="linkToFind"><h1>Прогноз на 5 дней</h1></div></router-link>
            <!-- <div class="mainLink"><h1>Главная</h1></div> -->
            <!-- <div class="linkToFind"><h1>Прогноз на 5 дней</h1></div> -->
        </div>

        <div class="logo">
            <img src="../assets/weatherLogo.svg" alt="" class="logoIMG">
        </div>
    </div>   
</template>

<script>
    export default {
    name: 'NavComp',
    }
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Roboto+Slab:wght@100..900&display=swap');

.header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #ddd;
    max-height: 10vh; 
}
.header .nav{
    margin-left: 40px;
    display: flex;
    flex-direction: space-between;
    justify-content: center;
    text-align: left;
}
.header .nav .linkStyle{
    text-decoration:none;
}

.header .logo{
    margin-right: 10px;
}

.header div h1{
    color: #000;
    text-align: center;
    margin: 10px 10px 10px 10px;
    font-size: 29px;
    font-family: "Geist Mono", monospace;
    font-optical-sizing: auto;
    font-weight: 600;
    font-style: normal;
    letter-spacing: 0px;
    word-spacing: -10px;
}
.logoIMG{
    width: 50px;
    height: auto;
}

@media (max-width: 1000px) {
    .header{
        padding: 9px;
    }
    .header .nav{
        margin-left: 28px;
    }
    .header div h1{
        font-size: 25px;
        word-spacing: -8px;
    }
    .logoIMG{
        width: 45px;
    }
    .header .logo{
        margin-right: 9px;
    }
}

@media (max-width: 600px) {
    .header{
        padding: 8px;
    }
    .header .nav{
        margin-left: 25px;
    }
    .header div h1{
        font-size: 23px;
        word-spacing: -8px;
    }
    .logoIMG{
        width: 43px;
    }
    .header .logo{
        margin-right: 8px;
    }
}

@media (max-width: 480px) {
    .header{
        padding: 6px;
    }
    .header .nav{
        margin-left: 15px;
    }
    .header div h1{
        font-size: 20px;
        margin: 8px 8px 8px 8px;
        word-spacing: -6px;
    }
    .logoIMG{
        width: 36px;
    }
    .header .logo{
        margin-right: 6px;
    }
}
@media (max-width: 360px) {
    .header{
        padding: 4px;
    }
    .header .nav{
        margin-left: 8px;
    }
    .header div h1{
        font-size: 17px;
        margin: 4px 4px 4px 4px;
        word-spacing: -5px;
    }
    .logoIMG{
        width: 28px;
    }
    .header .logo{
        margin-right: 4px;
    }
}

@media (max-width: 280px) {
    .header{
        padding: 3px;
    }
    .header .nav{
        margin-left: 4px;
    }
    .header div h1{
        font-size: 14px;
        margin: 3px 3px 3px 3px;
        word-spacing: -7px;
    }
    .logoIMG{
        width: 21px;
    }
    .header .logo{
        margin-right: 3px;
    }
}
@media (hover: hover){
    .header .nav .linkStyle div h1:hover{
        transform: scale(1.001);
        transition: all 750ms ease;
        background: linear-gradient(to right, #f6d500, #5e71d1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}
</style>