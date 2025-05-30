import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4 border-t border-gray-700">
      <div className="container mx-auto px-4 flex justify-center">
        <p className="text-sm text-center">
          &copy; {new Date().getFullYear()} Made By SumitCodes || All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
