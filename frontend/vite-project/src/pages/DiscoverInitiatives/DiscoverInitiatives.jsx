import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Foter/Footer.jsx';
import Sec6 from '../../components/Page1/Sec6/Sec6.jsx';
import './DiscoverInitiatives.scss';

const initialRfps = [
  {
    id_intial: 1,
    title: 'Funding Rate Page',
    description: 'Page that provides a live look at all funding rates with popular timeframes in annualized format',
    funding_amount: '$45,000 - $85,000',
    status: 'Funded'
  },
  {
    id_intial: 2,
    title: 'CLI Trading Tool',
    description: 'Self-hosted CLI tool leveraging the dYdX API to allow all functionalities from a terminal',
    funding_amount: '$25,000 - $40,000',
    status: 'Funded'
  },
  {
    id_intial: 3,
    title: 'New Language SDKs',
    description: 'Replicate existing Python SDK to new programming languages with all the same features',
    funding_amount: '$25,000 - $40,000',
    status: 'Open'
  },
  {
    id_intial: 4,
    title: 'Liquidation Alert Tool',
    description: 'Self-hosted tool that alerts the trader of upcoming liquidation prices across multiple messaging venues',
    funding_amount: '$30,000 - $50,000',
    status: 'Completed'
  },
  {
    id_intial: 5,
    title: 'Governance Dashboard',
    description: 'Governance page to promote discussions, proposals, delegation and voting telemetry',
    funding_amount: '$15,000 - $30,000',
    status: 'Open'
  },
  {
    id_intial: 6,
    title: 'Delegation Tool',
    description: 'Webpage to allow active participants to market their voting and enable direct delegation from dYdX holders',
    funding_amount: '$15,000 - $30,000',
    status: 'Completed'
  },
  {
    id_intial: 7,
    title: 'Newsletter',
    description: 'Weekly or Monthly newsletters promoting and educating developers on the dYdX platform',
    funding_amount: '$10,000 - $20,000',
    status: 'Funded'
  },
  {
    id_intial: 8,
    title: 'Discord bots',
    description: 'Additional Discord bots that notify members of real-time trading activity on dYdX and governance votes',
    funding_amount: '$5,000 - $10,000',
    status: 'Open'
  },
  {
    id_intial: 9,
    title: 'Reward tracking & Simulator',
    description: 'Page or tool that allows traders to calculate future rewards and simulate earnings from perpetual volume activity',
    funding_amount: '$20,000 - $30,000',
    status: 'Completed'
  }
];

export default function DiscoverInitiatives() {
  const [rfps, setRfps] = useState(initialRfps);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const url = activeTab === 'All' 
      ? 'http://localhost:3000/api/projects' 
      : `http://localhost:3000/api/projects?status=${activeTab}`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setRfps(data);
        }
      })
      .catch(() => {
        if (activeTab === 'All') {
          setRfps(initialRfps);
        } else {
          setRfps(initialRfps.filter(item => item.status?.toLowerCase() === activeTab.toLowerCase()));
        }
      });
  }, [activeTab]);

  const tabs = ['All', 'Open', 'Funded', 'Completed'];

  const renderStatusBadge = (status) => {
    const s = (status || 'Funded').toLowerCase();
    if (s === 'completed') {
      return (
        <span className="rfp_status_badge status_completed">
          Completed <span className="status_check">✓</span>
        </span>
      );
    }
    if (s === 'open') {
      return (
        <span className="rfp_status_badge status_open">
          Open
        </span>
      );
    }
    return (
      <span className="rfp_status_badge status_funded">
        Funded
      </span>
    );
  };

  return (
    <div className="initiatives_page">
      <Header />

      <main className="initiatives_main">
        <div className="initiatives_center">
          <div className="initiatives_header">
            <h1 className="initiatives_title">Discover initiatives (RFPs)</h1>
            <p className="initiatives_subtitle">
              The list below includes initial ideas that we think could make excellent Grants.
              This is a living list that will continue to update as ideas popup.
            </p>

            <div className="initiatives_tabs">
              {tabs.map(tab => (
                <button
                  key={tab}
                  className={`initiatives_tab_btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="initiatives_list">
            {rfps.map(project => {
              const projectId = project.id_intial || project.id;
              return (
                <Link 
                  key={projectId} 
                  to={`/projects/${projectId}`} 
                  className="rfp_card"
                >
                  <div className="rfp_card_left">
                    <h3 className="rfp_card_title">{project.title}</h3>
                    <p className="rfp_card_desc">{project.description}</p>
                    <span className="rfp_card_amount">
                      Funding amount: <strong>{project.funding_amount}</strong>
                    </span>
                  </div>

                  <div className="rfp_card_right">
                    {renderStatusBadge(project.status)}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <Sec6 />
      </main>

      <Footer />
    </div>
  );
}
