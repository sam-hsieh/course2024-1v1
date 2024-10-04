import { storeslist } from './storeslist.js';

const city = document.querySelector("#city");
const stores = document.querySelector("#stroes");
const address=document.querySelector("#address");
const noadderss="顯示詳細地址"

// 初始化 #city 和 #stroes 添加「請選擇」選項
const defaultOption = document.createElement('option');
defaultOption.textContent = "請選擇";
defaultOption.value = ""; // 可設置空值
city.append(defaultOption);

const defaultStoreOption = document.createElement('option');
defaultStoreOption.textContent = "請選擇";
defaultStoreOption.value = ""; // 可設置空值
stores.append(defaultStoreOption);

// 初始化城市選項
storeslist.forEach(value => {
    const option = document.createElement('option');
    option.textContent = value.city;
    option.value = value.city;
    //把option塞進select#city
    city.append(option);
});

// 監聽城市選擇變化，動態更新 store 選項
city.addEventListener('click', function () {
    // 清空之前的 store 選項，選項才不會越累積越多
    stores.innerHTML = "";

    // 根據所選城市查找對應的 store
    const selectedCity = city.value;

    // 如果未選擇城市或選擇了「請選擇」，只顯示「請選擇」
    if (!selectedCity) {
        const option = document.createElement('option');
        stores.append(defaultStoreOption);
        address.innerHTML=noadderss;
        return;
    }
    //使用find()方法
    const cityData = storeslist.find(value => value.city === selectedCity);

    // 如果找到對應的 store，添加到 select#stroes
    if (cityData) {
        stores.append(defaultStoreOption);
        cityData.store.forEach(store => {
            const option = document.createElement('option');
            option.textContent = store.name; // 店名
            option.dataset.address = store.address; // 把地址資料存到data-address
            //把option塞進select#stores
            stores.append(option);
        });
    }
});

stores.addEventListener('click', function () {
    //stores.options：<select> 元素中的所有 <option> 元素，可以使用索引[0], [1]來取得其中的各個選項
    //stores.selectedIndex 是 <select> 元素中當前被選中的 <option> 的索引
    //console.log(stores.options[stores.selectedIndex]);
    if(!stores.options[stores.selectedIndex].dataset.address){
        address.innerHTML=noadderss;
    }else{
        address.innerHTML=stores.options[stores.selectedIndex].dataset.address
    }
  
})

