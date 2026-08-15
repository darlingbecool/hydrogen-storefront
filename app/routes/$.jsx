import {Link} from 'react-router';

// Design constants
const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const warmBg = "#F5F2ED";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const mutedText = "#6A6A6A";

export const meta = () => {
  return [{title: 'Page Not Found | Mercer 79'}];
};

export default function NotFound() {
  return (
    <div style={{ 
      background: 'white', 
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      
      <div style={{ 
        maxWidth: 680, 
        margin: "0 auto",
        padding: "80px 48px",
        textAlign: 'center'
      }}>
        
        {/* Large 404 */}
        <div style={{
          fontFamily: playfair,
          fontSize: 120,
          color: darkText,
          fontWeight: 400,
          lineHeight: 1,
          marginBottom: 24,
          opacity: 0.3
        }}>
          404
        </div>

        {/* Title */}
        <h1 style={{ 
          fontFamily: playfair, 
          fontSize: 48, 
          color: darkText, 
          marginBottom: 16, 
          fontWeight: 400,
          lineHeight: 1.2 
        }}>
          Page Not Found
        </h1>

        {/* Divider */}
        <div style={{ 
          width: 80, 
          height: 2, 
          background: goldAccent, 
          margin: "24px auto 32px",
          opacity: 0.6 
        }} />

        {/* Description */}
        <p style={{ 
          fontSize: 17, 
          color: mutedText, 
          lineHeight: 1.8,
          marginBottom: 48,
          maxWidth: 480,
          margin: "0 auto 48px"
        }}>
          That page isn't here. Let's start again from the homepage.
        </p>

        {/* Action Button */}
        <div style={{
          display: 'flex',
          gap: 16,
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              padding: "16px 32px",
              border: "none",
              borderRadius: 8,
              background: darkText,
              color: "white",
              fontSize: 14,
              letterSpacing: "0.15em",
              fontWeight: 500,
              fontFamily: bodyFont,
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = goldAccent;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = darkText;
            }}
          >
            GO HOME
          </Link>
        </div>

      </div>

    </div>
  );
}
