import React from 'react';

// Main App Component using Tailwind CSS for responsiveness and modern styling
export default function App() {

  // Component for displaying a visual Risk Rating (Colored Dot + Text)
  const RiskRatingBadge = ({ level }) => {
    let colorClass = 'bg-gray-400';
    let text = level;

    if (level === 'critical') {
        colorClass = 'bg-red-600';
        text = 'Critical';
    } else if (level === 'high') {
        colorClass = 'bg-orange-500';
        text = 'High';
    } else if (level === 'medium') {
        colorClass = 'bg-yellow-500';
        text = 'Medium';
    } else if (level === 'low') {
        colorClass = 'bg-green-600';
        text = 'Low';
    }

    return (
        <div className="flex items-center justify-start space-x-2 p-1 rounded-full bg-white/70 shadow-inner">
            <span className={`w-2.5 h-2.5 rounded-full ${colorClass} flex-shrink-0 shadow-lg`}></span>
            <span className="font-semibold text-xs tracking-widest uppercase text-gray-700">{text}</span>
        </div>
    );
  };


  // Utility function for table cells that need background colors (used for descriptive/insight columns)
  const RiskCell = ({ children, level, className = '' }) => {
    let bgColor = 'bg-white';
    // Map Critical/High to 'high', Medium to 'medium' for color coding
    if (level === 'high' || level === 'critical') bgColor = 'bg-red-50';
    else if (level === 'medium') bgColor = 'bg-yellow-50';
    else if (level === 'low') bgColor = 'bg-green-50';

    return (
      // Reduced padding for tighter layout
      <td className={`px-3 py-2.5 text-sm border-b border-gray-100 ${bgColor} ${className}`}>
        {children}
      </td>
    );
  };

  const DataCell = ({ children, isHighlight = false, isROI = false, wrap = false, className = '' }) => {
    let textColor = 'text-gray-900';
    if (isHighlight) textColor = 'text-red-700 font-bold';
    else if (isROI) textColor = 'text-blue-700 font-bold'; // Using blue for targets

    const whitespaceClass = wrap ? 'whitespace-normal' : 'whitespace-nowrap';

    return (
      // Reduced padding for tighter layout
      <td className={`px-3 py-2.5 text-sm border-b border-gray-100 ${whitespaceClass} ${textColor} ${className}`}>
        {children}
      </td>
    );
  };

  const Caption = ({ children }) => (
    <div className="text-xs font-medium text-gray-500 uppercase tracking-widest mt-10 mb-3 border-b-2 border-orange-200 pb-1">
      {children}
    </div>
  );
  
  // Scrambled data values for E-Bike report
  const npsScore = '+4.1'; // Critical Alert Zone
  const detractorCount = '33.8%'; // High
  const totalExposure = '€6.2M'; // Scrambled (kept small for context)
  const preventableExposure = '€1.9M'; // Scrambled (kept small for context)
  const targetNPS = '+35'; // Industry Benchmark

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 text-gray-900 font-inter p-4 md:p-8">
      <div className="w-full max-w-7xl bg-white p-8 md:p-14 shadow-2xl rounded-3xl border-t-8 border-red-600">
        
        {/* Report Header/Title - Adjusted H1 font size for mobile (text-5xl) */}
        <div className="mb-8 pb-5 border-b border-gray-200">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-2 leading-tight text-red-700">
              Churn Reduction Strategy
            </h1>
            <h2 className="text-xl md:text-2xl font-light text-blue-900">Q4 E-Bike Quality and Service Recovery</h2>
            <p className="text-sm text-gray-500 mt-2">
                Focus on Detractor Conversion & Service Recovery · Sample Size: 3,450 Valid Responses
            </p>
        </div>


        {/* NPS & Churn Summary - Prominent Metrics (Padding reduced from p-7 to p-6) */}
        <h2 className="text-2xl md:text-3xl font-bold mb-7 text-gray-900">Executive Summary: The Critical NPS Gap</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            
            {/* Metric 1: Current NPS Score - Adjusted font size for mobile (text-5xl) */}
            <div className="p-6 bg-white border-b-4 border-red-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-red-700 leading-none">{npsScore}</div>
                <div className="text-xl font-semibold mt-2 text-gray-800">Current NPS Score</div>
                <p className="text-sm text-red-500 mt-1 font-medium">Critical Alert: Severe product inconsistency and brand risk.</p>
            </div>
            
            {/* Metric 2: Target NPS - Adjusted font size for mobile (text-5xl) */}
            <div className="p-6 bg-white border-b-4 border-blue-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-blue-700 leading-none">{targetNPS}</div>
                <div className="text-xl font-semibold mt-2 text-gray-800">Industry Benchmark Target</div>
                <p className="text-sm text-blue-500 mt-1 font-medium">The gap to close for sustainable, healthy growth.</p>
            </div>
            
            {/* Metric 3: Detractor Volume - Adjusted font size for mobile (text-5xl) */}
            <div className="p-6 bg-white border-b-4 border-gray-500 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-800 leading-none">{detractorCount}</div>
                <div className="text-xl font-semibold mt-2 text-gray-800">Active Detractors</div>
                <p className="text-sm text-gray-500 mt-1 font-medium">1,166 users actively damaging brand and at risk of churn.</p>
            </div>
        </div>
        
        {/* Churn Reduction Mandate Callout - Adjusted font size for mobile (text-3xl) */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-xl p-7 text-center my-10 text-white shadow-2xl transform hover:scale-[1.01] transition-transform duration-300">
          <span className="text-3xl md:text-4xl font-black mb-3 block tracking-wide">
            The 5 Strategic Actions Target 90% of All Detractor Complaints
          </span>
          <div className="text-lg md:text-xl font-normal opacity-90">
            Focusing on the top three churn drivers (Mechanical Failure, Fee Policy, and Crisis City Ops) is our primary path to service recovery and NPS stabilization.
          </div>
        </div>


        {/* Strategic Impact Table (Driver and Target Focused) - Still relies on overflow-x-auto for responsiveness */}
        <Caption>CX Driver Mitigation Plan</Caption>
        <h2 className="text-2xl font-semibold mt-5 mb-5 text-gray-900">Addressing Root Causes to Drive Detractor Conversion</h2>
        <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-50">
              <tr className='h-14'>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider rounded-tl-xl">Churn Driver Category</th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Core Issue & Complaint Volume</th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap w-24">Severity Rating</th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Impact Statement (CX Pulse)</th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">Target Reduction in Complaints</th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider rounded-tr-xl whitespace-nowrap">Strategic Action Link</th>
              </tr>
            </thead>
            <tbody>
              
              {/* Row 1: Vehicle Quality */}
              <tr className="hover:bg-red-50/50">
                <DataCell className='font-extrabold text-red-700'>Vehicle Quality (Fleet)</DataCell>
                <DataCell wrap={true} isHighlight={true}>48% of Detractors cite physical E-Bike defects</DataCell>
                <RiskCell level="critical" className='w-24'><RiskRatingBadge level='critical'/></RiskCell>
                <DataCell wrap={true}>Defective E-Bikes (flat tires, brake failures) are the #1 complaint and most reliable churn trigger.</DataCell>
                <DataCell isROI={true}>60%</DataCell>
                <DataCell className='font-semibold text-blue-600'>Action #1 (Repair Blitz)</DataCell>
              </tr>
              
              {/* Row 2: Customer Policy */}
              <tr className="hover:bg-orange-50/50">
                <DataCell className='font-extrabold text-orange-700'>Customer Policy (Fees)</DataCell>
                <DataCell wrap={true} isHighlight={true}>25% cite unfair fees, amplified by bike failure</DataCell>
                <RiskCell level="high" className='w-24'><RiskRatingBadge level='high'/></RiskCell>
                <DataCell wrap={true}>The combination of Unlock Fee + immediate failure is highly toxic to brand perception.</DataCell>
                <DataCell isROI={true}>35%</DataCell>
                <DataCell className='font-semibold text-blue-600'>Action #2 (Auto-Refund)</DataCell>
              </tr>
              
              {/* Row 3: Brand Reputation */}
              <tr className="hover:bg-red-50/50">
                <DataCell className='font-extrabold text-red-700'>Brand Reputation (Scale)</DataCell>
                <DataCell wrap={true}>NPS score indicates massive polarization and instability</DataCell>
                <RiskCell level="critical" className='w-24'><RiskRatingBadge level='critical'/></RiskCell>
                <DataCell wrap={true}>Negative word-of-mouth is high, threatening expansion and competitive position (especially in crisis cities).</DataCell>
                <DataCell isROI={true}>5 Pts NPS Lift</DataCell>
                <DataCell className='font-semibold text-blue-600'>Action #3 (Comms) / #5 (Local Ops)</DataCell>
              </tr>
              
              {/* Row 4: End-Ride Process */}
              <tr className="hover:bg-yellow-50/50">
                <DataCell className='font-extrabold text-yellow-700'>Operational Friction</DataCell>
                <DataCell wrap={true}>12% report GPS parking/end-ride issues</DataCell>
                <RiskCell level="medium" className='w-24'><RiskRatingBadge level='medium'/></RiskCell>
                <DataCell wrap={true}>Small technical friction that generates high customer frustration at the most sensitive point of the journey.</DataCell>
                <DataCell isROI={true}>70%</DataCell>
                <DataCell className='font-semibold text-blue-600'>Action #4 (GPS Override)</DataCell>
              </tr>
              
              {/* Total Row - Summarizing the Financial Impact, but de-emphasized */}
              <tr className="font-bold bg-gray-100/80 border-t-2 border-gray-400">
                <td colSpan="4" className="px-3 py-3 text-left text-base text-gray-700">Total Addressable Churn Drivers</td>
                <DataCell isROI={true} className="text-base text-gray-500">Estimated €{preventableExposure} Revenue Protected</DataCell>
                <DataCell isHighlight={true} className="text-base text-gray-500">Total Risk: €{totalExposure}</DataCell>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Root Cause Analysis (NPS Distribution Style) */}
        <Caption>CX Drivers and Root Cause</Caption>
        <h2 className="text-2xl font-semibold mt-5 mb-5 text-gray-900">NPS Distribution and Detractor Complaint Drivers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Reduced padding from p-6 to p-5 */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-inner">
                <h3 className="text-xl font-bold mb-4 text-red-700 border-b pb-2">Top 3 Detractor Complaints (%)</h3>
                <ul className="list-none space-y-3">
                    <li className="flex justify-between items-center text-lg border-b border-dashed pb-2">
                        <span className="font-medium text-red-600">1. E-Bike Mechanical Failure (Flat/Brakes)</span>
                        <span className="font-extrabold text-red-700 text-xl">48%</span>
                    </li>
                    <li className="flex justify-between items-center text-lg border-b border-dashed pb-2">
                        <span className="font-medium text-orange-600">2. High Cost/Unfair Fee Policy</span>
                        <span className="font-extrabold text-orange-700 text-xl">25%</span>
                    </li>
                    <li className="flex justify-between items-center text-lg">
                        <span className="font-medium text-yellow-600">3. Competitive/Better Alternatives</span>
                        <span className="font-extrabold text-yellow-700 text-xl">17%</span>
                    </li>
                </ul>
            </div>
            
            {/* Reduced padding from p-6 to p-5 */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-inner">
                <h3 className="text-xl font-bold mb-4 text-blue-700 border-b pb-2">Crisis City Operations Alert</h3>
                <p className="text-gray-700 mb-4">
                    Four cities—Kassel, Villingen, Fulda, and Sonthofen—have NPS scores ranging from **-10 to -85**, indicating systemic failure of E-Bike operations and policy adherence. These locations require immediate deployment of **Action #5 (Crisis City Teams)**.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                    <span className="bg-red-200 text-red-800 text-sm font-bold px-3 py-1 rounded-full shadow-sm">Kassel (-10)</span>
                    <span className="bg-red-300 text-red-800 text-sm font-bold px-3 py-1 rounded-full shadow-sm">Villingen (-35)</span>
                    <span className="bg-red-400 text-red-800 text-sm font-bold px-3 py-1 rounded-full shadow-sm">Fulda (-55)</span>
                    <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-sm">Sonthofen (-85)</span>
                </div>
            </div>
        </div>

        {/* Action Summary Table (Simplified) - Reduced padding on headers and cells */}
        <Caption>The Five Strategic Actions</Caption>
        <h2 className="text-2xl font-semibold mt-5 mb-5 text-gray-900">Detailed Overview of Implementation Plan for Churn Reduction</h2>
        <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-blue-900 text-white">
              <tr className='h-14'>
                <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider rounded-tl-xl w-16">Action #</th>
                <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Strategic Initiative</th>
                <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Description</th>
                <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider rounded-tr-xl">Target Metric</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-blue-50/50">
                <DataCell className='font-bold text-xl text-blue-600 bg-white/50'>1</DataCell>
                <DataCell>E-Bike Repair Blitz</DataCell>
                <DataCell wrap={true}>48-hour intensive fleet repair focusing on brakes and tires in high-usage zones to restore quality baseline.</DataCell>
                <DataCell className='text-green-700 font-bold'>Reduce mechanical complaints by 60%.</DataCell>
              </tr>
              <tr className="hover:bg-blue-50/50">
                <DataCell className='font-bold text-xl text-blue-600 bg-white/50'>2</DataCell>
                <DataCell>Automated Refund Policy</DataCell>
                <DataCell wrap={true}>Implement an auto-refund system for rides lasting less than 120 seconds, eliminating "pay for broken bike" complaints.</DataCell>
                <DataCell className='text-green-700 font-bold'>Reduce fee-related Detractor complaints by 35%.</DataCell>
              </tr>
              <tr className="hover:bg-blue-50/50">
                <DataCell className='font-bold text-xl text-blue-600 bg-white/50'>3</DataCell>
                <DataCell>Aggressive Trust Comms</DataCell>
                <DataCell wrap={true}>Publicly communicate quality improvements and the new refund policy via in-app and social channels to rebuild trust.</DataCell>
                <DataCell className='text-green-700 font-bold'>Increase Promoters by 5 percentage points.</DataCell>
              </tr>
              <tr className="hover:bg-blue-50/50">
                <DataCell className='font-bold text-xl text-blue-600 bg-white/50'>4</DataCell>
                <DataCell>End-Ride GPS Override</DataCell>
                <DataCell wrap={true}>Update the app to allow manual override (photo proof) for GPS errors at official parking zones.</DataCell>
                <DataCell className='text-green-700 font-bold'>Reduce parking-related complaints by 70%.</DataCell>
              </tr>
              <tr className="hover:bg-blue-50/50">
                <DataCell className='font-bold text-xl text-blue-600 bg-white/50'>5</DataCell>
                <DataCell>Crisis City Ops Boost</DataCell>
                <DataCell wrap={true}>Deploy dedicated 6-week local mechanics teams to 4 cities with critically low NPS scores.</DataCell>
                <DataCell className='text-green-700 font-bold'>Lift crisis city NPS to +10 to +20 range.</DataCell>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-16 text-xs text-gray-500 text-center border-t border-gray-200 pt-6 tracking-wider">
          QuickChat – Conversations @ Scale · Confidential Strategy Document
        </div>
      </div>
    </div>
  );
}