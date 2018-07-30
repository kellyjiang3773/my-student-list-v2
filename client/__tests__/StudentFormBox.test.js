import StudentFormBox from '../src/components/StudentFormBox';

describe('tests for <StudentFormBox>', () => {
    // console.log(StudentFormBox.isEmpty({num: null}));
    it('isEmpty() returns true for empty object', () => {
        expect(StudentFormBox.isEmpty({})).toBe(true);
    });
    
    it('isEmpty() returns false for nonempty object', () => {
        expect(StudentFormBox.isEmpty({num: null})).toBe(false);
    });

    it('replaceBlanks() works', () => {
        const newState = StudentFormBox.replaceBlanks('','67','');
        expect(newState.aMark).toBe('N/A');
        expect(newState.mMark).toBe('67');
        expect(newState.fMark).toBe('N/A');
    });
});