const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const mutedText = "#6A6A6A";
const warmBg = "#F5F2ED";
const borderCol = "#E8D7AE";

export const meta = () => [
  { title: 'Privacy Notice | Mercer 79' },
  { name: 'description', content: 'Customer Privacy Notice for Mercer 79 Ltd - how we collect, use and protect your personal information.' },
];

export default function PrivacyPolicy() {
  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      <style>{`
        .privacy-wrap {
          max-width: 760px;
          margin: 0 auto;
          padding: 64px 32px 100px;
          font-family: ${bodyFont};
          font-size: 15px;
          line-height: 1.7;
          color: ${darkText};
        }
        .privacy-wrap h1 {
          font-family: ${playfair};
          font-size: 36px;
          font-weight: 400;
          color: ${darkText};
          margin-bottom: 8px;
        }
        .privacy-wrap h2 {
          font-family: ${playfair};
          font-size: 22px;
          font-weight: 400;
          color: ${darkText};
          margin-top: 48px;
          margin-bottom: 16px;
          padding-bottom: 10px;
          border-bottom: 2px solid ${borderCol};
        }
        .privacy-wrap h3 {
          font-family: ${bodyFont};
          font-size: 14px;
          font-weight: 600;
          color: ${goldAccent};
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-top: 28px;
          margin-bottom: 10px;
        }
        .privacy-wrap h4 {
          font-size: 14px;
          font-weight: 600;
          color: ${darkText};
          margin-top: 20px;
          margin-bottom: 8px;
        }
        .privacy-wrap p {
          margin-bottom: 14px;
          font-size: 15px;
        }
        .privacy-wrap ul {
          margin: 8px 0 16px 24px;
          font-size: 15px;
        }
        .privacy-wrap ul li {
          margin-bottom: 6px;
        }
        .privacy-wrap a {
          color: ${darkText};
          text-decoration: underline;
        }
        .privacy-wrap a:hover {
          color: ${goldAccent};
        }
        .subtitle {
          font-size: 13px;
          color: ${mutedText};
          margin-bottom: 32px;
        }
        .info-box {
          background: #EAF2FA;
          border-left: 4px solid #1A3A5C;
          padding: 16px 20px;
          margin: 24px 0 32px;
          font-size: 14px;
          color: #1A3A5C;
          line-height: 1.8;
        }
        .toc {
          background: ${warmBg};
          border-left: 4px solid ${borderCol};
          padding: 20px 24px;
          margin: 24px 0 40px;
        }
        .toc-title {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: ${goldAccent};
          margin-bottom: 12px;
        }
        .toc ol {
          margin-left: 20px;
          font-size: 14px;
        }
        .toc ol li {
          margin-bottom: 4px;
        }
        .toc a {
          color: ${darkText};
          text-decoration: none;
        }
        .toc a:hover {
          color: ${goldAccent};
          text-decoration: underline;
        }
        .processor-card {
          border: 1px solid ${borderCol};
          margin: 20px 0;
          border-radius: 4px;
          overflow: hidden;
        }
        .processor-header {
          background: ${darkText};
          color: ${borderCol};
          font-family: ${playfair};
          font-size: 15px;
          padding: 12px 16px;
        }
        .processor-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        .processor-table td {
          padding: 10px 14px;
          vertical-align: top;
          border-bottom: 1px solid #eee;
        }
        .processor-table td:first-child {
          font-weight: 600;
          width: 35%;
          background: #F5EDD6;
          color: ${darkText};
        }
        .processor-table tr:nth-child(even) td:not(:first-child) {
          background: ${warmBg};
        }
        .retention-table {
          width: 100%;
          border-collapse: collapse;
          margin: 16px 0 24px;
          font-size: 14px;
        }
        .retention-table th {
          background: ${darkText};
          color: white;
          padding: 10px 14px;
          text-align: left;
          font-weight: 600;
        }
        .retention-table td {
          padding: 10px 14px;
          border-bottom: 1px solid #eee;
          vertical-align: top;
        }
        .retention-table tr:nth-child(even) td {
          background: ${warmBg};
        }
        .rights-item {
          margin-bottom: 12px;
          font-size: 15px;
        }
        .complain-box {
          background: #F5F5F5;
          border-left: 4px solid #888;
          padding: 16px 20px;
          margin: 20px 0;
          font-size: 14px;
        }
        .brand-header {
          border-bottom: 2px solid ${borderCol};
          padding-bottom: 20px;
          margin-bottom: 40px;
        }
        .brand-name {
          font-family: ${playfair};
          font-size: 13px;
          letter-spacing: 0.15em;
          color: ${goldAccent};
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .brand-sub {
          font-size: 13px;
          color: ${mutedText};
        }
        @media (max-width: 600px) {
          .privacy-wrap { padding: 32px 20px 60px; }
          .privacy-wrap h1 { font-size: 28px; }
          .privacy-wrap h2 { font-size: 20px; }
          .processor-table td:first-child { width: 40%; }
        }
      `}</style>

      <div className="privacy-wrap">

        <div className="brand-header">
          <div className="brand-name">Mercer 79 Ltd</div>
          <div className="brand-sub">mercer79.com &nbsp;&middot;&nbsp; hello@mercer79.com</div>
        </div>

        <h1>Customer Privacy Notice</h1>
        <p className="subtitle">Last updated: August 2026</p>

        <p>This privacy notice tells you what to expect us to do with your personal information when you visit our website, place an order, or contact us.</p>

        <div className="info-box">
          <strong>Data Controller:</strong> Mercer 79 Ltd<br />
          <strong>Contact:</strong> hello@mercer79.com<br />
          <strong>Website:</strong> mercer79.com<br />
          <strong>ICO Registration:</strong> ZC109108
        </div>

        <div className="toc">
          <p className="toc-title">Contents</p>
          <ol>
            <li><a href="#collect">What information we collect, use, and why</a></li>
            <li><a href="#lawful">Lawful bases and data protection rights</a></li>
            <li><a href="#source">Where we get personal information from</a></li>
            <li><a href="#retention">How long we keep information</a></li>
            <li><a href="#sharing">Who we share information with</a></li>
            <li><a href="#international">Sharing information outside the UK</a></li>
            <li><a href="#complain">How to complain</a></li>
          </ol>
        </div>

        {/* SECTION 1 */}
        <h2 id="collect">1. What Information We Collect, Use, and Why</h2>

        <h3>To provide services and goods, including delivery</h3>
        <ul>
          <li>Names and contact details</li>
          <li>Addresses</li>
          <li>Purchase or account history</li>
          <li>Payment details (processed securely via Shopify and Stripe on our behalf)</li>
          <li>Website user information (including user journeys and cookie tracking)</li>
        </ul>

        <h3>For the operation of customer accounts and order records</h3>
        <ul>
          <li>Names and contact details</li>
          <li>Addresses</li>
          <li>Purchase history</li>
          <li>Marketing preferences</li>
        </ul>

        <h3>For service updates or marketing purposes</h3>
        <ul>
          <li>Names and contact details</li>
          <li>Marketing preferences</li>
          <li>Purchase or viewing history</li>
          <li>Records of consent, where appropriate</li>
        </ul>

        <h3>To comply with legal requirements</h3>
        <ul>
          <li>Name</li>
          <li>Financial transaction information</li>
        </ul>

        <h3>For dealing with queries, complaints or claims</h3>
        <ul>
          <li>Names and contact details</li>
          <li>Address</li>
          <li>Purchase or service history</li>
          <li>Customer or client accounts and records</li>
          <li>Financial transaction information</li>
          <li>Correspondence</li>
        </ul>

        {/* SECTION 2 */}
        <h2 id="lawful">2. Lawful Bases and Data Protection Rights</h2>

        <p>Under UK data protection law, we must have a lawful basis for collecting and using your personal information. You can find out more about lawful bases on the <a href="https://ico.org.uk" target="_blank" rel="noreferrer">ICO's website</a>.</p>

        <h3>Your data protection rights</h3>

        <div className="rights-item"><strong>Right of access</strong> - You have the right to ask us for copies of your personal information.</div>
        <div className="rights-item"><strong>Right to rectification</strong> - You have the right to ask us to correct or delete personal information you think is inaccurate or incomplete.</div>
        <div className="rights-item"><strong>Right to erasure</strong> - You have the right to ask us to delete your personal information in certain circumstances.</div>
        <div className="rights-item"><strong>Right to restriction of processing</strong> - You have the right to ask us to limit how we use your personal information.</div>
        <div className="rights-item"><strong>Right to object to processing</strong> - You have the right to object to the processing of your personal data in certain circumstances.</div>
        <div className="rights-item"><strong>Right to data portability</strong> - You have the right to ask that we transfer your personal information to another organisation, or to you.</div>
        <div className="rights-item"><strong>Right to withdraw consent</strong> - Where we rely on consent as our lawful basis, you have the right to withdraw your consent at any time.</div>

        <p>To make a data protection rights request, please contact us at <a href="mailto:hello@mercer79.com">hello@mercer79.com</a>. We will respond within one month.</p>

        <h3>Our lawful bases</h3>

        <h4>For providing goods and services (fulfilling orders):</h4>
        <ul>
          <li><strong>Contract</strong> - we need your information to fulfil your order and carry out the contract between us.</li>
          <li><strong>Legal obligation</strong> - we keep certain records because the law requires it.</li>
          <li><strong>Legitimate interests</strong> - we use your information where it benefits you or us without causing undue harm, for example for website analytics and operational improvements.</li>
        </ul>

        <h4>For customer account and order records:</h4>
        <ul>
          <li><strong>Contract</strong> - we hold your order history as part of our ongoing relationship.</li>
          <li><strong>Legitimate interests</strong> - maintaining accurate customer records benefits both you and us.</li>
        </ul>

        <h4>For service updates and marketing:</h4>
        <ul>
          <li><strong>Consent</strong> - we only send marketing communications if you have explicitly opted in. You can withdraw consent at any time by unsubscribing.</li>
        </ul>

        <h4>For legal compliance:</h4>
        <ul>
          <li><strong>Legal obligation</strong> - we are required by law to retain financial records for six years.</li>
        </ul>

        <h4>For queries, complaints and claims:</h4>
        <ul>
          <li><strong>Contract</strong> - handling complaints about orders is part of our contractual relationship with you.</li>
          <li><strong>Legitimate interests</strong> - keeping records of queries and correspondence benefits both parties.</li>
        </ul>

        {/* SECTION 3 */}
        <h2 id="source">3. Where We Get Personal Information From</h2>
        <p>We collect all personal information directly from you - when you place an order, sign up to our email list, or contact us with a query or complaint. We do not purchase data from third parties or obtain your information from any other source.</p>

        {/* SECTION 4 */}
        <h2 id="retention">4. How Long We Keep Information</h2>

        <table className="retention-table">
          <thead>
            <tr>
              <th>Type of Information</th>
              <th>Retention Period</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Order and financial records</td>
              <td>6 years from the date of the order, as required by company and tax law</td>
            </tr>
            <tr>
              <td>Marketing consent records</td>
              <td>Until you unsubscribe, plus 1 year thereafter</td>
            </tr>
            <tr>
              <td>Customer correspondence and complaint records</td>
              <td>6 years from the date of the communication</td>
            </tr>
            <tr>
              <td>Website analytics data</td>
              <td>26 months (standard analytics retention period)</td>
            </tr>
          </tbody>
        </table>

        {/* SECTION 5 */}
        <h2 id="sharing">5. Who We Share Information With</h2>

        <p>We share personal information with the following data processors - organisations that handle personal information on our behalf.</p>

        <div className="processor-card">
          <div className="processor-header">Shopify Inc</div>
          <table className="processor-table">
            <tbody>
              <tr><td>Category</td><td>E-commerce platform and payment processing provider</td></tr>
              <tr><td>Country data sent to</td><td>United States of America and Canada</td></tr>
              <tr><td>Transfer mechanism</td><td>UK Addendum to EU Standard Contractual Clauses (SCCs)</td></tr>
              <tr><td>Activities</td><td>Shopify provides our e-commerce platform and processes customer orders, payment transactions, and delivery addresses on our behalf.</td></tr>
            </tbody>
          </table>
        </div>

        <div className="processor-card">
          <div className="processor-header">Stripe, Inc.</div>
          <table className="processor-table">
            <tbody>
              <tr><td>Category</td><td>Payment processing provider</td></tr>
              <tr><td>Country data sent to</td><td>United States of America</td></tr>
              <tr><td>Transfer mechanism</td><td>UK International Data Transfer Addendum to the EU Standard Contractual Clauses (SCCs)</td></tr>
              <tr><td>Activities</td><td>Stripe processes card payment details and related transaction data on our behalf, in order to take payment for orders placed through our website.</td></tr>
            </tbody>
          </table>
        </div>

        <div className="processor-card">
          <div className="processor-header">Xero Limited</div>
          <table className="processor-table">
            <tbody>
              <tr><td>Category</td><td>Cloud-based accounting and bookkeeping software provider</td></tr>
              <tr><td>Country data sent to</td><td>United States of America and Australia</td></tr>
              <tr><td>Transfer mechanism</td><td>UK Addendum to EU Standard Contractual Clauses (SCCs)</td></tr>
              <tr><td>Activities</td><td>Xero processes and stores our financial and accounting records, including customer names and transaction values for invoicing and bookkeeping purposes.</td></tr>
            </tbody>
          </table>
        </div>

        <div className="processor-card">
          <div className="processor-header">Google Workspace (Google Ireland Limited)</div>
          <table className="processor-table">
            <tbody>
              <tr><td>Category</td><td>Email hosting and business productivity provider</td></tr>
              <tr><td>Country data sent to</td><td>United States of America, and other locations within Google's global data centre network</td></tr>
              <tr><td>Transfer mechanism</td><td>UK Addendum to EU Standard Contractual Clauses (SCCs), incorporated into Google's Cloud Data Processing Addendum</td></tr>
              <tr><td>Activities</td><td>Google Workspace hosts our business email accounts, including correspondence sent to and received from customers.</td></tr>
            </tbody>
          </table>
        </div>

        <div className="processor-card">
          <div className="processor-header">Royal Mail Group Ltd</div>
          <table className="processor-table">
            <tbody>
              <tr><td>Category</td><td>Postal and parcel delivery services</td></tr>
              <tr><td>Country data sent to</td><td>United Kingdom only</td></tr>
              <tr><td>Transfer mechanism</td><td>UK-based - no international transfer</td></tr>
              <tr><td>Activities</td><td>Royal Mail processes customer names and delivery addresses solely for the purpose of dispatching and delivering orders. Data is shared with Royal Mail only at the point of dispatch.</td></tr>
            </tbody>
          </table>
        </div>

        <p>We may also share personal information with relevant regulatory authorities (including HMRC) and organisations we are legally required to share information with, where required by law.</p>

        {/* SECTION 6 */}
        <h2 id="international">6. Sharing Information Outside the UK</h2>
        <p>Where necessary, our data processors may transfer personal information outside of the UK. When doing so, they comply with UK GDPR, ensuring appropriate safeguards are in place. Shopify, Stripe, Xero, and Google Workspace all rely on the UK Addendum to the EU Standard Contractual Clauses (or an equivalent UK-recognised mechanism) as their transfer mechanism.</p>
        <p>For further information or to obtain a copy of the appropriate safeguard, please contact us at <a href="mailto:hello@mercer79.com">hello@mercer79.com</a>.</p>

        {/* SECTION 7 */}
        <h2 id="complain">7. How to Complain</h2>
        <p>If you have any concerns about our use of your personal data, please contact us in the first instance at <a href="mailto:hello@mercer79.com">hello@mercer79.com</a>. We will respond within one month.</p>

        <div className="complain-box">
          <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Information Commissioner's Office (ICO)</p>
          <p style={{ margin: 0 }}>If you remain unhappy after contacting us, you have the right to lodge a complaint with the ICO - the UK's data protection supervisory authority. You can do so at <a href="https://ico.org.uk/make-a-complaint" target="_blank" rel="noreferrer">ico.org.uk/make-a-complaint</a> or by calling 0303 123 1113.</p>
        </div>

        <hr style={{ border: 'none', borderTop: `2px solid ${borderCol}`, margin: '48px 0 24px' }} />

        <p style={{ fontSize: 13, color: mutedText, textAlign: 'center' }}>
          Mercer 79 Ltd &nbsp;&middot;&nbsp; mercer79.com &nbsp;&middot;&nbsp; Last updated August 2026
        </p>

      </div>
    </div>
  );
}
