'use client';

import React from 'react';
import Link from 'next/link';

export default function QuickActions() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin/posts"
          className="group flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
              <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Tüm Yazılar</h4>
            <p className="text-sm text-gray-500">Yazıları görüntüle ve düzenle</p>
          </div>
        </Link>

        <Link
          href="/admin/posts/new"
          className="group flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-green-600/10 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">Yeni Yazı</h4>
            <p className="text-sm text-gray-500">Yeni bir yazı oluştur</p>
          </div>
        </Link>

        <Link
          href="/"
          className="group flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-purple-600/10 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">Siteye Dön</h4>
            <p className="text-sm text-gray-500">Blog sayfasını görüntüle</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
