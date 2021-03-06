'use strict';

jest.dontMock('../../scripts/components/Menu.js');
jest.mock('react-router');
jest.mock('../../scripts/stores/MenuStore.js');
jest.mock('../../scripts/actions/AppStateActionCreators.js');
let React = require('react/addons'),
    AppStateActionCreators = require('../../scripts/actions/AppStateActionCreators'),
    MenuStore = require('../../scripts/stores/MenuStore.js'),
    Menu = require('../../scripts/components/Menu.js'),
    StubRouterContext = require('../../StubRouterContext.js');

let TestUtils = React.addons.TestUtils;

describe("Menu", () => {
    let ContextComponent = StubRouterContext(Menu, {className: 'hello'}),
        menu,
        wrapped;
    beforeEach(() => {
        MenuStore.getMenuPoints.mockImplementation(() => {
            return [
                {
                    name: 'Home',
                    link: 'home',
                    icon: 'home'
                },
                {
                    name: 'Exercises',
                    link: 'exercises',
                    icon: 'home'
                }
            ];
        });
        wrapped = TestUtils.renderIntoDocument(<ContextComponent/>);
        menu = TestUtils.findRenderedComponentWithType(wrapped, Menu);
    });

    afterEach(() => {
        MenuStore.getMenuPoints.mockClear();
    });

    it("renders a Menu", () => {
        menu = TestUtils.findRenderedComponentWithType(wrapped, Menu);
        expect(TestUtils.isCompositeComponent(menu)).toEqual(true);
        expect(menu.getDOMNode().className).toEqual("hello menu");
        menu.componentWillUnmount();
    });

    it("renders a Menu with items", () => {
        menu = TestUtils.findRenderedComponentWithType(wrapped, Menu);
        menu.transitionTo = jest.genMockFunction();
        let firstItem = TestUtils.scryRenderedDOMComponentsWithClass(menu, 'menubutton');
        TestUtils.Simulate.click(firstItem[0].getDOMNode());
        expect(AppStateActionCreators.closeMenu.mock.calls.length).toBe(1);
        expect(menu.context.router.transitionTo.mock.calls.length).toBe(1);
    });

    it("sets the state from the menustore on change", () => {
        menu = TestUtils.findRenderedComponentWithType(wrapped, Menu);
        menu._onChange();
        let menuItems = TestUtils.scryRenderedDOMComponentsWithClass(menu, 'menubutton');
        expect(menuItems.length).toBe(2);
    });
});

