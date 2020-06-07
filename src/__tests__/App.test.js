import {shallow} from "enzyme";
import App from "../components/App";
import React from "react";
import * as userProvider from "../contexts/UserProvider";

describe('App', () => {
    it('App levanta sin problemas', () => {
        userProvider.useUser = jest.fn().mockReturnValue({loading: false});
        const component = shallow(<App />);
        expect(component).toMatchSnapshot();
    });

    it('App levanta en loading', () => {
        userProvider.useUser = jest.fn().mockReturnValue({loading: true});
        const component = shallow(<App />);
        expect(component).toMatchSnapshot();
    });
});