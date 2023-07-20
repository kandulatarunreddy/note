// importing methods from fetch.js
import {
    fetchData, setCurrentUser, setCurrentNote,getCurrentUser, getCurrentNote
} from "./fetch.js";

// register functionality
const register=document.getElementById("registration");
if(register) register.addEventListener('submit',registerUser)

function registerUser(e){

    e.preventDefault();
    let userName=document.getElementById('uname').value;
    let password=document.getElementById('psw').value;
    
    const registerdUser = new Register(userName,password);
    console.log(registerdUser);
    console.log("hello register");
    fetchData("/users/register", registerdUser, "POST")
    .then((data) => {
      setCurrentUser(data);
      window.location.href = "note.html";
    })
    .catch((err) =>{
      let p = document.querySelector('.error');
      p.innerHTML = err.message;
    })
    document.getElementById("registration").reset();
}

// Register class
class Register{
    constructor(userName,password)
    {
        this.userName=userName;
        this.password=password;
    }
    getUserName(){
        return this.userName;
    }
    getPassword(){
        return this.password;
    }
    setUserName(userName){
        this.userName=userName;
    }
    setPassword(password){
        this.password=password;
    }
}

// login functionality
let login=document.getElementById("login");
if(login) login.addEventListener('submit',loginUser);

function loginUser(e){
    
    e.preventDefault();
    let userName=document.getElementById('uname').value;
    let password=document.getElementById('psw').value;

    
    const loggedInUserDetails = new User(userName,password);
    console.log(loggedInUserDetails);
    fetchData("/users/login", loggedInUserDetails, "POST")
    .then((data) => {
      setCurrentUser(data);
      window.location.href = "note.html";
    })
    .catch((err) => {
      let p = document.querySelector('.error');
      p.innerHTML = err.message;
    }) 
    document.getElementById("login").reset();
}

// User class
class User{
    constructor(userName,password)
    {
        this.userName=userName;
        this.password=password;
    }
    getUserName(){
        return this.email;
    }
    getPassword(){
        return this.password;
    }
    setUserName(userName){
        this.userName=userName;
    }
    setPassword(password){
        this.password=password;
    }
}

// Note Page functionality
const noteForm=document.getElementById("note_form");
if(noteForm) noteForm.addEventListener('submit',noteSaving);

function noteSaving(e){
    e.preventDefault();
    let noteValue=document.getElementById('noteId').value;
    const note = new Note(noteValue);
    console.log(note);
    let user=getCurrentUser();
    note.userID=user.userID;
    fetchData("/notes/create", note , "POST")
    .then((data) => {
      console.log(data);
    })
    .catch((err) =>{
      let p = document.querySelector('.error');
      p.innerHTML = err.message;
    })
    window.location.reload();
    //document.getElementById("note").reset();   
}
//Note class
class Note{
    constructor(enteredNotes)
    {
        this.note=enteredNotes;
    }
    getnote(){
        return this.note;
    }
    setnote(enteredNotes){
        this.note=enteredNotes;
    }
}

//User Details using a button click.
const usersDetails=document.getElementById("getDetails");
if(usersDetails) usersDetails.addEventListener('click',getUsers);

//function for getusers
function getUsers(){
    fetch("http://localhost:3000/users/")
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        let unorderdlist=document.getElementById("userDetails");

        data.forEach((user)=>{
            let li=document.createElement('li');
            let text=document.createTextNode(user.userName);
            li.appendChild(text);
            unorderdlist.appendChild(li);
        })
    })

    .catch((err)=>console.log(`error! ${err}`));
}

// storing current user details in user
let user=getCurrentUser();

//Checking if there is current user and noteform
if(user && noteForm) getNotes();

// functon for getNotes
 function getNotes(){
    let user= getCurrentUser();
     fetchData("/notes/",user,"post")
     .then((data)=>{
         let unorderdlist=document.getElementById("allNotes");

         data.forEach((note)=>{
             let li=document.createElement('li');
             let text=document.createTextNode(note.note);
             li.appendChild(text);
             unorderdlist.appendChild(li);
         })

     })
     .catch((err)=>console.log(`Error! ${err}`));
     //window.location.href="note.html";
 }


