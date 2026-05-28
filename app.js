const { MongoClient } = require('mongodb');

// 🔴 החלף את YOUR_PASSWORD בסיסמה האמיתית שלך מ-Atlas
const uri = "mongodb+srv://alemusee:LnfWvXq8Gb48Q0GN@cluster1.pgu8oqf.mongodb.net/?appName=Cluster1";
const client = new MongoClient(uri);

async function run() {
    try {
        // התחברות למסד הנתונים בענן
        await client.connect();
        console.log("🚀 Connected successfully to MongoDB Atlas from Codespaces!");
        
        // בחירת Database ואוסף (Collection)
        const database = client.db('devops_infrastructure');
        const serversCollection = database.collection('monitored_servers');
        
        // יצירת מסמך חדש שמייצג שרת בארגון
        const newServer = {
            hostname: "prod-node-app",
            ip: "10.0.2.50",
            status: "Online",
            runtime: "Node.js v20",
            checked_at: new Date()
        };
        
        // הכנסת המסמך ל-DB (Insert)
        const insertResult = await serversCollection.insertOne(newServer);
        console.log(`✅ Document inserted with _id: ${insertResult.insertedId}`);
        
        // שליפת המסמך שזה עתה הכנסנו כדי לוודא שהוא שם (Find)
        const query = { hostname: "prod-node-app" };
        const server = await serversCollection.findOne(query);
        console.log("🔍 Found server configuration in DB:", server);

    } catch (error) {
        console.error("❌ An error occurred:", error);
    } finally {
        // סגירת החיבור בצורה מסודרת
        await client.close();
    }
}

run();