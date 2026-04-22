const ResultCard = ({ onReset, onDownload }) => {
  return (
    <div className="result-card">
      <div className="success-icon-container">
        <svg className="success-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2>Processing Complete!</h2>
      <p>Your patent claim chart PowerPoint has been generated successfully.</p>
      
      <div className="result-actions">
        <button className="btn-primary btn-large" onClick={onDownload}>
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download .pptx
        </button>
        <button className="btn-secondary" onClick={onReset}>Process Another</button>
      </div>
    </div>
  );
};

export default ResultCard;
