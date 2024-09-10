const express = require('express');
const fs = require('fs');
const path = require('path');
const marked = require('marked');

const app = express();
const PORT = 3000;

// publicディレクトリを静的ファイルとして提供
app.use(express.static('public'));

// Markdownファイルを読み込み、HTMLに変換して返すエンドポイント
app.get('/markdown/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, 'markdown_files', filename);

    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Markdownファイルの読み込みに失敗しました');
        }
        const htmlContent = marked.parse(data);
        res.send(htmlContent);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
