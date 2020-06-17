
export default function organizeInitialData(data) {
    let name = data.school.name
    if (data.school.alias != null) {name = `${name} - ${data.school.alias}`}

    const website = data.school.school_url
    const city = data.school.city
    const state = data.school.state;
    const zip = data.school.zip
    const size = data.latest.student.size
    const programsByPercent = data.latest.academics.program_percentage
    const raceBreakdown = data.latest.student.demographics.race_ethnicity
    const  inStateTuition = data.latest.cost.tuition.out_of_state
    const outStateTuition = data.latest.cost.tuition.in_state
    const actScores = data.latest.admissions.act_scores
    const satScores = data.latest.admissions.sat_scores

    const programHeader = Object.keys(programsByPercent)
    const programAccessors = Object.values(programsByPercent)

    const raceHeader = Object.keys(raceBreakdown)
    const raceAccessors = Object.values(raceBreakdown)

    const actHeader = Object.keys(actScores)
    const actAccessors = Object.values(actScores)

    const satHeader = Object.keys(satScores)
    const satAccessors = Object.values(satScores)

    const genCSV = [ ['name', 'website', 'city', 'state', 'zip', 'size'], [name, website, city, state, zip, size], ]
    const programCSV = [ [programHeader], [programAccessors] ]
    const raceCSV = [ [raceHeader], [raceAccessors] ]
    const testCSV = [ [actHeader, satHeader], [actAccessors, satAccessors] ]

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
        testCSV: testCSV
    }
}