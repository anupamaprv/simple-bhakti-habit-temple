export type Deity = 'Ganesha' | 'Shiva' | 'Vishnu' | 'Krishna' | 'Lakshmi' | 'Saraswati' | 'Hanuman' | 'Durga' | 'Murugan';
export type Theme = 'Morning' | 'Evening' | 'Prosperity' | 'Wisdom' | 'Protection' | 'Devotion' | 'Peace';

export interface Prayer {
  id: string;
  title: string;
  deity: Deity;
  theme: Theme;
  lineCount: number;
  meaning: string;
  lyrics: {
    english: string;
    sanskrit: string;
    tamil: string;
    telugu: string;
  };
  audioUrl?: string;
}

export const prayers: Prayer[] = [
  {
    id: '1',
    title: 'Vakratunda Mahakaya',
    deity: 'Ganesha',
    theme: 'Morning',
    lineCount: 4,
    meaning: 'This powerful mantra is chanted to invoke Lord Ganesha, the remover of obstacles. It describes his curved trunk, large body, and brilliance like a million suns, seeking his blessings to remove all obstacles.',
    lyrics: {
      english: `Vakratunda Mahakaya
Suryakoti Samaprabha
Nirvighnam Kuru Me Deva
Sarva Karyeshu Sarvada`,
      sanskrit: `वक्रतुण्ड महाकाय
सूर्यकोटि समप्रभ
निर्विघ्नं कुरु मे देव
सर्व कार्येषु सर्वदा`,
      tamil: `வக்ரதுண்ட மஹாகாய
சூர்யகோடி சமப்ரபா
நிர்விக்னம் குரு மே தேவ
சர்வ கார்யேஷு சர்வதா`,
      telugu: `వక్రతుండ మహాకాయ
సూర్యకోటి సమప్రభ
నిర్విఘ్నం కురు మే దేవ
సర్వ కార్యేషు సర్వదా`,
    },
  },
  {
    id: '2',
    title: 'Om Namah Shivaya',
    deity: 'Shiva',
    theme: 'Devotion',
    lineCount: 8,
    meaning: 'The most powerful mantra dedicated to Lord Shiva. It represents the five elements - earth, water, fire, air, and space. Chanting this mantra purifies the mind and brings inner peace.',
    lyrics: {
      english: `Om Namah Shivaya
Shivaya Namah Om
Shivaya Namah Om Namah Shivaya
Om Shiva Om Shiva
Parathpara Shiva
Om Shiva Om Shiva
Sada Shiva Om
Namah Shivaya`,
      sanskrit: `ॐ नमः शिवाय
शिवाय नमः ॐ
शिवाय नमः ॐ नमः शिवाय
ॐ शिव ॐ शिव
परात्पर शिव
ॐ शिव ॐ शिव
सदा शिव ॐ
नमः शिवाय`,
      tamil: `ஓம் நமச் சிவாய
சிவாய நமஹ ஓம்
சிவாய நமஹ ஓம் நமச் சிவாய
ஓம் சிவ ஓம் சிவ
பராத்பர சிவ
ஓம் சிவ ஓம் சிவ
சதா சிவ ஓம்
நமச் சிவாய`,
      telugu: `ఓం నమః శివాయ
శివాయ నమః ఓం
శివాయ నమః ఓం నమః శివాయ
ఓం శివ ఓం శివ
పరాత్పర శివ
ఓం శివ ఓం శివ
సదా శివ ఓం
నమః శివాయ`,
    },
  },
  {
    id: '3',
    title: 'Hare Krishna Mahamantra',
    deity: 'Krishna',
    theme: 'Devotion',
    lineCount: 4,
    meaning: 'The Hare Krishna Mahamantra is considered the most powerful mantra for spiritual enlightenment in Kali Yuga. It invokes the divine energies of Radha (Hare), Krishna, and Rama to liberate the soul.',
    lyrics: {
      english: `Hare Krishna Hare Krishna
Krishna Krishna Hare Hare
Hare Rama Hare Rama
Rama Rama Hare Hare`,
      sanskrit: `हरे कृष्ण हरे कृष्ण
कृष्ण कृष्ण हरे हरे
हरे राम हरे राम
राम राम हरे हरे`,
      tamil: `ஹரே கிருஷ்ண ஹரே கிருஷ்ண
கிருஷ்ண கிருஷ்ண ஹரே ஹரே
ஹரே ராம ஹரே ராம
ராம ராம ஹரே ஹரே`,
      telugu: `హరే కృష్ణ హరే కృష్ణ
కృష్ణ కృష్ణ హరే హరే
హరే రామ హరే రామ
రామ రామ హరే హరే`,
    },
  },
  {
    id: '4',
    title: 'Lakshmi Gayatri Mantra',
    deity: 'Lakshmi',
    theme: 'Prosperity',
    lineCount: 6,
    meaning: 'This Gayatri mantra is dedicated to Goddess Lakshmi, the deity of wealth and prosperity. Chanting this mantra invokes her blessings for material and spiritual abundance.',
    lyrics: {
      english: `Om Mahalakshmyai Cha Vidmahe
Vishnu Patnyai Cha Dhimahi
Tanno Lakshmi Prachodayat

Om Shree Mahalakshmyai Cha Vidmahe
Shree Vishnu Patnyai Cha Dhimahi
Tanno Lakshmi Prachodayat`,
      sanskrit: `ॐ महालक्ष्म्यै च विद्महे
विष्णु पत्न्यै च धीमहि
तन्नो लक्ष्मी प्रचोदयात्

ॐ श्री महालक्ष्म्यै च विद्महे
श्री विष्णु पत्न्यै च धीमहि
तन्नो लक्ष्मी प्रचोदयात्`,
      tamil: `ஓம் மஹாலக்ஷ்ம்யை ச வித்மஹே
விஷ்ணு பத்ன்யை ச தீமஹி
தன்னோ லக்ஷ்மீ ப்ரசோதயாத்

ஓம் ஸ்ரீ மஹாலக்ஷ்ம்யை ச வித்மஹே
ஸ்ரீ விஷ்ணு பத்ன்யை ச தீமஹி
தன்னோ லக்ஷ்மீ ப்ரசோதயாத்`,
      telugu: `ఓం మహాలక్ష్మ్యై చ విద్మహే
విష్ణు పత్న్యై చ ధీమహి
తన్నో లక్ష్మీ ప్రచోదయాత్

ఓం శ్రీ మహాలక్ష్మ్యై చ విద్మహే
శ్రీ విష్ణు పత్న్యై చ ధీమహి
తన్నో లక్ష్మీ ప్రచోదయాత్`,
    },
  },
  {
    id: '5',
    title: 'Saraswati Vandana',
    deity: 'Saraswati',
    theme: 'Wisdom',
    lineCount: 8,
    meaning: 'A beautiful prayer to Goddess Saraswati, the deity of knowledge, music, and arts. This prayer asks for her blessings to gain wisdom, creativity, and eloquence.',
    lyrics: {
      english: `Ya Kundendu Tusharahara Dhavala
Ya Shubhra Vastravrita
Ya Veena Varadanda Manditakara
Ya Shveta Padmasana
Ya Brahmachyuta Shankara Prabhritibhir
Devaihi Sada Vandita
Sa Mam Patu Saraswati Bhagavati
Nihshesha Jadyapaha`,
      sanskrit: `या कुन्देन्दुतुषारहारधवला
या शुभ्रवस्त्रावृता
या वीणावरदण्डमण्डितकरा
या श्वेतपद्मासना
या ब्रह्माच्युतशंकरप्रभृतिभिर्
देवैः सदा वन्दिता
सा मां पातु सरस्वती भगवती
निःशेषजाड्यापहा`,
      tamil: `யா குந்தேந்து துஷாரஹாரதவளா
யா சுப்ர வஸ்த்ராவ்ருதா
யா வீணாவரதண்டமண்டிதகரா
யா ச்வேதபத்மாசனா
யா ப்ரஹ்மாச்யுதசங்கரப்ரப்ருதிபிர்
தேவைஹி சதா வந்திதா
சா மாம் பாது சரஸ்வதீ பகவதீ
நிஹ்ஷேஷ ஜாட்யாபஹா`,
      telugu: `యా కుందేందు తుషారహారధవళా
యా శుభ్రవస్త్రావృతా
యా వీణావరదండమండితకరా
యా శ్వేతపద్మాసనా
యా బ్రహ్మాచ్యుతశంకరప్రభృతిభిర్
దేవైః సదా వందితా
సా మాం పాతు సరస్వతీ భగవతీ
నిఃశేషజాడ్యాపహా`,
    },
  },
  {
    id: '6',
    title: 'Hanuman Chalisa (Opening)',
    deity: 'Hanuman',
    theme: 'Protection',
    lineCount: 12,
    meaning: 'The opening verses of Hanuman Chalisa, praising the mighty devotee of Lord Rama. Chanting this grants courage, strength, and protection from evil forces.',
    lyrics: {
      english: `Shri Guru Charan Saroj Raj
Nij Manu Mukur Sudhari
Barnau Raghubar Bimal Jasu
Jo Dayaku Phal Chari

Buddhiheen Tanu Janike
Sumirau Pavan Kumar
Bal Buddhi Vidya Dehu Mohi
Harahu Kalesh Vikar

Jai Hanuman Gyan Gun Sagar
Jai Kapis Tihun Lok Ujagar
Ramdoot Atulit Bal Dhama
Anjani Putra Pavan Sut Nama`,
      sanskrit: `श्री गुरु चरण सरोज रज
निज मनु मुकुर सुधारि
बरनउं रघुबर बिमल जसु
जो दायकु फल चारि

बुद्धिहीन तनु जानिके
सुमिरौं पवन कुमार
बल बुद्धि विद्या देहु मोहि
हरहु कलेश विकार

जय हनुमान ज्ञान गुण सागर
जय कपीस तिहुं लोक उजागर
रामदूत अतुलित बल धामा
अंजनि पुत्र पवन सुत नामा`,
      tamil: `ஸ்ரீ குரு சரண சரோஜ ரஜ
நிஜ மனு முகுர சுதாரி
பர்னௌ ரகுபர் பிமல் ஜசு
ஜோ தாயகு பல் சாரி

புத்திஹீன் தனு ஜானிகே
சுமிரௌ பவன குமார்
பல் புத்தி வித்யா தேஹு மோஹி
ஹரஹு கலேஷ விகார்

ஜய ஹனுமான் ஞான குண சாகர்
ஜய கபீஸ் திஹுன் லோக் உஜாகர்
ராமதூத் அதுலித் பல் தாமா
அஞ்சனி புத்ர பவன சுத் நாமா`,
      telugu: `శ్రీ గురు చరణ సరోజ రజ
నిజ మను ముకుర సుధారి
బర్నౌ రఘుబర్ బిమల్ జసు
జో దాయకు ఫల్ చారి

బుద్ధిహీన్ తను జానికే
సుమిరౌ పవన్ కుమార్
బల్ బుద్ధి విద్యా దేహు మోహి
హరహు కలేష్ వికార్

జయ హనుమాన్ జ్ఞాన గుణ సాగర్
జయ కపీస్ తిహున్ లోక్ ఉజాగర్
రామదూత్ అతులిత్ బల్ ధామా
అంజని పుత్ర పవన్ సుత్ నామా`,
    },
  },
  {
    id: '7',
    title: 'Vishnu Sahasranama (Opening)',
    deity: 'Vishnu',
    theme: 'Peace',
    lineCount: 10,
    meaning: 'The opening verses of Vishnu Sahasranama, a sacred text containing 1000 names of Lord Vishnu. Reciting these names brings peace, prosperity, and spiritual liberation.',
    lyrics: {
      english: `Shantakaram Bhujagashayanam
Padmanabham Suresham
Vishwadharam Gaganasadrusham
Meghavarnam Shubhangam
Lakshmikantam Kamalanayanam
Yogibhirdhyanagamyam
Vande Vishnum Bhavabhayaharam
Sarvalokaikanatham`,
      sanskrit: `शान्ताकारं भुजगशयनं
पद्मनाभं सुरेशम्
विश्वाधारं गगनसदृशं
मेघवर्णं शुभाङ्गम्
लक्ष्मीकान्तं कमलनयनं
योगिभिर्ध्यानगम्यम्
वन्दे विष्णुं भवभयहरं
सर्वलोकैकनाथम्`,
      tamil: `சாந்தாகாரம் புஜகசயனம்
பத்மநாபம் சுரேசம்
விச்வாதாரம் ககனசத்ருசம்
மேகவர்ணம் சுபாங்கம்
லக்ஷ்மீகாந்தம் கமலநயனம்
யோகிபிர்த்யானகம்யம்
வந்தே விஷ்ணும் பவபயஹரம்
சர்வலோகைகநாதம்`,
      telugu: `శాంతాకారం భుజగశయనం
పద్మనాభం సురేశం
విశ్వాధారం గగనసదృశం
మేఘవర్ణం శుభాంగం
లక్ష్మీకాంతం కమలనయనం
యోగిభిర్ధ్యానగమ్యం
వందే విష్ణుం భవభయహరం
సర్వలోకైకనాథం`,
    },
  },
  {
    id: '8',
    title: 'Durga Aarti',
    deity: 'Durga',
    theme: 'Protection',
    lineCount: 16,
    meaning: 'A devotional song dedicated to Goddess Durga, the divine mother who protects her devotees from evil. This aarti is sung during Durga Puja celebrations.',
    lyrics: {
      english: `Jai Ambe Gauri
Maiya Jai Shyama Gauri
Tumko Nishdin Dhyavat
Hari Brahma Shivji
Jai Ambe Gauri

Maang Sindoor Virajat
Tiko Mrig Mad Ko
Ujjwal Se Dou Naina
Chandravadan Neeko
Jai Ambe Gauri

Kanak Samaana Kaya
Raktambar Raaje
Rakta Pushpa Galey Mala
Kanthan Par Saaje
Jai Ambe Gauri`,
      sanskrit: `जय अम्बे गौरी
मैया जय श्यामा गौरी
तुमको निशदिन ध्यावत
हरि ब्रह्मा शिवजी
जय अम्बे गौरी

माँग सिंदूर विराजत
टीको मृग मद को
उज्ज्वल से दोउ नैना
चंद्रवदन नीको
जय अम्बे गौरी

कनक समाना काया
रक्ताम्बर राजै
रक्त पुष्प गलै माला
कंठन पर साजै
जय अम्बे गौरी`,
      tamil: `ஜய் அம்பே கௌரி
மையா ஜய் ஷ்யாமா கௌரி
தும்கோ நிஷ்டின் த்யாவத்
ஹரி ப்ரஹ்மா சிவ்ஜி
ஜய் அம்பே கௌரி

மாங் சிந்தூர் விராஜத்
டீகோ ம்ருக் மத் கோ
உஜ்வல் சே தௌ நைனா
சந்த்ரவதன் நீகோ
ஜய் அம்பே கௌரி

கனக் சமானா காயா
ரக்தாம்பர் ராஜை
ரக்த புஷ்ப கலை மாலா
கண்டன் பர் சாஜை
ஜய் அம்பே கௌரி`,
      telugu: `జయ్ అంబే గౌరి
మైయా జయ్ శ్యామా గౌరి
తుమ్కో నిష్టిన్ ధ్యావత్
హరి బ్రహ్మా శివ్జీ
జయ్ అంబే గౌరి

మాంగ్ సిందూర్ విరాజత్
టీకో మృగ్ మద్ కో
ఉజ్వల్ సే దౌ నైనా
చంద్రవదన్ నీకో
జయ్ అంబే గౌరి

కనక్ సమానా కాయా
రక్తాంబర్ రాజై
రక్త పుష్ప గలై మాలా
కంఠన్ పర్ సాజై
జయ్ అంబే గౌరి`,
    },
  },
  {
    id: '9',
    title: 'Murugan Gayatri',
    deity: 'Murugan',
    theme: 'Wisdom',
    lineCount: 4,
    meaning: 'A Gayatri mantra dedicated to Lord Murugan (Kartikeya), the commander of the divine army. This mantra invokes his blessings for courage, wisdom, and victory over obstacles.',
    lyrics: {
      english: `Om Tat Purushaya Vidmahe
Mahasenaya Dhimahi
Tanno Skanda Prachodayat`,
      sanskrit: `ॐ तत्पुरुषाय विद्महे
महासेनाय धीमहि
तन्नो स्कन्द प्रचोदयात्`,
      tamil: `ஓம் தத்புருஷாய வித்மஹே
மஹாசேனாய தீமஹி
தன்னோ ஸ்கந்த ப்ரசோதயாத்`,
      telugu: `ఓం తత్పురుషాయ విద్మహే
మహాసేనాయ ధీమహి
తన్నో స్కంద ప్రచోదయాత్`,
    },
  },
  {
    id: '10',
    title: 'Suprabhatam (Morning Prayer)',
    deity: 'Vishnu',
    theme: 'Morning',
    lineCount: 10,
    meaning: 'A beautiful morning hymn to wake up Lord Vishnu. Traditionally sung at temples during the early morning hours, it is believed that listening to this brings auspiciousness throughout the day.',
    lyrics: {
      english: `Kausalya Supraja Rama
Purva Sandhya Pravartate
Uttishtha Narasardula
Kartavyam Daivamahnikam

Uttishthottishtha Govinda
Uttishtha Garudadhvaja
Uttishtha Kamalakanta
Trailokyam Mangalam Kuru`,
      sanskrit: `कौसल्या सुप्रजा राम
पूर्वा संध्या प्रवर्तते
उत्तिष्ठ नरशार्दूल
कर्तव्यं दैवमाह्निकम्

उत्तिष्ठोत्तिष्ठ गोविंद
उत्तिष्ठ गरुडध्वज
उत्तिष्ठ कमलाकांत
त्रैलोक्यं मंगलं कुरु`,
      tamil: `கௌசல்யா சுப்ரஜா ராம
பூர்வா சந்த்யா ப்ரவர்ததே
உத்திஷ்ட நரசார்தூல
கர்தவ்யம் தைவமாஹ்னிகம்

உத்திஷ்டோத்திஷ்ட கோவிந்த
உத்திஷ்ட கருடத்வஜ
உத்திஷ்ட கமலாகாந்த
த்ரைலோக்யம் மங்களம் குரு`,
      telugu: `కౌసల్యా సుప్రజా రామ
పూర్వా సంధ్యా ప్రవర్తతే
ఉత్తిష్ఠ నరశార్దూల
కర్తవ్యం దైవమాహ్నికం

ఉత్తిష్ఠోత్తిష్ఠ గోవింద
ఉత్తిష్ఠ గరుడధ్వజ
ఉత్తిష్ఠ కమలాకాంత
త్రైలోక్యం మంగళం కురు`,
    },
  },
];

export const deities: Deity[] = ['Ganesha', 'Shiva', 'Vishnu', 'Krishna', 'Lakshmi', 'Saraswati', 'Hanuman', 'Durga', 'Murugan'];
export const themes: Theme[] = ['Morning', 'Evening', 'Prosperity', 'Wisdom', 'Protection', 'Devotion', 'Peace'];
