'use client';

import { postService } from '@/services/PostService';

interface ShareButtonsProps {
  title: string;
  excerpt?: string;
  postId: string;
}

export default function ShareButtons({ title, excerpt, postId }: ShareButtonsProps) {
  const getSharePreview = () => {
    const previewText = excerpt
      ? `${title}\n\n${excerpt}\n\n${window.location.href}`
      : `${title}\n${window.location.href}`;
    return encodeURIComponent(previewText);
  };

  const handleShare = async (platform: 'twitter' | 'whatsapp' | 'copy') => {
    try {
      let shared = false;

      switch (platform) {
        case 'twitter':
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`,
            '_blank'
          );
          shared = true;
          break;
        case 'whatsapp':
          window.open(
            `https://wa.me/?text=${getSharePreview()}`,
            '_blank'
          );
          shared = true;
          break;
        case 'copy':
          if (navigator.share) {
            await navigator.share({
              title: title,
              text: excerpt,
              url: window.location.href
            });
            shared = true;
          } else {
            await navigator.clipboard.writeText(window.location.href);
            alert('Bağlantı kopyalandı!');
            shared = true;
          }
          break;
      }

      if (shared) {
        // Paylaşım sayısını artır
        await postService.updateShareCount(postId);
      }
    } catch (error) {
      console.error('Paylaşım hatası:', error);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4 py-6">
      <span className="text-gray-700 font-medium">Bu yazıyı paylaş:</span>
      <div className="flex space-x-4">
        <button
          onClick={() => handleShare('twitter')}
          className="p-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          aria-label="Twitter'da paylaş"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </button>
        <button
          onClick={() => handleShare('whatsapp')}
          className="p-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          aria-label="WhatsApp'ta paylaş"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </button>
        <button
          onClick={() => handleShare('copy')}
          className="p-2 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 text-white hover:from-gray-500 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          aria-label="Bağlantıyı kopyala"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>
    </div>
  );
}