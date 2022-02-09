import {create} from "react-test-renderer";
import React from "react";
import {Pagenator} from "./Pagenator";

describe("Pagenator test", () => {
    test("page count 11 but show only 10", () => {
        const component = create(<Pagenator totalItemsCount={11} pageSize={1}  portionSize={10}/>);
        const root = component.root;
        let spans = root.findAllByType('span')
        expect(spans.length).toBe(10);
    });
});