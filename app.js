//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();


app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');
app.use(express.static("public"))


// var title = "";
// var message = "";
const arrayPost = [];


app.get("/", (req, res) => {
  let home = "Home"
  res.render("home", {
    homeHeading: home,
    homeContent: homeStartingContent,
    arrayPosts: arrayPost,
    // titles: objectPost.title,
    // messages: objectPost.message
    // theMessage: message,
    // title: title
  })
})


app.get("/about", (req, res) => {
  let about = "About"
  res.render("about", {
    aboutHeading: about,
    aboutContent: aboutContent
  })
})


app.get("/contacts", function (req, res) {
  let contact = "contact"
  res.render("contact", {
    contactHeading: contact,
    contactMain: contactContent
  })
})


app.get("/compose", (req, res) => {
  let compose = "compose";
  res.render("compose", {
    composeHeading: compose
  })
})


app.post("/compose", (req, res) => {

  const objectPost = {
    title: req.body.titleName,
    message: req.body.composeMessage
  };
  
  arrayPost.push(objectPost);

  res.redirect("/")

})

// app.get("/posts", (req, res) => {
//   res.redirect("/posts/:postTitle")
// })

app.get("/posts/:postTitle", (req, res) => {
  const titleCheck1 = _.lowerCase(req.params.postTitle);

  for (let i=0;  i<arrayPost.length; i++) {
    const arrayPostTitle = _.lowerCase(arrayPost[i].title);
    //const arrayPostContent = arrayPost[i].message

    if (arrayPostTitle === titleCheck1) {
      res.render("post", {
        arrayPostTitle: arrayPost[i].title,
        arrayPostContent: arrayPost[i].message
      })
    } 
  }

}) 












app.listen(3000, function() {
  console.log("Server started on port 3000");
});
