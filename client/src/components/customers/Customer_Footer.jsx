import React from 'react'
import { Github, Linkedin } from 'lucide-react';

function Customer_Footer() {
  return (
    <footer className="mt-10 bg-slate-800 text-white pt-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4">
              <div className='flex flex-col justify-start items-center md:items-start mt-[-6px]'>
                <span className='font-stick-no-bills text-4xl font-bold'>
                  FLINT
                  <span className='text-red-400 text-5xl'>.</span>
                </span>
                <p className='text-sm text-center max-w-[70%] md:max-w-full md:text-left text-gray-200'>At Flint, we specialize in offering a premium 
                  collection of apparel, including stylish clothing,
                  accessories, and footwear. Whether you're looking
                  for everyday essentials or trendy pieces to elevate
                  your wardrobe, we provide high-quality fashion
                  with a focus on comfort, durability, and style.</p>
              </div>
              <div className='flex flex-col justify-start items-center'>
                <h3 className="text-lg font-bold mb-4">About Us</h3>
                <div className="flex flex-col items-center justify-center gap-3">
                  <a href="/shop/home" className="hover:text-gray-400">Home</a>
                  <a href="/privacy-policy" target="_blank" className="hover:text-gray-400">Privacy Policy</a>
                  <a href="/terms-conditions" target="_blank" className="hover:text-gray-400">Terms & Conditions</a>
                </div>
              </div>
              <div className='flex flex-col justify-start items-center'>
                <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a target="_blank" href={import.meta.env.VITE_GITHUB_URL} className="border border-white p-2 rounded-full hover:text-gray-400">
                    <Github  className='w-5 h-5'/>
                  </a>
                  <a target="_blank" href={import.meta.env.VITE_LINKEDIN_URL} className="border border-white p-2 rounded-full hover:text-gray-400">
                    <Linkedin  className='w-5 h-5'/>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-400 py-4 text-center">
              <p>Flint &copy; 2025</p>
            </div>
          </div>
      </footer>
  )
}

export default Customer_Footer