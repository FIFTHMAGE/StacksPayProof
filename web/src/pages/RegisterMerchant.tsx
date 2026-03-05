import { useState } from 'react';
import { showConnect } from '@stacks/connect';
import { StacksTestnet } from '@stacks/network';
import { CONFIG } from '../config';

function RegisterMerchant() {
  const [merchantName, setMerchantName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!merchantName) {
      setError('Please enter a merchant name');
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
          setResult({ success: true, message: 'Merchant registration submitted!' });
          setLoading(false);
        },
        onCancel: () => {
          setLoading(false);
        },
        network,
        userSession: undefined,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to register merchant');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="page">
        <h1>Register Merchant</h1>
        <p>Create your merchant profile to start recording payment receipts.</p>

        {error && <div className="alert alert-error">{error}</div>}
        {result && (
          <div className="alert alert-success">
            {result.message}
            {result.merchantId && <p>Merchant ID: {result.merchantId}</p>}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="merchantName">Merchant Name</label>
          <input
            id="merchantName"
            type="text"
            value={merchantName}
            onChange={(e) => setMerchantName(e.target.value)}
            placeholder="e.g., My Coffee Shop"
            maxLength={64}
          />
        </div>

        <button 
          className="btn" 
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register Merchant'}
        </button>
      </div>
    </div>
  );
}

export default RegisterMerchant;
