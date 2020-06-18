export default function organizeInitialData(data) {
	//checking for if alias exists, modifying name if so
	let name = data.school.name
	if (data.school.alias != null) {
	   name = `${name} - ${data.school.alias}`
	}
	
	//identifying all relevant parts of api data
	const website = data.school.school_url
	const city = data.school.city
	const state = data.school.state
	const zip = data.school.zip
	const size = data.latest.student.size
	const programsByPercent = data.latest.academics.program_percentage
	const raceBreakdown = data.latest.student.demographics.race_ethnicity
	const inStateTuition = data.latest.cost.tuition.out_of_state
	const outStateTuition = data.latest.cost.tuition.in_state
	const actScores = data.latest.admissions.act_scores
	const satScores = data.latest.admissions.sat_scores
 
	//filtering through data for graphs to remove empty categories
	let noNullPrograms = {}
	for (let [key, value] of Object.entries(programsByPercent)) {
		if (value !== 0 && value > .03) {noNullPrograms[key] = value}
	}

	let noNullRace = {}
	for (let [key, value] of Object.entries(raceBreakdown)) {
		//transforming percent of student body to actual number of students
		let numOfStudents = Math.round(size * value)
		if (value !== null) {noNullRace[key] = numOfStudents}
	  }
	  
	//breaking down objects into separate arrays of labels and data values
	const programHeader = Object.keys(noNullPrograms)
	const programAccessors = Object.values(noNullPrograms)

	const raceHeader = Object.keys(noNullRace)
	const raceAccessors = Object.values(noNullRace)
 
	//ordering test scores by percentile in very specific order for overlay bar chart
	const act25 = actScores['25th_percentile']
	const act25reading = act25.english
	const act25writing = act25.writing
	const act25math = act25.math
	const act50 = actScores['midpoint']
	const act50reading = act50.english
	const act50writing = act50.writing
	const act50math = act50.math
	const act75 = actScores['75th_percentile']
	const act75reading = act75.english
	const act75writing = act75.writing
	const act75math = act75.math

	const sat25 = satScores['25th_percentile']
	const sat25reading = sat25['critical_reading']
	const sat25writing = sat25.writing
	const sat25math = sat25.math
	const sat50 = satScores['midpoint']
	const sat50reading = sat50['critical_reading']
	const sat50writing = sat50.writing
	const sat50math = sat50.math
	const sat75 = satScores['75th_percentile']
	const sat75reading = sat75['critical_reading']
	const sat75writing = sat75.writing
	const sat75math = sat75.math
	const testHeader = ['reading', 'writing', 'math']

	//nesting labels and data values into single array for CSV formatting
	const genCSV = [
	   ["name", "website", "city", "state", "zip", "size"],
	   [name, website, city, state, zip, size],
	]
	const programCSV = [programHeader, programAccessors]
	const raceCSV = [raceHeader, raceAccessors]
	const satCSV = [testHeader, [sat25reading, sat25writing, sat25math], [sat50reading, sat50writing, sat50math], [sat75reading, sat75writing, sat75math]]
	const actCSV = [testHeader, [act25reading, act25writing, act25math], [act50reading, act50writing, act50math], [act75reading, act75writing, act75math]]

	//returning final versions of data to be set into local state in componentDidMount
	return {
	   name: name,
	   website: website,
	   city: city,
	   state: state,
	   zip: zip,
	   size: size,
	   programsByPercent: programsByPercent,
	   raceBreakdown: raceBreakdown,
	   inStateTuition: inStateTuition,
	   outStateTuition: outStateTuition,
	   actScores: actScores,
	   satScores: satScores,
	   genCSV: genCSV,
	   raceCSV: raceCSV,
	   programCSV: programCSV,
	   satCSV: satCSV,
	   actCSV: actCSV
	}
 }

 export const organizeRaceData = (data, year) => {
    const raceBreakdown = data[year].student.demographics.race_ethnicity
    const size = data[year].student.size

    let noNullRace = {}
	for (let [key, value] of Object.entries(raceBreakdown)) {
		let numOfStudents = Math.round(size * value)
		if (value !== null) {noNullRace[key] = numOfStudents}
      }
      
    const raceHeader = Object.keys(noNullRace)
    const raceAccessors = Object.values(noNullRace)
    const raceCSV = [raceHeader, raceAccessors]

    return raceCSV
 }


 export const organizeProgramData = (data, year) => {
	const programsByPercent = data[year].academics.program_percentage

    let noNullPrograms = {}
	for (let [key, value] of Object.entries(programsByPercent)) {
		if (value !== 0 && value > .03) {noNullPrograms[key] = value}
    }
    
	const programHeader = Object.keys(noNullPrograms)
    const programAccessors = Object.values(noNullPrograms)
    const programCSV = [programHeader, programAccessors]

    return programCSV
 }