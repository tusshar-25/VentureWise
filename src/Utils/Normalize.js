export function cleanUsername(name) {
  return name.replace(/\s+/g, "").toLowerCase();
}

export function generatePinFromNameDob(name, dob) {
  const year = dob.split("-")[0].slice(-2); // last 2 digits of year
  const firstName = name.split(" ")[0].toLowerCase(); // first name only
  return `${firstName}${year}`;
}


