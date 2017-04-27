import React from 'react';
import { shallow } from 'enzyme';

import { QuestionForm } from '../components/QuestionForm';
import AnswerForSingleQuestion from '../components/AnswerForSingleQuestion';
import  { questions } from '../data/questions';

// simple unit test

describe('QuestionForm', () => {
    it('renders answers for single question', () => {
        const wrapper = shallow(<QuestionForm questions={questions} />);
        expect(wrapper.find(AnswerForSingleQuestion).length).toBe(3)
    })
});
