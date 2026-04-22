const Loader = ({ statusMessage }) => {
  return (
    <div className="loader-container">
      <div className="spinner animate-spin"></div>
      <h3 className="status-message">{statusMessage}</h3>
      <p className="status-subtext">This might take a few moments...</p>
    </div>
  );
};

export default Loader;
