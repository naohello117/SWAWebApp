// Azure Functions連携スクリプト

// 統計情報を更新
async function updateStats() {
    try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        
        document.getElementById('stat-members').textContent = `${data.members.toLocaleString()}+`;
        document.getElementById('stat-satisfaction').textContent = `${data.satisfaction}%`;
        document.getElementById('stat-events').textContent = data.events;
        
        console.log('📊 統計情報を更新しました:', data);
    } catch (error) {
        console.error('統計情報の取得に失敗しました:', error);
    }
}

// アクティビティ情報を更新
async function updateActivity() {
    try {
        const response = await fetch('/api/activity');
        const data = await response.json();
        
        const percentElement = document.getElementById('activity-percent');
        const barElement = document.getElementById('activity-bar');
        const countElement = document.getElementById('online-count');
        
        percentElement.textContent = `${data.percentage}%`;
        barElement.style.width = `${data.percentage}%`;
        countElement.textContent = `+${data.onlineUsers}`;
        
        console.log('📈 アクティビティ情報を更新しました:', data);
    } catch (error) {
        console.error('アクティビティ情報の取得に失敗しました:', error);
    }
}

// サーバー時刻を基準にしたカウントダウン
async function startCountdown() {
    try {
        const response = await fetch('/api/servertime');
        const data = await response.json();
        let serverTime = new Date(data.utc);
        
        const updateCountdown = () => {
            const now = new Date(serverTime);
            const endOfDay = new Date(now);
            endOfDay.setUTCHours(23, 59, 59, 999);
            
            const diff = endOfDay - now;
            
            if (diff <= 0) {
                document.getElementById('countdown').textContent = '00:00:00';
                return;
            }
            
            const hours = Math.floor(diff / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            
            document.getElementById('countdown').textContent = 
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            
            serverTime = new Date(serverTime.getTime() + 1000);
        };
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
        
        console.log('⏰ カウントダウンを開始しました');
    } catch (error) {
        console.error('サーバー時刻の取得に失敗しました:', error);
        document.getElementById('countdown').textContent = 'エラー';
    }
}

// レビューのローテーション
let currentReviewIndex = 0;
let reviews = [];

async function loadReviews() {
    try {
        const response = await fetch('/api/reviews');
        reviews = await response.json();
        console.log('💬 レビューを読み込みました:', reviews.length, '件');
    } catch (error) {
        console.error('レビューの取得に失敗しました:', error);
    }
}

function rotateReview() {
    if (reviews.length === 0) return;
    
    currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
    const review = reviews[currentReviewIndex];
    
    const quoteElement = document.getElementById('review-quote');
    const authorElement = document.getElementById('review-author');
    
    // フェードアウト
    quoteElement.style.opacity = '0';
    authorElement.style.opacity = '0';
    
    setTimeout(() => {
        quoteElement.textContent = `"${review.quote}"`;
        authorElement.textContent = review.author;
        
        // フェードイン
        quoteElement.style.opacity = '1';
        authorElement.style.opacity = '1';
    }, 300);
    
    console.log('🔄 レビューを更新しました:', review.author);
}

// 初期化
async function init() {
    console.log('🚀 Azure Functions連携を初期化しています...');
    
    // 初回読み込み
    await updateStats();
    await updateActivity();
    await loadReviews();
    await startCountdown();
    
    // 定期更新
    setInterval(updateStats, 10000); // 10秒ごとに統計更新
    setInterval(updateActivity, 8000); // 8秒ごとにアクティビティ更新
    setInterval(rotateReview, 5000); // 5秒ごとにレビュー切り替え
    
    console.log('✅ 初期化完了！動的Webアプリが起動しました');
}

// ページ読み込み時に初期化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
