
import {expect} from 'chai';
import React from 'react';                     // required to get test to work.  we can get around this later with more configuration
import { shallow, mount, render } from 'enzyme';              // method from enzyme which allows us to do shallow render
import SelectionScreen from "../app/components/SelectionScreen"
import TopicsList from "../app/components/TopicsList"
import CreateTopic from "../app/components/CreateTopic"

describe('Selection Page', () => {
  it('renders as a <div>', () => {
    const wrapper = shallow(<SelectionScreen />);
    expect(wrapper.type()).to.eql('div');
  });

  it('should render a TopicsList component', () => {
    const wrapper = shallow(<SelectionScreen />);
    expect(wrapper.find(TopicsList)).to.have.length(1);
  });

  it('should render a CreateTopic component', () => {
    const wrapper = shallow(<SelectionScreen />);
    expect(wrapper.find(CreateTopic)).to.have.length(1);
  });

});



