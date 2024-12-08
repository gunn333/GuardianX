import React, { useState } from "react";
import "./SafetyTips.css";
import {
  FaLock,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaBell,
  FaLightbulb,
  FaHeart,
} from "react-icons/fa";

const tips = [
  {
    id: 1,
    title: "Stay Aware of Your Surroundings",
    description:
      "Always pay attention to your surroundings. Avoid using headphones in unfamiliar areas to stay alert.",
    icon: <FaMapMarkerAlt />,
    additionalContent:
      "It is also important to maintain eye contact with people nearby, as this can make you less of a target.",
    category: "General Safety",
  },
  {
    id: 2,
    title: "Use Emergency Features on Your Phone",
    description:
      "Learn how to use emergency SOS features on your phone. Set up quick access to emergency contacts.",
    icon: <FaPhoneAlt />,
    additionalContent:
      "Many smartphones allow you to set up an emergency contact list that will notify others when you need help.",
    category: "Technology Safety",
  },
  {
    id: 3,
    title: "Keep Personal Items Secure",
    description:
      "Carry only essentials. Use bags with zippers and keep them close to your body.",
    icon: <FaLock />,
    additionalContent:
      "Make sure your personal items are never left unattended in public spaces.",
    category: "Physical Safety",
  },
  {
    id: 4,
    title: "Trust Your Instincts",
    description:
      "If something doesn’t feel right, leave the area immediately or seek help.",
    icon: <FaLightbulb />,
    additionalContent:
      "Your gut feeling is often your best protection. Don’t hesitate to remove yourself from uncomfortable situations.",
    category: "Psychological Safety",
  },
  {
    id: 5,
    title: "Stay in Well-Lit Areas",
    description:
      "When walking at night, stick to well-lit streets and avoid shortcuts through dark or isolated areas.",
    icon: <FaBell />,
    additionalContent:
      "Consider using a flashlight or your phone’s flashlight when walking in low-light conditions.",
    category: "Environmental Safety",
  },
];

const SafetyTips = () => {
  const [expandedTip, setExpandedTip] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleAccordionToggle = (id) => {
    setExpandedTip(expandedTip === id ? null : id);
  };

  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
  };

  const handleModalOpen = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  const filteredTips =
    activeCategory === "All"
      ? tips
      : tips.filter((tip) => tip.category === activeCategory);

      const emergencyNumbers = [
        { name: 'Women Helpline (All India)', number: '1091' },
        { name: 'National Commission for Women', number: '011-26942369' },
        { name: 'Police Emergency', number: '100' },
        { name: 'Child Helpline (for young girls)', number: '1098' },
        { name: 'Acid Attack Victim Support', number: '075330-075330' },
    ];

  return (
    <div className="safety-tips-container">
      <h1 className="safety-tips-header">Safety Tips for Everyone</h1>
      <p className="safety-tips-subheader">
        Empower yourself with knowledge and stay safe in every situation. Learn,
        apply, and share these essential tips!
      </p>

      <div className="category-filters">
        <button
          className={activeCategory === "All" ? "active" : ""}
          onClick={() => handleCategoryFilter("All")}
        >
          All Tips
        </button>
        <button
          className={activeCategory === "General Safety" ? "active" : ""}
          onClick={() => handleCategoryFilter("General Safety")}
        >
          General Safety
        </button>
        <button
          className={activeCategory === "Technology Safety" ? "active" : ""}
          onClick={() => handleCategoryFilter("Technology Safety")}
        >
          Technology Safety
        </button>
        <button
          className={activeCategory === "Physical Safety" ? "active" : ""}
          onClick={() => handleCategoryFilter("Physical Safety")}
        >
          Physical Safety
        </button>
        <button
          className={activeCategory === "Psychological Safety" ? "active" : ""}
          onClick={() => handleCategoryFilter("Psychological Safety")}
        >
          Psychological Safety
        </button>
        <button
          className={activeCategory === "Environmental Safety" ? "active" : ""}
          onClick={() => handleCategoryFilter("Environmental Safety")}
        >
          Environmental Safety
        </button>
      </div>

      <div className="tips-accordion">
        {filteredTips.map((tip) => (
          <div key={tip.id} className="tip-item">
            <div
              className="tip-header"
              onClick={() => handleAccordionToggle(tip.id)}
            >
              <span className="tip-icon">{tip.icon}</span>
              <h3>{tip.title}</h3>
            </div>
            {expandedTip === tip.id && (
              <div className="tip-body">
                <p>{tip.description}</p>
                <button
                  className="learn-more-button"
                  onClick={() => handleModalOpen(tip.additionalContent)}
                >
                  Learn More
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal-button" onClick={handleModalClose}>
              ×
            </button>
            <p>{modalContent}</p>
          </div>
        </div>
      )}

      <div className="emergency-contact-container">
        <h2 className="emergency-contact-header">
          Important Emergency Numbers
        </h2>
        <div className="emergency-contact-list">
          {emergencyNumbers.map((item) => (
            <div key={item.name} className="emergency-contact-item">
              <span className="emergency-contact-name">{item.name}</span>
              <span className="emergency-contact-number">{item.number}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SafetyTips;