import React from 'react';

const HRPComparisonTable = () => {
  const tableData = [
    {
      property: 'HRP version',
      nativeHRP: 'native HRP',
      nitroHRP: 'nitroHRP',
      nitroHRPThermostability: 'nitroHRP thermostability',
      nitroHRPConjugation: 'nitroHRP conjugation'
    },
    {
      property: 'single isoform content',
      nativeHRP: '90%',
      nitroHRP: '100%',
      nitroHRPThermostability: '100%',
      nitroHRPConjugation: '100%'
    },
    {
      property: 'RZ purity value',
      nativeHRP: '>3',
      nitroHRP: '>3',
      nitroHRPThermostability: '>3',
      nitroHRPConjugation: '>3'
    },
    {
      property: 'enzyme : antibody ratio',
      nativeHRP: 'inconsistent',
      nitroHRP: 'consistent',
      nitroHRPThermostability: 'consistent',
      nitroHRPConjugation: '2:1 Fc N-glycan coupling to engineered lysines on HRP'
    },
    {
      property: 'thermostability',
      nativeHRP: '1x',
      nitroHRP: '1x',
      nitroHRPThermostability: '5x',
      nitroHRPConjugation: '1x'
    },
    {
      property: 'peroxide tolerance',
      nativeHRP: '1x',
      nitroHRP: '1x',
      nitroHRPThermostability: '2x',
      nitroHRPConjugation: '1x'
    },
    {
      property: 'data',
      nativeHRP: '',
      nitroHRP: '',
      nitroHRPThermostability: 'Morawski, et al. (2001)',
      nitroHRPThermostabilityLink: 'https://bit.ly/nd-a2',
      nitroHRPConjugation: 'Ryan and O\'Fágáin (2007)',
      nitroHRPConjugationLink: 'https://bit.ly/nd-a4'
    }
  ];

  const renderCellContent = (content: string, property: string, link?: string, isNitroHRP: boolean = false) => {
    // Handle data citations with links
    if (property === 'data' && content && link) {
      return (
        <a 
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${isNitroHRP ? 'text-green-300' : 'text-green-400'} hover:text-green-200 transition-colors duration-300 hover:underline font-semibold`}
        >
          {content}
        </a>
      );
    }

    return content;
  };

  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[900px] rounded-3xl overflow-hidden">
            <thead>
              <tr className="border-b-2 border-green-400">
                <th className="bg-gradient-to-br from-green-400/20 to-green-400/5 text-white text-center p-8 font-bold text-xl md:text-2xl font-spaceGrotesk">
                  HRP version
                </th>
                <th className="bg-gradient-to-br from-green-400/15 to-green-400/5 text-white text-center p-8 font-bold text-xl md:text-2xl font-spaceGrotesk border-l border-green-400/30">
                  native HRP
                </th>
                <th className="bg-gradient-to-br from-green-400/25 to-green-400/10 text-green-300 text-center p-8 font-bold text-2xl md:text-3xl font-spaceGrotesk border-l border-green-400/50">
                  nitroHRP
                </th>
                <th className="bg-gradient-to-br from-green-400/25 to-green-400/10 text-green-300 text-center p-8 font-bold text-2xl md:text-3xl font-spaceGrotesk border-l border-green-400/50">
                  nitroHRP thermostability
                </th>
                <th className="bg-gradient-to-br from-green-400/25 to-green-400/10 text-green-300 text-center p-8 font-bold text-2xl md:text-3xl font-spaceGrotesk border-l border-green-400/50">
                  nitroHRP conjugation
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.slice(1).map((row, rowIdx) => (
                <tr 
                  key={rowIdx} 
                  className={`group border-b border-green-400/20 hover:bg-green-400/10 transition-all duration-300 ${rowIdx === tableData.length - 2 ? '' : ''}`}
                >
                  <td className="bg-gradient-to-br from-gray-800/80 to-black/80 text-green-400 p-8 font-bold text-lg md:text-xl font-spaceGrotesk group-hover:text-green-300 transition-colors duration-300 text-center">
                    {row.property}
                  </td>
                  <td className="bg-gradient-to-br from-gray-800/50 to-black/50 text-gray-200 p-8 text-lg md:text-xl font-urbanist border-l border-green-400/20 group-hover:border-green-400/40 transition-all duration-300 text-center">
                    {renderCellContent(row.nativeHRP, row.property)}
                  </td>
                  <td className="bg-gradient-to-br from-green-400/10 to-green-400/5 text-green-300 p-8 text-xl md:text-2xl font-bold font-urbanist border-l border-green-400/40 group-hover:border-green-400/60 transition-all duration-300 text-center">
                    {renderCellContent(row.nitroHRP, row.property, undefined, true)}
                  </td>
                  <td className="bg-gradient-to-br from-green-400/10 to-green-400/5 text-green-300 p-8 text-xl md:text-2xl font-bold font-urbanist border-l border-green-400/40 group-hover:border-green-400/60 transition-all duration-300 text-center">
                    {renderCellContent(row.nitroHRPThermostability, row.property, (row as any).nitroHRPThermostabilityLink, true)}
                  </td>
                  <td className="bg-gradient-to-br from-green-400/10 to-green-400/5 text-green-300 p-8 text-xl md:text-2xl font-bold font-urbanist border-l border-green-400/40 group-hover:border-green-400/60 transition-all duration-300 text-center">
                    {renderCellContent(row.nitroHRPConjugation, row.property, (row as any).nitroHRPConjugationLink, true)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default HRPComparisonTable;