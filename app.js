var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

var version = "v1";

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var getAuthToken = function(ip, uname, pword) {
  var r_json = {
    "username": uname,
    "password": pword
  };

  var post_url = "https://" + ip + "/api/" + version + "/ticket";
  var headers = {'content-type': 'application/json'};

  request.post({
    url: post_url,
    data: r_json,
    headers: headers,
    verify: false
    })
    .on('response', function(data) {
      var result = data.toJSON();
      var ticket = result["response"]["serviceTicket"];
      var headers = {
        "X-Auth-Token": ticket
      };

      var url = "https://" + apicem_ip + "/api/" + version + "/network-device/f79175b3-cd81-461a-a4bf-416b4c722658";
      var device = [];

      request.get({
          url: url,
          headers: headers
        })
        .on('response', function(data) {
          console.log(data.status);
          console.log(data.body);
          res.status(200).send(data.body);
        });
    });
};

app.get('/', function(req, res) {
  var apicem_ip = "sandboxapic.cisco.com:9443";
  var username = "admin";
var password = "C!sc0123";

  var ticket = getAuthToken(apicem_ip, username, password);

  //var headers = {
  //  "X-Auth-Token": ticket
  //};
  //
  //var url = "https://" + apicem_ip + "/api/" + version + "/network-device/f79175b3-cd81-461a-a4bf-416b4c722658"
  //var device = [];
  //
  //request.get({
  //    url: url,
  //    headers: headers
  //  })
  //  .on('response', function(data) {
  //    console.log(data.status);
  //    console.log(data.body);
  //    res.status(200).send(data.body);
  //  });
  //
  //

  /*
  device = response_json["response"]  # network-device

  except:
    print("Something wrong, cannot get network device information")
  sys.exit()

  if status != 200:
  print("Response status %s,Something wrong !" % status)
  print(resp.text)
  sys.exit()

# Make sure there is at least one network device
  if device != []:  # if response is not empty
  device_list = []
  device_show_list = []
  one_item = ""
    # Extracting attributes
  for item in device:
        # device_list.append([item["hostname"],item["managementIpAddress"],item["type"],item["instanceUuid"]])
        # Not showing id to user, it's just a hex string
        # device_show_list.append([item["hostname"],item["managementIpAddress"],item["type"]])
        # print (item)
  one_item = item
    # Show all network devices under this APIC-EM's management
    # Pretty print tabular data, needs 'tabulate' module
    #call("+15612473337", {"network": "SMS"})
    #say(one_item)
  print (one_item)

  else:
  print("No network device found !")

*/
});

app.listen(8000, function(err, success) {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening on server: ', 8000);
  }
});
