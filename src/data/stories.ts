import type { BlogPost, Story } from "@/types/portfolio";

const permanentPublishedAt = new Date("2026-06-18T00:00:00.000Z");

const permanentStoryInputs = [
  {
    id: "permanent-denis-diderot-red-robe",
    slug: "denis-diderot-curse-of-the-red-robe",
    title: "Denis Diderot - The Curse of the Red Robe",
    category: "Reflection",
    content: `Once upon a time in the 18th century, there lived a man named Denis Diderot, a brilliant thinker and writer. He helped create one of the most important works of the Enlightenment: the Encyclopedie, a vast compilation of knowledge meant to educate and liberate minds.

Though Diderot was wise, he was not wealthy. That changed one day when Catherine the Great, the Empress of Russia, heard that Diderot was in financial trouble. A fan of his work, she generously paid him a handsome sum to purchase his personal library, and even allowed him to keep it until his death. She paid him a salary as its librarian too, despite the library staying in Paris. Suddenly, Diderot had money.

Feeling a bit more refined now, Diderot decided to treat himself to a beautiful new scarlet robe.

But once he put it on, something strange happened.

The luxurious robe made the rest of his room--his old chair, worn rug, rustic desk--look shabby. So he replaced the chair, then the desk, then the rug, one item after another, until his entire home was transformed. His newfound wealth had triggered a chain reaction.

Diderot later wrote about this experience in an essay titled "Regrets on Parting with My Old Dressing Gown," in which he humorously laments how one elegant new item had forced him into a spiral of consumption.

This phenomenon is now called the Diderot Effect--when the purchase of a new possession leads to a cascade of additional spending to match the new item's perceived standard.`,
  },
  {
    id: "permanent-prayer",
    slug: "prayer",
    title: "Prayer",
    category: "Prayer",
    content: `Prayer is an action of the heart,
Formed properly from within it becomes a wish,
And the wish then bears fruit.`,
  },
  {
    id: "permanent-one-piece",
    slug: "one-piece",
    title: "One Piece",
    category: "Dreams",
    content: `Inherited will,
The tide of the times,
People's dreams,
These things cannot be stopped,
As long as people seek the answer to freedom,
These things will never cease to be.`,
  },
] as const;

export const permanentBlogPosts: readonly BlogPost[] = permanentStoryInputs.map(
  (story) => {
    const wordCount = countWords(story.content);

    return {
      id: story.id,
      slug: story.slug,
      title: story.title,
      content: story.content,
      preview: createPreview(story.content),
      wordCount,
      authorId: "site-owner",
      authorName: "Kipkoech Benedict",
      authorEmail: "",
      status: "approved",
      createdAt: permanentPublishedAt,
      updatedAt: permanentPublishedAt,
      publishedAt: permanentPublishedAt,
    };
  },
);

export const stories: readonly Story[] = permanentStoryInputs.map((story) => ({
  slug: story.slug,
  title: story.title,
  category: story.category,
  excerpt: createPreview(story.content),
  readTime: `${Math.max(1, Math.ceil(countWords(story.content) / 200))} min read`,
  status: "published",
}));

function countWords(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function createPreview(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean);
  const previewWords = words.slice(0, 34).join(" ");
  return words.length > 34 ? `${previewWords}...` : previewWords;
}
