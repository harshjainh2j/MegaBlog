import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-gray-400 text-black">
      {/* Top Separator */}
      <div className="border-t border-black/20" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:divide-x md:divide-black/20">
          {/* Logo & Tagline */}
          <div className="flex-1 flex flex-col items-start mb-8 md:mb-0 md:pr-8">
            <Logo width="120px" />
            <p className="mt-4 text-sm opacity-90">
              LushLines &mdash; Share your inner world in words.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex flex-col mb-8 md:mb-0 md:px-8">
            <h4 className="font-semibold text-lg mb-2">Navigate</h4>
            <nav className="flex flex-col space-y-1 text-sm">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <Link to="/about" className="hover:underline">
                About
              </Link>
              <Link to="/posts" className="hover:underline">
                All Posts
              </Link>
              <Link to="/write" className="hover:underline">
                Write
              </Link>
            </nav>
          </div>

          {/* Social & Contact */}
          <div className="flex-1 flex flex-col md:pl-8">
            <h4 className="font-semibold text-lg mb-2">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a  aria-label="Twitter" className="hover:opacity-75">
                <span className="text-2xl">🐦</span>
              </a>
              <a aria-label="Instagram" className="hover:opacity-75">
                <span className="text-2xl">📸</span>
              </a>
              <a  aria-label="LinkedIn" className="hover:opacity-75">
                <span className="text-2xl">💼</span>
              </a>
            </div>
            <p className="text-sm">contact@lushlines.com</p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 border-t border-black/20 pt-4 text-center text-sm opacity-80">
          &copy; {new Date().getFullYear()} LushLines. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
