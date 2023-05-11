const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const today = new Date();
const month = months[today.getMonth()];
const day = String(today.getDate()).padStart(2, '0');
const year = today.getFullYear();
const formattedDate = `${month} ${day}, ${year}`;
console.log(formattedDate);
