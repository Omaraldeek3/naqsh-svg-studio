// The design library (shared catalogue) as Naqsh presents it: the sections a visitor browses,
// the narrower groups inside each, and which section continues each ornament category.
// Section ids are the catalogue API's category ids. A group is a search word inside its section;
// every word here was checked against the catalogue and returns a useful, partial slice.
export type CatalogueSection={id:string;name:string;description:string;icon:string;groups:[label:string,word:string][]};
export const catalogueSections:CatalogueSection[]=[
  {id:"patterns",name:"زخارف وماندالا",description:"أنماط هندسية وخلفيات متكررة وزخارف دائرية",icon:"grid",groups:[["هندسية","هندسي"],["متكررة","متكرر"],["خلفيات","خلفية"],["بلاطات","بلاط"],["سلتية","سلتي"]]},
  {id:"frames",name:"إطارات وحواف",description:"براويز وحواف وفواصل وأشرطة للبطاقات واللوحات",icon:"frame",groups:[["حواف","حافة"],["فواصل","فاصل"],["أشرطة","شريط"],["زوايا","زاوية"],["عتيقة","عتيق"]]},
  {id:"flowers",name:"زهور ونباتات",description:"ورود وأوراق وأغصان وأكاليل",icon:"landscape",groups:[["ورود","وردة"],["أوراق","ورقة"],["أغصان","غصن"],["توليب","توليب"],["باقات","باقة"],["أكاليل","إكليل"]]},
  {id:"islamic",name:"إسلامي وعربي",description:"مساجد وأهلّة وفوانيس وخطوط عربية",icon:"spark",groups:[["خط عربي","خط"],["فوانيس","فانوس"],["مساجد","مسجد"],["أهلّة","هلال"]]},
  {id:"animals",name:"حيوانات",description:"قطط وخيول وغزلان وحيوانات البر",icon:"shapes",groups:[["قطط","قطة"],["كلاب","كلب"],["خيول","حصان"],["أسود","أسد"],["أرانب","أرنب"],["دببة","دب"],["فيلة","فيل"],["غزلان","غزال"],["جمال","جمل"]]},
  {id:"birds",name:"طيور",description:"نسور وبوم وحمام وطيور مغرّدة",icon:"shapes",groups:[["حمام","حمامة"],["نسور","نسر"],["بوم","بومة"],["ديوك","ديك"],["بط","بطة"],["ببغاوات","ببغاء"]]},
  {id:"sea",name:"كائنات بحرية",description:"أسماك وحيتان وسلاحف وأصداف",icon:"wave",groups:[["أسماك","سمكة"],["سلاحف","سلحفاة"],["قروش","قرش"],["حيتان","حوت"],["أصداف","صدفة"]]},
  {id:"insects",name:"حشرات وفراشات",description:"فراشات ونحل ويعاسيب",icon:"spark",groups:[["فراشات","فراشة"],["نحل","نحلة"],["عناكب","عنكبوت"],["خنافس","خنفساء"]]},
  {id:"trees",name:"أشجار",description:"نخيل وصنوبر وأشجار وغابات",icon:"landscape",groups:[["غابات","غابة"],["نخيل","نخلة"],["صنوبر","صنوبر"]]},
  {id:"people",name:"أشخاص",description:"وجوه وظلال وشخصيات مرسومة",icon:"pen",groups:[["نساء","امرأة"],["رجال","رجل"],["أطفال","طفل"],["وجوه","وجه"],["ظلال","سيلويت"],["كرتون","كرتون"]]},
  {id:"symbols",name:"رموز وأيقونات",description:"قلوب ونجوم وأسهم وشعارات",icon:"badge",groups:[["قلوب","قلب"],["نجوم","نجمة"],["أسهم","سهم"],["شعارات","شعار"],["لافتات","لافتة"],["أعلام","علم"],["أيقونات","أيقونة"]]},
  {id:"lettering",name:"حروف ونصوص",description:"حروف وأرقام وأبجديات مزخرفة",icon:"pen",groups:[["حروف","حرف"],["أبجديات","أبجدية"],["أرقام","رقم"]]},
  {id:"holidays",name:"مناسبات وأعياد",description:"زينة الأعياد والأفراح والهدايا",icon:"badge",groups:[["هدايا","هدية"],["أفراح","زفاف"],["عيد الميلاد","كريسماس"],["هالوين","هالوين"],["عيد الفصح","فصح"]]},
  {id:"food",name:"طعام وشراب",description:"فواكه ومخبوزات ومشروبات",icon:"shapes",groups:[["فواكه","فاكهة"],["مشروبات","مشروب"],["قهوة","قهوة"],["خضار","خضار"],["كعك","كعكة"],["خبز","خبز"]]},
  {id:"vehicles",name:"مركبات",description:"سيارات وطائرات وسفن ودراجات",icon:"shapes",groups:[["سيارات","سيارة"],["طائرات","طائرة"],["سفن","سفينة"],["دراجات","دراجة"],["شاحنات","شاحنة"],["قطارات","قطار"]]},
  {id:"buildings",name:"مبانٍ",description:"بيوت وقلاع وأبراج ومدن",icon:"window",groups:[["بيوت","بيت"],["مدن","مدينة"],["أبراج","برج"],["قلاع","قلعة"],["جسور","جسر"]]},
  {id:"landscape",name:"طبيعة ومناظر",description:"جبال وشواطئ وصحارٍ ومشاهد غروب",icon:"landscape",groups:[["جبال","جبل"],["شواطئ","شاطئ"],["غروب","غروب"],["صحراء","صحراء"]]},
  {id:"objects",name:"أدوات وأغراض",description:"كتب وساعات ومفاتيح وأدوات",icon:"layers",groups:[["كتب","كتاب"],["أدوات","أداة"],["زجاجات","زجاجة"],["ساعات","ساعة"],["مفاتيح","مفتاح"],["هواتف","هاتف"],["كراسٍ","كرسي"]]},
  {id:"sports",name:"رياضة",description:"كرات وملاعب ورياضيون",icon:"play",groups:[["كرة القدم","قدم"],["كرة السلة","سلة"],["تنس","تنس"]]},
  {id:"fantasy",name:"خيال وأساطير",description:"تنانين ومخلوقات أسطورية",icon:"spark",groups:[["تنانين","تنين"],["يونيكورن","يونيكورن"],["حوريات","حورية"]]},
];
export const catalogueSectionById=new Map(catalogueSections.map(s=>[s.id,s]));
// Each ornament category continues into the library section with the same subject.
export const ornamentContinues:Record<string,{section:string;word?:string}>={
  islamic:{section:"islamic"},arabesque:{section:"patterns"},botanical:{section:"flowers"},rosettes:{section:"patterns",word:"هندسي"},"ornate-frames":{section:"frames"},"ornate-borders":{section:"frames",word:"حافة"},
};
