import { Link, db } from "astro:db";

export default async function seed() {
  await db.insert(Link).values([
    {
      title: "My Website",
      url: "https://www.stephangriesel.com",
      description: "This is my landing page for my website.",
      isRead: false,
    },
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/stephangriesel/",
      description: "My LinkedIn page.",
      isRead: true,
    },
    {
      title: "GitHub",
      url: "https://github.com/stephangriesel",
      description: "Here you can see all the projects I am working on.",
      isRead: true,
    },
  ]);
}
