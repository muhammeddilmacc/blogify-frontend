'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('success');
    // Form verilerini e-posta servisi ile gönderme işlemi burada yapılacak
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">İletişim</h1>
        <p className="text-sm md:text-base text-gray-600">
          Benimle iletişime geçmek için aşağıdaki formu kullanabilirsiniz.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Adınız
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            E-posta Adresiniz
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Konu
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Mesajınız
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 md:py-3 px-4 md:px-6 text-sm md:text-base rounded-lg hover:bg-blue-700 transition-colors"
        >
          Gönder
        </button>
      </form>

      {status === 'success' && (
        <div className="mt-4 md:mt-6 p-3 md:p-4 bg-green-50 text-green-700 text-sm md:text-base rounded-lg">
          Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağım.
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4 md:mt-6 p-3 md:p-4 bg-red-50 text-red-700 text-sm md:text-base rounded-lg">
          Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.
        </div>
      )}

      <div className="mt-8 md:mt-12 text-center text-gray-600">
        <p className="text-sm md:text-base">Doğrudan e-posta göndermek için:</p>
        <a
          href="mailto:alicendek@gmail.com"
          className="text-blue-600 hover:text-blue-800 font-medium text-sm md:text-base"
        >
          alicendek@gmail.com
        </a>
      </div>
    </div>
  );
}