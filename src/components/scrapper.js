export default function Scrapper(course, max, lang) {
  let data = [];
  if (lang === "en") {
    for (let i = 1; i <= max; i++) {
      data.push(
        `https://raw.githubusercontent.com/cdw1p/Progate-Course-En/master/${course}/${i}.png`
      );
    }
  } else {
    for (let i = 1; i <= max; i++) {
      data.push(
        `https://raw.githubusercontent.com/cdw1p/Progate-Course-Id/master/${course}/${i}.png`
      );
    }
  }

  return data;
}
