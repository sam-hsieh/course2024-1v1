
const getTime = {}
const displayTime = document.querySelector("#displayTime")
const temperature = document.querySelector("#temperature")
const weatherInfo = document.querySelector("#weatherInfo")
const btnCity = document.querySelectorAll(".btn-city")
const showcity= document.querySelector("#showcity")
const body=document.querySelector("body")
setInterval(() => {
    var DateTime = new Date();
    displayTime.innerHTML = DateTime.toLocaleString();
}, 1000);
//取得時間的各種方式
// getTime.year = DateTime.getMonth()+1
// getTime.date = DateTime.getDate()
// getTime.hour = DateTime.getHours()
// getTime.minute = DateTime.getMinutes()
// getTime.second = DateTime.getSeconds()

const Authorization = 'CWA-AC8248B4-C6B9-4DE9-9ABF-A764D9592C17'
const api = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${Authorization}`
let weatherDate = {}
let minT = ""
let maxT



const handleAsync = async (city) => {
    try {
        showcity.innerHTML=city
        const res = await axios.get(api)
        weatherDate = res.data.records.location;
        weatherDate.forEach(element => {
            if (element.locationName == city) {
                weatherInfo.innerHTML = element.weatherElement[0].time[0].parameter.parameterName
                minT = element.weatherElement[2].time[0].parameter.parameterName
                maxT = element.weatherElement[4].time[0].parameter.parameterName
                temperature.innerHTML = `${minT}℃~${maxT}℃`
                
                console.log(element);
            }
        });

    } catch (error) {

    }
}
handleAsync('臺北市')
btnCity.forEach(element => {
    element.addEventListener("click", (e) => {
        console.log(e.target.innerHTML);
        handleAsync(e.target.innerHTML)
        body.style.backgroundImage=  `url(./img/${e.target.innerHTML}.jpg)`
    })
})



