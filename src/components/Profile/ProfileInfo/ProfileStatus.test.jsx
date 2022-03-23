import React from "react";
import {ProfileStatusWithHooks as ProfileStatus} from './ProfileStatusWithHooks';
import {create} from "react-test-renderer";


describe("ProfileStatus component", () => {
    test("status from props should be displayed", () => {
        const component = create(<ProfileStatus status="TEST"/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("TEST");
    });
    test("after creation <span> should be displayed with correct status", () => {
        const component = create(<ProfileStatus status="TEST"/>);
        const root = component.root;
        let span = root.findByType('span')
        expect(span.children[0]).toBe("TEST");
    });
    test("after creation <input> should NOT be displayed", () => {
        const component = create(<ProfileStatus status="TEST"/>);
        const root = component.root;
        expect(() => {
            root.findByType('input')
        }).toThrow()
    });
    test("input should  be displayed in EditMode instead of span", () => {
        const component = create(<ProfileStatus status="TEST" activateEditMode={() => {
        }}/>);
        const instance = component.getInstance();
        const root = component.root;
        let span = root.findByType('span');
        span.props.onDoubleClick(instance.activateEditMode);
        let input = root.findByType('input')
        expect(input.props.value).toBe("TEST")
    });
    test("callback should be called", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status="TEST" updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.deActivateEditMode()
        let res = mockCallback.mock.calls.length
        expect(res).toBe(1)
    });
});

