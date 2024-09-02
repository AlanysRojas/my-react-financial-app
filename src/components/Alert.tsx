import React from 'react';
import styles from './Alert.module.css';

type AlertBannerProps = {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
};

const Alert: React.FC<AlertBannerProps> = ({
  message,
  type = 'info',
  onClose,
}) => {
  const bannerClassName = `${styles.alertBanner} ${styles[`alertBanner${type.charAt(0).toUpperCase() + type.slice(1)}`]}`;

  return (
    <div className={bannerClassName}>
      <span>{message}</span>
      {onClose && (
        <button className={styles.alertBannerCloseButton} onClick={onClose}>
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
