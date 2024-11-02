let questions = [];//接收api回傳的題庫
let currentQuestion = 0;//目前題數

const countdownEl = document.querySelector("#countdown")
const qsnoEl = document.querySelector("#qsno");//DOM 顯示題數
const questionBox = document.querySelector("#questionBox"); //DOM 題目版
const subjectEl = document.querySelector("#subject"); //DOM 顯示題目
const optionsEl = document.querySelector("#options"); //DOM 顯示選項 
const qtimeEl = document.querySelector("#qtime span"); //DOM 作答時間 
const gameEndEl = document.querySelector("#gameEnd")//DOM 遊戲結束
const userAnswer = []; //記錄答題狀況
//取得css裡設定的寬度
const qtimeElWidth = getComputedStyle(document.documentElement).getPropertyValue('--qtimeElWidth').trim();
const qSpeed=300//3秒


let timer1
// 使用 async/await 加載外部 JSON 文件
const loadQuestions = async () => {
    try {
        const response = await axios.get('questions.json');
        questions = response.data;
        //先倒數在開始玩
        //countdown()
        showQuestion()

    } catch (error) {
        console.error("Error:", error);
    }
}


// 顯示問題
const showQuestion = () => {
    //console.log(currentQuestion);
    if (currentQuestion < questions.length) {
        //設定單題時間
        let qtime = 0
        timer1 = setInterval(() => {
            // 設定作答時間
            qtimeEl.style.width = `${qtimeElWidth - (qtimeElWidth / qSpeed) * qtime}px`;
            if (qtime >= qSpeed) {
                clearInterval(timer1);
                qtimeEl.innerText = '';
                saveAnswer(-1);
            }
            qtime++;
        }, 10);



        // 設置問題內容
        const question = questions[currentQuestion];//取得單題題庫陣列內容
        subjectEl.innerText = question.subject;
        optionsEl.innerHTML = '';//先清空DOM內容
        qsnoEl.innerHTML = `${currentQuestion + 1}/${questions.length}`//加入題數/總題數
        // 建立選項按鈕
        question.option.forEach((optionText, index) => {
            //建立DOM
            const optionButton = document.createElement("button");
            optionButton.classList.add("option");
            optionButton.innerText = optionText;


            //選擇答案後
            optionButton.addEventListener("click", () => {
                saveAnswer(index);

            });
            //加到DOM裡
            optionsEl.appendChild(optionButton);
        });
        // 顯示 .box
        gsap.to(questionBox, { scale: 1, opacity: 1, duration: 0.5 });
    }
}

// 載入問題並啟動遊戲
const countdown = () => {
    let count = 3;
    const timer = setInterval(() => {
        countdownEl.innerText = count;
        if (count <= 0) {
            clearInterval(timer);
            countdownEl.style.display = 'none';
            showQuestion();
        }
        count--;
    }, 1000);
}
//儲存用戶選擇答案
const saveAnswer = (index) => {
    clearInterval(timer1)
    if (!Array.isArray(userAnswer[currentQuestion])) {
        userAnswer[currentQuestion] = [];
    }
    userAnswer[currentQuestion].push({ right: questions[currentQuestion].answer, user: index });
    currentQuestion++;
    if (currentQuestion < questions.length) {
        gsap.to(questionBox, {
            scale: 0, duration: 0.5, onComplete: () => {
                //進入下一題
                showQuestion();
            }
        });
    } else {
        gsap.to(questionBox, { scale: 0, opacity: 0, duration: 0.5 });
        countdownEl.style.display = 'blcok';
        countdownEl.innerHTML = 'Finish'
        gameEnd()

    }

};
const gameEnd = () => {
    questionBox.remove()//移除題目
    let matchCount = 0;//紀錄答對數
    // 查看每個陣列的元素，並比對 `right` 是否等於 `user`
    userAnswer.forEach(el => {
        el.forEach(item => {
            if (item.right === item.user) {
                matchCount++;
            }
        });
    });

    document.querySelector("#gameEnd h2").innerHTML = `答對 ${matchCount} 題 `
    console.log(userAnswer);

    gsap.to(gameEndEl,
        { scale: 1, opacity: 1, duration: 0.5 } // 結束狀態
    );

}

loadQuestions();