'use strict';

jest.dontMock('../../../scripts/components/forms/AddExercise.js');
jest.mock('../../../scripts/actions/AppStateActionCreators.js');
jest.mock('../../../scripts/actions/ExerciseStoreActionCreators');
let React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    AppStateActionCreators = require('../../../scripts/actions/AppStateActionCreators'),
    ExerciseStoreActionCreators = require('../../../scripts/actions/ExerciseStoreActionCreators'),
    AddExercise = require('../../../scripts/components/forms/AddExercise.js');

describe("AddExercise", () => {
    afterEach(() => {
        AppStateActionCreators.closeModal.mockClear(); 
        ExerciseStoreActionCreators.addExercise.mockClear(); 
    });
    
    it("renders an AddExercise form", () => {
        let addExercise = TestUtils.renderIntoDocument(
            <AddExercise  />
        );
        expect(TestUtils.isCompositeComponent(addExercise)).toEqual(true);
        expect(addExercise.getDOMNode().className).toEqual("form exercises");
    });

    it("closes the modal on cancel", () => {
        let addExercise = TestUtils.renderIntoDocument(
            <AddExercise  />
        );
        let cancelButton = TestUtils.findRenderedDOMComponentWithClass(addExercise, 'cancelButton');
        TestUtils.Simulate.click(cancelButton.getDOMNode());
        expect(AppStateActionCreators.closeModal.mock.calls.length).toBe(1);
    });

    it("saves the exercise and closes the modal on submit", () => {
        let addExercise = TestUtils.renderIntoDocument(
            <AddExercise  />
        );
        let submitButton = TestUtils.findRenderedDOMComponentWithClass(addExercise, 'submitButton');
        TestUtils.Simulate.click(submitButton.getDOMNode());
        expect(AppStateActionCreators.closeModal.mock.calls.length).toBe(1);
        expect(ExerciseStoreActionCreators.addExercise.mock.calls.length).toBe(1);
    });
});

