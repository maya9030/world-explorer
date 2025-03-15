require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // CORS有効化
app.use(express.json()); // JSONデータを扱う

// MySQL接続情報
const db = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '12341234',
    database: process.env.DB_DATABASE || 'world'
});

// データベース接続確認
db.connect(err => {
    if (err) {
        console.error('DB接続エラー:', err);
        return;
    }
    console.log('DB接続成功');
});

// API: すべての国を取得
app.get('/countries', (req, res) => {
    db.query('SELECT Code, Name, Continent, Population FROM country ORDER BY Name', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// API: 特定の国を取得
app.get('/countries/:code', (req, res) => {
    const countryCode = req.params.code;
    db.query('SELECT * FROM country WHERE Code = ?', [countryCode], (err, results) => {
        if (err) throw err;
        res.json(results[0] || { message: "国が見つかりません" });
    });
});

// サーバー起動
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
