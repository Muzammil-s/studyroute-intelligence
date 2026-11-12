// Approximate reference FX rates to 1 USD (explicitly labeled illustrative for educational budgeting)
export const FX_TO_USD = {
  USD: 1,
  EUR: 1.08,
  GBP: 1.27,
  CAD: 0.73,
  AUD: 0.66,
  MYR: 0.22,
  PKR: 0.0036
};

export const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'CA$',
  AUD: 'A$',
  PKR: 'Rs. '
};

export const COUNTRY_PROFILES = [
  {
    country: 'Germany',
    code: 'DE',
    officialPortal: 'https://www.daad.de/en/',
    visaWorkSummary: 'Up to 140 full / 280 half days part-time work; 18-month job-seeker residence permit post-graduation (statutory framework — verify on Make it in Germany).',
    sampleNote: 'Most German public universities charge €0 tuition for EU/international MSc students (Baden-Württemberg & TUM non-EU exceptions apply); semester social fees ~€150–€350.'
  },
  {
    country: 'United Kingdom',
    code: 'UK',
    officialPortal: 'https://study-uk.britishcouncil.org/',
    visaWorkSummary: 'Typically up to 20 hrs/week during term; Graduate Route visa allows post-study work (check GOV.UK for latest duration & rules).',
    sampleNote: '1-year taught MSc reduces total living duration vs 2-year degrees, though annual international tuition is higher.'
  },
  {
    country: 'Canada',
    code: 'CA',
    officialPortal: 'https://www.educanada.ca/',
    visaWorkSummary: 'Check IRCC rules for off-campus work hour caps and Post-Graduation Work Permit (PGWP) eligibility by institution/program.',
    sampleNote: 'Tuition & GIC proof-of-funds thresholds vary by province and university.'
  },
  {
    country: 'United States',
    code: 'US',
    officialPortal: 'https://educationusa.state.gov/',
    visaWorkSummary: 'F-1 on-campus work + CPT/OPT (STEM OPT extension up to 36 months for qualifying CS/Data degrees — verify via DHS/USCIS).',
    sampleNote: 'High variance between state public universities vs private institutions; TA/RA fellowships can offset tuition.'
  },
  {
    country: 'Australia',
    code: 'AU',
    officialPortal: 'https://www.studyaustralia.gov.au/',
    visaWorkSummary: 'Student visa (Subclass 500) fortnightly work limits and Temporary Graduate (485) post-study rights — verify on Home Affairs.',
    sampleNote: 'Tuition billed per unit load; scholarships often provide 15%–30% merit tuition waivers.'
  },
  {
    country: 'Malaysia',
    code: 'MY',
    officialPortal: 'https://educationmalaysia.gov.my/',
    visaWorkSummary: 'EMGS Student Pass allows limited part-time work during semester breaks only.',
    sampleNote: 'Affordable English-taught BSc/MSc pathway and branch campuses with lower living costs.'
  }
];

