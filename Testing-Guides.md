# Testing Guides
This testing guide briefly explains about `Product API`'s Unit Test System.

## Product API Unit Test System
This project uses [Mocha JS Testing Framework](https://mochajs.org/) along with `should js` and `super test`.

This test will covers 90+ cases that check this API comprehensively. Although it may not be perfect, I believe it covers almost all cases that might occur during the production.

This test uses `make` command so Windows users might need to run this test inside Unix Environment Simulators (such as `CygWin`). *Note: I haven't tested it on windows yet*.

## Test Configuration
The `test/test-config.js` contains several test configurations that you can change.

## Begin the Test
After following [Setup Guides](SETUP.md), the tests can be conducted by issuing:

```
npm test
```

*Note: The tests worked well on OS X and CentOS 7*

