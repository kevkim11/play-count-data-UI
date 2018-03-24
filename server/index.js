const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const PORT = process.env.PORT || 5000;

const MongoClient = require('mongodb').MongoClient;
const mongoURI = process.env.MONGOURI;
// const mongoURI = "mongodb+srv://playcount-ui:zM34Keoa1cY33j4o@spotifyplaycountcluster-oqdcv.mongodb.net/test";
// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.log(`Node cluster master ${process.pid} is running`);
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  let db;
  MongoClient.connect(mongoURI, function(err, client) {
    if(err)return console.log(err);
    db = client.db('pymongo_test');

    app.listen(PORT, function () {
      console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
    });
  });

  // Answer API requests.
  app.get('/api/playedsong', function (req, res) {
    db.collection("playedsong").find().toArray(function (err, result) {
      if(err) return console.log(err);
      res.json(result);
    });
  });
  
  app.get('/api/timestamp', function (req, res) {
    db.collection("timestamp").find().toArray(function (err, result) {
      if(err) return console.log(err);
      console.log(result);
      res.json([{result}]);
    });
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

}
