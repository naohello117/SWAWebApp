const { app } = require('@azure/functions');

app.http('servertime', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        // サーバーの現在時刻（UTC）を返す
        const now = new Date();
        
        return { 
            body: JSON.stringify({
                utc: now.toISOString(),
                timestamp: now.getTime()
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
});
