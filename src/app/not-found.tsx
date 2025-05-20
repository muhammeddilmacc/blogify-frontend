import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            Aradığınız Sayfa Bulunamadı
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Bu blog yazısı henüz yayımda değil veya kaldırılmış olabilir. 
            Yazarla iletişime geçmek için iletişim sayfasını ziyaret edebilir veya 
            diğer blog yazılarına göz atabilirsiniz.
          </p>
          <div className="flex gap-4 justify-center mt-6">
            <Link 
              href="/"
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Ana Sayfaya Dön
            </Link>
            <Link 
              href="/iletisim"
              className="px-4 py-2 border border-gray-900 text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
            >
              İletişime Geç
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
