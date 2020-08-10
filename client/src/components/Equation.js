import React from "react";

export function equation(exponential, polynomial, logarithm) {
  var Latex = require('react-latex');
  var tag = '$$';
  var addition = ' + ';
  var polynomialTerm =
    polynomial > 1 ?
      `x^${polynomial}`
      : polynomial === 1 ?
        `x`
        : '';
  var logarithmTerm =
    logarithm > 1 ?
      `log^${logarithm}{y}`
      : logarithm === 1 ?
        `log{x}`
        : '';
  var exponentialTerm =
    exponential > 1 ?
      `${exponential}^x`
      : exponential === 1 ?
        (logarithm || polynomial) ? ""
          : '1'
        : '';
  var joinedTerms = ([exponentialTerm, polynomialTerm, logarithmTerm].filter(x => x)).join(addition);
  var equation = tag + joinedTerms + tag;

  return <Latex displayMode={true}>{equation}</Latex>;
}