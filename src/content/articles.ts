import type { Article } from "@/lib/types";

/**
 * ⚠️ SAMPLE CONTENT. These three articles were written to give the listing and
 * the article template something real-shaped to render. They are NOT Imam
 * Shuaib's words and must not be published under his name.
 *
 * They are deliberately general — no hadith are cited with a chain, no fiqh
 * ruling is issued, and nothing is attributed to a named scholar — precisely so
 * that nothing incorrect ends up attributed to him if one slips through. Replace
 * them with his own writing before launch.
 */
export const articles: Article[] = [
  {
    id: "reading-slower",
    title: "On reading the Qur'an slower than you want to",
    date: "2026-08-14",
    author: "Imam Shuaib",
    excerpt:
      "Most of us finish more than we understand. A case for taking one passage at the pace it was meant to be taken.",
    tags: ["Qur'an", "Study"],
    readingMinutes: 4,
    content: [
      {
        type: "p",
        text: "There is a particular kind of guilt that arrives every Ramadan. The target is a khatm, the days are going faster than the pages, and somewhere around the middle the reading turns into a race against a calendar. We finish, and we could not tell you what we read.",
      },
      {
        type: "p",
        text: "I want to make the unfashionable case for the opposite: reading far less, far more slowly, and staying with a passage past the point where you feel you have got it.",
      },
      { type: "h2", text: "Understanding is not a faster version of reading" },
      {
        type: "p",
        text: "Reading is something you can do at speed. Understanding is not. It requires that you stop at a word you have skimmed a hundred times and ask why that word and not the obvious alternative. It requires sitting with a verse that does not immediately agree with you.",
      },
      {
        type: "quote",
        text: "You can complete the Qur'an in a month and still have never once been stopped by it.",
      },
      {
        type: "p",
        text: "None of this is an argument against reading a lot. It is an argument against reading a lot instead of reading well, and then wondering why nothing changed.",
      },
      { type: "h2", text: "What slowing down looks like" },
      {
        type: "p",
        text: "Take one passage a week. Read it in Arabic even if you understand a fraction of it. Read a translation. Then read what the classical commentators said about it, and notice where they disagreed, because the places they disagreed are usually the places worth thinking about.",
      },
      {
        type: "p",
        text: "Then — and this is the part people skip — sit with the question of what it asks of you before next Friday. Not in general. This week, in your house.",
      },
    ],
  },
  {
    id: "prayer-in-a-hard-week",
    title: "When prayer is the first thing to go",
    date: "2026-07-02",
    author: "Imam Shuaib",
    excerpt:
      "The men I coach rarely lose their faith. They lose their rhythm, and then assume the two are the same thing.",
    tags: ["Coaching", "Practice"],
    readingMinutes: 5,
    content: [
      {
        type: "p",
        text: "Nobody sits down and decides to stop praying. What happens is a hard week: a deadline, a sick child, a night that runs into a morning. Fajr goes first. Then the others start arriving late, and then together, and then as a kind of apology at the end of the day.",
      },
      {
        type: "p",
        text: "By the time someone tells me about it, they have usually diagnosed themselves with a spiritual problem. Almost always it is a structural one.",
      },
      { type: "h2", text: "The gap between wanting and doing" },
      {
        type: "p",
        text: "A man who tells me he has lost his iman has usually not lost anything of the sort. He still believes every word he believed a year ago. What he has lost is a set of conditions — a time, a place, a moment in the day when prayer was the obvious next thing rather than a decision to be made against tiredness.",
      },
      {
        type: "quote",
        text: "Treat it as a scheduling failure first. It usually is, and a scheduling failure is a thing you can actually fix.",
      },
      { type: "h2", text: "Rebuild the smallest one first" },
      {
        type: "p",
        text: "Not all five. One. Pick the prayer you are most likely to catch, attach it to something already fixed in your day, and protect it for two weeks without trying to fix the others.",
      },
      {
        type: "p",
        text: "It sounds like too small a response to something that feels enormous. But the feeling of enormity is usually the problem: it makes the only acceptable fix a total one, and a total fix is exactly the sort you abandon by Wednesday.",
      },
    ],
  },
  {
    id: "the-conversation-before-the-nikah",
    title: "The conversations to have before the nikah",
    date: "2026-05-20",
    author: "Imam Shuaib",
    excerpt:
      "Couples plan the ceremony in detail and the marriage barely at all. Here is what premarital sessions actually ask.",
    tags: ["Marriage", "Counselling"],
    readingMinutes: 6,
    content: [
      {
        type: "p",
        text: "By the time a couple comes to me for a nikah, the venue is booked, the caterers are confirmed, and a spreadsheet exists. Ask them how they intend to handle money, and there is usually a pause.",
      },
      {
        type: "p",
        text: "This is not a criticism. A wedding has a date and a marriage does not, so the wedding gets the attention. But the pause is worth taking seriously, because the things couples have not discussed are almost never exotic. They are the same handful, every time.",
      },
      { type: "h2", text: "Money, and who decides" },
      {
        type: "p",
        text: "Not how much there is. Who decides how it is spent, what counts as a joint expense, what either of you would consider an unreasonable purchase without asking, and what each of you grew up watching your parents do — because that is the model you will both default to under stress.",
      },
      { type: "h2", text: "Families, and the limits" },
      {
        type: "p",
        text: "How often your families expect to see you. Who hosts Eid. What happens when a parent needs to move in. And crucially: what each of you will do when your own family is the unreasonable one, because at some point one of them will be.",
      },
      {
        type: "quote",
        text: "Most marital conflict I see is not between the couple. It is between the couple and a boundary neither of them agreed to defend.",
      },
      { type: "h2", text: "Faith, in practice rather than principle" },
      {
        type: "p",
        text: "Both of you will say faith matters. Ask the practical version instead: what does a normal Sunday look like, what do you want a child's religious education to be, and what would you do if one of you became noticeably more or less observant than the other in five years.",
      },
      {
        type: "p",
        text: "The point of asking now is not to find a disagreement and call the wedding off. It is that these conversations are survivable in a quiet room months beforehand, and considerably less so at eleven at night in the second year of a marriage.",
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.id === slug);
}

export const articlesByNewest = [...articles].sort((a, b) =>
  a.date < b.date ? 1 : -1,
);
