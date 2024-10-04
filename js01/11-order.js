//商品
const productItems = ["IPhone", "耐摔手機殼", "快速充電器", "藍芽耳機"]
//單價
const productPrice = ["20000", "900", "560", "1200"]
const tbody = document.querySelector("#tbody");
//記錄選了幾個
const ItemsCount = [];
//紀錄各item金額
const ItemsAmounts = [];

let tbodyHTML = '';
let selectHTML = '';
//總金額
let total = 0;
const totalDisplay = document.querySelector("#totalDisplay");
//送出訂單按鈕
const btnSendOrder = document.querySelector("#btnSendOrder")
//訂單送出
const mask = document.querySelector("#mask")
const dialog = document.querySelector('dialog')
const btnCloseDialog = document.querySelector("#btnCloseDialog")
const dialogToggle = () => {
    dialog.querySelectorAll('#sending, #sended').forEach(element => {
        element.classList.toggle('d-none');
    });
}
//注意順序

//總金額計算
const getSubtotal = () => {
    //先歸0
    total = 0
    //＊如果採用數量x金額的方式
    // ItemsCount.forEach((value,index) => {
    //     console.log(value*Number(productPrice[index]));
    //     total+=value*Number(productPrice[index])
    // })
    ItemsAmounts.forEach((value) => {
        total += value
    })
    updateToala(total)
    console.log(ItemsAmounts);
}
//讓totl跟totalDisplay同步更新
const updateToala = (t) => {
    total = Number(t)
    totalDisplay.innerText = t
}
//生成select原始碼
for (let j = 0; j < 10; j++) {
    //巨量資料時，就不要用這總寫法
    selectHTML += `<option val="${j}">${j}</option>`
}

for (let i = 0; i < productItems.length; i++) {
    //生成訂購單原始碼
    tbodyHTML += `<tr>  
        <td>${productItems[i]}</td>
        <td>${productPrice[i]}</td>
        <td>
          <select class="form-select" data-price="${productPrice[i]}" >
            ${selectHTML}
          </select>
        </td>
    </tr> `
    //預設ItemsAmounts為0
    ItemsAmounts[i] = 0
}
//程式碼注入DOM
tbody.innerHTML = tbodyHTML;

//先宣告會出錯
//選取所有select
const formSelect = document.querySelectorAll(".form-select")

//切換數量時，更新總金額 //使用foEach
formSelect.forEach((element, index) => {
    element.addEventListener('change', (e) => {
        //＊將每個item的數量存進陣列
        ItemsCount [index] =Number(element.value);
        //將每個itme的Quantity*price存進陣列
        ItemsAmounts[index] = Number(element.value) * Number(element.dataset.price)
        getSubtotal()
    })
});
//送出訂單
btnSendOrder.addEventListener("click", () => {
    //mask.classList.remove("d-none")
    dialog.showModal()
    setTimeout(() => {
        formSelect.forEach((element, index) => {
            //選單、Amounts陣列、total都歸0
            element.value = '0'
            ItemsAmounts[index] = 0
        })
        dialogToggle()
        updateToala(0);
        console.log(ItemsAmounts);
    }, 2000);
})
//關閉dialog
btnCloseDialog.addEventListener("click", () => {
    dialog.close();
    dialogToggle()
})