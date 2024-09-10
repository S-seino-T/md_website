document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a');

    // 初回ロード時にURLからファイル名を取得
    const urlParams = new URLSearchParams(window.location.search);
    const fileParam = urlParams.get('file') || 'example1.md';  // デフォルトファイル
    loadMarkdown(fileParam);

    // メニューのリンクをクリックした時の処理
    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();  // デフォルトのリンク動作を無効化
            const file = link.getAttribute('data-file');
            updateURL(file);  // URLパラメータを更新
            loadMarkdown(file);  // 選択されたファイルを読み込む
        });
    });
});

// Markdownファイルを読み込んで表示する関数
function loadMarkdown(file) {
    fetch(`/markdown/${file}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
            processInternalLinks();  // 内部リンクの処理
        })
        .catch(error => {
            console.error('Error loading markdown:', error);
        });
}

// URLパラメータを更新する関数
function updateURL(file) {
    const newUrl = `${window.location.pathname}?file=${file}`;
    history.pushState(null, '', newUrl);  // URLを更新するがページをリロードしない
}

// 内部リンクをクリックしたときにMarkdownファイルを読み込む処理
function processInternalLinks() {
    const content = document.getElementById('content');
    const internalLinks = content.querySelectorAll('a[href$=".md"]');  // .mdリンクを取得

    internalLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const file = link.getAttribute('href');
            updateURL(file);  // URLパラメータを更新
            loadMarkdown(file);  // 選択されたファイルを読み込む
        });
    });
}
