# eslint-plugin-express

Prevent common pitfalls and promote best practices when using ExpressJS

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-express`:

```
$ npm install eslint-plugin-express --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-express` globally.

## Usage

Add `express` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "express"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "express/error-middleware-4-params": 2
    }
}
```

## Supported Rules

### `error-middleware-4-params`:

Express looks at the number of params the middleware takes to determine whether it is normal middleware (3) or error middleware(4). A common mistake is to remove the `next` param when defining error middleware.

Examples of **incorrect** code for this rule:

```js
/*eslint express/error-middleware-4-params: "error"*/

app.use(function (error, req, res) {})
app.use(function (err, req, response) {})
app.use(function (e, request, resp) {})

// etc.
```

Examples of **correct** code for this rule:

```js
/*eslint express/error-middleware-4-params: "error"*/

app.use(function (req, res, next) {});
app.use(function (error, req, res, next) {});
app.use(function (e, request, resp, next) {});

// etc.
```

**NB:** this rule looks at the function param names, the following values are recognized:
- 1st param: `error`, `err`, `e`
- 2nd param: `request`, `req`
- 3rd param: `response`, `resp`, `res`