// Curated dataset clearly marked as illustrative planning benchmarks; verify exact intake numbers on university portals.
export const PROGRAMS = [
  {
    id: 'de-tum-msc',
    university: 'Technical University of Munich (TUM)',
    country: 'Germany',
    city: 'Munich',
    degree: 'Master\'s',
    program: 'MSc Informatics / Computer Science',
    durationYears: 2,
    language: 'English / Bilingual',
    localCurrency: 'EUR',
    tuitionPerYearLocal: 8000, // Illustrative non-EU MSc tuition tier + semester fee estimate
    livingPerYearLocal: 13200,
    scholarships: ['DAAD Study Scholarships', 'Deutschlandstipendium', 'TUM Tuition Waiver (Need/Merit)'],
    maxTypicalScholarshipUSD: 3500,
    requirements: { gpa: 'Equivalent German <= 2.3 (~3.2+/4.0)', english: 'IELTS 6.5 / TOEFL iBT 88', deadline: 'May 31 (Winter Intake)' },
    dataStatus: 'Illustrative Benchmark Estimate (verify non-EU TUM fee tier on official portal)',
    officialUrl: 'https://www.tum.de/en/studies/application'
  },
  {
    id: 'de-rwth-msc',
    university: 'RWTH Aachen University',
    country: 'Germany',
    city: 'Aachen',
    degree: 'Master\'s',
    program: 'MSc Software Systems Engineering',
    durationYears: 2,
    language: 'English',
    localCurrency: 'EUR',
    tuitionPerYearLocal: 640, // Semester contribution fee only (~€320 x 2)
    livingPerYearLocal: 11200,
    scholarships: ['DAAD EPOS / Master Stipend', 'RWTH Education Fund'],
    maxTypicalScholarshipUSD: 2500,
    requirements: { gpa: 'Strong CS foundation + GRE (non-EU)', english: 'IELTS 6.5 / TOEFL 90', deadline: 'Mar 1 (Winter Intake)' },
    dataStatus: 'Illustrative Benchmark Estimate (public semester fee model)',
    officialUrl: 'https://www.rwth-aachen.de/'
  },
  {
    id: 'uk-manchester-msc',
    university: 'University of Manchester',
    country: 'United Kingdom',
    city: 'Manchester',
    degree: 'Master\'s',
    program: 'MSc Cyber Security & Software Engineering',
    durationYears: 1,
    language: 'English',
    localCurrency: 'GBP',
    tuitionPerYearLocal: 34500,
    livingPerYearLocal: 13800,
    scholarships: ['Chevening Scholarship', 'Commonwealth Master\'s', 'GREAT Scholarships'],
    maxTypicalScholarshipUSD: 8000,
    requirements: { gpa: 'Upper Second-Class Honours (2:1 / ~3.3+)', english: 'IELTS 7.0 (no subtest < 6.5)', deadline: 'Rolling rounds (Nov–Jun)' },
    dataStatus: 'Illustrative Benchmark Estimate',
    officialUrl: 'https://www.manchester.ac.uk/study/masters/'
  },
  {
    id: 'uk-glasgow-bsc',
    university: 'University of Glasgow',
    country: 'United Kingdom',
    city: 'Glasgow',
    degree: 'Bachelor\'s',
    program: 'BSc (Hons) Computing Science',
    durationYears: 4,
    language: 'English',
    localCurrency: 'GBP',
    tuitionPerYearLocal: 29500,
    livingPerYearLocal: 12500,
    scholarships: ['Undergraduate Excellence Award'],
    maxTypicalScholarshipUSD: 6000,
    requirements: { gpa: 'A-Levels AAB / FSc + Foundation Year', english: 'IELTS 6.5 (no subtest < 6.0)', deadline: 'Jan (UCAS Equal Consideration)' },
    dataStatus: 'Illustrative Benchmark Estimate',
    officialUrl: 'https://www.gla.ac.uk/undergraduate/'
  },
  {
    id: 'ca-uwaterloo-msc',
    university: 'University of Waterloo',
    country: 'Canada',
    city: 'Waterloo, ON',
    degree: 'Master\'s',
    program: 'MMath Computer Science (Data & Systems)',
    durationYears: 2,
    language: 'English',
    localCurrency: 'CAD',
    tuitionPerYearLocal: 24500,
    livingPerYearLocal: 18500,
    scholarships: ['Graduate Research Assistantship', 'International Master\'s Award'],
    maxTypicalScholarshipUSD: 9000,
    requirements: { gpa: 'Min 78%–80%+ in CS Bachelor\'s', english: 'IELTS 7.0 / TOEFL 90', deadline: 'Dec 1 – Feb 1' },
    dataStatus: 'Illustrative Benchmark Estimate',
    officialUrl: 'https://uwaterloo.ca/graduate-studies-postdoctoral-affairs/'
  },
  {
    id: 'ca-sfu-bsc',
    university: 'Simon Fraser University (SFU)',
    country: 'Canada',
    city: 'Burnaby, BC',
    degree: 'Bachelor\'s',
    program: 'BSc Computing Science',
    durationYears: 4,
    language: 'English',
    localCurrency: 'CAD',
    tuitionPerYearLocal: 35000,
    livingPerYearLocal: 19200,
    scholarships: ['Undergraduate Scholars Entrance Scholarship'],
    maxTypicalScholarshipUSD: 5000,
    requirements: { gpa: '85%+ high school STEM average', english: 'IELTS 6.5 (no band < 6.0)', deadline: 'Jan 31 (Fall Intake)' },
    dataStatus: 'Illustrative Benchmark Estimate',
    officialUrl: 'https://www.sfu.ca/students/admission.html'
  },
  {
    id: 'us-gatech-msc',
    university: 'Georgia Institute of Technology',
    country: 'United States',
    city: 'Atlanta, GA',
    degree: 'Master\'s',
    program: 'MS Cybersecurity / Computer Science',
    durationYears: 2,
    language: 'English',
    localCurrency: 'USD',
    tuitionPerYearLocal: 31500,
    livingPerYearLocal: 17500,
    scholarships: ['Graduate Teaching / Research Assistantships', 'Fulbright Foreign Student'],
    maxTypicalScholarshipUSD: 10000,
    requirements: { gpa: '3.3+ / 4.0 STEM GPA', english: 'TOEFL 100 / IELTS 7.0', deadline: 'Jan 15 – Feb 1' },
    dataStatus: 'Illustrative Benchmark Estimate',
    officialUrl: 'https://grad.gatech.edu/'
  },
  {
    id: 'us-asu-bsc',
    university: 'Arizona State University',
    country: 'United States',
    city: 'Tempe, AZ',
    degree: 'Bachelor\'s',
    program: 'BS Computer Science (Data & Security Track)',
    durationYears: 4,
    language: 'English',
    localCurrency: 'USD',
    tuitionPerYearLocal: 34200,
    livingPerYearLocal: 16200,
    scholarships: ['New American University Merit Scholarship'],
    maxTypicalScholarshipUSD: 8000,
    requirements: { gpa: '3.0+ GPA + Math prerequisites', english: 'IELTS 6.0 / TOEFL 61', deadline: 'May 1 (Priority Fall)' },
    dataStatus: 'Illustrative Benchmark Estimate',
    officialUrl: 'https://admission.asu.edu/international'
  },
  {
    id: 'au-melbourne-msc',
    university: 'University of Melbourne',
    country: 'Australia',
    city: 'Melbourne',
    degree: 'Master\'s',
    program: 'Master of Information Technology (Cyber & Analytics)',
    durationYears: 2,
    language: 'English',
    localCurrency: 'AUD',
    tuitionPerYearLocal: 51000,
    livingPerYearLocal: 26500,
    scholarships: ['Melbourne Graduate Scholarship (15%–50%)', 'Australia Awards'],
    maxTypicalScholarshipUSD: 7500,
    requirements: { gpa: '65%+ weighted average', english: 'IELTS 6.5 (no band < 6.0)', deadline: 'Apr 30 / Oct 31' },
    dataStatus: 'Illustrative Benchmark Estimate',
    officialUrl: 'https://study.unimelb.edu.au/'
  },
  {
    id: 'my-utm-msc',
    university: 'Universiti Teknologi Malaysia (UTM)',
    country: 'Malaysia',
    city: 'Johor Bahru / KL',
    degree: 'Master\'s',
    program: 'MSc Data Science & Cyber Defense',
    durationYears: 1.5,
    language: 'English',
    localCurrency: 'MYR',
    tuitionPerYearLocal: 24000,
    livingPerYearLocal: 19500,
    scholarships: ['MTCP Scholarship', 'UTM Postgraduate Zamalah'],
    maxTypicalScholarshipUSD: 1500,
    requirements: { gpa: 'CGPA 3.0+ / 4.0', english: 'IELTS 6.0 / TOEFL 60', deadline: 'Jul 31 / Dec 31' },
    dataStatus: 'Illustrative Benchmark Estimate',
    officialUrl: 'https://admission.utm.my/'
  }
];

