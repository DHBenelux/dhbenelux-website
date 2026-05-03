/**
 * Resolve the destination URL for a news-style post.
 *
 * Both PostCard and the News listing page need this logic.
 */
export function resolvePostDestination(post: {
  slug?: string;
  link?: string;
  sourceUrl?: string;
  deprecatedLink?: boolean;
  summaryOnly?: boolean;
}): string | null {
  const link = post.link ?? post.sourceUrl;

  if (post.summaryOnly) {
    return null;
  }

  if (post.deprecatedLink && post.slug) {
    return `/news/${post.slug}`;
  }

  if (!link && post.slug) {
    return `/news/${post.slug}`;
  }

  if (link?.startsWith('/')) {
    return link;
  }

  // Prefer internal slug page over external URL so readers stay on this site.
  // The external link is preserved as a "Read original" CTA inside the slug page.
  if (link?.startsWith('http') && post.slug) {
    return `/news/${post.slug}`;
  }

  return post.slug ? `/news/${post.slug}` : null;
}
