var requirejs = require('requirejs');
var assert = require('assert');
var util = require('util');

requirejs.config({
    nodeRequire: require,
    baseUrl: '.',
    paths: {
        'text': './bower_components/requirejs-text/text',
        'yaml2': './bower_components/yaml2/lib/browser',
        'js-yaml': './bower_components/js-yaml/dist/js-yaml',
        'yaml': './yaml'
    }
});

describe('yaml loader', function() {

    it('Should use the core yaml parser', function(done) {
        requirejs([
            'yaml2'
        ], function(
            yamljs
        ) {
            try {
                var expected = {
                    greeting: 'hello'
                };
                var input = 'greeting: "hello"';
                var actual = yamljs.eval(input);
                console.log('yaml is...', actual);
                assert.deepEqual(expected, actual);
            } catch (ex) {
                console.log('failed', ex);
                done.fail();
            }
            done();
        });
    });

    it('should render YAML into JavaScript objects', function(done) {
        requirejs(['yaml!test/fixtures/test.yaml'], function(data) {
            console.log('data', data);
            var expected = {
                key1: 'string',
                key2: {
                    nested1: 999,
                    nested2: 'foo'
                },
                key3: [9, 8, 7, 6]
            };
            assert.deepEqual(data, expected);
            done();
        });
    });

    it('should call the errback on malformed input', function(done) {
        requirejs(['yaml!test/fixtures/invalid.yaml'], function(data) {
            console.log('oops', util.inspect(data, false, null));
            assert(false);
            done();
        }, function(err) {
            assert(true);
            done();
        });
    });

});

// describe('yaml writer', function(done) {
//     it('compiles YAML into dependency-less modules', function(done) {

//         this.timeout(7500);

//         requirejs.optimize({
//             baseUrl: '.',
//             name: './bower_components/almond/almond',
//             paths: {
//                 'text': './bower_components/requirejs-text/text',
//                 'yaml.js': './bower_components/yaml.js/dist/yaml',
//                 'yaml': './yaml'
//             },
//             optimize: 'none',
//             include: ['./test/main'],
//             inlineText: false,
//             stubModules: ['text', 'yaml.js', 'yaml'],
//             out: 'test/main-built.js'
//         }, function() {
//             var exec = require('child_process').exec;
//             var process = exec('phantomjs test/loadindex.js', function(err, stdout) {
//                 if (err) {
//                     assert(false);
//                 } else {
//                     assert(stdout.indexOf('<h1 id="fixture">foo</h1>') > -1);
//                 }
//                 done();
//             });
//         });

//     });
// });