var express = require("express")
var app = express()
var cors = require("cors")
let projectCollection;
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
//mongoDB connection...
const MongoClient = require('mongodb').MongoClient;
//add database connections..
const uri = 'mongodb+srv://Eiraj:password1234@cluster0.bu3yarb.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {useNewUrlparser: true})
// insert project...​
const insertProjects = (project,callback) => {   
    projectCollection.insert(project,callback);
    }
const getProjects = (callback) => {   
     projectCollection.find({}).toArray(callback);
     }
     const createCollection = (collectionName) => { 
     client.connect((err,db) => {
     projectCollection = client.db().collection(collectionName);
     if(!err) {
     console.log('MongoDB Connected')
    }
     else {
     console.log("DB Error: ", err);
     process.exit(1);
    }
    })
    }
    const cardList = [
        {
            title:"tiger2",
            image:"images/tiger 2.jpg",
            link:"about tiger 2",
            desciption: "demo desciption about tiger 2"   
        
         },
        {
            
            title:"tiger3",
            image:"images/tiger-3.jpg",
            link:"about tiger 3",
            desciption:"Demo desciption about tiger 3", 
        }
        
        ]
        app.post ('/api/projects',(req,res) => {
            console.log("New Project added", req.body)
             var newProject = req.body;    
           insertProjects(newProject,(err,result) => {
           if(err) {
           res.json({statusCode: 400, message: err})
               }
           else {
           res.json({statusCode: 200, message:"Project Successfully added", data: result})
           }
           })
           })
               app.get('/api/projects',(req,res) => {
             getProjects((err,result) => {
              if(err) {
              res.json({statusCode: 400, message: err})
             }
             else {
            res.json({statusCode: 200, message:"Success", data: result})
           }
           })
           })
           var port = process.env.port || 3000;

app.listen(port,()=>{
    console.log("App listening to http://localhost:"+port)
    createCollection("pet")
})

