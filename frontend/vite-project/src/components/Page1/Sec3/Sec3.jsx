import { NavLink } from 'react-router-dom';
import sparcle from '../../../assets/images/page1/sparcle.png';
import arrowRightPurple from '../../../assets/images/page1/arrow_right_purple.svg';
import imageBlock1 from '../../../assets/images/page1/image block/Image Block.png';
import imageBlock2 from '../../../assets/images/page1/image block/Image Block-1.png';
import './Sec3.scss';

const newsItems = [
  {
    id: 1,
    image: imageBlock1,
    tag: 'Funding round',
    title: 'Round 9 of approvals',
    date: 'January 1, 2022'
  },
  {
    id: 2,
    image: imageBlock2,
    tag: 'Funding round',
    title: 'Round 8 of approvals',
    date: 'January 1, 2022'
  }
];

export default function Sec3() {
  return (
    <section className="sec3">
      <div className="sec3_center">
        <div className="sec3_header">
          <img src={sparcle} alt="" className="sec3_sparcle" />
          <h2 className="sec3_title">What's new?</h2>
          <p className="sec3_subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nulla risus,
            consectetur ut bibendum non, gravida non libero.
          </p>
          <NavLink to="/blog" className="sec3_link">
            <span>Read more on our blog</span>
            <img src={arrowRightPurple} alt="" className="sec3_link_arrow" />
          </NavLink>
        </div>

        <div className="sec3_grid">
          {newsItems.map(item => (
            <div key={item.id} className="sec3_card">
              <div className="sec3_card_img_wrap">
                <img src={item.image} alt={item.title} className="sec3_card_img" />
              </div>
              <div className="sec3_card_info">
                <span className="sec3_card_tag">{item.tag}</span>
                <h3 className="sec3_card_title">{item.title}</h3>
                <span className="sec3_card_date">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
