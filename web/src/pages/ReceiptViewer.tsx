import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ReceiptViewer() {
  const { id } = useParams();
  const [receipt, setReceipt] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Simulate fetching receipt data
    setTimeout(() => {
      setReceipt({
        receiptId: id,
        merchantId: 1,
        merchantName: 'Test Merchant',
        payer: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        amount: 1000,
        currency: 'STX',
        reference: 'tx-ref-123',
        timestamp: new Date().toISOString(),
        verified: true
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <div className="page">
          <p>Loading receipt...</p>
        </div>
      </div>
    );
  }

  if (error || !receipt) {
    return (
      <div className="container">
        <div className="page">
          <div className="alert alert-error">
            {error || 'Receipt not found'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page">
        <h1>Payment Receipt</h1>
        
        <div className="receipt-card">
          <h3>Receipt #{receipt.receiptId}</h3>
          
          <div className="receipt-field">
            <strong>Status:</strong>
            <span style={{ color: receipt.verified ? 'green' : 'red' }}>
              {receipt.verified ? '✓ Verified' : '✗ Not Verified'}
            </span>
          </div>
          
          <div className="receipt-field">
            <strong>Merchant:</strong>
            <span>{receipt.merchantName} (ID: {receipt.merchantId})</span>
          </div>
          
          <div className="receipt-field">
            <strong>Amount:</strong>
            <span>{receipt.amount} {receipt.currency}</span>
          </div>
          
          <div className="receipt-field">
            <strong>Payer:</strong>
            <span style={{ fontSize: '0.9rem', wordBreak: 'break-all' }}>
              {receipt.payer}
            </span>
          </div>
          
          <div className="receipt-field">
            <strong>Reference:</strong>
            <span>{receipt.reference}</span>
          </div>
          
          <div className="receipt-field">
            <strong>Timestamp:</strong>
            <span>{new Date(receipt.timestamp).toLocaleString()}</span>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <button 
            className="btn"
            onClick={() => window.print()}
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReceiptViewer;
