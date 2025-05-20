import { Post, RawStatistics } from '@/types/blog';

export const blogPosts: Post[] = [
  {
    id: '1',
    title: 'Sonbahar Düşünceleri',
    content: 'Sonbahar, doğanın en etkileyici dönüşümlerinden birine sahne olur. Yapraklar sararmaya başlar, havada tatlı bir serinlik belirir ve şehrin ritmi değişir. Bu mevsimde insanın içinde bir melankoli, bir hüzün belirir. Ancak bu hüzün, tatlı bir hüzündür. İçimizi ısıtan anılarla dolu bir hüzün... Parkta yürürken ayağımızın altında çıtırdayan yapraklar, burnumuza gelen ıslak toprak kokusu ve gökyüzünün grileşen rengi, bizi bambaşka dünyalara götürür. Her sonbahar, bir öncekinden farklı duygular uyandırır içimizde. Belki de bu yüzden en çok şiir yazılan, en çok şarkı bestelenen mevsimdir sonbahar.',
    category: 'writing',
    excerpt: 'Sonbahar mevsiminin insan psikolojisi üzerindeki etkileri ve doğanın muhteşem dönüşümü üzerine düşünceler...',
    date: '2024-01-15',
    author: 'Blog Sahibi',
    slug: 'sonbahar-dusunceleri',
    status: 'published',
    image: {
      url: 'https://images.unsplash.com/photo-1507371341162-763b5e419408?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      alt: 'Sonbahar yaprakları'
    }
  },
  {
    id: '2',
    title: 'Yağmur Damlası',
    content: 'Penceremin önünde\nDamla damla düşerken\nGökyüzünden yeryüzüne\nBir hikaye anlatır gibi\n\nHer damla bir cümle\nHer şırıltı bir paragraf\nYağmurun dili başka\nKonuşur durur sabaha kadar\n\nKimi zaman hüzünlü\nKimi zaman neşeli\nBazen bir ninni gibi\nUyutur tüm şehri\n\nYağmur yağar da\nIslanmaz mı toprak?\nKalp çarpar da\nDolmaz mı gözler yaşla?',
    category: 'poem',
    excerpt: 'Yağmurun melodisi ile dans eden dizeler...',
    date: '2024-01-14',
    author: 'Blog Sahibi',
    slug: 'yagmur-damlasi',
    status: 'published',
    image: {
      url: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      alt: 'Yağmur damlaları'
    }
  },
  {
    id: '3',
    title: 'Modern Edebiyatın Geleceği',
    content: 'Modern edebiyat, teknolojinin gelişimiyle birlikte büyük bir dönüşüm geçiriyor. E-kitaplar, sesli kitaplar ve interaktif hikaye anlatımı gibi yeni formatlar, okuma deneyimini tamamen değiştiriyor. Ancak bu değişim beraberinde bazı endişeleri de getiriyor. Geleneksel kitap okuma alışkanlıklarının kaybolması, dikkat süresinin kısalması ve derinlikli okuma becerilerinin azalması gibi sorunlar, edebiyat dünyasının gündeminde. Bu makalede, modern edebiyatın karşılaştığı zorlukları ve sunduğu fırsatları detaylı bir şekilde ele alacağız.',
    category: 'article',
    excerpt: 'Teknolojinin edebiyat üzerindeki etkileri ve gelecekte bizi bekleyen değişimler...',
    date: '2024-01-13',
    author: 'Blog Sahibi',
    slug: 'modern-edebiyatin-gelecegi',
    status: 'published',
    image: {
      url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      alt: 'Modern kütüphane'
    }
  },
  {
    id: '4',
    title: 'Dijital Çağda İnsan İlişkileri',
    content: 'Sosyal medya ve dijital iletişim araçları, insan ilişkilerini derinden etkiliyor. Yüz yüze iletişimin yerini alan mesajlaşmalar, emojiler ve görüntülü görüşmeler, ilişkilerimizi nasıl şekillendiriyor? Bu makalede, teknolojinin sosyal bağlarımız üzerindeki etkilerini, avantajlarını ve dezavantajlarını inceliyoruz...',
    category: 'article',
    excerpt: 'Teknolojinin insan ilişkileri üzerindeki etkileri ve değişen iletişim dinamikleri...',
    date: '2024-01-12',
    author: 'Blog Sahibi',
    slug: 'dijital-cagda-insan-iliskileri',
    status: 'published',
    image: {
      url: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      alt: 'Dijital iletişim'
    }
  },
  {
    id: '5',
    title: 'Şehrin Işıkları',
    content: 'Gece olunca yanar tüm ışıklar\nKaranlığı böler neon lambalar\nKimi pencerede bir hayat hikayesi\nKimi sokakta yalnız adımlar\n\nŞehir uyanır gecenin koynunda\nBambaşka bir dünya kurulur\nGündüzün telaşı kaybolur birden\nZaman başka türlü akıp durur...',
    category: 'poem',
    excerpt: 'Gece vakti şehrin farklı yüzünü anlatan dizeler...',
    date: '2024-01-11',
    author: 'Blog Sahibi',
    slug: 'sehrin-isiklari',
    status: 'published',
    image: {
      url: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      alt: 'Gece şehir manzarası'
    }
  },
  {
    id: '6',
    title: 'Minimalizm ve Yaşam',
    content: 'Minimalizm, sadece bir tasarım trendi değil, aynı zamanda bir yaşam felsefesi. Az eşyayla yaşamak, gereksiz tüketimden kaçınmak ve sadeleşmek, modern hayatın karmaşasına karşı bir duruş. Bu yazıda, minimalist yaşamın prensiplerini ve bu yaşam tarzının sağladığı faydaları ele alıyoruz...',
    category: 'writing',
    excerpt: 'Sade yaşamın güzellikleri ve minimalizmin hayatımıza kattıkları...',
    date: '2024-01-10',
    author: 'Blog Sahibi',
    slug: 'minimalizm-ve-yasam',
    status: 'published',
    image: {
      url: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      alt: 'Minimalist iç mekan'
    }
  },
  {
    id: '7',
    title: 'Yapay Zeka ve Etik',
    content: 'Yapay zeka teknolojilerinin hızlı gelişimi, beraberinde önemli etik soruları da getiriyor. Makinelerin karar verme süreçleri, veri gizliliği, iş gücü üzerindeki etkileri ve olası sosyal sonuçları, dikkatle ele alınması gereken konular. Bu makalede, yapay zeka etiğinin temel prensiplerini ve gelecekte karşılaşabileceğimiz zorlukları inceliyoruz...',
    category: 'article',
    excerpt: 'Yapay zeka teknolojilerinin etik boyutu ve toplumsal etkileri...',
    date: '2024-01-09',
    author: 'Blog Sahibi',
    slug: 'yapay-zeka-ve-etik',
    status: 'published',
    image: {
      url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      alt: 'Yapay zeka görselleştirmesi'
    }
  },
  {
    id: '8',
    title: 'Zaman',
    content: 'Akıp gider durmadan\nNe geçmişe bakar ne geleceğe\nŞimdinin içinde kaybolur\nHer an yeni bir hikaye\n\nKimi yavaş akar\nKimi hızlı geçer\nAnlamak zor bazen\nNereye gider nerede biter...',
    category: 'poem',
    excerpt: 'Zamanın akışı üzerine düşünceler ve duygular...',
    date: '2024-01-08',
    author: 'Blog Sahibi',
    slug: 'zaman',
    status: 'published',
    image: {
      url: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      alt: 'Eski saat'
    }
  },
  {
    id: '9',
    title: 'Sürdürülebilir Yaşam',
    content: 'Dünyamızın geleceği için sürdürülebilir yaşam pratikleri her zamankinden daha önemli. Günlük alışkanlıklarımızdan tüketim tercihlerimize kadar her alanda yapabileceğimiz küçük değişiklikler, büyük farklar yaratabilir. Bu yazıda, sürdürülebilir yaşam için pratik öneriler ve bu yaşam tarzının önemini ele alıyoruz...',
    category: 'writing',
    excerpt: 'Sürdürülebilir yaşam pratikleri ve çevre dostu alışkanlıklar...',
    date: '2024-01-07',
    author: 'Blog Sahibi',
    slug: 'surdurulebilir-yasam',
    status: 'published',
    image: {
      url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      alt: 'Yeşil yaşam'
    }
  },
  {
    id: '10',
    title: 'Rüzgarın Şarkısı',
    content: 'Ağaçların arasında\nBir melodi tutturmuş\nKimi zaman hafif\nKimi zaman güçlü\n\nYaprakları dans ettirir\nDalları sallar durur\nDoğanın orkestrasında\nBaş solist olur...',
    category: 'poem',
    excerpt: 'Rüzgarın doğadaki etkisini anlatan şiirsel bir yolculuk...',
    date: '2024-01-06',
    author: 'Blog Sahibi',
    slug: 'ruzgarin-sarkisi',
    status: 'published',
    image: {
      url: 'https://images.unsplash.com/photo-1495571758719-6ec1e876d6ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      alt: 'Rüzgarda sallanan ağaçlar'
    }
  },
  {
    id: '11',
    title: 'Dijital Detoks',
    content: 'Modern hayatın vazgeçilmezi haline gelen teknoloji, bazen hayatımızı fazlasıyla işgal edebiliyor. Dijital detoks, zihinsel ve fiziksel sağlığımız için önemli bir mola fırsatı sunuyor. Bu yazıda, dijital detoksun faydalarını ve nasıl uygulanabileceğini anlatıyoruz...',
    category: 'writing',
    excerpt: 'Teknolojiden uzak kalmanın faydaları ve dijital detoks yöntemleri...',
    date: '2024-01-05',
    author: 'Blog Sahibi',
    slug: 'dijital-detoks',
    status: 'published',
    image: {
      url: 'https://images.unsplash.com/photo-1499377193864-82682aefed04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      alt: 'Doğada dinlenme'
    }
  },
  {
    id: '12',
    title: 'Sanal Gerçeklik ve Gelecek',
    content: 'Sanal gerçeklik teknolojileri, eğitimden eğlenceye, sağlıktan iş dünyasına kadar birçok alanı dönüştürüyor. Bu makalede, sanal gerçekliğin mevcut kullanım alanlarını ve gelecekte yaratacağı potansiyel değişimleri inceliyoruz...',
    category: 'article',
    excerpt: 'Sanal gerçeklik teknolojilerinin günümüz ve gelecekteki etkileri...',
    date: '2024-01-04',
    author: 'Blog Sahibi',
    slug: 'sanal-gerceklik-ve-gelecek',
    status: 'published',
    image: {
      url: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      alt: 'VR gözlüğü'
    }
  },
  {
    id: '13',
    title: 'Deniz Kıyısında',
    content: 'Dalgalar vurur kıyıya\nKöpükler dans eder kumda\nMartılar süzülür gökte\nBir huzur sarar her yanı\n\nDenizin sonsuz mavisi\nGüneşin altın ışıkları\nZamanın durduğu an\nYaşanır kıyıda...',
    category: 'poem',
    excerpt: 'Deniz kenarında hissedilen duyguları anlatan dizeler...',
    date: '2024-01-03',
    author: 'Blog Sahibi',
    slug: 'deniz-kiyisinda',
    status: 'published',
    image: {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      alt: 'Deniz manzarası'
    }
  },
  {
    id: '14',
    title: 'Kahve Kültürü',
    content: 'Kahve, sadece bir içecek değil, aynı zamanda zengin bir kültür ve sosyal etkileşim aracı. Dünya üzerindeki farklı kahve gelenekleri, hazırlama yöntemleri ve kahve etrafında şekillenen sosyal ritüeller, bu içeceği benzersiz kılıyor. Bu yazıda, kahvenin tarihini, kültürel önemini ve modern kahve kültürünü ele alıyoruz...',
    category: 'writing',
    excerpt: 'Kahvenin kültürel önemi ve toplumsal etkisi üzerine düşünceler...',
    date: '2024-01-02',
    author: 'Blog Sahibi',
    slug: 'kahve-kulturu',
    status: 'published',
    image: {
      url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      alt: 'Kahve fincanı'
    }
  },
  {
    id: '15',
    title: 'Kuantum Bilgisayarlar',
    content: 'Kuantum bilgisayarlar, geleneksel bilgisayarların çözemediği karmaşık problemleri çözme potansiyeline sahip. Bu makalede, kuantum bilgisayarların çalışma prensiplerini, mevcut gelişmeleri ve gelecekte yaratacağı potansiyel etkileri inceliyoruz...',
    category: 'article',
    excerpt: 'Kuantum bilgisayarların teknoloji dünyasına getireceği yenilikler...',
    date: '2024-01-01',
    author: 'Blog Sahibi',
    slug: 'kuantum-bilgisayarlar',
    status: 'published',
    image: {
      url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      alt: 'Kuantum bilgisayar'
    }
  }
];

