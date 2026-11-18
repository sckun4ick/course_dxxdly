import { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import arrowRightPurple from '../../../assets/images/page1/arrow_right_purple.svg';
import rightArrowBlack from '../../../assets/icons/right_arrow_black.svg';
import './Sec2.scss';

const initialProjects = [
  {
    id_intial: 1,
    category: 'Crowdfund',
    title: 'Funding rates page',
    funding_amount: '$5,000 - $6,000',
    description: 'Grant will be used to build a dedicated web app to give traders a view of all dYdX asset funding rates across multiple timeframes. The page will be interactive to include deep diving across different assets and historical analysis of changing rates. It will also include API functionalities to allow developer access.',
    avatars: ['/avatars/Rectangle.png', '/avatars/Rectangle-1.png'],
    has_preview: false
  },
  {
    id_intial: 2,
    category: 'Edition',
    title: 'Tradingview integration',
    funding_amount: '$5,000 - $6,000',
    description: 'The grant will be used to build a web application that integrates Tradingview strategies into a dYdX Trading account to execute trades directly through a strategy. Users will be able to tap into Tradingview resources and test out different strategies in real-time.',
    avatars: ['/avatars/Rectangle-2.png', '/avatars/Rectangle-3.png', '/avatars/Rectangle-4.png'],
    has_preview: true
  },
  {
    id_intial: 3,
    category: 'Entry',
    title: 'Rewards optimization research and paper',
    funding_amount: '$5,000 - $6,000',
    description: 'The Grant will be used to write a full research report and code samples that will determine optimal trading strategies for rewards maximization. The paper will be marketed across several platforms and shared among trading circles to help readership.',
    avatars: ['/avatars/Rectangle-5.png', '/avatars/Rectangle-6.png', '/avatars/Rectangle-7.png'],
    has_preview: false
  },
  {
    id_intial: 4,
    category: 'Crowdfund',
    title: 'DAO Analytics Dashboard & Research',
    funding_amount: '$8,000 - $10,000',
    description: 'The grant will be used for research on governance proposals, DAO structure, and historical voting telemetry to deliver transparent reporting across community contributors and validator stakeholders.',
    avatars: ['/avatars/Rectangle-8.png', '/avatars/Rectangle.png'],
    has_preview: false
  },
  {
    id_intial: 5,
    category: 'Edition',
    title: 'Cross-Chain Liquidity Vaults',
    funding_amount: '$12,000 - $15,000',
    description: 'Automated hedging and cross-margin yield optimization contract tooling, connecting multi-chain decentralized orders and deep liquidity pools with minimal slippage.',
    avatars: ['/avatars/Rectangle-1.png', '/avatars/Rectangle-3.png', '/avatars/Rectangle-6.png'],
    has_preview: true
  }
];

export default function Sec2() {
  const [projects, setProjects] = useState(initialProjects);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/projects?limit=5')
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(() => {});
  }, []);

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <section className="sec2" id="projects-section">
      <div className="sec2_center">
        <div className="sec2_header">
          <h2 className="sec2_title">Projects built with grants</h2>
          <p className="sec2_subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nulla risus,
            consectetur ut bibendum non, gravida non libero.
          </p>
          <NavLink to="/funded-grants" className="sec2_link">
            <span>View all funded projects</span>
            <img src={arrowRightPurple} alt="" className="sec2_link_arrow" />
          </NavLink>
        </div>

        <div className="sec2_cards_wrapper">
          <div className="sec2_cards" ref={sliderRef}>
            {projects.map((project) => {
              const projectId = project.id_intial || project.id;
              const hasPreview = project.has_preview !== undefined ? project.has_preview : project.hasPreview;
              const avatarList = Array.isArray(project.avatars) ? project.avatars : [];

              return (
                <Link key={projectId} to={`/projects/${projectId}`} className="sec2_card">
                  {hasPreview && (
                    <div className="sec2_card_top_img">
                      <div className="sec2_card_placeholder"></div>
                    </div>
                  )}

                  <div className="sec2_card_bottom">
                    <div className="sec2_card_bottom_center">
                      <div className="sec2_card_info">
                        <span className="sec2_card_category">{project.category}</span>
                        <h3 className="sec2_card_title">{project.title}</h3>
                        <p className="sec2_card_amount">
                          Funding amount: <span>{project.funding_amount}</span>
                        </p>
                        <p className="sec2_card_desc">{project.description}</p>
                      </div>

                      <div className="sec2_card_avatars">
                        {avatarList.map((av, i) => (
                          <img 
                            key={i} 
                            src={av} 
                            alt="" 
                            className="sec2_avatar" 
                            style={{ zIndex: 10 - i, transform: i > 0 ? `translateX(-${i * 8}px)` : 'none' }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <button className="sec2_slider_btn" onClick={slideRight} aria-label="Next slide">
            <img src={rightArrowBlack} alt="" className="sec2_slider_arrow" />
          </button>
        </div>
      </div>
    </section>
  );
}
