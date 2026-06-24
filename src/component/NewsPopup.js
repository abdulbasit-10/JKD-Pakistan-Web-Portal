'use client';

import { useState, useEffect } from 'react';

export default function NewsPopup({ isOpen, onClose }) {
  const [showPopup, setShowPopup] = useState(isOpen);

  useEffect(() => {
    setShowPopup(isOpen);
  }, [isOpen]);

  const newsItems = [
    {
      id: 1,
      icon: <img src="/icons/image44.svg" alt="News Icon" className="w-8 h-8" />,
      title: 'New UI/UX Design course added',
      timestamp: '2 hours ago',
      isNew: true,
    },
    {
        id: 2,
        icon: <img src="/icons/duration2.svg" alt="News Icon" className="w-8 h-8" />,
      title: 'Registration open for MERN Course',
      timestamp: '2 hours ago',
      isNew: true,
    },
    {
      id: 3,
      icon: <img src="/icons/course.svg" alt=" Course News Icon" className="w-8 h-8" />,
      title: 'Updated course materials available for App Development',
      timestamp: '1 day ago',
      isNew: true,
    },
    {
      id: 4,
      icon: <img src="/icons/congratsIcon.svg" alt="Announcement Icon" className="w-8 h-8" />,
      title: 'Congratulations to all students who completed Digital Marketing course',
      timestamp: '2 days ago',
      isNew: false,
    },
  ];

  const handleClose = () => {
    setShowPopup(false);
    onClose?.();
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[500px] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2d9a5f] to-[#1f6a44] px-6 py-5 flex justify-between items-center relative">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-medium text-white">Latest News</h2>
            <p className="text-green-100 text-sm mt-1">Stay updated with recent announcements</p>
          </div>
          <button
            onClick={handleClose}
            className="text-white bg-white/20 hover:bg-white/30 cursor-pointer rounded-full p-2 transition-all duration-200 flex-shrink-0"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* News Items */}
        <div className="max-h-[70vh] overflow-y-auto py-4 px-2 w-full">
          {newsItems.map((item, index) => (
            <div
              key={item.id}
              className={`px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 flex gap-6 ${
                index === newsItems.length - 1 ? 'border-b-0' : ''
              }`}
            >
              {/* Icon */}
              <div className="text-3xl flex-shrink-0 flex items-center">
                {item.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-gray-900 text-sm sm:text-lg leading-tight">
                    {item.title}
                  </h3>
                  {item.isNew && (
                    <span className="bg-gradient-to-r from-[#FFD700] to-white  text-xs font-medium px-2.5 py-1 rounded-2xl whitespace-nowrap flex-shrink-0">
                      New
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-xs sm:text-sm mt-2">{item.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {/* <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <button
            onClick={handleClose}
            className="w-full bg-[#177faa] hover:bg-[#1568a0] text-white font-semibold py-2.5 rounded-lg transition-colors duration-200"
          >
            Close
          </button>
        </div> */}
      </div>
    </div>
  );
}
