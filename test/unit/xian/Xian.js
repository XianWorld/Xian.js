describe('xian/Xian', function () {
    'use strict';

    var expect = chai.expect;

    before(function(done) {
        // runs before all tests in this block
        //console.log('before the test');

        // Set configuration
        seajs.config({
            base: "/base/dist/"
        });
        seajs.use(['index-debug.js'], function (Xian) {
        //seajs.use(['../../../../index.js'], function (Xian) {
            console.log(Xian);

            Xian.globalize();

            done();
        });
    });

    after(function(){
        // runs after all tests in this block
        //console.log('after the test')
    });

    it('Module exists', function () {
        expect(Xian).to.be.an('object');
    });
});
