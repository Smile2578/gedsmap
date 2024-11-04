import PropTypes from 'prop-types';
import { GB, FR, PT } from 'country-flag-icons/react/3x2';

const countryMap = {
  fr: {
    flag: FR,
    label: 'Français',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700'
  },
  en: {
    flag: GB,
    label: 'Anglais',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700'
  },
  pt: {
    flag: PT,
    label: 'Portugais',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700'
  }
};

const LanguageFlag = ({ code }) => {
  const config = countryMap[code];
  const Flag = config.flag;

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${config.bgColor}`}>
      <Flag className="w-6 h-4" title={config.label} />
      <span className={`text-sm ${config.textColor}`}>{config.label}</span>
    </div>
  );
};

LanguageFlag.propTypes = {
  code: PropTypes.oneOf(['fr', 'pt', 'en']).isRequired,
};

export default LanguageFlag;