jest.mock('./request');

import { GETlist, GETstudent, DELETEstudent, POSTstudent, PUTstudent } from './user';
import {temp_students} from './__mocks__/request';

describe('API testing', () => {

    const fakeID = 1000;
    const fakeBody1 = {
        name: 'Riley Ash',
        aMark: '87',
        mMark: '88',
        fMark: '89'
    };
    const fakeBody2 = {
        name: '',
        aMark: '',
        mMark: '',
        fMark: ''
    };

    describe('GETstudent', () => {
        it('can get student info', () => {
            expect.assertions(6);
            return GETstudent(1)
                .then(res => {
                    expect(res).toBeDefined();
                    expect(res.success).toBe(true);
                    expect(res.student.name).toBe('John Doe');
                    expect(res.student.aMark).toBe('100');
                    expect(res.student.mMark).toBe('10');
                    expect(res.student.fMark).toBe('0');
                })
        });

        it('can catch GET error (student not found)', () => {
            expect.assertions(3);
            return GETstudent(fakeID)
                .catch((res) => {
                    expect(res).toBeDefined();
                    expect(res.success).toBe(false);
                    expect(res.error).toBe('Student with ID [' + fakeID + '] not found');
                });
        });
    });

    describe('GETlist', () => {
        it('can get student list', () => {
            expect.assertions(3);
            return GETlist().then(res => {
                expect(res).toBeDefined();
                expect(res.success).toBe(true);
                expect(res.data).toEqual(temp_students);
            });
        });
    });

    describe('POSTstudent', () => {
        it('can successfully add student', () => {
            expect.assertions(2);
            return POSTstudent(fakeBody1)
                .then(res => {
                    expect(res).toBeDefined();
                    expect(res.success).toBe(true);
                });
        });

        it('can catch POST error (name not given)', () => {
            expect.assertions(3);
            return POSTstudent(fakeBody2)
                .catch(res => {
                    expect(res).toBeDefined();
                    expect(res.success).toBe(false);
                    expect(res.error)
                        .toBe('Error adding student '+JSON.stringify(fakeBody2));
                })
        });
    });

    describe('PUTstudent', () => {
        it('can successfully update student', () => {
            expect.assertions(2);
            return PUTstudent(1, fakeBody1)
                .then(res => {
                    expect(res).toBeDefined();
                    expect(res.success).toBe(true);
                });
        });

        it('can catch PUT error (student not found)', () => {
            expect.assertions(3);
            return PUTstudent(fakeID, fakeBody1)
                .catch(res => {
                    expect(res).toBeDefined();
                    expect(res.success).toBe(false);
                    expect(res.error)
                        .toBe('Student with ID [' + fakeID + '] not found');
                })
        });

        it('can catch PUT error (name not given)', () => {
            expect.assertions(3);
            return PUTstudent(1, fakeBody2)
                .catch(res => {
                    expect(res).toBeDefined();
                    expect(res.success).toBe(false);
                    expect(res.error)
                        .toBe('Error updating student '+JSON.stringify(fakeBody2));
                })
        });
    });

    describe('DELETEstudent', () => {
        it('can successfully delete student', () => {
            expect.assertions(2);
            return DELETEstudent(1)
                .then(res => {
                    expect(res).toBeDefined();
                    expect(res.success).toBe(true);
                })
        });

        it('can catch DELETE error (student not found)', () => {
            expect.assertions(2);
            return DELETEstudent(fakeID)
                .catch(res => {
                    expect(res).toBeDefined();
                    expect(res.error).toBe('Error deleting student with ID ['+fakeID+']');
                })
        });
    });
});