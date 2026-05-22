export type FaqSegment =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] };

export type FaqEntry = {
  id: string;
  question: string;
  segments: readonly FaqSegment[];
};

/** All FAQs — order matches user content 1–10 */
export const FAQ_ENTRIES: readonly FaqEntry[] = [
  {
    id: "what-is-investa",
    question: "So, what exactly is Investa Finserve and what do you do for me?",
    segments: [
      {
        kind: "p",
        text: "Investa Finserve is an online financial services firm founded right here in Mumbai by Sanjeeta Shah. Right now, we help people invest in mutual funds — whether that is starting a simple SIP, planning for your child's education, saving for a home, or just making your money work harder than a savings account. We're growing fast. Very soon, we'll also help you with bonds, corporate fixed deposits, term insurance, health insurance, motor insurance, and travel insurance — because we want to be the only financial partner you ever need.",
      },
    ],
  },
  {
    id: "who-is-sanjeeta-shah",
    question: "Who is the founder — Sanjeeta Shah?",
    segments: [
      {
        kind: "p",
        text: 'Honestly? Because she has been doing this for just over two decades — and she still gets excited about helping people get their investment right.',
      },
      {
        kind: "p",
        text: 'Sanjeeta did not only spend two decades selling financial products. She spent them listening to people, understanding their worries, their dreams, and their complicated life situations — then finding solutions that actually made sense for them. She has seen bull markets, bear markets, financial crises, and everything in between. Through all of it, her approach has stayed the same: put the person first, always.',
      },
      {
        kind: "p",
        text: 'When you come to Investa Finserve, you are not a lead or a ticket number. You are someone Sanjeeta and her team genuinely want to see succeed toward your financial goals.',
      },
    ],
  },
  {
    id: "nri-invest",
    question: "I live abroad. Can I still invest through Investa Finserve as an NRI?",
    segments: [
      {
        kind: "p",
        text: 'Being away from India does not mean you have to miss out on incredible investment opportunities back home. We work with NRIs from across the world — UAE, USA, UK, Singapore, Canada, Australia, you name it — and we make the whole process feel like you are right here in Mumbai with us.',
      },
    ],
  },
  {
    id: "visit-mumbai-office",
    question: "Do I have to visit your Mumbai office? I really don't have the time for that.",
    segments: [
      {
        kind: "p",
        text: 'We completely understand — and the honest answer is no, you do not have to. Not even once.',
      },
      {
        kind: "p",
        text: 'Everything at Investa Finserve is built to work online. KYC, fund selection, investment, portfolio review — all of it happens digitally, at your convenience. You could be in Bandra, Bengaluru, or Berlin; it does not matter. We work around your schedule, not the other way around.',
      },
    ],
  },
  {
    id: "mutual-fund-types",
    question: "What kind of mutual funds can I invest in through you?",
    segments: [
      {
        kind: "p",
        text: 'Whether you are new to investing or have been investing for years, we have something that fits your situation. Here is a quick look at what we work with:',
      },
      {
        kind: "ul",
        items: [
          'Equity funds — if you are playing the long game and want your money to grow meaningfully over time.',
          'Debt funds — if you want steadier, more predictable returns without too much risk.',
          'Hybrid funds — if you want a bit of both worlds.',
          'ELSS (tax-saving funds) — if you are still in the old tax regime and looking for investments that offer benefits under Section 80C.',
          'Index funds & ETFs — if you prefer a low-cost, low-fuss approach.',
          'SIPs — if you want to invest a fixed amount every month without thinking about it.',
        ],
      },
      {
        kind: "p",
        text: 'If you are sitting there thinking "I do not know which of these is for me" — that is exactly why we are here. You are not alone; we help you figure it out.',
      },
    ],
  },
  {
    id: "new-products-coming",
    question: "What new financial products are you planning to add?",
    segments: [
      { kind: "p", text: "We are working on it! Here is what is coming to Investa Finserve very soon:" },
      {
        kind: "ul",
        items: [
          "Bonds & corporate fixed deposits — for predictable, fixed-return options.",
          "Term insurance — because protecting your family matters as much as growing wealth.",
          "Health insurance — so a medical emergency never becomes a financial emergency.",
          "Motor insurance — keeping your car covered without the usual hassle.",
          "Travel insurance — because life's too short to travel stressed.",
        ],
      },
      {
        kind: "p",
        text: 'The dream is simple: you should not need five different advisors for five different needs. We want to be the one number you call for all of it.',
      },
    ],
  },
  {
    id: "different-from-bank",
    question: "How are you different from my bank or one of those big investment apps?",
    segments: [
      {
        kind: "p",
        text: "Your bank is great for a savings account. Big apps are great for quick transactions. But neither of them really knows you.",
      },
      {
        kind: "p",
        text: 'At Investa Finserve, we are not an algorithm picking funds from a quick quiz. We sit down with you — virtually or otherwise — understand your goals, your family situation, your risk comfort, what keeps you up at night financially, and what you are genuinely working toward. Then we recommend what actually makes sense for your life — not only what is popular or trending.',
      },
      {
        kind: "p",
        text: 'Think less "robo-advisor" and more "trusted advisor who happens to be really good with money."',
      },
    ],
  },
  {
    id: "money-safe",
    question: "Is my money actually safe with Investa Finserve?",
    segments: [
      {
        kind: "p",
        text: 'We love this question — it means you are being smart about your money.',
      },
      {
        kind: "p",
        text: 'Here is the important part: your money never sits with us. When you invest in a mutual fund through Investa Finserve, your money goes directly to the AMC regulated by SEBI. We are your guide and distributor — we help you invest — but the money flows directly to the fund house you choose. Your investment is as safe as the fund house you choose, and we help you choose wisely.',
      },
      {
        kind: "p",
        text: 'Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing.',
      },
    ],
  },
  {
    id: "small-start",
    question: "I don't have a lot of money to start. Is that okay?",
    segments: [
      {
        kind: "p",
        text: 'It is more than okay — investing is less about having the perfect amount and more about the time you give your money.',
      },
      {
        kind: "p",
        text: 'You can begin with as little as ₹100 a month through a SIP. The best time to start was yesterday; the second best time is today — even if it is small. Consistency beats timing.',
      },
      {
        kind: "p",
        text: 'We help you pick a starting point that does not stretch your budget but still puts your money to work.',
      },
    ],
  },
  {
    id: "not-ready",
    question: "I'm not sure I'm ready to start investing. Can I still reach out?",
    segments: [
      {
        kind: "p",
        text: 'Of course — we would love to chat.',
      },
      {
        kind: "p",
        text: 'Whether you have one question or many, whether you are ready today or still exploring — you can reach us on:',
      },
      {
        kind: "ul",
        items: [
          'WhatsApp or email — for quick questions.',
          'A call or video chat — when you want a deeper conversation.',
        ],
      },
      {
        kind: "p",
        text: 'Sometimes one good conversation makes investing feel far less overwhelming. Let us have that conversation.',
      },
    ],
  },
] as const;

export const HOME_FAQ_IDS = ["what-is-investa", "who-is-sanjeeta-shah", "nri-invest"] as const;

export function getFaqsForHome(): FaqEntry[] {
  return HOME_FAQ_IDS.map((id) => FAQ_ENTRIES.find((f) => f.id === id)!);
}