// Blog ziyaret verileri
export const rawStatisticsData: RawStatistics = {
  visits: [
   
    // 2024 all months, all weeks, 17 days per month
    {'date': '2025-01-03', 'time': '01:00', 'duration': 3.4},
    {'date': '2025-01-23', 'time': '13:20', 'duration': 3.2},
    {'date': '2025-01-18', 'time': '02:51', 'duration': 3.5},
    {'date': '2025-01-13', 'time': '13:23', 'duration': 3.4},
    {'date': '2025-01-22', 'time': '04:37', 'duration': 4.1},
    {'date': '2025-01-01', 'time': '05:27', 'duration': 3.0},
    {'date': '2025-01-29', 'time': '05:37', 'duration': 3.4},
    {'date': '2025-01-11', 'time': '08:02', 'duration': 3.5},
    {'date': '2025-01-27', 'time': '12:50', 'duration': 3.9},
    {'date': '2025-01-24', 'time': '09:16', 'duration': 3.1},
    {'date': '2025-01-08', 'time': '07:15', 'duration': 4.8},
    {'date': '2025-01-06', 'time': '21:34', 'duration': 3.9},
    {'date': '2025-01-07', 'time': '11:56', 'duration': 2.7},
    {'date': '2025-01-05', 'time': '20:39', 'duration': 4.1},
    {'date': '2025-01-28', 'time': '07:57', 'duration': 3.3},
    {'date': '2025-01-31', 'time': '22:17', 'duration': 4.7},
    {'date': '2025-01-30', 'time': '11:22', 'duration': 3.7},
    {'date': '2025-02-05', 'time': '16:55', 'duration': 4.7},
    {'date': '2025-02-09', 'time': '11:52', 'duration': 3.3},
    {'date': '2025-02-25', 'time': '16:36', 'duration': 2.7},
    {'date': '2025-02-04', 'time': '20:45', 'duration': 4.1},
    {'date': '2025-02-13', 'time': '15:40', 'duration': 23.2},
    {'date': '2025-02-23', 'time': '20:08', 'duration': 3},
    {'date': '2025-02-18', 'time': '10:28', 'duration': 4.4},
    {'date': '2025-02-27', 'time': '07:54', 'duration': 4.5},
    {'date': '2025-02-29', 'time': '09:09', 'duration': 3.3},
    {'date': '2025-02-24', 'time': '10:26', 'duration': 2.9},
    {'date': '2025-02-01', 'time': '21:31', 'duration': 4.9},
    {'date': '2025-02-26', 'time': '00:51', 'duration': 4.6},
    {'date': '2025-02-03', 'time': '23:33', 'duration': 4.1},
    {'date': '2025-02-17', 'time': '01:58', 'duration': 4.2},
    {'date': '2025-02-19', 'time': '12:24', 'duration': 2.8},
    {'date': '2025-02-02', 'time': '14:54', 'duration': 4.8},
    {'date': '2025-02-10', 'time': '14:58', 'duration': 4.3},
    {'date': '2025-03-19', 'time': '09:53', 'duration': 4.3},
    {'date': '2025-03-21', 'time': '19:32', 'duration': 4.4},
    {'date': '2025-03-12', 'time': '19:42', 'duration': 3.7},
    {'date': '2025-03-13', 'time': '07:04', 'duration': 3.3},
    {'date': '2025-03-15', 'time': '22:46', 'duration': 4.3},
    {'date': '2025-03-31', 'time': '22:28', 'duration': 2.9},
    {'date': '2025-12-28', 'time': '13:39', 'duration': 2.9},
    {'date': '2025-12-15', 'time': '13:39', 'duration': 2.9},
    {'date': '2025-12-14', 'time': '13:39', 'duration': 2.9},
    {'date': '2025-12-13', 'time': '13:39', 'duration': 2.9},
    {'date': '2025-12-12', 'time': '13:39', 'duration': 2.9},
    {'date': '2025-12-11', 'time': '13:39', 'duration': 2.9},
    {'date': '2025-12-28', 'time': '13:39', 'duration': 2.9},
    {'date': '2025-12-21', 'time': '13:39', 'duration': 2.9},
    {'date': '2025-12-28', 'time': '13:39', 'duration': 2.9},
    {'date': '2025-12-12', 'time': '13:39', 'duration': 2.7},
    {'date': '2025-12-28', 'time': '13:39', 'duration': 2.9},



  ]
}; 