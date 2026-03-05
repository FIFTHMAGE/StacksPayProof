import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <div className="hero">
        <h1>StacksPayProof</h1>
        <p>Onchain payment receipt protocol on Stacks blockchain</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/register" className="btn">Register Merchant</Link>
          <Link to="/record" className="btn">Record Payment</Link>
        </div>
      </div>

      <div className="features">
        <div className="feature">
          <h3>🔒 Verifiable</h3>
          <p>Every payment receipt is recorded onchain and publicly verifiable</p>
        </div>
        <div className="feature">
          <h3>📝 Simple</h3>
          <p>Easy integration with JavaScript SDK and minimal web interface</p>
        </div>
        <div className="feature">
          <h3>🌐 Public</h3>
          <p>All receipts are public and can be shared via unique URLs</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
