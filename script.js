function randomChoice(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

function formatDate() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const today = new Date();
    const month = months[today.getMonth()];
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
}

function stringifyArrayOfWords(wordsArray) {
    let result = "";
    for (i=0; i<wordsArray.length; i++) {
        if (i < wordsArray.length - 1) {
            result += wordsArray[i] + ", ";
        }
        else {
            result += "and " + wordsArray[i];
        }
    }
    return result;
}

function nominalization(jobTitle) {
    let modifiedWord = jobTitle.toLowerCase();

    // Remove the word "co-op/intern"
    if (modifiedWord.includes("co-op")) {
        modifiedWord = modifiedWord.replace(" co-op", "");
    }
    else if (modifiedWord.includes("intern")) {
        modifiedWord = modifiedWord.replace(" intern", "");
    }

    // Remove the word "junior/senior"
    if (modifiedWord.includes("junior")) {
        modifiedWord = modifiedWord.replace("junior ", "");
    }
    else if (modifiedWord.includes("senior")) {
        modifiedWord = modifiedWord.replace("junior ", "");
    }

    // Nominalization
    const nominalRules = {
        "accountant": "accounting",
        "analyst": "analysis",
        "architect": "architecture",
        "assistant": "assistance",
        "attorney": "law",
        "auditor": "audit",
        "chemist": "chemistry",
        "consultant": "consultation",
        "designer": "design",
        "developer": "development",
        "engineer": "engineering",
        "executive": "execution",
        "manager": "management",
        "marketer": "marketing",
        "officer": "office",
        "programmer": "programming",
        "researcher": "research",
        "specialist": "specialization",
        "technician": "technology"
    };

    const splittedWord = modifiedWord.split(" ");

    for (let word in nominalRules) {
        if (splittedWord[splittedWord.length - 1] === word) {
            splittedWord[splittedWord.length - 1] = nominalRules[splittedWord[splittedWord.length - 1]];
            break;
        }
    }

    if (splittedWord[splittedWord.length - 1] === "engineering") {
        splittedWord[splittedWord.length - 1] = randomChoice(["engineering", "design"]);
    }
    
    modifiedWord = splittedWord.join(" ");

    return modifiedWord;
}

function makeIntro(job, company, arrValues) {
    
    // Starting point
    let startingPoint = "I am a computer engineering student of UVic, and ";
    const words1 = ["writing", "thrilled", "very excited", "delighted", "happy"];
    startingPoint += `I am ${randomChoice(words1)} to apply for ${job} position at ${company}. `;

    // Describe the company values
    const words2 = randomChoice(["reputation for", "commitment to", "focus on", "excellence for", "vision for"]);
    const words3_1 = randomChoice(["truly commendable", "commendable", "truly amazing", "truly fantastic"]);
    let companyValues1 = `Your company's ${words2} ${stringifyArrayOfWords(arrValues)} is ${words3_1}. `;
    const words3_2 = randomChoice(["am particularly drawn to", "am truly amazed", "highly commend"]);
    let companyValues2 = `I ${words3_2} your company's ${words2} ${stringifyArrayOfWords(arrValues)}. `;
    let companyValues = randomChoice([companyValues1, companyValues2]);

    // Connect values to applicants
    let valueConnection = "I believe ";
    const words4 = randomChoice(["plays an important role in", "deeply contributes to", "involves a strong focus on"]);
    const words5 = randomChoice(["your mission", "these values", "your vision"]);
    valueConnection += randomChoice([
        "your mission aligns with my own interest in making a postive impact in the world. ",
        `${nominalization(job)} ${words4} ${words5}. `
    ]);
    valueConnection += "And ";
    valueConnection += randomChoice([
        `through relevant coursework and experiences, I have demonstrated ways to help achieve this goal. `,
        `I have demonstrated ways to help achieve this goal, through relevant coursework and experiences. `
    ]);

    // Closing point
    closingPoint = randomChoice([
        "I am a quick learner and would be eager to learn anything.",
        "As a quick learner, I am eager to contribute to your mission."
    ]);

    return startingPoint + companyValues + valueConnection + closingPoint;
}

function makeConclusion(workTermLength) {

    let availability = "";
    if (workTermLength != 4) {
        availability = `I will be available for <b>${workTermLength} months</b>. `;
    }
    const template = `Thank you for your consideration. I hope the traits I mentioned above would benefit your company and your clients. ${availability}I look forward to hearing from you.`;
    return template;
}

const params = new URLSearchParams(window.location.search);

// Set the date
document.getElementById("date").innerHTML = formatDate();

// Set the Job Details
const company = params.get('company');
const address1 = params.get('address1');
const address2 = params.get('address2');
const cityProvince = params.get('location');

if (address1.trim().length !== 0 && address2.trim().length !== 0) {
    document.getElementById("company_details").innerHTML = `${company}
    ${address1}<br>
    ${cityProvince}<br>
    ${address2}<br><br><br>`;
}
else {
    document.getElementById("company_details").innerHTML = `
    ${company}<br>
    ${cityProvince}<br><br><br>`;
}

// Construct the introduction
const job_id = params.get('job_id');
const jobTitle = params.get('job_title');
const values = [params.get('value1'), params.get('value2'), params.get('value3')];
const value4 = params.get('value4');
const value5 = params.get('value5');
if (value4.trim().length !== 0) {
    values.push(value4);
}
if (value5.trim().length !== 0) {
    values.push(value5);
}

// Set the title
document.title = `${company} - ${jobTitle}`;

// Set the Reply Title
document.getElementById("re").innerHTML = `Re: ${jobTitle}`;
if (job_id.trim().length !== 0) {
    document.getElementById("re").innerHTML += ` (${job_id})`;
}

document.getElementById("intro").innerHTML = makeIntro(jobTitle, company, values);

// Set the body
const body = params.get('body').replace(/\n\n/g, "<br><br>");
document.getElementById("body").innerHTML = body;

// Set the conclusion
const length = params.get('length');
document.getElementById("conclusion").innerHTML = makeConclusion(length);

window.print();