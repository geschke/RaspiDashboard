# RaspiDashboard

This is an example for a dashboard of events collected in a database.

## Warning

This repository is just a kind of an example! Maybe it will not fit your needs, so don't expect too much! It started with collecting some motion sensor events in a database. I used InfluxDB, which has nice feature to store event data and uses a HTTP interface for writing and reading data. In [my blog entry](https://www.kuerbis.org/2015/04/pir-sensor-daten-sammeln-mit-influxdb-auf-dem-raspberry-pi/) I described more about the background and the Python storage script (currently in German only).

At first I wanted to develop a minimal "dashboard" approach, just show the events grouped by 10 minutes in a more or less nice diagram. The D3.js library seemed to be a good starting point, so I tried experimenting. At the end I used NVD3.js to produce the main diagram with little effort. But the most interesting part of development was the usage of Facebook's [React](http://facebook.github.io/react/index.html) JavaScript library. 

I like this component-based JavaScript UI development. I had to learn this new approach, but it was worth while. I refactored some components while developing, replaced the pure jQuery method calls by a more sophisticated solution and so on. And before I was satisfied, I tried to learn and use one of the JavaScript build tools, so I chosed Gulp. 

Currently the scrips do fulfil my expectations. but there's much room for extensions. Another Raspberry Pi with temperature and humidity sensor wants to store this data into the same database. So in a next step I will add a diagram for this dataset. 

And don't be surprised, currently the output is a mix of german and english language. If you could recommend a nice translation solution, drop me a mail. 

## Installation

You'll need a running Gulp and Bwser installation. Then do a git clone on the repository:

    git clone https://github.com/geschke/RaspiDashboard.git


At first, install the Bower and Gulp components:

    cd RaspiDashboard
    bower install
    npm install

Then start gulp to collect data, compile and concatenate JavaScript:

    gulp 


Check the config.js file in the config folder and enter the hostname/IP, port and access data of your InfluxDB installation:

    [...]
     database: { host: '192.168.x.y',
                port: '8086',
                user: 'username',
                password: 'password'
    }
    [...]

Remark: As you may think - whow, cleartext username and password are insecure! Yes, that's correct! So it's recommended to create a user with read access only. Remember - there is no access or generic abstraction layer between the database and the client, so the client needs the authentication data itself. And because there is no "security by obscurity", it's not necessary to scrumble authentication data - you will find them in the HTTP requests anyhow. 


## Usage

Browse to the "public" folder and request the dashboard.html file. 

## Licensing

RaspiDashboard is licensed under the Apache License, Version 2.0. See
[LICENSE](https://github.com/geschke/RaspiDashboard/blob/master/LICENSE.md) for the full
license text.

