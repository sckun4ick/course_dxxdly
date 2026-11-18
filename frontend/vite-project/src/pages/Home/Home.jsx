import Header from '../../components/Header/Header.jsx';
import Sec1 from '../../components/Page1/Sec1/Sec1.jsx';
import Sec2 from '../../components/Page1/Sec2/Sec2.jsx';
import Sec3 from '../../components/Page1/Sec3/Sec3.jsx';
import Sec4 from '../../components/Page1/Sec4/Sec4.jsx';
import Sec5 from '../../components/Page1/Sec5/Sec5.jsx';
import Sec6 from '../../components/Page1/Sec6/Sec6.jsx';
import Footer from '../../components/Foter/Footer.jsx';
import './Home.scss';

export default function Home() {
  return (
    <div className="home_wrapper">
      <Header />
      <main className="home_main">
        <Sec1 />
        <Sec2 />
        <Sec3 />
        <Sec4 />
        <Sec5 />
        <Sec6 />
      </main>
      <Footer />
    </div>
  );
}
