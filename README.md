# vue-express-boilerplate

This is Webpack VueJS project generated by vue-cli (`vue init webpack`), and optionally uses ExpressJS to host Vue web app.

The web (VueJS) can be used separately without http (ExpressJS):

- `npm run web:dev` (use `webpack-dev-server` to serve web)
- `npm run web:build` (production build, can be served by any other http servers)

Or hosted by ExpressJS

- `npm run http:dev` (use the same webpack config in Vue module)
- `npm run http:prod` (you need to build web first)
- `npm start` (included web build)


## Original Vue Webpack boilerplate

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run web:dev

# build for production with minification
npm run web:build

# build for production and view the bundle analyzer report
npm run web:build --report

# run unit tests
npm run web:unit

# run e2e tests
npm run web:e2e

# run all tests
npm run web:test
```
