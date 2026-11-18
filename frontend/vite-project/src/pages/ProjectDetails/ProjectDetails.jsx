import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Foter/Footer.jsx';
import arrowRightPurple from '../../assets/images/page1/arrow_right_purple.svg';
import './ProjectDetails.scss';

const fallbackProject = {
  id_intial: 1,
  category: 'Edition',
  title: 'Chaos Labs Open Sources dYdX Trading CLI',
  status: 'Funded',
  funding_amount: '$5,000 - $6,000',
  project_site_url: '',
  banner_url: '/banners/chaos-labs-banner.png',
  team: [
    { id: 1, name: 'Alex Rivera', avatar_url: '/avatars/Rectangle.png' },
    { id: 2, name: 'Sarah Chen', avatar_url: '/avatars/Rectangle-1.png' }
  ],
  description: 'Grant includes work on Funding Rates page, Rewards & Tracking Simulator, and CLI Trading tool. All will be combined in a community accessible webpage that will continue to host additional work done and maintenance on behalf of Chaos Labs.',
  purpose: 'Funding Rates page will help promote and guide traders around Perpetual premiums found across all assets traded on dYdX. Rewards & Tracking simulator will help market the benefits of trading on dYdX and assist current traders in mapping out their rewards. The CLI trading tool will make it easier for non-UI based traders to execute quickly on dYdX. The general purpose of this grant is to recruit Chaos Labs, a very qualified contributor, to work with dYdX on current and future projects.',
  execution: '3 months to completion. Each individual grant is estimated to take 120 days, but will be worked on concurrently.',
  payment_structure: '25% upfront / 75% at completion of all Grants',
  useful_links: [
    { title: 'Project GitHub Repository', url: 'https://github.com/dydxprotocol' },
    { title: 'Technical Documentation', url: 'https://docs.dydx.exchange' },
    { title: 'Community Forum Proposal', url: 'https://forums.dydx.community' }
  ],
  funding_transactions: [
    {
      title: 'Round 9',
      date: 'October 15, 2026',
      amount: '$2,500.00',
      description: 'Initial upfront milestone payment for architecture design and repository setup.',
      tx_url: 'https://etherscan.io'
    },
    {
      title: 'Final Payout',
      date: 'November 12, 2026',
      amount: '$3,500.00',
      description: 'Completion of core features, security audit, and public release.',
      tx_url: 'https://etherscan.io'
    }
  ]
};

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(fallbackProject);
  const [moreProjects, setMoreProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);

    fetch(`http://localhost:3000/api/projects/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Project not found');
        return res.json();
      })
      .then(data => {
        setProject(data);
        setLoading(false);
      })
      .catch(() => {
        setProject({ ...fallbackProject, id_intial: Number(id) || 1 });
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetch('http://localhost:3000/api/projects')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const others = data
            .filter(p => (p.id_intial || p.id) !== Number(id))
            .slice(0, 2);
          setMoreProjects(others);
        }
      })
      .catch(() => {
        setMoreProjects([]);
      });
  }, [id]);

  const usefulLinks = Array.isArray(project.useful_links) ? project.useful_links : [];
  const transactions = Array.isArray(project.funding_transactions) ? project.funding_transactions : [];
  const teamMembers = Array.isArray(project.team) ? project.team : [];

  return (
    <div className="project_details_page">
      <Header />

      <main className="project_details_main">
        <div className="project_details_center">
          <div className="project_banner_wrap">
            <img 
              src={project.banner_url || '/banners/chaos-labs-banner.png'} 
              alt={project.title} 
              className="project_banner_img" 
            />
          </div>

          <div className="project_header_meta">
            <span className="project_category">{project.category || 'Category'}</span>
            <h1 className="project_title">{project.title}</h1>

            <div className="project_action_row">
              <div className="project_badges_left">
                <span className="project_status_badge">
                  {project.status || 'Funded'} <span className="status_check">✓</span>
                </span>
                <span className="project_funding_amount">
                  Funding amount: <strong>{project.funding_amount}</strong>
                </span>
              </div>

              <button 
                type="button"
                className="project_site_btn"
              >
                <span>Project link</span>
                <span className="project_btn_icon">↗</span>
              </button>
            </div>

            <div className="project_team_block">
              <span className="project_team_label">Team</span>
              <div className="project_team_list">
                {teamMembers.map(member => (
                  <div key={member.id} className="project_team_pill">
                    <img 
                      src={member.avatar_url || '/avatars/Rectangle.png'} 
                      alt={member.name} 
                      className="team_member_avatar" 
                    />
                    <span className="team_member_name">{member.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="project_divider"></div>

          <div className="project_text_sections">
            {project.description && (
              <div className="project_text_block">
                <h3 className="project_block_title">Description</h3>
                <p className="project_block_text">{project.description}</p>
              </div>
            )}

            {project.purpose && (
              <div className="project_text_block">
                <h3 className="project_block_title">Purpose</h3>
                <p className="project_block_text">{project.purpose}</p>
              </div>
            )}

            {project.execution && (
              <div className="project_text_block">
                <h3 className="project_block_title">Execution</h3>
                <p className="project_block_text">{project.execution}</p>
              </div>
            )}

            {project.payment_structure && (
              <div className="project_text_block">
                <h3 className="project_block_title">Payment structure</h3>
                <p className="project_block_text">{project.payment_structure}</p>
              </div>
            )}

            {usefulLinks.length > 0 && (
              <div className="project_text_block">
                <h3 className="project_block_title">Useful links</h3>
                <div className="project_links_list">
                  {usefulLinks.map((link, idx) => (
                    <a 
                      key={idx} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project_useful_link"
                    >
                      <span>{link.title || link.url}</span>
                      <span className="useful_link_icon">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {transactions.length > 0 && (
              <div className="project_text_block">
                <h3 className="project_block_title">Funding transactions</h3>
                <div className="project_transactions_list">
                  {transactions.map((tx, idx) => (
                    <div key={idx} className="project_tx_card">
                      <div className="tx_card_top">
                        <span className="tx_title">{tx.title}</span>
                        <div className="tx_amount_wrap">
                          <span className="tx_amount">{tx.amount}</span>
                          {tx.tx_url && (
                            <a 
                              href={tx.tx_url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="tx_link"
                              aria-label="View transaction"
                            >
                              ↗
                            </a>
                          )}
                        </div>
                      </div>
                      <span className="tx_date">{tx.date}</span>
                      <p className="tx_desc">{tx.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {moreProjects.length > 0 && (
            <div className="project_more_grants">
              <div className="more_grants_header">
                <h2 className="more_grants_title">More grants like this</h2>
                <Link to="/funded-grants" className="more_grants_link">
                  <span>View all similar projects</span>
                  <img src={arrowRightPurple} alt="" className="more_link_arrow" />
                </Link>
              </div>

              <div className="more_grants_grid">
                {moreProjects.map(item => {
                  const itemAvatars = Array.isArray(item.avatars) ? item.avatars : [];
                  return (
                    <Link 
                      key={item.id_intial || item.id} 
                      to={`/projects/${item.id_intial || item.id}`} 
                      className="more_card"
                    >
                      <div className="more_card_center">
                        <span className="more_card_category">{item.category}</span>
                        <h3 className="more_card_title">{item.title}</h3>
                        <p className="more_card_amount">
                          Funding amount: <span>{item.funding_amount}</span>
                        </p>
                        <p className="more_card_desc">{item.description}</p>
                        
                        <div className="more_card_avatars">
                          {itemAvatars.map((av, i) => (
                            <img 
                              key={i} 
                              src={av} 
                              alt="" 
                              className="more_avatar" 
                              style={{ zIndex: 10 - i, transform: i > 0 ? `translateX(-${i * 8}px)` : 'none' }}
                            />
                          ))}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
