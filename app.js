const { response } = require("express");
const express=require("express");
const https=require('https');
const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

const port=3000;

app.get('/',(req,res)=>{
res.sendFile(__dirname + "/signup.html");
})

app.post('/',(req,res)=>{


const fname = req.body.fName;
const lname = req.body.lName;
const email = req.body.email;



const data={
members:[       // array of objects,we basically only insert one person at a time so one object
{
email_address: email,
status: "subscribed",
merge_fields:{
FNAME: fname,
LNAME: lname
}
}
]
};

const jsonData = JSON.stringify(data);

const url = "https://us20.api.mailchimp.com/3.0/lists/04c4291cba?skip_merge_validation=false&skip_duplicate_check=false";
const Options ={
method: "POST",
auth: "subhro:a66722c51d077f51edc16d09f3c2edb0-us20"
}

const request=https.request(url,Options,(response)=>{

if(response.statusCode===200)
{
res.sendFile(__dirname+"/success.html");
}
else
{
res.sendFile(__dirname+"/failure.html");
}


response.on("data",(data)=>{
console.log(JSON.parse(data));
})
})

request.write(jsonData);
request.end();

});

app.listen(port);





// for my reference :

// api key
// a66722c51d077f51edc16d09f3c2edb0-us20

//  list id
//  04c4291cba


//audience check link
// https://us20.admin.mailchimp.com/lists/members?id=575446&previewName=Contacts#p:1-s:25-sa:last_update_time-so:false

// mailchimp batch subscribe/unsubscribe tutorial
// https://mailchimp.com/developer/marketing/api/abuse-reports/

