import { Card, Button } from 'antd';
import { ArrowLeftOutlined, LoginOutlined } from '@ant-design/icons';
import digitalCookbook from '/digital_cookbook.svg';
import { useState } from 'react';

const apiUrl = import.meta.env.VITE_BASE_API;

const TitleCard = () => {
  const [showAbout,setShowAbout] = useState(false);

  const handleSignIn = () => {
    window.location.href = `${apiUrl}/login`;
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
      }}
    >
      <Card
        style={{
          borderRadius: '24px',
          padding: '60px 60px',
          minWidth: '600px',
          textAlign: 'center',
          backgroundColor: 'rgba(250, 247, 242, 0.85)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        }}
        variant='borderless'
      >
        {!showAbout ? (
          <>
            <div style={{ marginTop: '10px' }}>

              <img
                src={digitalCookbook}
                alt="Digital Cookbook"
                style={{
                  maxWidth: '420px',
                  height: 'auto',
                  marginBottom: '50px'
                }}
              />

            </div>

            <Button
              type="primary"
              size="large"
              icon={<LoginOutlined />}
              onClick={handleSignIn}
              style={{
                width: '70%',
                height: '100%',
                fontSize: '18px',
                borderRadius: '8px',
                fontWeight: '600',
                marginBottom: '20px',
              }}
            >Sign In</Button>

            <div>
              <Button
                type="dashed"
                className="submit-button"
                onClick={() => setShowAbout(true)}
                style={{ fontSize: '16px' }}
              >About</Button>
            </div>
          </>
        ) : (
          <>
            <div style={{ marginBottom: '24px' }}>
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={() => setShowAbout(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  fontSize: '16px',
                }}
              >Back</Button>
              <h2 
                style={{ 
                  margin: '0 0 16px 0',
                  fontSize: '28px',
                  fontFamily: 'Playfair Display, Georgia, serif'
                }}>About</h2>
            </div>

            <div
              style={{
                textAlign: 'left',
                marginBottom: '32px',
                fontSize: '16px',
                lineHeight: '1.6',
                maxHeight: '350px',
                overflowY: 'auto',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}
            >
              <p style={{ marginBottom: '8px' }}>
                Welcome to the Digital Cookbook! Your kitchen in the cloud.
              </p>
              <p style={{ marginBottom: '24px' }}>
                Save, organize, and soon share your favorite recipes with friends and family!
              </p>
              <div
                style={{
                  textAlign: 'center',
                  marginBottom: '24px'
                }}
              >
                <p style={{ marginBottom: '12px' }}>
                  Features soon to come:
                </p>
                <ul 
                  style={{ 
                    display: 'inline-block',
                    textAlign: 'left',
                    paddingLeft: '16px',
                    margin: '0 0 16px 0',
                    marginLeft: '0px'
                  }}
                >
                  <li>Images</li>
                  <li>Searching & Sorting</li>
                  <li>Collections</li>
                  <li>Tags</li>
                  <li>Social friends and feed</li>
                </ul>
              <p style={{ textAlign: 'center', margin: '0' }}>
                Join our community today!
              </p>
              </div>
            </div>

            <Button
              type="primary"
              size="large"
              icon={<LoginOutlined />}
              onClick={handleSignIn}
              style={{
                width: '70%',
                height: '100%',
                fontSize: '18px',
                borderRadius: '8px',
                fontWeight: '600',
                marginBottom: '20px',
              }}
            >Sign In</Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default TitleCard;