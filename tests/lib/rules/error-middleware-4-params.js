/**
 * @fileoverview Use 4 params in the error middleware function. Express looks at the number of params the middleware takes to determine whether it is normal middleware (3) or error middleware(4).
 * @author godspeedelbow
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/error-middleware-4-params"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("error-middleware-4-params", rule, {

    valid: [
        "app.use(function (req, res, next) {})",
        "app.use(function (error, req, res, next) {})",
    ],

    invalid: [
        {
            code: "app.use(function (error, req, res) {})",
            errors: [{
                message: "express error middleware requires 4 params: `error, req, res, next`",
                type: "FunctionExpression"
            }]
        },
        {
            code: "app.use(function (err, req, res) {})",
            errors: [{
                message: "express error middleware requires 4 params: `err, req, res, next`",
                type: "FunctionExpression"
            }]
        },
        {
            code: "app.use(function (e, req, res) {})",
            errors: [{
                message: "express error middleware requires 4 params: `e, req, res, next`",
                type: "FunctionExpression"
            }]
        },
        {
            code: "app.use(function (error, request, res) {})",
            errors: [{
                message: "express error middleware requires 4 params: `error, request, res, next`",
                type: "FunctionExpression"
            }]
        },
        {
            code: "app.use(function (error, req, resp) {})",
            errors: [{
                message: "express error middleware requires 4 params: `error, req, resp, next`",
                type: "FunctionExpression"
            }]
        },
        {
            code: "app.use(function (error, req, response) {})",
            errors: [{
                message: "express error middleware requires 4 params: `error, req, response, next`",
                type: "FunctionExpression"
            }]
        },
    ]
});
