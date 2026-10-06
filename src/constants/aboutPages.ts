/**
 * Starter "About Us" page, inserted by `npm run db:seed` when a page with the
 * same slug does not exist yet. After that the admin panel (/admin/about) is
 * the source of truth. The history timeline and logos are left empty on
 * purpose: they need real company facts, added from the admin panel.
 */
export const DEFAULT_ABOUT_PAGES = [
  {
    slug: "our-story",
    title: "Our Story",
    heroDescription:
      "A professionally managed relocation and mobility company headquartered in Delhi, India.",
    introEyebrow: "About Relocato",
    introHeading: "India-Origin Global Mobility Expertise",
    introBody: [
      "Relocato Global is a professionally managed relocation & mobility company headquartered in Delhi, India, serving corporate and individual relocation requirements across India and beyond.",
      "With a strong focus on structured execution, operational reliability, and premium relocation standards, we specialize in corporate mobility, household relocation, office transitions, vehicle transportation, and international moving support.",
    ].join("\n\n"),
    introImageUrl: "/images/service1.png",
    valuesTitle: "Our Mission, Our Drive",
    values: [
      {
        title: "Reliability",
        description:
          "We plan every move in detail and keep to the schedule we commit to.",
      },
      {
        title: "Transparency",
        description:
          "Clear quotes, clear timelines, and honest updates at every stage.",
      },
      {
        title: "Care",
        description:
          "We handle every shipment as if the belongings were our own.",
      },
      {
        title: "Accountability",
        description:
          "One point of contact owns your move from survey to delivery.",
      },
    ],
    vision:
      "To be the relocation partner that families and companies trust first, in India and wherever they move next.",
    mission:
      "To deliver professionally coordinated relocation experiences with maximum peace of mind and minimum disruption.",
    statsTitle: "Our Journey in Numbers",
    stats: [
      { value: "40+", label: "Years Experience" },
      { value: "25+", label: "Expert Members" },
    ],
    showTestimonials: true,
  },
];
