const express = require("express");
const app = express();
const fs = require('fs');
const port = 80;

const listener = app.listen(port, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

app.get("/send", async function(req, res) {
  if (req.query.message) {
    if (decodeURIComponent(req.query.message).value >= 2000) {
      res.send("message above 2000 characters")
    } else {
      if (fs.readFileSync('chat.txt').toString() == "") {
        sendvar = ""
      } else {
        chatlog = fs.readFileSync('chat.txt').toString()
        sendvar = "<br>" + chatlog
      }
      fs.writeFile("chat.txt", req.query.message + sendvar, function(err) {
      if (err) throw err;
      });
      res.send("message sent")
    }
  } else {
    res.send("message undefined")
  }
  return
});

app.get("/chat", async function(req, res) {
  res.sendFile(__dirname + "/chat.txt")
  return
});

app.get("/", async function(req, res) {
  res.sendFile(__dirname + "/index.html")
  return
});

app.get("*", async function(req, res) {
  res.send("404")
  return
});

function resetChat() {
  fs.writeFile("chat.txt", "", function(err) {
  if (err) throw err;
  });
  setTimeout(() => {
    resetChat()
  }, 3600000)
}
