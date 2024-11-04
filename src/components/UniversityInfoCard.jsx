import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Close, Language, OpenInNew } from '@mui/icons-material';
import { 
  MasksRounded,
  MedicalServicesRounded,
  ScienceRounded,
  PsychologyAltRounded,
  MedicationLiquidRounded,
  PetsRounded,
  SportsMartialArtsRounded,
  FoundationRounded
} from '@mui/icons-material';
import { PROGRAM_CONFIG } from '../config/programConfig';
import LanguageFlag from './LanguageFlag';

// Map des icônes
const ICONS_MAP = {
  MedicalServices: MedicalServicesRounded,
  Masks: MasksRounded,
  Science: ScienceRounded,
  PsychologyAlt: PsychologyAltRounded,
  MedicationLiquid: MedicationLiquidRounded,
  Pets: PetsRounded,
  SportsMartialArts: SportsMartialArtsRounded,
  Foundation: FoundationRounded,
};

const UniversityInfoCard = ({ university, onClose }) => {
  // Fonction pour obtenir les formations avec leur configuration
  const getProgramsWithConfig = () => {
    return university.programs.map(programName => {
      for (const [generic, config] of Object.entries(PROGRAM_CONFIG)) {
        if (config.patterns.some(pattern => programName.includes(pattern))) {
          // Créer l'icône à partir du type
          const IconComponent = ICONS_MAP[config.iconType];
          const icon = IconComponent ? <IconComponent /> : null;
          
          return {
            fullName: programName,
            generic,
            config: { ...config, icon }
          };
        }
      }
      return {
        fullName: programName,
        generic: null,
        config: null
      };
    });
  };

  // Grouper les formations par type
  const groupedPrograms = getProgramsWithConfig().reduce((acc, program) => {
    if (program.generic) {
      if (!acc[program.generic]) {
        acc[program.generic] = {
          programs: [],
          config: program.config
        };
      }
      acc[program.generic].programs.push(program.fullName);
    }
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full"
    >
      {/* Header avec image */}
      <div className="relative">
        <div 
          className="h-48 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${university.backgroundImage})`,
            backgroundBlendMode: 'overlay',
            backgroundColor: 'rgba(0,0,0,0.3)'
          }}
        />
        
        <div className="absolute -bottom-8 left-4 p-1 bg-white rounded-xl shadow-lg">
          <img 
            src={university.logo} 
            alt={`Logo ${university.name}`}
            className="w-20 h-20 rounded-lg"
          />
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 
                   hover:bg-white transition-colors"
        >
          <Close className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Contenu */}
      <div className="p-6 pt-12">
        <h2 className="text-2xl font-bold">{university.name}</h2>
        <p className="text-gray-600 text-lg mb-6">
          {university.city}, {university.country}
        </p>

        {/* Formations */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Formations proposées</h3>
          <div className="space-y-4">
            {Object.entries(groupedPrograms).map(([generic, { programs, config }]) => (
              <div 
                key={generic}
                className={`${config.color} rounded-lg p-4`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 flex items-center justify-center">
                    {config.icon}
                  </div>
                  <a 
                    href={`https://www.geds.fr/formations/${config.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:underline flex items-center gap-1"
                  >
                    {generic}
                    <OpenInNew className="w-4 h-4" />
                  </a>
                </div>
                <ul className="ml-10 space-y-1">
                  {programs.map((program, idx) => (
                    <li key={idx} className="text-sm">
                      {program}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Langues */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Language className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Langues d&apos;enseignement</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {university.languages.map((lang, idx) => (
              <LanguageFlag key={idx} code={lang} />
            ))}
          </div>
        </div>

        {/* Lien vers la page de l'université */}
        <a
          href={`https://www.geds.fr/universites/${university.mainId || university.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white 
                   rounded-lg hover:bg-blue-700 transition-colors"
        >
          En savoir plus
          <OpenInNew className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};

UniversityInfoCard.propTypes = {
  university: PropTypes.shape({
    id: PropTypes.string.isRequired,
    mainId: PropTypes.string,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    languages: PropTypes.arrayOf(
      PropTypes.oneOf(['fr', 'pt', 'en'])
    ).isRequired,
    programs: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UniversityInfoCard;