export function convertCurrency(amount, fromCode, toCode) {
  const inUsd = Number(amount || 0) * (FX_TO_USD[fromCode] || 1);
  return inUsd / (FX_TO_USD[toCode] || 1);
}

export function formatCurrency(amount, code) {
  const sym = CURRENCY_SYMBOLS[code] || `${code} `;
  return `${sym}${Math.round(amount).toLocaleString('en-US')}`;
}

export function getProgramAnnualCostUSD(program, applyScholarship = false) {
  const tuitionUsd = convertCurrency(program.tuitionPerYearLocal, program.localCurrency, 'USD');
  const livingUsd = convertCurrency(program.livingPerYearLocal, program.localCurrency, 'USD');
  const offset = applyScholarship ? Math.min(tuitionUsd, program.maxTypicalScholarshipUSD || 0) : 0;
  const netTuitionUsd = Math.max(0, tuitionUsd - offset);
  return {
    tuitionUsd: Math.round(tuitionUsd),
    livingUsd: Math.round(livingUsd),
    netTuitionUsd: Math.round(netTuitionUsd),
    totalAnnualUsd: Math.round(netTuitionUsd + livingUsd),
    fullDegreeUsd: Math.round((netTuitionUsd + livingUsd) * program.durationYears)
  };
}

export function filterPrograms(
  list,
  { country = 'all', degree = 'all', maxBudgetUsd = 80000, q = '', scholarshipOnly = false, applyScholarship = false, sort = 'total-asc' } = {}
) {
  const needle = String(q || '').trim().toLowerCase();
  const filtered = list.filter((p) => {
    const cost = getProgramAnnualCostUSD(p, applyScholarship);
    const matchCountry = country === 'all' || p.country === country;
    const matchDegree = degree === 'all' || p.degree === degree;
    const matchBudget = cost.totalAnnualUsd <= maxBudgetUsd;
    const matchSchol = !scholarshipOnly || (p.scholarships && p.scholarships.length > 0 && p.maxTypicalScholarshipUSD > 0);
    const matchQ =
      !needle ||
      p.university.toLowerCase().includes(needle) ||
      p.program.toLowerCase().includes(needle) ||
      p.country.toLowerCase().includes(needle) ||
      p.city.toLowerCase().includes(needle);
    return matchCountry && matchDegree && matchBudget && matchSchol && matchQ;
  });

  filtered.sort((a, b) => {
    const ca = getProgramAnnualCostUSD(a, applyScholarship);
    const cb = getProgramAnnualCostUSD(b, applyScholarship);
    if (sort === 'tuition-asc') return ca.netTuitionUsd - cb.netTuitionUsd;
    if (sort === 'living-asc') return ca.livingUsd - cb.livingUsd;
    return ca.totalAnnualUsd - cb.totalAnnualUsd;
  });

  return filtered;
}
