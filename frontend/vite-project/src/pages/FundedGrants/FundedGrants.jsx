import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Foter/Footer.jsx';
import './FundedGrants.scss';

const initialAllProjects = [
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
  },
  {
    id_intial: 6,
    category: 'Entry',
    title: 'Arbitrage & MEV Protection Bot',
    funding_amount: '$4,000 - $7,000',
    description: 'Open source bot repository providing advanced algorithmic order routing, slippage limits, and flash-loan risk simulations for perpetual trading across decentralized markets.',
    avatars: ['/avatars/Rectangle-2.png', '/avatars/Rectangle-4.png', '/avatars/Rectangle-7.png'],
    has_preview: false
  }
];

export default function FundedGrants() {
  const [projects, setProjects] = useState(initialAllProjects);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('http://localhost:3000/api/projects')
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

  const categories = ['All', 'Crowdfund', 'Edition', 'Entry'];
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category?.toLowerCase() === filter.toLowerCase());

  return (
    <div className="grants_page">
      <Header />
      
      <main className="grants_main">
        <section className="grants_hero">
          <div className="grants_hero_center">
            <h1 className="grants_title">Funded Grants</h1>
            <p className="grants_subtitle">
              Explore all community initiatives, tools, and research funded by dYdX community grants.
            </p>

            <div className="grants_filters">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`grants_filter_btn ${filter === cat ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="grants_list_sec">
          <div className="grants_list_center">
            <div className="grants_grid">
              {filteredProjects.map(project => {
                const projectId = project.id_intial || project.id;
                const hasPreview = project.has_preview !== undefined ? project.has_preview : project.hasPreview;
                const avatarList = Array.isArray(project.avatars) ? project.avatars : [];

                return (
                  <Link key={projectId} to={`/projects/${projectId}`} className="grants_card">
                    {hasPreview && (
                      <div className="grants_card_top_img">
                        <div className="grants_card_placeholder"></div>
                      </div>
                    )}

                    <div className="grants_card_bottom">
                      <div className="grants_card_bottom_center">
                        <div className="grants_card_info">
                          <span className="grants_card_category">{project.category}</span>
                          <h3 className="grants_card_title">{project.title}</h3>
                          <p className="grants_card_amount">
                            Funding amount: <span>{project.funding_amount}</span>
                          </p>
                          <p className="grants_card_desc">{project.description}</p>
                        </div>

                        <div className="grants_card_avatars">
                          {avatarList.map((av, i) => (
                            <img 
                              key={i} 
                              src={av} 
                              alt="" 
                              className="grants_avatar" 
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
