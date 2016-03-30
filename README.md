# Smoker.js
====

> Smoker.js is a Johhny Five BBQ thermometer powered by a Particle Photon

![Alt text](/screenshot.png?raw=true "Smoker.js UI")

## Description
====

Hooks up with a [Particle Photon](https://store.particle.io/) to create a BBQ thermometer. The readings emitted from the BBQ thermometer can be read via websocket.

## Installation
====

```bash
$ npm install
```

## Development
====

The server provides a mock device which will generate random numbers for use in development

```bash
$ npm install
$ npm run dev
```

## Production
====

```bash
$ npm install
$ npm run start
```

This assumes you have provided `PARTICLE_TOKEN` and `PARTICLE_DEVICE_ID` environment variables. This will allow you to connect to your Particle device via the cloud.

## How to Build the Circuit

Follow [Derick Bailey's guide](https://www.safaribooksonline.com/blog/2013/07/25/an-arduino-powered-bbq-thermometer/) on how to assemble a simple BBQ thermometer circuit.

The circuit will roughly look like this:

![Image of circuit](http://blog.safaribooksonline.com/wp-content/uploads/2013/07/audio-input-jack-connection.jpg)

The only modification I have made from this is to drop the LED.
