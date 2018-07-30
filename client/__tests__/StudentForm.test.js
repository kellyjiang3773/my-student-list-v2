import StudentForm from '../src/components/StudentForm';
import React from 'react';
// import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

describe('DOM test for <StudentForm>', () => {

    const handleChangeText = jest.fn();
    const handleSubmit = jest.fn();

    const mockValues1 = {
        name: 'Jane Doe',
        aMark: '88',
        mMark: '99',
        fMark: '',
        updateId: true
    };

    const mockValues2 = {
        name: '',
        aMark: '',
        mMark: '',
        fMark: '',
        updateId: null
    };
    
    let rendered;
    
    const setup = (values) => {
        rendered = shallow(
            <StudentForm
                name={values.name}
                aMark={values.aMark}
                mMark={values.mMark}
                fMark={values.fMark}
                update={values.updateId}
                handleChangeText={handleChangeText}
                handleSubmit={handleSubmit}
            />
        );
    };
    

    it('renders correctly', () => {
        setup(mockValues1);
        expect(toJson(rendered)).toMatchSnapshot();
    });

    it('renders update title for updates', () => {
        setup(mockValues1);
        expect(rendered.find('h2').text()).toEqual('Update Student:');
    });

    it('renders update title for updates', () => {
        setup(mockValues2);
        expect(rendered.find('h2').text()).toEqual('Add Student:');
    });

    it('renders button', () => {
        setup(mockValues1);
        expect(rendered.find('button').first().text()).toEqual("Submit");
    });

    it('calls handleSubmit when submit button clicked', () => {
        setup(mockValues1);
        const button = rendered.find('form');
        button.simulate('submit');
        expect(handleSubmit.mock.calls.length).toBe(1);
        expect(handleSubmit).toBeCalled();
    });

    it('renders inputs for updating student', () => {
        setup(mockValues1);
        const inputs = rendered.find('input');
        expect(inputs.first().props().value).toBe('Jane Doe');
        expect(inputs.at(1).props().value).toBe('88');
        expect(inputs.at(2).props().value).toBe('99');
        expect(inputs.at(3).props().value).toBe('');
    });

    it('calls handleChangeText at user input', () => {
        setup(mockValues2);
        const newName = 'Joe Sugg';
        const nameProp = rendered.find('#name');
        nameProp.simulate('change', {target: {name: 'name', value: newName}});
        expect(handleChangeText).toBeCalled();
    });

});