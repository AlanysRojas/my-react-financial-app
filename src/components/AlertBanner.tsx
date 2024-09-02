import React from 'react';
import './Alert.module.css';

type AlertBannerProps = {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
};

const AlertBanner: React.FC<AlertBannerProps> = ({
  message,
  type = 'info',
  onClose,
}) => {
  const bannerClassName = `alert-banner alert-banner-${type}`;

  return (
    <div className={bannerClassName}>
      <span>{message}</span>
      {onClose && (
        <button className="alert-banner-close-button" onClick={onClose}>
          &times;
        </button>
      )}
    </div>
  );
};

export default AlertBanner;
