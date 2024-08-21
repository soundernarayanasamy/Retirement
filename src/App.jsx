
import React, { useState } from "react";

function App() {
  const [inputs, setInputs] = useState({
    currentAge: 30,
    finishAge: 40,
    retirementAge: 65,
    lifeExpectancyAge: 90,
    monthlyExpenses: 50000,
    returnPreRetirement: 12,
    inflationPreRetirement: 6,
    inflationPostRetirement: 4,
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculateResults = () => {
    const {
      currentAge,
      finishAge,
      retirementAge,
      lifeExpectancyAge,
      monthlyExpenses,
      returnPreRetirement,
      inflationPreRetirement,
      inflationPostRetirement,
    } = inputs;

    // Convert percentages to decimals
    const rPreRetirement = returnPreRetirement / 100;
    const infPreRetirement = inflationPreRetirement / 100;
    const infPostRetirement = inflationPostRetirement / 100;

    // Number of years to retirement
    const yearsToRetirement = retirementAge - currentAge;

    // Monthly expenses adjusted for inflation at retirement
    const adjustedExpensesAtRetirement = 
      monthlyExpenses * Math.pow(1 + infPreRetirement, yearsToRetirement);

    // Corpus needed at retirement considering post-retirement inflation
    const corpusNeededAtRetirement = 
      (adjustedExpensesAtRetirement * (1 - Math.pow(1 + infPostRetirement, -(lifeExpectancyAge - retirementAge)))) / infPostRetirement;

    // SIP calculation for conventional plan
    const sipConventional = 
      (corpusNeededAtRetirement * infPreRetirement) / (Math.pow(1 + rPreRetirement, yearsToRetirement) - 1) / (1 + rPreRetirement);

    // SIP calculation for early retirement plan
    const yearsToSIPEarly = finishAge - currentAge;
    const sipEarly = 
      (corpusNeededAtRetirement * infPreRetirement) / (Math.pow(1 + rPreRetirement, yearsToSIPEarly) - 1) / (1 + rPreRetirement);

    setResults({
      conventionalSIP: sipConventional.toFixed(2),
      earlyRetirementSIP: sipEarly.toFixed(2),
      yearsToSIP: yearsToSIPEarly,
      yearsToCompound: lifeExpectancyAge - retirementAge,
      adjustedExpensesAtRetirement: adjustedExpensesAtRetirement.toFixed(2),
      corpusNeededAtRetirement: corpusNeededAtRetirement.toFixed(2),
      totalCorpus: corpusNeededAtRetirement.toFixed(2),
    });
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        
        {/* Input Section */}
        <div className="bg-yellow-400 text-center text-black font-bold p-4">
          <h2 className="text-bg-black p-2 inline-block">PLUG IN YOUR NUMBERS</h2>
        </div>
        <div className="p-6 bg-gray-50">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700">Current Age:</label>
              <input
                type="number"
                name="currentAge"
                value={inputs.currentAge}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Age by which you want to finish saving for retirement:</label>
              <input
                type="number"
                name="finishAge"
                value={inputs.finishAge}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Retirement Age:</label>
              <input
                type="number"
                name="retirementAge"
                value={inputs.retirementAge}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Life Expectancy Age:</label>
              <input
                type="number"
                name="lifeExpectancyAge"
                value={inputs.lifeExpectancyAge}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Current Monthly Expenses:</label>
              <input
                type="number"
                name="monthlyExpenses"
                value={inputs.monthlyExpenses}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Expected Return Pre-Retirement (%):</label>
              <input
                type="number"
                name="returnPreRetirement"
                value={inputs.returnPreRetirement}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Inflation Pre-Retirement (%):</label>
              <input
                type="number"
                name="inflationPreRetirement"
                value={inputs.inflationPreRetirement}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Inflation Post-Retirement (%):</label>
              <input
                type="number"
                name="inflationPostRetirement"
                value={inputs.inflationPostRetirement}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Centered Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={calculateResults}
            className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 mb-10"
          >
            Calculate
          </button>
        </div>

        {/* Results Section */}
        {results && (
          <>
            <div className="bg-yellow-400 text-black text-center font-bold p-4 mt-4">
              RESULTS
            </div>
            <div className="p-6 bg-gray-50">
              <table className="table-auto w-full text-center">
                <thead className="bg-yellow-400 text-black">
                  <tr>
                    <th></th>
                    <th>CONVENTIONAL PLAN</th>
                    <th>EARLY RETIREMENT PLAN</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-blue-100"><td className="font-bold">Monthly SIP</td>
                    <td>₹{results.conventionalSIP}</td>
                    <td className="text-red-600">₹{results.earlyRetirementSIP}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Years you need to SIP</td>
                    <td>{results.yearsToSIP}</td>
                    <td>{results.yearsToSIP}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Number of years to compound</td>
                    <td>not applicable</td>
                    <td>{results.yearsToCompound}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Compounded Retirement Corpus</td>
                    <td className="font-bold">₹{results.totalCorpus}</td>
                    <td className="font-bold">₹{results.totalCorpus}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Worksheet Section */}
            <div className="bg-yellow-400 text-black text-center font-bold p-4 mt-4">
              WORKSHEET
            </div>
            <div className="p-6 bg-gray-50">
              <table className="table-auto w-full text-center">
                <tbody>
                  <tr>
                    <td className="font-bold">Years in Retirement</td>
                    <td>25</td>
                    <td>FROM: Retirement Age</td>
                    <td>TO: Life Expectancy Age</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Inflation-adjusted Monthly Expenses at Retirement</td>
                    <td>₹{results.adjustedExpensesAtRetirement}</td>
                    <td>AT: Retirement Age</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Inflation-adjusted corpus needed at Retirement</td>
                    <td className="font-bold text-red-600">₹{results.corpusNeededAtRetirement}</td>
                    <td>AT: Retirement Age</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Returns post-retirement (4% above inflation)</td>
                    <td>8%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Option 1: Conventional Plan */}
            <div className="bg-yellow-400 text-black text-center font-bold p-4 mt-4">
              OPTION 1: CONVENTIONAL PLAN
            </div>
            <div className="p-6 bg-gray-50">
              <table className="table-auto w-full text-center">
                <tbody>
                  <tr className="bg-blue-100">
                    <td className="font-bold">Conventional Retirement Monthly SIP</td>
                    <td>₹{results.conventionalSIP}</td>
                    <td>FROM: Current Age</td>
                    <td>TO: Retirement Age</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Years you need to put aside Conventional Retirement SIP</td>
                    <td>{results.yearsToSIP}</td>
                    <td>FROM: Current Age</td>
                    <td>TO: Retirement Age</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Total SIP Amount Invested via Conventional plan</td>
                    <td>₹{(results.conventionalSIP * 12 * results.yearsToSIP).toFixed(2)}</td>
                    <td>FROM: Current Age</td>
                    <td>TO: Retirement Age</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Option 2: Early Retirement Plan */}
            <div className="bg-yellow-400 text-black text-center font-bold p-4 mt-4">
              OPTION 2: EARLY RETIREMENT PLAN
            </div>
            <div className="p-6 bg-gray-50">
              <table className="table-auto w-full text-center">
                <tbody>
                  <tr className="bg-blue-100">
                    <td className="font-bold">Early Retirement Principal you need to Accumulate via SIP</td>
                    <td>₹{results.corpusNeededAtRetirement}</td>
                    <td>FROM: Current Age</td>
                    <td>TO: {inputs.finishAge}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Years you need to put aside Early Retirement SIP</td>
                    <td>{results.yearsToSIP}</td>
                    <td>FROM: Current Age</td>
                    <td>TO: {inputs.finishAge}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">SIP needed to accumulate "Early Retirement Principal"</td>
                    <td>₹{results.earlyRetirementSIP}</td>
                    <td>FROM: Current Age</td>
                    <td>TO: {inputs.finishAge}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Number of years to compound Accumulated Early Retirement Principal untouched</td>
                    <td>{results.yearsToCompound}</td>
                    <td>FROM: {inputs.finishAge}</td>
                    <td>TO: Retirement Age</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Compounded Retirement Corpus</td>
                    <td className="font-bold text-red-600">₹{results.totalCorpus}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

