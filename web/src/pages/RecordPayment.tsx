import { useState } from 'react';
import { showConnect } from '@stacks/connect';
import { CONFIG } from '../config';

function RecordPayment() {
  const [merchantId, setMerchantId] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('STX');
  const [reference, setReference] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleRecord = async () => {
    if (!merchantId || !amount || !reference) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const network = CONFIG.NETWORK === 'mainnet' 
        ? new (await import('@stacks/network')).StacksMainnet()
        : new (await import('@stacks/network')).StacksTestnet();

      showConnect({
        appDetails: {
          name: 'StacksPayProof',
          icon: window.location.origin + '/logo.png',
        },
        onFinish: () => {
          setResult({ 
            success: true, 
            message: 'Payment receipt recorded!',
            receiptId: Math.floor(Math.random() * 1000) // Placeholder
          });
          setLoading(false);
        },
        onCancel: () => {
          setLoading(false);
        },
        network,
        userSession: undefined,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to record payment');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="page">
        <h1>Record Payment</h1>
        <p>Create an onchain receipt for a payment.</p>

        {error && <div className="alert alert-error">{error}</div>}
        {result && (
          <div className="alert alert-success">
            {result.message}
            {result.receiptId && (
              <p>
                Receipt ID: {result.receiptId} - 
                <a href={`/receipt/${result.receiptId}`}> View Receipt</a>
              </p>
            )}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="merchantId">Merchant ID</label>
          <input
            id="merchantId"
            type="number"
            value={merchantId}
            onChange={(e) => setMerchantId(e.target.value)}
            placeholder="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="currency">Currency</label>
          <input
            id="currency"
            type="text"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            placeholder="STX"
            maxLength={10}
          />
        </div>

        <div className="form-group">
          <label htmlFor="reference">Payment Reference</label>
          <input
            id="reference"
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="tx-ref-123"
            maxLength={128}
          />
        </div>

        <button 
          className="btn" 
          onClick={handleRecord}
          disabled={loading}
        >
          {loading ? 'Recording...' : 'Record Payment'}
        </button>
      </div>
    </div>
  );
}

export default RecordPayment;
