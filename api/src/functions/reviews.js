const { app } = require('@azure/functions');

app.http('reviews', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        // ユーザーレビューのリスト
        const reviews = [
            {
                quote: "毎日のディスカッションで、新しいコラボが生まれました。",
                author: "Mia / Product Designer"
            },
            {
                quote: "チーム全体の生産性が大幅に向上しました。",
                author: "Taro / Engineering Manager"
            },
            {
                quote: "使いやすいUIで、初心者でもすぐに使えました。",
                author: "Yuki / Marketing Specialist"
            },
            {
                quote: "リアルタイムのコラボレーションが簡単にできます。",
                author: "Ken / Full Stack Developer"
            },
            {
                quote: "コミュニティの雰囲気が最高です！",
                author: "Sakura / Content Creator"
            }
        ];
        
        return { 
            body: JSON.stringify(reviews),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
});
