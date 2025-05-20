import Link from 'next/link';
import Image from 'next/image';

export const BlogNotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg mx-auto text-center">
        {/* 404 İllüstrasyon */}
        <div className="mb-6 relative mx-auto" style={{ width: '240px', height: '160px' }}>
          <Image
            src="https://illustrations.popsy.co/white/resistance-band.svg"
            alt="404 Blog Bulunamadı"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* 404 Numarası */}
        <div className="text-5xl font-bold text-gray-900 mb-3">
          404
        </div>

        {/* Başlık ve Açıklama */}
        <div className="space-y-3 mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Blog Yazısı Bulunamadı
          </h2>
          
          <p className="text-gray-600 text-base max-w-md mx-auto">
            Aradığınız blog yazısı yazar tarafından kaldırılmış veya silinmiş olabilir.
          </p>
        </div>
        
        {/* Butonlar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <Link 
            href="/"
            className="w-full sm:w-auto min-w-[120px] px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Ana Sayfaya Git
          </Link>
          
          <Link 
            href="/"
            className="w-full sm:w-auto min-w-[120px] max-w-[100px] px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Diğer Yazıları Gör
          </Link>
        </div>
      </div>
    </div>
  );
};
