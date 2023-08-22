module.exports = {
    apps: [
        {
            name: "app1",
            script: "./app.js",
            env: {
                PORT: 80,
                JWT_SECRET: "rahasia",
                DATABASE_URL: "postgresql://postgres:_Vn2T7.pn8hrbgr@db.fuocfzpeisgebepbiekp.supabase.co:5432/postgres"
            },
        },
    ],
};