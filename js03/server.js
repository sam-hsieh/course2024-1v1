import express from 'express';
import bodyParser from 'body-parser';  // 安裝模組
import fs from 'fs';  // 內建模組
import path from 'path';  // 內建模組
import { fileURLToPath } from 'url';  // 用來模擬 __dirname

const app = express();

// 模擬 __filename 和 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// 使用 body-parser 來解析 JSON 請求
app.use(bodyParser.json());


// 設置靜態文件路徑
app.use(express.static(path.join(__dirname, 'public')));


//不需要在創建路由，直接能找到對應檔案(如果檔案存在的話)
//但必須加上完整的檔名+副檔名
app.use(express.static(path.join(__dirname)));

//定義路由

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});
app.get('/create', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'create.html'));
});
app.get('/update', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'update.html'));
});

// POST 路由來處理表單提交
app.post('/addUser', (req, res) => {
  const newUser = req.body;

  // 讀取現有的 user.json 文件
  ///user.json 不建議用絕對路徑，因為會指向文件系統的根目錄（例如 Linux 系統下的 /user.json），而不是應用程式的根目錄。
  const usersFilePath = path.join(__dirname, 'user.json');
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }

    // 將文件中的內容轉換為 JavaScript 物件
    let users = JSON.parse(data);

    // 找出當前最大 id
    const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);

    // 新增新用戶的 id
    newUser.id = maxId + 1;
    users.push(newUser);

    // 將更新後的資料寫回 user.json
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing file');
      }

      res.status(200).json({ message: 'User added successfully!' });
    });
  });
});

// DELETE 路由來刪除使用者
app.delete('/deleteUser/:id', (req, res) => {
  const userId = req.params.id;

  // 讀取現有的 user.json 文件
  const usersFilePath = path.join(__dirname, 'user.json');
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }

    let users = JSON.parse(data);
    const userIndex = users.findIndex(user => user.id === parseInt(userId));  // 根據 id 查找索引

    if (userIndex >= 0) {
      users.splice(userIndex, 1);  // 刪除指定 id 的使用者
    } else {
      return res.status(400).json({ message: 'User not found' });
    }

    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing file');
      }

      res.status(200).json({ message: 'User deleted successfully!' });
    });
  });
});

// PUT 路由來更新使用者資料
app.put('/updateUser/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;

  const usersFilePath = path.join(__dirname, 'user.json');
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }

    let users = JSON.parse(data);
    const userIndex = users.findIndex(user => user.id === parseInt(userId));  // 根據 id 查找索引

    if (userIndex >= 0) {
      users[userIndex] = { ...updatedUser, id: users[userIndex].id };  // 保持 id 不變，更新其餘資料
    } else {
      return res.status(400).json({ message: 'User not found' });
    }

    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing file');
      }

      res.status(200).json({ message: 'User updated successfully!' });
    });
  });
});


// 動態設置端口號，優先使用環境變數 PORT，沒有的話默認為 8080
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




