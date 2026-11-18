import { useState } from 'react';
import faqCircle from '../../../assets/images/page1/faq_circle.svg';
import fiPlus from '../../../assets/icons/fi_plus.svg';
import './Sec4.scss';

const faqQuestions = [
  { id: 1, question: 'How do I apply?' },
  { id: 2, question: 'Can I apply as a U.S. based person/company?' },
  { id: 3, question: 'How will I be compensated?' },
  { id: 4, question: 'What type of project will qualify for a Grant?' },
  { id: 5, question: 'What is the application timeline? When can I expect to hear back?' },
  { id: 6, question: 'How can I increase my chances of getting funded?' },
  { id: 7, question: 'How often do you approve new Rounds of funding?' }
];

export default function Sec4() {
  const [openIds, setOpenIds] = useState([]);

  const toggleQuestion = (id) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="sec4" id="faq-section">
      <div className="sec4_center">
        <div className="sec4_header">
          <h2 className="sec4_title">
            Frequently asked{' '}
            <span className="sec4_highlight">
              questions
              <img src={faqCircle} alt="" className="sec4_circle_img" />
            </span>
          </h2>
          <p className="sec4_subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nulla risus,
            consectetur ut bibendum non, gravida non libero.
          </p>
        </div>

        <div className="sec4_accordion">
          {faqQuestions.map(item => {
            const isOpen = openIds.includes(item.id);
            return (
              <div 
                key={item.id} 
                className={`sec4_item ${isOpen ? 'open' : ''}`}
                onClick={() => toggleQuestion(item.id)}
              >
                <div className="sec4_item_question">
                  <span className="sec4_item_title">{item.question}</span>
                  <div className={`sec4_item_icon_wrap ${isOpen ? 'rotated' : ''}`}>
                    <img src={fiPlus} alt="Toggle answer" className="sec4_item_icon" />
                  </div>
                </div>

                {isOpen && (
                  <div className="sec4_item_answer">
                    <p className="sec4_answer_text">
                      Ответ на вопрос: lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                      Quisque nulla risus, consectetur ut bibendum non, gravida non libero. 
                      Duis sit amet semper diam, a luctus turpis. Proin elementum justo eu nisl pharetra.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
