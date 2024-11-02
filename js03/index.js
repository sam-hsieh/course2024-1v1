import express from 'express'; // 使用 ES 模組的 import 語法

const app = express();

// 動態設置端口號，優先使用環境變數 PORT，沒有的話默認為 8080
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.get('/', (req, res) => {
//   res.sendFile(path.join(process.cwd(), 'index.html'));
// });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




