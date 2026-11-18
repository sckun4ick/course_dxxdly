import arrowRightPurple from '../../../assets/images/page1/arrow_right_purple.svg';
import './Sec6.scss';

export default function Sec6() {
  return (
    <section className="sec6">
      <div className="sec6_center">
        <div className="sec6_banner">
          <span className="sec6_sub">Have a project in mind?</span>
          <h2 className="sec6_title">Let’s create something awesome.</h2>
          <button className="sec6_btn">
            <span>Apply for grant</span>
            <img src={arrowRightPurple} alt="" className="sec6_btn_icon" />
          </button>
        </div>
      </div>
    </section>
  );
}
