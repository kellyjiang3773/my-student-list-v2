import StudentList from '../src/components/StudentList';
import React from 'react';
// import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

describe('DOM test for <StudentList>', () => {

    const mockValues = [
        {name: 'Isaac Newton', _id: '1', url: '1'},
        {name: 'Albert Einstein', _id: '2', url: '2'},
        {name: 'Tycho Brahe', _id: '3', url: '3'}
    ];

    let rendered;
    const setup = (data) => {
        rendered = shallow(
            <StudentList
                data={data}
            />
        );
    };

    it('renders a list of students', () => {
        setup(mockValues);
        expect(toJson(rendered)).toMatchSnapshot();
    });

    it('renders a message when list is empty', () => {
        setup([]);
        expect(rendered.find('li').first().text()).toEqual('There are no students');
    });

    it('link points to right direction', () => {
        setup(mockValues);
        expect(rendered.find('Link').first().props().to).toBe(mockValues[0].url);
        expect(rendered.find('Link').at(1).props().to).toBe(mockValues[1].url);
        expect(rendered.find('Link').at(2).props().to).toBe(mockValues[2].url);
    });
});