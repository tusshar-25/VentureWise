import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaPiggyBank, 
  FaCreditCard, 
  FaPercentage, 
  FaMobileAlt, 
  FaShieldAlt, 
  FaGift, 
  FaMoneyBillWave,
  FaWallet,
  FaUniversity,
  FaCoins,
  FaChartLine,
  FaHandHoldingUsd
} from "react-icons/fa";

export default function Home() {
  // Animation variants
  const headingVariant = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const subtextVariant = {
    hidden: { opacity: 0, y: -6 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } },
  };

  const cardsContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.4,
      },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  };

  const promoVariant = {
    hidden: { opacity: 0, y: 8 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.6 + i * 0.08 } }),
  };
  const features = [
    { icon: <FaPiggyBank size={40} />, title: "Savings Account", desc: "Secure your money & earn interest." },
    { icon: <FaCreditCard size={40} />, title: "Credit Cards", desc: "Best offers & discounts." },
    { icon: <FaPercentage size={40} />, title: "EMI & Loans", desc: "Flexible options for your needs." },
    { icon: <FaMobileAlt size={40} />, title: "Mobile Banking", desc: "Bank anytime, anywhere." },
    { icon: <FaShieldAlt size={40} />, title: "Secure Transactions", desc: "Your security is our priority." },
    { icon: <FaGift size={40} />, title: "Special Promotions", desc: "Exciting rewards for loyal customers." },
    { icon: <FaMoneyBillWave size={40} />, title: "Money Transfer", desc: "Fast & safe transfers." },
    { icon: <FaWallet size={40} />, title: "Digital Wallet", desc: "Pay easily & securely." },
    { icon: <FaUniversity size={40} />, title: "Fixed Deposits", desc: "High interest for long term savings." },
    { icon: <FaCoins size={40} />, title: "Investments", desc: "Grow your wealth wisely." },
    { icon: <FaChartLine size={40} />, title: "Financial Planning", desc: "Plan for a better future." },
    { icon: <FaHandHoldingUsd size={40} />, title: "Insurance", desc: "Protect yourself & your family." },
  ];

  const promotions = [
    "Get 5% cashback on all credit card transactions this month!",
    "Open a savings account & get a welcome bonus of ₹500!",
    "Refer a friend and earn rewards up to ₹1000!"
  ];

  return (
    <div className="home-page d-flex flex-column min-vh-100">
      <div>
        {/* Hero: text left, SVG right */}
        <div className="row align-items-center mb-4">
          <div className="col-lg-8 col-md-7 text-center text-md-start mb-3 mb-md-0">
            <motion.h1
              variants={headingVariant}
              initial="hidden"
              animate="visible"
              className="home-hero-title"
            >
              <b>Welcome to VentureWise</b>
            </motion.h1>
            <motion.p
              variants={subtextVariant}
              initial="hidden"
              animate="visible"
              className="home-hero-sub"
            >
              Your Digital Security Hub
            </motion.p>
            <div className="home-actions mt-3">
              <Link to="/login"><button className="btn btn-primary loginbtn mx-2">Login</button></Link>
              <Link to="/open-account"><button className="btn btn-success openAcc mx-2">Open Account</button></Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-5 d-flex justify-content-center">
            <div className="svg-illustration">
              <img src="/assets/undraw_vault_tyfh.svg" alt="Banking Illustration" />
            </div>
          </div>
        </div>

        {/* Features Grid using Bootstrap with staggered reveal */}
        <motion.div
          variants={cardsContainer}
          initial="hidden"
          animate="visible"
          className="row justify-content-center g-2 mt-2"
        >
          {features.map((f, idx) => (
            <div key={idx} className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center">
              <motion.div
                variants={cardVariant}
                className="feature-card"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="feature-icon" style={{ textAlign: "center", marginBottom: "10px" }}>
                  {f.icon}
                </div>
                <h3 style={{ textAlign: "center" }}>{f.title}</h3>
                <p style={{ textAlign: "center" }}>{f.desc}</p>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Illustrations strip */}
        <div className="row justify-content-center align-items-center g-3 mt-4">
          {["/assets/undraw_finance_m6vw.svg","/assets/undraw_online-payments_p97e.svg","/assets/undraw_savings_uwjn.svg","/assets/undraw_send-money_4qc7.svg","/assets/undraw_credit-card_t6qm.svg"].map((src, idx) => (
            <div key={idx} className="col-6 col-md-2 d-flex justify-content-center">
              <img src={src} alt={`Illustration ${idx+1}`} style={{maxHeight: 120}} />
            </div>
          ))}
        </div>

        {/* Promotions */}
        <div className="promotions d-flex flex-column align-items-center mt-4">
          {promotions.map((promo, idx) => (
            <motion.div
              key={idx}
              className="promo-banner alert alert-warning text-center w-75"
              custom={idx}
              variants={promoVariant}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              {promo}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
