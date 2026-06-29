import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'te' | 'hi';

export interface Translations {
  title: string;
  subtitle: string;
  anganwadiCenter: string;
  healthAssessment: string;
  assessmentDesc: string;
  inputData: string;
  nameLabel: string;
  namePlaceholder: string;
  ageLabel: string;
  ageUnitMonths: string;
  ageUnitYears: string;
  genderLabel: string;
  genderSelect: string;
  genderBoy: string;
  genderGirl: string;
  weightLabel: string;
  previousWeightLabel: string;
  heightLabel: string;
  analyzeBtn: string;
  analyzingBtn: string;
  helpline: string;
  footerCredit: string;
  checkAnother: string;
  printReport: string;
  nextStep: string;
  foodSuggestions: string;
  healthAlert: string;
  childName: string;
  ageMonths: string;
  statusNormal: string;
  statusUnderweight: string;
  statusSeverelyUnderweight: string;
  reportId: string;
  requiredField: string;
  invalidNumber: string;
  valueTooSmall: string;
  valueTooLarge: string;
  weightLimitError: string;
  heightLimitError: string;
  weightDiffError: string;
  dailyLog: string;
  addActivity: string;
  mealPlaceholder: string;
  activityPlaceholder: string;
  logType: string;
  meal: string;
  activity: string;
  notes: string;
  saveProgress: string;
  savedData: string;
  savedSuccessfully: string;
  noSavedData: string;
  deleteRecord: string;
  backAndEdit: string;
  localizedSummary: string;
  mascotCritical: string;
  mascotWarning: string;
  mascotNormal: string;
  tipsTitle: string;
  tipsIntro: string;
  diverseDietTitle: string;
  diverseDietDesc: string;
  hygieneTitle: string;
  hygieneDesc: string;
  guidelinesTitle: string;
  feedingFreqTitle: string;
  feedingFreqDesc: string;
  activePlayTitle: string;
  activePlayDesc: string;
  growthMonTitle: string;
  growthMonDesc: string;
  heroTitle: string;
  heroDesc: string;
  tabDashboard: string;
  tabAssess: string;
  tabTips: string;
  welcomeNutriChild: string;
  nurturingFuture: string;
  dashboardIntro: string;
  whoStandards: string;
  healthyGrowthDesc: string;
  growthBoys: string;
  growthGirls: string;
  age2Years: string;
  age5Years: string;
  growthVelocity: string;
  growthVelocityVal: string;
  nutritionGuide: string;
  fuelingBody: string;
  milkEggs: string;
  proteinCalcium: string;
  greenLeaves: string;
  ironVitamins: string;
  dalBeans: string;
  muscleBuilding: string;
  freshFruits: string;
  immunityBoost: string;
  balancedMeal: string;
  balancedMealDesc: string;
  solvingGlobal: string;
  grassrootsImpact: string;
  zeroHunger: string;
  zeroHungerDesc: string;
  microNutrition: string;
  microNutritionDesc: string;
  aiPrecision: string;
  aiPrecisionDesc: string;
}

