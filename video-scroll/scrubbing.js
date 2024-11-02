// 選取頁面中 class 為 'vid' 的 section 元素
const section = document.querySelector('.vid')

// 選取 section 中的 video 元素
const vid = section.querySelector('video')

// 暫停影片，以防在滾動事件未發生時影片自動播放
vid.pause()

// 定義一個 scroll 函數，負責根據滾動位置調整影片進度
const scroll = () => {
  // 計算從視窗頂部到 section 元素頂部的距離，減去滾動的距離
  const distance = window.scrollY - section.offsetTop
  // 計算 section 元素高度減去視窗高度的差距，作為滾動區域的範圍
  const total = section.clientHeight - window.innerHeight

  console.log("distance", distance, "total", total);
  // 計算當前滾動的百分比位置，範圍為 0 到 1
  let percentage = distance / total
  percentage = Math.max(0, percentage) // 防止百分比小於 0
  percentage = Math.min(percentage, 1) // 防止百分比大於 1

  // 如果影片已加載並有有效的 duration，則根據百分比設置影片進度
  if (vid.duration > 0) {
    // 將影片的 currentTime 設置為影片時長的相對百分比位置
    vid.currentTime = vid.duration * percentage
  }
}

// 初次調用 scroll 函數，以便頁面加載後立即顯示對應影片進度
scroll()

// 監聽滾動事件，每次滾動時調用 scroll 函數來更新影片進度
window.addEventListener('scroll', scroll)


// u3uv84
if (document.querySelector("#btn")) {
  const btn = document.querySelector("#btn")
  btn.addEventListener("click", () => {
    vid.currentTime += 1
  })
}
