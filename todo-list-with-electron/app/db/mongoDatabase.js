// для чего этот js файл? 
/* 
    в этом файле содержатся константы для подключения к mongodb, 
    методы для работы с mongoDb
*/

// импортируем класс mongoclient
const {MongoClient} = require('mongodb');


// константы для доступа к mongoDb
const GlDbUsername = "ghudo";
const GlDbPassword = "ghudopassword";
const GlDbName = "todo-list";

// объект, содержащий поля и методы
const mongoDatabase = {

    "mongoDbClient": new MongoClient(
        `mongodb://${GlDbUsername}:${GlDbPassword}@127.0.0.1:27017/?authMechanism=DEFAULT`
    ),

    // получить документы в коллекции
    async getCollection(collectionName){
        try{
            // подключаемся к бд
            await this.mongoDbClient.connect();
            // получаем документы
            const AllDocuments = await this.mongoDbClient.db(GlDbName).collection(collectionName).find().toArray();
            // закрываем подключение
            await this.mongoDbClient.close();
            return AllDocuments;
        }
        catch(e){
            console.log(e)
        }
    },

    // метод пушит объект в выбранную коллекцию
    async pushDocument(document, collection){
        try{
            await this.mongoDbClient.connect();
            await this.mongoDbClient.db(GlDbName).collection(collection).insertOne(document);
            await this.mongoDbClient.close();
        } catch(e){
            console.log(e);
        }
    },

    // метод ищет документ в коллекции по определенному запросу
    async findOne(collection, query){
        try{
            await this.mongoDbClient.connect();
            const result = await this.mongoDbClient.db(GlDbName).collection(collection).findOne(query);
            await this.mongoDbClient.close();
            if(result != null) {
                return result;
            } else {
                return undefined;
            }
        } catch(e){
            console.log(e);
        }

    },

    async findMany(collection, query){
        try{
            await this.mongoDbClient.connect();
            const result = await this.mongoDbClient.db(GlDbName).collection(collection).find(query).toArray();
            await this.mongoDbClient.close();
            return result;
        } catch(e){
            console.log(e);
        }
    },

    async updateOne(collection, query, updateQuery){
        try{     
            await this.mongoDbClient.connect();
            await this.mongoDbClient.db(GlDbName).collection(collection).updateOne(query, updateQuery);
            await this.mongoDbClient.close();
        } catch(e){
            console.log(e)
        }
    },

    async deleteOne(collection, query){
        try{
            await this.mongoDbClient.connect();
            await this.mongoDbClient.db(GlDbName).collection(collection).deleteOne(query);
            await this.mongoDbClient.close();
        } catch(e){
            console.log(e);
        }
    }
}



export { mongoDatabase }