const translations: Record<Language, Translations> = {
  en: {
    title: "NutriChild",
    subtitle: "Nutrition Assistant",
    anganwadiCenter: "Anganwadi Center: #402",
    healthAssessment: "Health Assessment",
    assessmentDesc: "Record child details to analyze growth standards.",
    inputData: "Input Child Data",
    nameLabel: "Name of Child",
    namePlaceholder: "Full Name",
    ageLabel: "Age",
    ageUnitMonths: "Months",
    ageUnitYears: "Years",
    genderLabel: "Gender",
    genderSelect: "Select",
    genderBoy: "Boy",
    genderGirl: "Girl",
    weightLabel: "Weight (kg)",
    previousWeightLabel: "Prev. Weight (1mo ago)",
    heightLabel: "Height (cm)",
    analyzeBtn: "Analyze Nutrition",
    analyzingBtn: "Analyzing Data...",
    helpline: "Need Help? Call Helpline: 108",
    footerCredit: "Designed for Health Workers in India © 2026",
    checkAnother: "Check Another",
    printReport: "Print Report",
    nextStep: "Worker Recommendation",
    foodSuggestions: "Local Food Suggestions",
    healthAlert: "Health Alert",
    childName: "Child Name",
    ageMonths: "Age (Months)",
    statusNormal: "Normal",
    statusUnderweight: "Underweight",
    statusSeverelyUnderweight: "Severely Underweight",
    reportId: "REPORT GEN-ID",
    requiredField: "Required field",
    invalidNumber: "Please enter a valid number",
    valueTooSmall: "Value is too small",
    valueTooLarge: "Value is too large",
    weightLimitError: "Weight seems unrealistic for this age (Expected 2-30kg)",
    heightLimitError: "Height seems unrealistic for this age (Expected 45-130cm)",
    weightDiffError: "Previous weight is too different from current weight",
    dailyLog: "Daily Activities & Meals",
    addActivity: "Add Log Entry",
    mealPlaceholder: "e.g., Rice, Dal, Milk",
    activityPlaceholder: "e.g., Playing in park, Nap time",
    logType: "Type",
    meal: "Meal",
    activity: "Activity",
    notes: "Notes/Description",
    saveProgress: "Save Progress",
    savedData: "Saved Records",
    savedSuccessfully: "Data saved successfully!",
    noSavedData: "No saved records found",
    deleteRecord: "Delete Record",
    backAndEdit: "Back & Edit",
    localizedSummary: "Localized Summary",
    mascotCritical: "Please take immediate medical action!",
    mascotWarning: "We should watch this child's growth carefully.",
    mascotNormal: "Wonderful! This child is healthy and strong!",
    tipsTitle: "Anganwadi Care Tips",
    tipsIntro: "Helping our children grow strong is a collaborative effort. Here are some essential tips for Anganwadi workers to ensure the best health outcomes for our little ones.",
    diverseDietTitle: "Diverse Diet",
    diverseDietDesc: "Encourage parents to include a variety of colors in the child's plate - green leafy vegetables, orange carrots, and white milk products.",
    hygieneTitle: "Hygiene First",
    hygieneDesc: "Always emphasize hand washing with soap before eating and after using the toilet to prevent infections that cause weight loss.",
    guidelinesTitle: "Health Guidelines",
    feedingFreqTitle: "Feeding Frequency",
    feedingFreqDesc: "Children aged 1-5 years should ideally have 3 main meals and 2 nutritious snacks every day to maintain growth velocity.",
    activePlayTitle: "Active Play",
    activePlayDesc: "Ensure children get at least 60 minutes of active play. It stimulates appetite and helps in overall bone development.",
    growthMonTitle: "Growth Monitoring",
    growthMonDesc: "Record weight every month. If there's no increase for 2 months, immediately consult a PHC doctor.",
    heroTitle: "Become a Hero",
    heroDesc: "Every healthy child you track today is a stronger citizen of tomorrow. Keep up the amazing work!",
    tabDashboard: "Dashboard",
    tabAssess: "Assess",
    tabTips: "Tips",
    welcomeNutriChild: "Welcome to NutriChild",
    nurturingFuture: "Nurturing the Future of Every Child",
    dashboardIntro: "This application is designed specifically for Anganwadi workers to ensure no child is left behind. By tracking weight and height precisely, we can detect growth faltering, hidden hunger, and stunting before they become permanent issues.",
    whoStandards: "WHO Growth Standards",
    healthyGrowthDesc: "What does a healthy growth look like?",
    growthBoys: "Healthy Growth: Boys",
    growthGirls: "Healthy Growth: Girls",
    age2Years: "Age 2 Years",
    age5Years: "Age 5 Years",
    growthVelocity: "Growth Velocity",
    growthVelocityVal: "+200g per month",
    nutritionGuide: "Nutrition Guide",
    fuelingBody: "Fueling the Body & Brain",
    milkEggs: "Milk & Eggs",
    proteinCalcium: "Protein & Calcium",
    greenLeaves: "Green Leaves",
    ironVitamins: "Iron & Vitamins",
    dalBeans: "Dal & Beans",
    muscleBuilding: "Muscle Building",
    freshFruits: "Fresh Fruits",
    immunityBoost: "Immunity Boost",
    balancedMeal: "Balanced Meal",
    balancedMealDesc: "Ensure every meal has protein, fiber, and healthy energy!",
    solvingGlobal: "Solving Global Problems Locally",
    grassrootsImpact: "Our Impact at the Grassroots",
    zeroHunger: "Zero Hunger",
    zeroHungerDesc: "Early detection of malnutrition cases to prevent long-term health issues.",
    microNutrition: "Micro Nutrition",
    microNutritionDesc: "Detecting 'Hidden Hunger' symptoms often missed in standard checkups.",
    aiPrecision: "AI Precision",
    aiPrecisionDesc: "Using Gemini AI to analyze complex growth trends and provide medical advice."
  },
  te: {
    title: "NutriChild",
    subtitle: "న్యూట్రిషన్ అసిస్టెంట్",
    anganwadiCenter: "అంగన్‌వాడీ కేంద్రం: #402",
    healthAssessment: "ఆరోగ్య అంచనా",
    assessmentDesc: "పెరుగుదల ప్రమాణాలను విశ్లేషించడానికి పిల్లల వివరాలను నమోదు చేయండి.",
    inputData: "పిల్లల డేటాను నమోదు చేయండి",
    nameLabel: "పిల్లల పేరు",
    namePlaceholder: "పూర్తి పేరు",
    ageLabel: "వయస్సు",
    ageUnitMonths: "నెలలు",
    ageUnitYears: "సంవత్సరాలు",
    genderLabel: "లింగం",
    genderSelect: "ఎంచుకోండి",
    genderBoy: "బాలుడు",
    genderGirl: "బాలిక",
    weightLabel: "బరువు (కేజీ)",
    previousWeightLabel: "మునుపటి బరువు (1 నెల క్రితం)",
    heightLabel: "ఎత్తు (సెం.మీ)",
    analyzeBtn: "పోషణను విశ్లేషించండి",
    analyzingBtn: "డేటాను విశ్లేషిస్తోంది...",
    helpline: "సహాయం కావాలా? హెల్ప్‌లైన్: 108",
    footerCredit: "భారతదేశంలోని ఆరోగ్య కార్యకర్తల కోసం రూపొందించబడింది © 2026",
    checkAnother: "మరొకటి తనిఖీ చేయండి",
    printReport: "రిపోర్ట్ ప్రింట్ చేయండి",
    nextStep: "కార్యకర్త సిఫార్సు",
    foodSuggestions: "స్థానిక ఆహార సూచనలు",
    healthAlert: "ఆరోగ్య హెచ్చరిక",
    childName: "పిల్లల పేరు",
    ageMonths: "వయస్సు (నెలలు)",
    statusNormal: "సాధారణం",
    statusUnderweight: "తక్కువ బరువు",
    statusSeverelyUnderweight: "తీవ్రమైన తక్కువ బరువు",
    reportId: "రిపోర్ట్ ఐడి",
    requiredField: "తప్పనిసరి",
    invalidNumber: "సరైన సంఖ్యను నమోదు చేయండి",
    valueTooSmall: "విలువ చాలా తక్కువగా ఉంది",
    valueTooLarge: "విలువ చాలా ఎక్కువగా ఉంది",
    weightLimitError: "ఈ వయస్సుకు బరువు అవాస్తవంగా ఉంది (2-30 కేజీలు ఊహించబడింది)",
    heightLimitError: "ఈ వయస్సుకు ఎత్తు అవాస్తవంగా ఉంది (45-130 సెం.మీ ఊహించబడింది)",
    weightDiffError: "మునుపటి బరువు ప్రస్తుత బరువుకు చాలా భిన్నంగా ఉంది",
    dailyLog: "రోజువారీ కార్యకలాపాలు & భోజనం",
    addActivity: "లాగ్ ఎంట్రీని జోడించండి",
    mealPlaceholder: "ఉదాహరణకు: అన్నం, పప్పు, పాలు",
    activityPlaceholder: "ఉదాహరణకు: పార్కులో ఆడటం, నిద్ర సమయం",
    logType: "రకం",
    meal: "భోజనం",
    activity: "కార్యకలాపం",
    notes: "గమనికలు/వివరణ",
    saveProgress: "ప్రగతిని సేవ్ చేయండి",
    savedData: "సేవ్ చేసిన రికార్డులు",
    savedSuccessfully: "డేటా విజయవంతంగా సేవ్ చేయబడింది!",
    noSavedData: "సేవ్ చేసిన రికార్డులు ఏవీ లేవు",
    deleteRecord: "రికార్డును తొలగించండి",
    backAndEdit: "వెనుకకు & సవరించండి",
    localizedSummary: "స్థానిక సారాంశం",
    mascotCritical: "దయచేసి వెంటనే వైద్య చర్య తీసుకోండి!",
    mascotWarning: "మనం ఈ పిల్లల ఎదుగుదలను జాగ్రత్తగా గమనించాలి.",
    mascotNormal: "అద్భుతం! ఈ బిడ్డ ఆరోగ్యంగా మరియు దృఢంగా ఉంది!",
    tipsTitle: "అంగన్‌వాడీ సంరక్షణ చిట్కాలు",
    tipsIntro: "పిల్లలను దృఢంగా ఎదిగేలా చేయడంలో సమిష్టి కృషి అవసరం. పిల్లల ఆరోగ్యం కోసం అంగన్‌వాడీ కార్యకర్తలకు కొన్ని ముఖ్యమైన చిట్కాలు ఇక్కడ ఉన్నాయి.",
    diverseDietTitle: "వైవిధ్యమైన ఆహారం",
    diverseDietDesc: "పిల్లల భోజనంలో ఆకుకూరలు, క్యారెట్లు మరియు పాల ఉత్పత్తులు వంటి వివిధ రకాల రంగులను చేర్చమని తల్లిదండ్రులను ప్రోత్సహించండి.",
    hygieneTitle: "శుభ్రత ముఖ్యం",
    hygieneDesc: "బరువు తగ్గడానికి కారణమయ్యే ఇన్ఫెక్షన్లను నివారించడానికి తినే ముందు మరియు టాయిలెట్ ఉపయోగించిన తర్వాత సబ్బుతో చేతులు కడుక్కోవడం గురించి ఎప్పువు నొక్కి చెప్పండి.",
    guidelinesTitle: "ఆరోగ్య మార్గదర్శకాలు",
    feedingFreqTitle: "ఆహారం అందించే ఫ్రీక్వెన్సీ",
    feedingFreqDesc: "1-5 సంవత్సరాల వయస్సు గల పిల్లలు పెరుగుదలను కొనసాగించడానికి ప్రతిరోజూ 3 ప్రధాన భోజనాలు మరియు 2 పోషకమైన స్నాక్స్ తీసుకోవాలి.",
    activePlayTitle: "ఆక్టివ్ ప్లే",
    activePlayDesc: "పిల్లలకు కనీసం 60 నిమిషాల చురుకైన ఆట లభించేలా చూడండి. ఇది ఆకలిని పెంచుతుంది మరియు ఎముకల అభివృద్ధికి సహాయపడుతుంది.",
    growthMonTitle: "పెరుగుదల పర్యవేక్షణ",
    growthMonDesc: "ప్రతి నెలా బరువు నమోదు చేయండి. 2 నెలల నుంచి బరువు పెరగకపోతే వెంటనే పీహెచ్‌సీ డాక్టరును సంప్రదించాలి.",
    heroTitle: "హీరో అవ్వండి",
    heroDesc: "మీరు ఈరోజు ట్రాక్ చేసే ప్రతి ఆరోగ్యవంతుడైన బిడ్డ రేపటి దృఢమైన పౌరుడు. మీ అద్భుతమైన పనిని కొనసాగించండి!",
    tabDashboard: "డ్యాష్‌బోర్డ్",
    tabAssess: "అంచనా",
    tabTips: "చిట్కాలు",
    welcomeNutriChild: "న్యూట్రిచైల్డ్‌కు స్వాగతం",
    nurturingFuture: "ప్రతి బిడ్డ భవిష్యత్తును తీర్చిదిద్దడం",
    dashboardIntro: "ఏ బిడ్డ వెనుకబడి ఉండకూడదని అంగన్‌వాడీ కార్యకర్తల కోసం ఈ అప్లికేషన్ ప్రత్యేకంగా రూపొందించబడింది. బరువు మరియు ఎత్తును ఖచ్చితంగా ట్రాక్ చేయడం ద్వారా, మనం పెరుగుదల వైఫల్యం, దాగి ఉన్న ఆకలి మరియు కుంగిపోవడాన్ని శాశ్వత సమస్యలుగా మారకముందే గుర్తించవచ్చు.",
    whoStandards: "WHO పెరుగుదల ప్రమాణాలు",
    healthyGrowthDesc: "ఆరోగ్యకరమైన పెరుగుదల ఎలా ఉంటుంది?",
    growthBoys: "ఆరోగ్యకరమైన పెరుగుదల: బాలురు",
    growthGirls: "ఆరోగ్యకరమైన పెరుగుదల: బాలికలు",
    age2Years: "2 సంవత్సరాల వయస్సు",
    age5Years: "5 సంవత్సరాల వయస్సు",
    growthVelocity: "పెరుగుదల వేగం",
    growthVelocityVal: "నెలకు +200 గ్రా",
    nutritionGuide: "పోషకాహార మార్గదర్శి",
    fuelingBody: "శరీరం & మెదడుకు శక్తినివ్వడం",
    milkEggs: "పాలు & గుడ్లు",
    proteinCalcium: "ప్రోటీన్ & కాల్షియం",
    greenLeaves: "ఆకుకూరలు",
    ironVitamins: "ఐరన్ & విటమిన్లు",
    dalBeans: "పప్పులు & గింజలు",
    muscleBuilding: "కండరాల నిర్మాణం",
    freshFruits: "తాజా పండ్లు",
    immunityBoost: "రోగనిరోధక శక్తి పెంపు",
    balancedMeal: "సమతుల్య ఆహారం",
    balancedMealDesc: "ప్రతి భోజనంలో ప్రోటీన్, ఫైబర్ మరియు ఆరోగ్యకరమైన శక్తి ఉండేలా చూసుకోండి!",
    solvingGlobal: "ప్రపంచ సమస్యలను స్థానికంగా పరిష్కరించడం",
    grassrootsImpact: "మా ప్రభావం క్షేత్రస్థాయిలో",
    zeroHunger: "ఆకలి లేని సమాజం",
    zeroHungerDesc: "దీర్ఘకాలిక ఆరోగ్య సమస్యలను నివారించడానికి పోషకాహార లోపం కేసులను ముందుగా గుర్తించడం.",
    microNutrition: "సూక్ష్మ పోషణ",
    microNutritionDesc: "సాధారణ పరీక్షల్లో తరచుగా తప్పిపోయే 'హిడెన్ హంగర్' లక్షణాలను గుర్తించడం.",
    aiPrecision: "AI ఖచ్చితత్వం",
    aiPrecisionDesc: "క్లిష్టమైన పెరుగుదల ధోరణులను విశ్లేషించడానికి మరియు వైద్య సలహాలను అందించడానికి జెమిని AIని ఉపయోగించడం."
  },
  hi: {
    title: "NutriChild",
    subtitle: "न्यूट्रिशन असिस्टेंट",
    anganwadiCenter: "आंगनवाड़ी केंद्र: #402",
    healthAssessment: "स्वास्थ्य मूल्यांकन",
    assessmentDesc: "विकास मानकों का विश्लेषण करने के लिए बच्चे का विवरण दर्ज करें।",
    inputData: "बच्चे का डेटा दर्ज करें",
    nameLabel: "बच्चे का नाम",
    namePlaceholder: "पूरा नाम",
    ageLabel: "आयु",
    ageUnitMonths: "महीने",
    ageUnitYears: "वर्ष",
    genderLabel: "लिंग",
    genderSelect: "चुनें",
    genderBoy: "लड़का",
    genderGirl: "लड़की",
    weightLabel: "वजन (किलो)",
    previousWeightLabel: "पिछला वजन (1 महीने पहले)",
    heightLabel: "ऊंचाई (सेमी)",
    analyzeBtn: "पोषण का विश्लेषण करें",
    analyzingBtn: "डेटा का विश्लेषण हो रहा है...",
    helpline: "मदद चाहिए? हेल्पलाइन: 108",
    footerCredit: "भारत में स्वास्थ्य कार्यकर्ताओं के लिए डिज़ाइन किया गया © 2026",
    checkAnother: "दूसरा जांचें",
    printReport: "रिपोर्ट प्रिंट करें",
    nextStep: "कार्यकर्ता की सिफारिश",
    foodSuggestions: "स्थानीय भोजन सुझाव",
    healthAlert: "स्वास्थ्य चेतावनी",
    childName: "बच्चे का नाम",
    ageMonths: "आयु (महीने)",
    statusNormal: "सामान्य",
    statusUnderweight: "कम वजन",
    statusSeverelyUnderweight: "गंभीर रूप से कम वजन",
    reportId: "रिपोर्ट आईडी",
    requiredField: "आवश्यक",
    invalidNumber: "कृपया मान्य संख्या दर्ज करें",
    valueTooSmall: "मान बहुत छोटा है",
    valueTooLarge: "मान बहुत बड़ा है",
    weightLimitError: "इस उम्र के लिए वजन अवास्तविक लग रहा है (2-30 किलो अपेक्षित)",
    heightLimitError: "इस उम्र के लिए ऊंचाई अवास्तविक लग रहा है (45-130 सेमी अपेक्षित)",
    weightDiffError: "पिछला वजन वर्तमान वजन से बहुत अलग है",
    dailyLog: "दैनिक गतिविधियां और भोजन",
    addActivity: "लॉग एंट्री जोड़ें",
    mealPlaceholder: "जैसे: चावल, दाल, दूध",
    activityPlaceholder: "जैसे: पार्क में खेलना, सोने का समय",
    logType: "प्रकार",
    meal: "भोजन",
    activity: "गतिविधि",
    notes: "नोट्स/विवरण",
    saveProgress: "प्रगति सहेजें",
    savedData: "सहेजे गए रिकॉर्ड",
    savedSuccessfully: "डेटा सफलतापूर्वक सहेजा गया!",
    noSavedData: "कोई सहेजे गए रिकॉर्ड नहीं मिले",
    deleteRecord: "रिकॉर्ड हटाएं",
    backAndEdit: "पीछे और संपादित करें",
    localizedSummary: "स्थानीय सारांश",
    mascotCritical: "कृपया तुरंत चिकित्सा कार्रवाई करें!",
    mascotWarning: "हमें इस बच्चे के विकास पर सावधानीपूर्वक नज़र रखनी चाहिए।",
    mascotNormal: "अद्भुत! यह बच्चा स्वस्थ और मजबूत है!",
    tipsTitle: "आंगनवाड़ी देखभाल युक्तियाँ",
    tipsIntro: "बच्चों को मजबूत बनाने में मदद करना एक सामूहिक प्रयास है। बच्चों के स्वास्थ्य के लिए आंगनवाड़ी कार्यकर्ताओं के लिए यहाँ कुछ आवश्यक युक्तियाँ दी गई हैं।",
    diverseDietTitle: "विविध आहार",
    diverseDietDesc: "माता-पिता को बच्चे की थाली में विभिन्न प्रकार के रंगों को शामिल करने के लिए प्रोत्साहित करें - हरी पत्तेदार सब्जियां, नारंगी गाजर और सफेद दूध उत्पाद।",
    hygieneTitle: "स्वच्छता पहले",
    hygieneDesc: "वजन घटाने वाले संक्रमणों को रोकने के लिए खाने से पहले और शौचालय का उपयोग करने के बाद साबुन से हाथ धोने पर हमेशा जोर दें।",
    guidelinesTitle: "स्वास्थ्य दिशानिर्देश",
    feedingFreqTitle: "खिलाने की आवृत्ति",
    feedingFreqDesc: "1-5 वर्ष की आयु के बच्चों को विकास की गति बनाए रखने के लिए आदर्श रूप से हर दिन 3 मुख्य भोजन और 2 पौष्टिक स्नैक लेने चाहिए।",
    activePlayTitle: "सक्रिय खेल",
    activePlayDesc: "सुनिश्चित करें कि बच्चों को कम से कम 60 मिनट का सक्रिय खेल मिले। यह भूख को उत्तेजित करता है और समग्र हड्डियों के विकास में मदद करता है।",
    growthMonTitle: "विकास निगरानी",
    growthMonDesc: "हर महीने वजन रिकॉर्ड करें। यदि 2 महीने तक वजन में कोई वृद्धि नहीं होती है, तो तुरंत पीएचसी डॉक्टर से परामर्श करें।",
    heroTitle: "हीरो बनें",
    heroDesc: "आज आप जिस भी स्वस्थ बच्चे को ट्रैक करते हैं, वह कल का एक मजबूत नागरिक है। अपना अद्भुत काम जारी रखें!",
    tabDashboard: "डैशबोर्ड",
    tabAssess: "मूल्यांकन",
    tabTips: "युक्तियाँ",
    welcomeNutriChild: "न्यूट्रीचाइल्ड में आपका स्वागत है",
    nurturingFuture: "हर बच्चे के भविष्य का पोषण",
    dashboardIntro: "यह एप्लिकेशन विशेष रूप से आंगनवाड़ी कार्यकर्ताओं के लिए डिज़ाइन किया गया है ताकि यह सुनिश्चित किया जा सके कि कोई भी बच्चा पीछे न छूटे। वजन और ऊंचाई को सटीक रूप से ट्रैक करके, हम विकास की विफलता, छिपी हुई भूख और स्टंटिंग का पता लगा सकते हैं, इससे पहले कि वे स्थायी समस्या बन जाएं।",
    whoStandards: "WHO विकास मानक",
    healthyGrowthDesc: "स्वस्वथ विकास कैसा दिखता है?",
    growthBoys: "स्वस्थ विकास: लड़के",
    growthGirls: "स्वस्थ विकास: लड़कियां",
    age2Years: "आयु 2 वर्ष",
    age5Years: "आयु 5 वर्ष",
    growthVelocity: "विकास वेग",
    growthVelocityVal: "+200 ग्राम प्रति माह",
    nutritionGuide: "पोषण मार्गदर्शिका",
    fuelingBody: "शरीर और मस्तिष्क को ईंधन देना",
    milkEggs: "दूध और अंडे",
    proteinCalcium: "प्रोटीन और कैल्शियम",
    greenLeaves: "हरी पत्तियां",
    ironVitamins: "आयरन और विटामिन",
    dalBeans: "दाल और बीन्स",
    muscleBuilding: "मांसपेशियों का निर्माण",
    freshFruits: "ताजे फल",
    immunityBoost: "रोग प्रतिरोधक क्षमता बढ़ाना",
    balancedMeal: "संतुलित भोजन",
    balancedMealDesc: "सुनिश्चित करें कि हर भोजन में प्रोटीन, फाइबर और स्वस्थ ऊर्जा हो!",
    solvingGlobal: "वैश्विक समस्याओं को स्थानीय स्तर पर हल करना",
    grassrootsImpact: "जमीनी स्तर पर हमारा प्रभाव",
    zeroHunger: "शून्य भूख",
    zeroHungerDesc: "दीर्घकालिक स्वास्थ्य समस्याओं को रोकने के लिए कुपोषण के मामलों का जल्द पता लगाना।",
    microNutrition: "सूक्ष्म पोषण",
    microNutritionDesc: "'छिपी हुई भूख' के लक्षणों का पता लगाना जो अक्सर मानक जांच में छूट जाते हैं।",
    aiPrecision: "एआई सटीकता",
    aiPrecisionDesc: "जटिल विकास रुझानों का विश्लेषण करने और चिकित्सा सलाह प्रदान करने के लिए जेमिनी एआई का उपयोग करना।"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
