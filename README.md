# Cloudbnb Photos Service Proxy

Proxy that reroutes API requests from a Service-Oriented Architecture service, modeled after the Airbnb Photos service. Can be deployed via Amazon EC2. Built with Express and Node, and tested with New Relic, Artillery, & Loader.io.

![screenshot](./screenshot.png)

## Technologies Used

* [Express](http://expressjs.com/)
* [Nginx](https://www.nginx.com/)
* [New Relic](https://newrelic.com/)
* [Artillery](https://artillery.io/)
* [Loader.io](https://loader.io/)

## Related Projects

- [Availability Calendar Service - Danny H.](https://github.com/sdc-jackson/availability-service)
- [User Profile Service - Barsha S.](https://github.com/sdc-jackson/user-service)

## Development

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Clone the repo and from the root folder of the project run the command below:
```
npm install
```

Start the dev environment
```sh
npm run server-dev
```

## Stress Testing
```sh
artillery run stress-testing/GET.yml
artillery run stress-testing/POST.yml
```