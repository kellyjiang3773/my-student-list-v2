import Student from '../Student';
import React from 'react';
// import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({adapter: new Adapter()});

describe('DOM test for <Student>', () => {

    let rendered, mockProps;

    const setup = (name, aMark, mMark, fMark, id) => {
        mockProps = {
            name: name,
            aMark: aMark,
            mMark: mMark,
            fMark: fMark,
            id: id,
            handleUpdate: jest.fn(),
            handleDelete: jest.fn()
        };
        rendered = shallow(
            <Student 
                name={mockProps.name}
                aMark={mockProps.aMark}
                mMark={mockProps.mMark}
                fMark={mockProps.fMark}
                id={mockProps.id}
                handleUpdateStudent = {mockProps.handleUpdate}
                handleDeleteStudent = {mockProps.handleDelete}
            />
        )
    };

    it('renders correctly', () => {
        setup('Johnny Dee', '67', '76', '78', '1');
        expect(toJson(rendered)).toMatchSnapshot();
    });

    it('converts blanks to N/A', () => {
        setup('Johnny Dee', '89', '1', '', '1');
        expect(rendered.find('p').first().text()).toEqual('Assignment mark: 89');
        expect(rendered.find('p').at(1).text()).toEqual('Midterm exam mark: 1');
        expect(rendered.find('p').at(2).text()).toEqual('Final exam mark: N/A');
    });

    it('renders buttons', () => {
        setup('Johnny Dee', '67', '76', '78', '1');
        expect(rendered.find('button').first().text()).toEqual('Update');
        expect(rendered.find('button').at(1).text()).toEqual('Delete');
    });

    it('calls handleUpdateStudent when Update button clicked', () => {
        setup('Johnny Dee', '67', '76', '78', '1');
        const updateButton = rendered.find('button').first();
        updateButton.simulate('click');
        expect(mockProps.handleUpdate).toBeCalledWith(mockProps.id);
    });

    it('calls handleDeleteStudent when Delete button clicked', () => {
        setup('Johnny Dee', '67', '76', '78', '1');
        const deleteButton = rendered.find('button').at(1);
        deleteButton.simulate('click');
        expect(mockProps.handleDelete).toBeCalledWith(mockProps.id);
    });
});