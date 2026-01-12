import React from 'react';

export default function PolicyPage() {
  return (
    <div className="min-h-screen flex justify-center bg-gray-100 text-gray-900 font-inter p-4 md:p-8">
      <div className="w-full max-w-4xl bg-white p-8 md:p-14 shadow-2xl rounded-3xl border-t-8 border-pink-600">
        <div className="mb-8 pb-5 border-b border-gray-200">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2 leading-tight text-pink-700">
            DATAUNLOCK PILOT POLICY
          </h1>
          <h2 className="text-lg md:text-xl font-light text-gray-500">Data Governance & Privacy Commitments</h2>
        </div>

        <section className="mb-10">
          <h3 className="text-2xl font-bold mb-4 text-pink-600 border-b pb-2">OVERVIEW</h3>
          <p className="text-lg text-gray-800 leading-relaxed font-medium mb-4">
            This is a validation pilot. We're testing our analysis with real data. You're helping us build something better.
          </p>
        </section>

        <section className="mb-10">
          <h3 className="text-2xl font-bold mb-4 text-pink-600 border-b pb-2">YOUR DATA</h3>
          <ul className="list-disc space-y-2 ml-6 text-gray-800 text-base font-medium">
            <li>You anonymize sensitive columns before sending</li>
            <li>Only aggregated analysis is processed (not individual rows)</li>
            <li>Held securely during pilot + 6 months after</li>
            <li>Deleted on request or after 6 months</li>
            <li>Never shared without your permission</li>
          </ul>
        </section>

        <section className="mb-10">
          <h3 className="text-2xl font-bold mb-4 text-pink-600 border-b pb-2">YOUR RESPONSIBILITY</h3>
          <ul className="list-disc space-y-2 ml-6 text-gray-800 text-base font-medium">
            <li>Validate all findings with your team before decisions</li>
            <li>Understand this is beta/unvalidated product</li>
            <li>Make decisions based on your judgment, not ours alone</li>
          </ul>
        </section>

        <section className="mb-10">
          <h3 className="text-2xl font-bold mb-4 text-pink-600 border-b pb-2">BY PROCEEDING YOU CONFIRM:</h3>
          <ul className="list-none space-y-2 text-gray-800 text-base font-medium">
            <li>✓ Data is anonymized (names, emails, IDs removed)</li>
            <li>✓ This is beta/validation (you'll validate independently)</li>
            <li>✓ Data is held 6 months then deleted</li>
            <li>✓ Data is never shared without your permission</li>
            <li>✓ You'll provide feedback</li>
          </ul>
        </section>

        <div className="mt-16 text-xs text-gray-500 text-center border-t border-gray-200 pt-6 tracking-wider">
          DataUnlock – Policy @ Pilot Beta · Confidential
        </div>
      </div>
    </div>
  );
}
