/**
 * Starter blog articles, inserted by `npm run db:seed` when an article with the
 * same slug does not exist yet. After that the admin panel (/admin/blog) is the
 * source of truth.
 */
export interface DefaultBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  content: string;
}

export const DEFAULT_BLOG_POSTS: DefaultBlogPost[] = [
  {
    slug: "house-shifting-checklist",
    title: "The Complete House Shifting Checklist",
    excerpt:
      "A week-by-week plan that takes you from booking your movers to unpacking the last box, without the last-minute panic.",
    category: "Moving Tips",
    author: "Relocato Team",
    content: `Shifting home feels overwhelming mostly because everything seems to need doing at once. Spread the work over four weeks and it becomes a series of small, manageable jobs.

## Four weeks before the move

- Fix your moving date and book your packers and movers.
- Ask for a pre-move survey so the quote reflects what you actually own.
- Start sorting: keep, sell, donate, discard. Moving less costs less.

## Two weeks before

- Inform your society, landlord, and building security about the move date.
- Apply for address changes with your bank, insurer, and gas provider.
- Use up frozen food and pantry stock instead of moving it.

## The final week

1. Pack a personal bag with documents, chargers, medicines, and two days of clothes.
2. Photograph expensive electronics and furniture before they are packed.
3. Defrost the fridge a day in advance and drain the washing machine.

> Keep jewellery, cash, and original documents with you. They should never go in the truck.

## On moving day

Walk the crew through the house once, point out fragile items, and check the inventory list before the truck leaves. At the new home, count the boxes against that same list before signing off.

Need a hand planning yours? [Get a free quote](/#contact) and a move manager will build the schedule with you.`,
  },
  {
    slug: "choosing-packers-and-movers",
    title: "How to Choose Reliable Packers and Movers",
    excerpt:
      "Five checks that separate a professional moving company from a risky one, and the questions to ask before you pay an advance.",
    category: "Guides",
    author: "Relocato Team",
    content: `A low quote is easy to find. A mover who turns up on time, handles your things carefully, and charges what was agreed takes a little more checking.

## 1. Ask for a survey, not a guess

A dependable mover wants to see your goods, in person or on a video call, before quoting. A price given after a thirty-second phone call usually grows on moving day.

## 2. Get the quote in writing

The estimate should list what is included:

- Packing material and labour
- Loading, transport, and unloading
- Unpacking and rearranging, if you want it
- Taxes, tolls, and any floor or long-carry charges

## 3. Check the paperwork

Look for a registered company name, a GST number, and a physical office address. Ask how goods are covered in transit and what the claim process looks like.

## 4. Ask who will actually do the move

Some companies pass the job to a third party. Ask whether the crew and truck are their own, and who your single point of contact will be.

## 5. Read recent reviews

Pay more attention to how a company responded to a problem than to its star rating. Every mover has a bad day; the good ones fix it.

**A final tip:** be wary of anyone asking for most of the payment in advance. A small booking amount is normal; the balance is usually due on delivery.`,
  },
  {
    slug: "office-relocation-without-downtime",
    title: "Relocating an Office Without Losing a Working Day",
    excerpt:
      "How to plan an office move so that your team shuts down on Friday evening and is productive again on Monday morning.",
    category: "Corporate",
    author: "Relocato Team",
    content: `An office move is judged by one thing: how quickly people are working again. The packing matters far less than the planning that happens before it.

## Appoint one move owner

One person on your side should own decisions and communication. They work with the mover's project manager so that questions do not bounce between departments.

## Map the new office first

Prepare a floor plan with every desk, cabin, and meeting room numbered. Each crate and workstation is tagged with its destination number, so nothing has to be sorted on arrival.

## Treat IT as its own project

- Back up servers and critical data before anything is unplugged.
- Confirm that internet and power are live at the new site a few days early.
- Label cables and peripherals per workstation and pack them together.

## Move over a weekend

A phased move works best:

1. **Friday evening:** staff pack personal items; the crew starts with common areas.
2. **Saturday:** workstations, files, and IT equipment are moved and placed.
3. **Sunday:** IT reconnects and tests every desk; snags are fixed.

### After the move

Keep a small support team on site on Monday morning. Most issues are small, such as a missing cable or a chair at the wrong desk, and are sorted in minutes when someone is there to help.`,
  },
];
