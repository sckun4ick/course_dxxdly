import { Link } from 'react-router-dom';
import arrowRight from '../../../assets/images/page1/arrow_right.svg';
import drawLine from '../../../assets/images/page1/draw_line.svg';
import downArrow from '../../../assets/icons/Down arrow.svg';
import './Sec1.scss';

export default function Sec1() {
  const scrollToNext = () => {
    const el = document.getElementById('projects-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="sec1">
      <div className="sec1_center">
        <div className="sec1_hero_text">
          <h1 className="sec1_title">
            Powering the future of <br />
            dYdX through <br />
            <span className="sec1_highlight">
              community grants
              <img src={drawLine} alt="" className="sec1_draw_line" />
            </span>
          </h1>
        </div>

        <div className="sec1_buttons">
          <Link to="/initiatives" className="sec1_btn_secondary">
            Discover RFPs
          </Link>
          <button className="sec1_btn_primary">
            Apply for grant
            <img src={arrowRight} alt="" className="sec1_btn_icon" />
          </button>
        </div>

        <div className="sec1_stats">
          <div className="sec1_stat_item">
            <h3 className="sec1_stat_value">100+</h3>
            <p className="sec1_stat_label">projects funded</p>
          </div>
          <div className="sec1_stat_item">
            <h3 className="sec1_stat_value">$3+ million</h3>
            <p className="sec1_stat_label">awarded</p>
          </div>
          <div className="sec1_stat_item">
            <h3 className="sec1_stat_value">400+</h3>
            <p className="sec1_stat_label">projects funded</p>
          </div>
        </div>

        <div className="sec1_arrow_wrap" onClick={scrollToNext}>
          <img src={downArrow} alt="Scroll down" className="sec1_down_arrow" />
        </div>
      </div>
    </section>
  );
}
