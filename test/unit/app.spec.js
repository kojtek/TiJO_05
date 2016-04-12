describe('app', function () {
    'use strict';

    describe('generateMessage', function () {
        it('x', function () {
            expect(app.generateMessage("sedes")).toEqual({vowel: 2, palindrome: true});
            expect(app.generateMessage("komputer")).toEqual({vowel: 3, palindrome: false});
        });
        it('should return vowels in not-palindrome word', function () {
            expect(app.generateMessage('komputer')).toEqual({vowel: 3, palindrome: false});
        });
        it('should count vowels in palindrome', function () {
            expect(app.generateMessage('sedes')).toEqual({vowel: 2, palindrome: true});
            expect(app.generateMessage('kajak')).toEqual({vowel: 2, palindrome: true});
            expect(app.generateMessage('bob')).toEqual({ vowel: 1, palindrome: true });
        });
        it('should thrown an error message', function () {
            expect(function () {
                app.generateMessage('')
            }).toThrowError('Empty string!');
        });
    });

    describe('isPalindrome', function () {
        describe('toHaveBeenCalled', function () {
            beforeAll(function () {
                spyOn(app, 'isPalindrome');
                app.isPalindrome('ala');
            });
            it('should call isPalindrome function', function () {
                expect(app.isPalindrome).toHaveBeenCalled();
            });
        });
    });

    describe('and.callThrough', function () {
        beforeAll(function () {
            spyOn(app, 'isPalindrome').and.callThrough();
            app.generateMessage('kajak');
        });
        it('should call isPalindrome and vowelCount functions when generateMessage function is called', function () {
            expect(app.isPalindrome).toHaveBeenCalled();
            expect(app.isPalindrome).toHaveBeenCalledWith('kajak');
        });
    });

    describe('and.returnValue', function () {
        var returns;
        beforeAll(function () {
            spyOn(app, 'isPalindrome').and.returnValue(true);
        });
        it('should call generateMessage and return value {2, true}', function () {
            returns = app.generateMessage('zaraz');
            expect(returns).toEqual({vowel: 2, palindrome: true});
        });
        it('should call isPalindrome and vowelCount should return true and 2', function () {
            returns = app.isPalindrome('ala');
            expect(returns).toEqual(true);
        });
    });

    describe('and.callFake', function () {
        beforeAll(function () {
            spyOn(app, 'isPalindrome').and.callFake(function () {
                return 'FAKE FUNCTION'
            });
        });
        it('should call isPalindrome fake function', function () {
            expect(app.isPalindrome('aszd')).toEqual('FAKE FUNCTION');
        });
        it('should notice isPalindrome called second time when generateMessage called', function () {
            expect(app.generateMessage('ala')).toEqual({vowel: 2, palindrome: 'FAKE FUNCTION'});
        });
    });

    describe('calls.count()', function () {
        var returns;
        beforeAll(function () {
            spyOn(app, 'vowelCount').and.callThrough();
        });
        it('should call vowelCount function', function () {
            returns = app.vowelCount('ala');
            expect(app.vowelCount.calls.count()).toBe(1);
        });
        it('should notice vowelCount called second time when generateMessage called', function () {
            returns = app.generateMessage('sedes');
            expect(app.vowelCount.calls.count()).toBe(2);
        });
        it('should notice vowelCount called third time when generateMessage is called second time', function () {
            returns = app.generateMessage('kubek');
            expect(app.vowelCount.calls.count()).toBe(3);
        });
    });
});