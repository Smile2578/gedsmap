import PropTypes from 'prop-types';
import { 
  MasksRounded,
  MedicalServicesRounded,
  ScienceRounded,
  PsychologyAltRounded,
  MedicationLiquidRounded,
  PetsRounded,
  SportsMartialArtsRounded,
  FoundationRounded,
  Language,
  OpenInNew
} from '@mui/icons-material';
import LanguageFlag from './LanguageFlag';

const PROGRAM_CONFIG = {
  'Médecine': {
    icon: <MedicalServicesRounded className="w-5 h-5" />,
    color: 'bg-red-50 text-red-700',
    patterns: ['MD Doctor of Medicine']
  },
  'Dentaire': {
    icon: <MasksRounded className="w-5 h-5" />,
    color: 'bg-blue-50 text-blue-700',
    patterns: ['Bachelor of Dental Surgery', 'Doctor of Dental Medicine', 'Médecine Dentaire']
  },
  'Pharmacie': {
    icon: <MedicationLiquidRounded className="w-5 h-5" />,
    color: 'bg-green-50 text-green-700',
    patterns: ['Master Intégré en Pharmacie', 'Doctor of Pharmacy', 'PharmD']
  },
  'Vétérinaire': {
    icon: <PetsRounded className="w-5 h-5" />,
    color: 'bg-purple-50 text-purple-700',
    patterns: ['Doctor of Veterinary Medicine', 'DVM', 'Médecine Vétérinaire']
  },
  'Kinésithérapie': {
    icon: <SportsMartialArtsRounded className="w-5 h-5" />,
    color: 'bg-orange-50 text-orange-700',
    patterns: ['Physiothérapie', 'Kinésithérapie', 'BSc in Physiotherapy']
  },
  'Psychologie': {
    icon: <PsychologyAltRounded className="w-5 h-5" />,
    color: 'bg-pink-50 text-pink-700',
    patterns: ['Psychologie']
  },
  'Sciences Biomédicales': {
    icon: <ScienceRounded className="w-5 h-5" />,
    color: 'bg-indigo-50 text-indigo-700',
    patterns: ['Sciences Bio', 'Biomedical', 'Santé et Bien-être']
  },
  'Foundation Course': {
    icon: <FoundationRounded className="w-5 h-5" />,
    color: 'bg-yellow-50 text-yellow-700',
    patterns: ['Foundation Course']
  }
};


  

const UniversityPreviewCard = ({ university, onClick }) => {
    const getGenericPrograms = () => {
      const programs = new Set();
      
      university.programs.forEach(program => {
        for (const [key, config] of Object.entries(PROGRAM_CONFIG)) {
          if (config.patterns.some(pattern => program.includes(pattern))) {
            programs.add(key);
            break;
          }
        }
      });
      
      return Array.from(programs);
    };
  
    return (
      <div 
        className="bg-white rounded-lg shadow-lg p-4 min-w-[300px] cursor-pointer hover:shadow-xl transition-shadow"
        onClick={onClick}
      >
        <h3 className="text-lg font-bold">{university.name}</h3>
        <p className="text-gray-600 mb-3">{university.city}, {university.country}</p>
  
        <div className="flex flex-wrap gap-2 mb-4">
          {getGenericPrograms().map((program) => (
            <div 
              key={program}
              className={`flex items-center gap-1 ${PROGRAM_CONFIG[program].color} px-3 py-1.5 rounded-full text-sm font-medium`}
            >
              {PROGRAM_CONFIG[program].icon}
              <span>{program}</span>
            </div>
          ))}
        </div>
  
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-gray-700">
            <Language className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Cours dispensés en :</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {university.languages.map((lang, idx) => (
              <LanguageFlag key={idx} code={lang} />
            ))}
          </div>
        </div>
  
        <button 
          className="mt-4 text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
          onClick={(e) => {
            e.stopPropagation();
            window.open(`https://www.geds.fr/universites/${university.mainId || university.id}`, '_blank');
          }}
        >
          En savoir plus
          <OpenInNew className="w-4 h-4" />
        </button>
      </div>
    );
  };
  
  UniversityPreviewCard.propTypes = {
    university: PropTypes.shape({
      id: PropTypes.string.isRequired,
      mainId: PropTypes.string,
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      programs: PropTypes.arrayOf(PropTypes.string).isRequired,
      languages: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
  };
  
  export default UniversityPreviewCard;