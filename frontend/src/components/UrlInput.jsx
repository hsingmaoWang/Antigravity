import { useState } from 'react';

const UrlInput = ({ onSubmit }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  return (
    <form className="url-input-container" onSubmit={handleSubmit}>
      <label htmlFor="patent-url">Import from Google Patents</label>
      <div className="input-group">
        <input 
          id="patent-url"
          type="url" 
          placeholder="https://patents.google.com/patent/US1234567" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary">Import</button>
      </div>
    </form>
  );
};

export default UrlInput;
