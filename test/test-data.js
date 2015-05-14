var urls = [
  // 0, brand, showName, type
  'ed2k://|file|Gay - Channel One - A Night At Bruno\'s DVD.avi|1153286144|798181E11436CF0CD01CD05CD69F90BE|/',

  // 1, brand, showName, date, actors, type
  ' ed2k://|file|Head Trip (2012) - Titan Men - David Anthony, Jessy Ares, Allen Silver, Brad Kalvo, Johnny Hazzard, Will Swagger.avi|1609313942|FB57A9F4576C80F51D76C19A16849813|h=HH6JEGVXZ7AIO6QK2KVJ5MPDIV6LDUDD|/ ',

  // 2, showName, actors, type
  'ed2k://|file|Phenix Saint & Christopher Daniels - Unqualified.mp4|455158707|F9A5CA2E3543BD3844D10B80D0CDF743|/',

  // 3, brand, showName, cno, actors, type
  'ed2k://|file|RagingStallion - Auto Erotic Part 2 - Boomer Banks & Sean Zevran.mp4|888672742|8E1331AD2E4D06482C9E4B02E2F7383F|/',

  // 4, brand, seriesName, showName, actors, type
  'ed2k://|file|Men.com - The Gay Office - Topher DiMaggio & Christopher Daniels - Hotel Room Hook Up.avi|463812246|A8A079DC67A922966E523790D77C791F|/',

  // 5, brand, actors, type
  'ed2k://|file|Titan -  David Anthony & Johnny Hazzard.mp4|393578647|7C88065F5651122C6954ECDE93E72D3B|h=R6VIRSPO5KJWOXRJSUKRXEA7Z3OQHIFN|/',

  // 6, brand, showName, episodeName, date, actors, type
  'ed2k://|file|Unseen - Uknm (2011-11) - Proctologist (Johnny Hazzard & Harley Everett).mp4|749678342|A81F103DF596FE32C1CF13831E6C90C8|h=PX6RFDCXF5IV7TYFL45S3XJYA2ELUXH7|/',

  // 7, brand, showName, actors, type
  'ed2k://|file|[MAP].Turn.On.-.Misha.Dante.&.Dani.Robles.mp4|360371156|DD83E26A45D17AE372CF61A13D60C5F0|/',

  // 8, brand, showName, eno, episodeName, actors, type
  'ed2k://|file|Falcon - Bucks County 2 - Road To Temptation - Woody Fox & Kip20Johnson.mp4|930039943|8272AAC0CE77D9CECC53451A20960020|h=62LWGTHYSESZVR3JNEGO2JBU5CHCI3SZ|/'
];

var invalidUrls = [
  'malformed'
];

var movies = [
  {
    hash: '798181E11436CF0CD01CD05CD69F90BE',
    fileName: 'Channel One - A Night At Bruno\'s DVD.avi',
    title: 'A Night At Bruno\'s DVD',
    brand: 'Channel One',
    showName: 'A Night At Bruno\'s DVD',
    size: '1.07 GB',
    type: 'avi',
    createDate: '2015.5.8',
    url: 'ed2k://|file|Gay - Channel One - A Night At Bruno\'s DVD.avi|1153286144|798181E11436CF0CD01CD05CD69F90BE|/',
    urlModified: 'ed2k://|file|Channel One - A Night At Bruno\'s DVD.avi|1153286144|798181E11436CF0CD01CD05CD69F90BE|/'
    bytes: '1153286144',
    rootHash: '',
    finished: false,
    formatted: false,
    thumbup: false
  },
  {
    hash: 'FB57A9F4576C80F51D76C19A16849813',
    fileName: 'Titan - Head Trip (2012) - David Anthony, Jessy Ares, Allen Silver, Brad Kalvo, Johnny Hazzard, Will Swagger.avi',
    title: 'Head Trip',
    brand: 'Titan',
    showName: 'Head Trip',
    date: '2012',
    actors: [
      {name: 'David Anthony'},
      {name: 'Jessy Ares'},
      {name: 'Allen Silver'},
      {name: 'Brad Kalvo'},
      {name: 'Johnny Hazzard'},
      {name: 'Will Swagger'}
    ],
    size: '1.49 GB',
    type: 'avi',
    createDate: '2015.5.8',
    finished: false,
    formatted: false,
    thumbup: false
  },
  {
    showName: 'Unqualified',
    actors: [
      {name: 'Phenix Saint'},
      {name: 'Christopher Daniels'}
    ],
    type: 'mp4'
  },
  {
    brand: 'Raging Stallion',
    showName: 'Auto Erotic',
    cno: '2',
    actors: [
      {name: 'Boomer Banks'},
      {name: 'Sean Zevran'}
    ],
    type: 'mp4'
  },
  {
    hash: 'A8A079DC67A922966E523790D77C791F',
    fileName: 'MEN - The Gay Office - Topher DiMaggio & Christopher Daniels - Hotel Room Hook Up.avi',
    title: 'The Gay Office - Hotel Room Hook Up',
    brand: 'MEN',
    seriesName: 'The Gay Office',
    showName: 'Hotel Room Hook Up',
    actors: [
      {name: 'Topher DiMaggio'},
      {name: 'Christopher Daniels'}
    ],
    size: '442.33 MB',
    type: 'avi',
    createDate: '2015.5.8',
    finished: false,
    formatted: false,
    thumbup: false
  },
  {
    brand: 'Titan',
    actors: [
      {name: 'David Anthony'},
      {name: 'Johnny Hazzard'}
    ],
    type: 'mp4'
  },
  {
    brand: 'UK Naked Men',
    showName: 'Unseen',
    episodeName: 'Proctologist',
    date: '2011.11',
    actors: [
      {name: 'Johnny Hazzard'},
      {name: 'Harley Everett'}
    ],
    type: 'mp4'
  },
  {
    brand: 'Men At Play',
    showName: 'Turn On',
    actors: [
      {name: 'Misha Dante'},
      {name: 'Dani Robles'}
    ],
    type: 'mp4'
  },
  {
    brand: 'Falcon',
    showName: 'Bucks County',
    eno: '2',
    episodeName: 'Road To Temptation',
    date: '2013',
    actors: [
      {name: 'Woody Fox'},
      {name: 'Kip Johnson'}
    ],
    type: 'mp4'
  }
  
];

module.exports = {
  urls: urls,
  invalidUrls: invalidUrls,
  movies: movies
};