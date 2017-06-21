/**
* @fileoverview Use 4 params in the error middleware function. Express looks at the number of params the middleware takes to determine whether it is normal middleware (3) or error middleware(4).
* @author godspeedelbow
*/
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Use 4 params in the error middleware function. Express looks at the number of params the middleware takes to determine whether it is normal middleware (3) or error middleware(4).",
            category: "Possible Errors",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {
        return {
            "FunctionExpression[params.length=3], ArrowFunctionExpression[params.length=3]": node => {
                const [err, req, res] = node.params;

                if (['error', 'err', 'e'].indexOf(err.name) === -1) return;
                if (['request', 'req'].indexOf(req.name) === -1) return;
                if (['response', 'resp', 'res'].indexOf(res.name) === -1) return;

                context.report(node, `express error middleware requires 4 params: \`${err.name}, ${req.name}, ${res.name}, next\``);
            },
        };
    }
};
