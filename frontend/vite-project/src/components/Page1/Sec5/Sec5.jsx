import curvedArrow from '../../../assets/icons/Right arrow curved.svg';
import './Sec5.scss';

const processSteps = [
  {
    step: '1',
    title: 'Apply',
    description: 'Submit a complete application to the dYdX Grants Team including as many details as possible about the proposed idea and their background.'
  },
  {
    step: '2',
    title: 'Interview',
    description: "If your application is selected, the dYdX Grants will conduct 1-2 interviews to collect more information on the Applicant's background and the proposal."
  },
  {
    step: '3',
    title: 'Grant offer',
    description: 'The dYdX Grants team will determine if the proposal fits into the grant program. A vesting schedule and timeline for product development reports will also be determined in the offer;'
  }
];

export default function Sec5() {
  return (
    <section className="sec5">
      <div className="sec5_center">
        <div className="sec5_header">
          <h2 className="sec5_title">Application process</h2>
          <p className="sec5_subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nulla risus,
            consectetur ut bibendum non, gravida non libero.
          </p>
        </div>

        <div className="sec5_steps_wrap">
          {processSteps.map((item, idx) => (
            <div key={item.step} className="sec5_step_container">
              <div className="sec5_card">
                <span className="sec5_card_number">{item.step}</span>
                <h3 className="sec5_card_title">{item.title}</h3>
                <p className="sec5_card_desc">{item.description}</p>
              </div>

              {idx < processSteps.length - 1 && (
                <div className={`sec5_arrow_wrap arrow_${idx + 1}`}>
                  <img src={curvedArrow} alt="" className="sec5_curved_arrow" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
