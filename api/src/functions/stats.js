const { app } = require('@azure/functions');

app.http('stats', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        // リアルタイム統計データを生成（実際のDBから取得する想定）
        const baseMembers = 12400;
        const baseSatisfaction = 98;
        const baseEvents = 320;
        
        // 多少のランダム変動を追加してリアルタイム感を演出
        const stats = {
            members: baseMembers + Math.floor(Math.random() * 100),
            satisfaction: baseSatisfaction + (Math.random() * 2 - 1).toFixed(1),
            events: baseEvents + Math.floor(Math.random() * 10),
            timestamp: new Date().toISOString()
        };
        
        return { 
            body: JSON.stringify(stats),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
});
