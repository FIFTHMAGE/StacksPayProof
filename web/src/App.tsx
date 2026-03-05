import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import RegisterMerchant from './pages/RegisterMerchant';
import RecordPayment from './pages/RecordPayment';
import ReceiptViewer from './pages/ReceiptViewer';

function App() {
  return (
    <div className="app">
      <nav className="nav">
        <div className="container">
          <Link to="/" className="logo">StacksPayProof</Link>
          <div className="nav-links">
            <Link to="/register">Register Merchant</Link>
            <Link to="/record">Record Payment</Link>
          </div>
        </div>
      </nav>
      
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterMerchant />} />
          <Route path="/record" element={<RecordPayment />} />
          <Route path="/receipt/:id" element={<ReceiptViewer />} />
        </Routes>
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>StacksPayProof - Onchain Payment Receipts</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
