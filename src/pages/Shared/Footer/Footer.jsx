import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        {/* MAIN GRID */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}
          <div>
            <h3 className="text-lg font-extrabold text-white">
              Digital<span className="text-orange-500">Potential</span>
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              A trusted marketplace to buy and sell verified social media
              accounts with escrow protection and manual verification.
            </p>

            <div className="mt-5 flex gap-4">
              <a className="social-icon bg-[#E4405F]">
                <FaInstagram />
              </a>
              <a className="social-icon bg-[#1DA1F2]">
                <FaTwitter />
              </a>
              <a className="social-icon bg-[#1877F2]">
                <FaFacebookF />
              </a>
              <a className="social-icon bg-[#FF0000]">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* MARKETPLACE */}
          <div>
            <h4 className="footer-title">Marketplace</h4>
            <ul className="footer-list">
              <li>
                <a href="#">Browse Accounts</a>
              </li>
              <li>
                <a href="#">Sell an Account</a>
              </li>
              <li>
                <a href="#">Featured Listings</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="footer-title">Support</h4>
            <ul className="footer-list">
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Escrow Process</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Contact Support</a>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-list">
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Refund Policy</a>
              </li>
              <li>
                <a href="#">Account Ownership Policy</a>
              </li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-10 h-px bg-slate-800" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
          <p className="text-slate-400">
            © {new Date().getFullYear()} DigitalPotential. All rights reserved.
          </p>

          <p className="text-slate-500">
            Escrow Protected • Verified Sellers • Secure Transactions
          </p>
        </div>
      </div>

      {/* Utility classes */}
      <style jsx>{`
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 9999px;
          color: white;
          transition: transform 0.2s ease;
        }
        .social-icon:hover {
          transform: translateY(-2px);
        }
        .footer-title {
          margin-bottom: 1rem;
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: white;
        }
        .footer-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.875rem;
        }
        .footer-list a:hover {
          color: #f97316;
        }
      `}</style>
    </footer>
  );
}
