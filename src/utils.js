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
		if (value !== 0 && value > .01) {noNullPrograms[key] = value}
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
 
	const actHeader = Object.keys(actScores)
	const actAccessors = Object.values(actScores)
 
	const satHeader = Object.keys(satScores)
	const satAccessors = Object.values(satScores)
 
	const testHeader = actHeader.concat(satHeader)
	const testAccessors = actAccessors.concat(satAccessors)

	//nesting labels and data values into single array for CSV formatting
	const genCSV = [
	   ["name", "website", "city", "state", "zip", "size"],
	   [name, website, city, state, zip, size],
	]
	const programCSV = [programHeader, programAccessors]
	const raceCSV = [raceHeader, raceAccessors]
	const testCSV = [testHeader, testAccessors]
 
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
	   testCSV: testCSV,
	}
 }