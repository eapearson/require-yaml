var requirejs = require('requirejs');
var assert = require('assert');

requirejs.config({
    nodeRequire: require,
    baseUrl: '.',
    paths: {
        'text': './bower_components/requirejs-text/text',
        'yaml2': './bower_components/yaml2/lib/browser',
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
                console.log('yaml is...', yamljs);
                assert.deepEqual(expected, yamljs.eval(input));
            } catch (ex) {
                console.log('failed', ex);
                done.fail();
            }
            done();
        });
    });

    it('should render YAML into JavaScript objects', function(done) {
        requirejs(['yaml!test/fixtures/test.yaml'], function(data) {
            assert.deepEqual(data, {
                key1: 'string',
                key2: {
                    nested1: 999,
                    nested2: 'foo'
                },
                key3: [9, 8, 7, 6]
            });
            done();
        });
    });

    it('should call the errback on malformed input', function(done) {
        requirejs(['yaml!test/fixtures/invalid.yaml'], function() {
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