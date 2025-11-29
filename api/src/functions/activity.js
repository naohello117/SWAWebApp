const { app } = require('@azure/functions');

app.http('activity', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        // ダッシュボードのアクティビティデータ
        const activity = {
            percentage: Math.floor(75 + Math.random() * 20), // 75-95%の範囲
            onlineUsers: Math.floor(5 + Math.random() * 10), // 5-15人
            activeUsers: [
                { initials: 'AK', name: 'Akira Kobayashi' },
                { initials: 'SN', name: 'Saki Nakamura' },
                { initials: 'HM', name: 'Hiro Matsuda' }
            ],
            timestamp: new Date().toISOString()
        };
        
        return { 
            body: JSON.stringify(activity),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
});
